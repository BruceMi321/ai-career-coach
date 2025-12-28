import { FileText, MessageSquare, BookOpen, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import ScrollReveal from "./ScrollReveal";

const ServicesGrid = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: FileText,
      title: t("简历分析", "Resume Analysis"),
      description: t(
        "AI 智能分析您的简历与目标职位的匹配度，提供专业的优化建议。",
        "AI analyzes your resume against target positions with professional optimization suggestions."
      ),
      highlight: t("免费使用", "Free"),
    },
    {
      icon: MessageSquare,
      title: t("模拟面试", "Mock Interview"),
      description: t(
        "与 AI 进行真实场景的模拟面试，获得即时反馈和改进建议。",
        "Practice interviews with AI and get instant feedback and improvement tips."
      ),
      highlight: t("AI 驱动", "AI-Powered"),
    },
    {
      icon: BookOpen,
      title: t("职业规划", "Career Planning"),
      description: t(
        "基于您的背景和目标，提供个性化的职业发展路径建议。",
        "Personalized career path recommendations based on your background and goals."
      ),
      highlight: t("即将推出", "Coming Soon"),
    },
    {
      icon: Users,
      title: t("专家咨询", "Expert Consultation"),
      description: t(
        "与资深 HR 和职业顾问一对一沟通，获得深度的职业指导。",
        "One-on-one sessions with experienced HR and career consultants."
      ),
      highlight: t("专业服务", "Premium"),
      link: "/contact-expert",
    },
  ];

  return (
    <section className="py-20 lg:py-32">
      <div className="container px-4">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-4">
              {t("我们的服务", "Our Services")}
            </p>
            <h2 className="text-3xl lg:text-4xl font-serif font-medium mb-4">
              {t("全方位职业发展服务", "Comprehensive Career Services")}
            </h2>
            <div className="w-16 h-px bg-primary mx-auto mt-6" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-px bg-border max-w-5xl mx-auto border border-border">
          {services.map((service, index) => (
            <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
              <div className="group relative p-10 bg-background hover:bg-muted/30 transition-colors h-full">
                <div className="absolute top-8 right-8">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">
                    {service.highlight}
                  </span>
                </div>
                
                <div className="h-10 w-10 flex items-center justify-center mb-6">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-serif font-medium mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                
                {service.link ? (
                  <Link to={service.link} className="inline-flex items-center text-sm text-primary hover:underline underline-offset-4">
                    {t("了解更多", "Learn more")} <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center text-sm text-primary cursor-pointer hover:underline underline-offset-4">
                    {t("了解更多", "Learn more")} <ArrowRight className="h-4 w-4 ml-1" />
                  </span>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
