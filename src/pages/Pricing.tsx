import { ArrowLeft, Check, Sparkles, Building2, Zap, Users, BarChart3, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";

const Pricing = () => {
  const { t } = useLanguage();

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
          <Card className="relative border-2 border-muted bg-muted/30">
            <Badge variant="secondary" className="absolute -top-3 left-1/2 -translate-x-1/2">
              {t("即将推出", "Coming Soon")}
            </Badge>
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 p-3 rounded-full bg-muted w-fit">
                <Building2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">{t("企业版", "Enterprise")}</CardTitle>
              <CardDescription>
                {t("适合企业和团队", "For businesses and teams")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-muted-foreground">{t("定制", "Custom")}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {enterpriseFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" size="lg" variant="secondary" disabled>
                {t("敬请期待", "Coming Soon")}
              </Button>
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
          <Link to="/contact-expert">
            <Button variant="outline" size="lg">
              {t("联系我们", "Contact Us")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
