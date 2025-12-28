import { FileText, MessageSquare, BookOpen, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesGrid = () => {
  const services = [
    {
      icon: FileText,
      title: "简历分析",
      description: "AI 智能分析您的简历与目标职位的匹配度，提供专业的优化建议。",
      highlight: "免费使用",
    },
    {
      icon: MessageSquare,
      title: "模拟面试",
      description: "与 AI 进行真实场景的模拟面试，获得即时反馈和改进建议。",
      highlight: "AI 驱动",
    },
    {
      icon: BookOpen,
      title: "职业规划",
      description: "基于您的背景和目标，提供个性化的职业发展路径建议。",
      highlight: "即将推出",
    },
    {
      icon: Users,
      title: "人工专家咨询",
      description: "与资深 HR 和职业顾问一对一沟通，获得深度的职业指导。",
      highlight: "专业服务",
      link: "/contact-expert",
    },
  ];

  return (
    <section className="py-20 lg:py-32">
      <div className="container px-4">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-4">
            我们的服务
          </p>
          <h2 className="text-3xl lg:text-4xl font-serif font-medium mb-4">
            全方位职业发展服务
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border max-w-5xl mx-auto border border-border">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-10 bg-background hover:bg-muted/30 transition-colors"
            >
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
                  了解更多 <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              ) : (
                <span className="inline-flex items-center text-sm text-primary cursor-pointer hover:underline underline-offset-4">
                  了解更多 <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
