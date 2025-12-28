import { FileText, MessageSquare, BookOpen, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

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
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            全方位职业发展服务
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            无论您处于职业生涯的哪个阶段，我们都有适合您的解决方案
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute top-6 right-6">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {service.highlight}
                </span>
              </div>
              
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              
              {service.link ? (
                <Link to={service.link}>
                  <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 group-hover:underline">
                    了解更多 <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              ) : (
                <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 group-hover:underline">
                  了解更多 <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
