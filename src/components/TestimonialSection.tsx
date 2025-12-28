import { useLanguage } from "@/hooks/useLanguage";
import ScrollReveal from "./ScrollReveal";

const TestimonialSection = () => {
  const { t, language } = useLanguage();

  const testimonials = language === "zh" ? [
    {
      quote: "使用这个工具后，我的简历通过率提升了很多。AI 给出的建议非常具体，让我知道该如何改进。",
      author: "张先生",
      role: "软件工程师",
      company: "某互联网大厂",
    },
    {
      quote: "作为一名应届生，我对求职一无所知。这个平台帮我找到了简历中的问题，最终成功拿到了心仪的 offer。",
      author: "李女士",
      role: "产品经理",
      company: "某科技公司",
    },
    {
      quote: "专业的人工专家咨询服务让我对自己的职业规划有了更清晰的认识，非常感谢！",
      author: "王先生",
      role: "市场总监",
      company: "某上市公司",
    },
  ] : [
    {
      quote: "After using this tool, my resume pass rate improved significantly. The AI suggestions were very specific.",
      author: "John Z.",
      role: "Software Engineer",
      company: "Tech Giant",
    },
    {
      quote: "As a fresh graduate, I knew nothing about job hunting. This platform helped me land my dream offer.",
      author: "Sarah L.",
      role: "Product Manager",
      company: "Tech Startup",
    },
    {
      quote: "The expert consultation service gave me a much clearer vision of my career path. Highly recommended!",
      author: "Michael W.",
      role: "Marketing Director",
      company: "Public Company",
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container px-4">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-4">
              {t("用户反馈", "Testimonials")}
            </p>
            <h2 className="text-3xl lg:text-4xl font-serif font-medium mb-4">
              {t("真实的成功案例", "Real Success Stories")}
            </h2>
            <div className="w-16 h-px bg-primary mx-auto mt-6" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
              <div className="relative p-8 bg-background border-t-2 border-primary/20 hover:border-primary transition-colors h-full flex flex-col">
                <p className="text-foreground mb-8 leading-relaxed text-lg italic flex-1">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-border pt-6">
                  <p className="font-medium text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {testimonial.role}{language === "zh" ? "，" : ", "}{testimonial.company}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
