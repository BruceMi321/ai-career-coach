import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const INTERVIEWER_PROMPT = `你是一位资深的面试官，拥有丰富的招聘经验。你的任务是根据职位描述对候选人进行模拟面试。

## 面试风格
- 专业但友好，创造真实的面试氛围
- 根据候选人的回答进行追问，深入了解能力
- 提供即时、建设性的反馈

## 面试类型
根据 interview_type 参数选择问题类型：
- behavioral: 行为面试问题（STAR法则）
- technical: 技术能力问题
- situational: 情景模拟问题
- comprehensive: 综合面试

## 回复格式
你的回复应该是纯文本，直接作为面试官说话。
- 如果是开始面试，先简单介绍自己和面试流程
- 提出一个具体的面试问题
- 如果候选人回答了问题，给予简短评价并追问或提出新问题
- 保持对话自然流畅`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, jobDescription, interviewType = 'behavioral' } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log(`Starting mock interview - type: ${interviewType}`);

    const systemMessage = `${INTERVIEWER_PROMPT}

## 目标职位描述
${jobDescription}

## 当前面试类型
${interviewType}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemMessage },
          ...messages
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "请求过于频繁，请稍后再试" }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI服务额度已用尽" }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });

  } catch (error) {
    console.error("Error in mock-interview function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "面试服务暂时不可用" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
