import { ArrowLeft, Target, Eye, Heart, Users, Lightbulb, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";

const About = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Users,
      title: t("以用户为中心", "User-Centric"),
      description: t(
        "我们始终将用户需求放在首位，倾听反馈，持续改进产品体验，确保每一位用户都能获得最大价值。",
        "We always put user needs first, listen to feedback, continuously improve product experience, ensuring maximum value for every user."
      ),
    },
    {
      icon: TrendingUp,
      title: t("数据驱动决策", "Data-Driven"),
      description: t(
        "我们相信数据的力量，通过深入的数据分析和 AI 技术，为用户提供客观、精准的职业发展建议。",
        "We believe in the power of data, providing objective and precise career development advice through in-depth analysis and AI technology."
      ),
    },
    {
      icon: Lightbulb,
      title: t("持续创新", "Continuous Innovation"),
      description: t(
        "我们拥抱变化，不断探索前沿技术，将最新的 AI 能力融入产品，引领职业咨询行业的数字化转型。",
        "We embrace change, continuously explore cutting-edge technology, integrate the latest AI capabilities, and lead digital transformation in career consulting."
      ),
    },
    {
      icon: Shield,
      title: t("诚信透明", "Integrity & Transparency"),
      description: t(
        "我们坚持诚信经营，对用户数据严格保密，提供透明的服务定价，建立长期信任关系。",
        "We uphold integrity, strictly protect user data, provide transparent pricing, and build long-term trust relationships."
      ),
    },
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

      {/* Hero Section */}
      <div className="container px-4 py-16 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("关于我们", "About Us")}
          </h1>
          <div className="text-2xl md:text-3xl font-heading mb-6">
            <span className="font-light text-muted-foreground">your</span>
            <span className="font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">way</span>
            <span className="font-medium">career</span>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t(
              "yourwaycareer 是一家专注于职业咨询的创新机构，致力于用 AI 技术赋能每一位求职者的职业发展之路。",
              "yourwaycareer is an innovative career consulting firm dedicated to empowering every job seeker's career journey with AI technology."
            )}
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50" />
            <CardContent className="pt-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold">{t("使命", "Mission")}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t(
                  "赋能每一位求职者，让职业发展更清晰、更高效。我们通过先进的 AI 技术和专业的职业洞察，帮助用户发现自身优势，匹配理想机会，实现职业跃迁。",
                  "Empowering every job seeker to make career development clearer and more efficient. Through advanced AI technology and professional career insights, we help users discover their strengths, match ideal opportunities, and achieve career advancement."
                )}
              </p>
            </CardContent>
          </Card>

          {/* Vision */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-primary" />
            <CardContent className="pt-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold">{t("愿景", "Vision")}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t(
                  "成为全球领先的 AI 职业咨询平台，帮助百万人实现职业理想。我们致力于打造一个人人都能获得专业职业指导的世界，让职业发展不再迷茫。",
                  "To become the world's leading AI career consulting platform, helping millions achieve their career aspirations. We are committed to creating a world where everyone has access to professional career guidance."
                )}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t("价值观", "Our Values")}</h2>
            </div>
            <p className="text-muted-foreground">
              {t(
                "这些核心价值观指引着我们的每一个决策",
                "These core values guide our every decision"
              )}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                      <value.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-muted/50 rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-2">
            {t("加入我们的旅程", "Join Our Journey")}
          </h2>
          <p className="text-muted-foreground mb-6">
            {t(
              "让我们一起，用 AI 重新定义职业发展",
              "Together, let's redefine career development with AI"
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button size="lg">
                {t("开始体验", "Get Started")}
              </Button>
            </Link>
            <Link to="/contact-expert">
              <Button variant="outline" size="lg">
                {t("联系我们", "Contact Us")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
