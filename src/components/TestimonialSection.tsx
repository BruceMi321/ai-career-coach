import { Quote } from "lucide-react";

const TestimonialSection = () => {
  const testimonials = [
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
  ];

  return (
    <section className="py-20 lg:py-32 bg-card/50">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            用户真实反馈
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            听听他们如何通过我们的服务实现职业突破
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-8 rounded-2xl bg-background border border-border/50"
            >
              <Quote className="h-8 w-8 text-primary/20 mb-4" />
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {testimonial.author[0]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} · {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
