import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReservationData {
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  team_size?: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("send-reservation-notification function invoked");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const reservation: ReservationData = await req.json();
    console.log("Received reservation data:", { 
      company_name: reservation.company_name, 
      contact_name: reservation.contact_name,
      email: reservation.email
    });

    // Fetch email config from database
    const { data: emailConfig, error: configError } = await supabase
      .from('email_config')
      .select('*')
      .eq('is_active', true)
      .maybeSingle();

    if (configError) {
      console.error("Error fetching email config:", configError);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to fetch email config" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!emailConfig) {
      console.log("No active email configuration found, skipping notification");
      return new Response(
        JSON.stringify({ success: true, message: "No active email configuration, notification skipped" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!emailConfig.resend_api_key) {
      console.log("No Resend API key configured, skipping notification");
      return new Response(
        JSON.stringify({ success: true, message: "No Resend API key configured, notification skipped" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Sending email notification to:", emailConfig.notification_email);

    // Send email using Resend
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${emailConfig.resend_api_key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "企业预约通知 <onboarding@resend.dev>",
        to: [emailConfig.notification_email],
        subject: `新企业预约 - ${reservation.company_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1a365d; border-bottom: 2px solid #3182ce; padding-bottom: 10px;">
              新企业预约通知
            </h1>
            
            <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #2d3748; margin-top: 0;">公司信息</h2>
              <p><strong>公司名称：</strong>${reservation.company_name}</p>
              <p><strong>联系人：</strong>${reservation.contact_name}</p>
              <p><strong>邮箱：</strong>${reservation.email}</p>
              <p><strong>电话：</strong>${reservation.phone || '未填写'}</p>
              <p><strong>团队规模：</strong>${reservation.team_size || '未填写'}</p>
            </div>
            
            ${reservation.message ? `
              <div style="background-color: #fff5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #2d3748; margin-top: 0;">需求说明</h2>
                <p style="white-space: pre-wrap;">${reservation.message}</p>
              </div>
            ` : ''}
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #718096; font-size: 12px;">
              <p>此邮件由系统自动发送，请勿直接回复。</p>
              <p>提交时间：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</p>
            </div>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Resend API error:", errorText);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to send email" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailResult = await emailResponse.json();
    console.log("Email sent successfully:", emailResult);

    return new Response(
      JSON.stringify({ success: true, message: "Notification sent successfully" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error) {
    console.error("Error in send-reservation-notification:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
