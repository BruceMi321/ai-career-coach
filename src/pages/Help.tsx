import { useState, useMemo } from "react";
import { ArrowLeft, Mail, HelpCircle, Shield, Zap, FileText, MessageSquare, CreditCard, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/hooks/useLanguage";

const Help = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter FAQs based on search query
  const filteredFaqs = useMemo(() => {
    const faqs = [
      {
        category: t("入门指南", "Getting Started"),
        icon: Zap,
        questions: [
          {
            q: t("如何开始使用简历分析？", "How do I start using resume analysis?"),
            a: t(
              "只需将您的简历内容粘贴到文本框中，再输入目标职位描述，点击分析简历按钮即可。AI 将在几秒内生成详细的分析报告。",
              "Simply paste your resume content into the text box, enter the target job description, and click Analyze Resume. The AI will generate a detailed analysis report within seconds."
            ),
          },
          {
            q: t("模拟面试支持哪些类型？", "What types of mock interviews are supported?"),
            a: t(
              "我们支持多种面试类型，包括行为面试、技术面试、案例面试等。AI 面试官会根据您提供的职位描述设计针对性的问题。",
              "We support various interview types including behavioral, technical, and case interviews. The AI interviewer designs targeted questions based on the job description you provide."
            ),
          },
          {
            q: t("需要注册账号才能使用吗？", "Do I need to register to use the service?"),
            a: t(
              "基础功能无需注册即可使用。但注册账号后，您可以保存分析历史、追踪进度，并获得更个性化的体验。",
              "Basic features can be used without registration. However, by registering, you can save analysis history, track progress, and get a more personalized experience."
            ),
          },
        ],
      },
      {
        category: t("数据安全", "Data Security"),
        icon: Shield,
        questions: [
          {
            q: t("我的数据安全吗？", "Is my data secure?"),
            a: t(
              "我们非常重视用户数据安全。所有数据传输都经过加密处理，简历内容仅用于分析目的，不会被存储或用于其他用途。",
              "We take data security very seriously. All data transmission is encrypted, and resume content is only used for analysis purposes, not stored or used for other purposes."
            ),
          },
          {
            q: t("我的简历会被分享给第三方吗？", "Will my resume be shared with third parties?"),
            a: t(
              "绝对不会。我们严格遵守隐私政策，您的简历 and 个人信息不会被分享给任何第三方。数据完全在您的控制之下。",
              "Absolutely not. We strictly follow our privacy policy. Your resume and personal information will never be shared with any third party. Your data is completely under your control."
            ),
          },
        ],
      },
      {
        category: t("功能使用", "Features"),
        icon: FileText,
        questions: [
          {
            q: t("免费版有什么限制？", "What are the limitations of the free version?"),
            a: t(
              "免费版提供基础的简历分析和模拟面试功能，每日有使用次数限制。如需无限使用和高级功能，请关注即将推出的企业版。",
              "The free version provides basic resume analysis and mock interview features with daily usage limits. For unlimited usage and advanced features, stay tuned for our upcoming Enterprise version."
            ),
          },
          {
            q: t("如何提高分析准确度？", "How can I improve analysis accuracy?"),
            a: t(
              "提供更完整的简历内容和更详细的职位描述可以显著提高分析准确度。建议包含完整的工作经历、项目经验和技能描述。",
              "Providing more complete resume content and detailed job descriptions can significantly improve accuracy. Include complete work experience, project experience, and skill descriptions."
            ),
          },
          {
            q: t("支持哪些语言？", "Which languages are supported?"),
            a: t(
              "目前我们支持中文和英文两种语言的简历分析和模拟面试。界面也提供中英文切换功能。",
              "We currently support resume analysis and mock interviews in both Chinese and English. The interface also provides language switching between Chinese and English."
            ),
          },
        ],
      },
      {
        category: t("账户与付费", "Account & Billing"),
        icon: CreditCard,
        questions: [
          {
            q: t("企业版什么时候推出？", "When will the Enterprise version be available?"),
            a: t(
              "企业版正在开发中，预计不久后推出。如您有企业级需求，欢迎联系我们获取更多信息。",
              "The Enterprise version is under development and expected to launch soon. If you have enterprise needs, please contact us for more information."
            ),
          },
          {
            q: t("如何联系客服？", "How do I contact customer service?"),
            a: t(
              "您可以通过邮件 biz@fyourwaycareer.com 联系我们，我们会在 24 小时内回复您的问题。",
              "You can contact us via email at biz@fyourwaycareer.com. We will respond to your inquiry within 24 hours."
            ),
          },
        ],
      },
    ];

    if (!searchQuery.trim()) return faqs;
    
    const query = searchQuery.toLowerCase();
    return faqs.map(category => ({
      ...category,
      questions: category.questions.filter(
        item => item.q.toLowerCase().includes(query) || item.a.toLowerCase().includes(query)
      ),
    })).filter(category => category.questions.length > 0);
  }, [searchQuery, t]);

  const totalResults = filteredFaqs.reduce((acc, cat) => acc + cat.questions.length, 0);

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
      <div className="container px-4 py-12 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-4">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("帮助中心", "Help Center")}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t(
              "找到您需要的答案，解决常见问题",
              "Find the answers you need and solve common problems"
            )}
          </p>
        </div>

        {/* Search Box */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t("搜索常见问题...", "Search FAQs...")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 h-12 text-base"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground">
              {totalResults > 0 
                ? t(`找到 ${totalResults} 个相关结果`, `Found ${totalResults} result${totalResults > 1 ? 's' : ''}`)
                : t("未找到相关结果，请尝试其他关键词", "No results found. Try different keywords.")}
            </p>
          </div>
        )}

        {/* FAQ Categories */}
        <div className="space-y-8 mb-12">
          {filteredFaqs.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full" defaultValue={searchQuery ? `${categoryIndex}-0` : undefined}>
                  {category.questions.map((item, index) => (
                    <AccordionItem key={index} value={`${categoryIndex}-${index}`}>
                      <AccordionTrigger className="text-left">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {searchQuery && totalResults === 0 && (
          <Card className="text-center p-8 mb-12">
            <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">{t("没有找到匹配的问题", "No matching questions found")}</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {t("请尝试使用不同的关键词，或直接联系我们获取帮助", "Try different keywords or contact us directly for help")}
            </p>
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              {t("清除搜索", "Clear Search")}
            </Button>
          </Card>
        )}

        {/* Contact Section */}
        <Card className="bg-muted/50">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mx-auto mb-2">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>{t("还有其他问题？", "Still have questions?")}</CardTitle>
            <CardDescription>
              {t(
                "如果以上内容未能解答您的问题，请随时联系我们",
                "If the above content didn't answer your question, please feel free to contact us"
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Mail className="h-5 w-5 text-primary" />
              <a 
                href="mailto:biz@fyourwaycareer.com" 
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                biz@fyourwaycareer.com
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="mailto:biz@fyourwaycareer.com">
                <Button size="lg" className="gap-2">
                  <Mail className="h-4 w-4" />
                  {t("发送邮件", "Send Email")}
                </Button>
              </a>
              <Link to="/contact-expert">
                <Button variant="outline" size="lg">
                  {t("专家咨询", "Expert Consultation")}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Help;
