import { useState } from "react";
import { ArrowLeft, Check, Sparkles, Building2, Zap, Users, BarChart3, Headphones, Send, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLanguage } from "@/hooks/useLanguage";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const Pricing = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    teamSize: "",
    message: "",
  });

  const formSchema = z.object({
    companyName: z.string().trim().min(1, t("请输入公司名称", "Company name is required")).max(100),
    contactName: z.string().trim().min(1, t("请输入联系人姓名", "Contact name is required")).max(50),
    email: z.string().trim().email(t("请输入有效的邮箱地址", "Please enter a valid email")).max(255),
    phone: z.string().trim().max(20).optional(),
    teamSize: z.string().trim().max(50).optional(),
    message: z.string().trim().max(1000).optional(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = formSchema.safeParse(formData);
    if (!validation.success) {
      toast({
        title: t("表单验证失败", "Validation Error"),
        description: validation.error.errors[0]?.message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('enterprise_reservations')
        .insert({
          company_name: formData.companyName,
          contact_name: formData.contactName,
          email: formData.email,
          phone: formData.phone || null,
          team_size: formData.teamSize || null,
          message: formData.message || null,
        });

      if (error) {
        console.error("Error saving reservation:", error);
        throw error;
      }

      toast({
        title: t("预约成功！", "Reservation Successful!"),
        description: t(
          "感谢您的兴趣，我们会在 1-2 个工作日内与您联系。",
          "Thank you for your interest. We will contact you within 1-2 business days."
        ),
      });
      
      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        teamSize: "",
        message: "",
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: t("提交失败", "Submission Failed"),
        description: t(
          "请稍后重试或直接联系我们。",
          "Please try again later or contact us directly."
        ),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const freeFeatures = [
    t("基础简历分析", "Basic Resume Analysis"),
    t("基础模拟面试", "Basic Mock Interview"),
    t("AI 驱动的优化建议", "AI-powered Optimization Suggestions"),
    t("中英文双语支持", "Chinese & English Support"),
    t("每日使用次数限制", "Daily Usage Limits"),
  ];

  const enterpriseFeatures = [
    t("无限次简历分析", "Unlimited Resume Analysis"),
    t("无限次模拟面试", "Unlimited Mock Interviews"),
    t("高级 AI 模型", "Advanced AI Models"),
    t("团队协作功能", "Team Collaboration"),
    t("定制化分析报告", "Customized Reports"),
    t("批量处理功能", "Batch Processing"),
    t("专属客户支持", "Dedicated Support"),
    t("API 接入", "API Access"),
  ];

  const teamSizeOptions = [
    t("1-10 人", "1-10 people"),
    t("11-50 人", "11-50 people"),
    t("51-200 人", "51-200 people"),
    t("200+ 人", "200+ people"),
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t("返回首页", "Back to Home")}
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container px-4 py-12 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("定价方案", "Pricing Plans")}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t(
              "选择适合您的方案，开始提升求职竞争力",
              "Choose the plan that fits your needs and start enhancing your career"
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="relative border-2">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
              {t("当前可用", "Available Now")}
            </Badge>
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">{t("免费版", "Free")}</CardTitle>
              <CardDescription>
                {t("适合个人求职者", "Perfect for individual job seekers")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold">¥0</span>
                <span className="text-muted-foreground">/{t("月", "month")}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {freeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/" className="block">
                <Button className="w-full" size="lg">
                  {t("立即开始", "Get Started")}
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="relative border-2 border-primary/50">
            <Badge variant="secondary" className="absolute -top-3 left-1/2 -translate-x-1/2">
              {t("即将推出", "Coming Soon")}
            </Badge>
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">{t("企业版", "Enterprise")}</CardTitle>
              <CardDescription>
                {t("适合企业和团队", "For businesses and teams")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold">{t("定制", "Custom")}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {enterpriseFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full" size="lg" variant="outline">
                    {t("预约咨询", "Book Consultation")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{t("预约企业版咨询", "Book Enterprise Consultation")}</DialogTitle>
                    <DialogDescription>
                      {t(
                        "填写以下信息，我们会尽快与您联系",
                        "Fill in the form below and we will contact you soon"
                      )}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">{t("公司名称", "Company Name")} *</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder={t("请输入公司名称", "Enter company name")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactName">{t("联系人", "Contact Name")} *</Label>
                      <Input
                        id="contactName"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        placeholder={t("请输入联系人姓名", "Enter contact name")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("邮箱", "Email")} *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("请输入邮箱地址", "Enter email address")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t("电话", "Phone")}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t("请输入联系电话", "Enter phone number")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="teamSize">{t("团队规模", "Team Size")}</Label>
                      <select
                        id="teamSize"
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={(e) => setFormData(prev => ({ ...prev, teamSize: e.target.value }))}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">{t("请选择团队规模", "Select team size")}</option>
                        {teamSizeOptions.map((option, index) => (
                          <option key={index} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">{t("需求描述", "Requirements")}</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t("请简要描述您的需求", "Briefly describe your requirements")}
                        rows={3}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t("提交中...", "Submitting...")}
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          {t("提交预约", "Submit")}
                        </>
                      )}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        {/* Enterprise Features */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            {t("企业版亮点功能", "Enterprise Highlights")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">{t("无限使用", "Unlimited Usage")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("不限次数的简历分析和模拟面试", "Unlimited resume analysis and mock interviews")}
              </p>
            </Card>
            <Card className="text-center p-6">
              <Users className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">{t("团队协作", "Team Collaboration")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("支持多人协作，共享分析结果", "Multi-user collaboration with shared results")}
              </p>
            </Card>
            <Card className="text-center p-6">
              <BarChart3 className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">{t("数据分析", "Analytics")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("详细的使用统计和趋势分析", "Detailed usage statistics and trend analysis")}
              </p>
            </Card>
            <Card className="text-center p-6">
              <Headphones className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">{t("专属支持", "Dedicated Support")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("7x24 小时专属客户服务", "24/7 dedicated customer service")}
              </p>
            </Card>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center bg-muted/50 rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-2">
            {t("对企业版感兴趣？", "Interested in Enterprise?")}
          </h2>
          <p className="text-muted-foreground mb-6">
            {t(
              "联系我们获取定制化方案和报价",
              "Contact us for customized solutions and pricing"
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="default" size="lg" onClick={() => setIsDialogOpen(true)}>
              {t("预约咨询", "Book Consultation")}
            </Button>
            <Link to="/contact-expert">
              <Button variant="outline" size="lg">
                {t("专家咨询", "Expert Consultation")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
