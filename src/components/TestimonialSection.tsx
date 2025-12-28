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
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-4">
            用户反馈
          </p>
          <h2 className="text-3xl lg:text-4xl font-serif font-medium mb-4">
            真实的成功案例
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-8 bg-background border-t-2 border-primary/20 hover:border-primary transition-colors"
            >
              <p className="text-foreground mb-8 leading-relaxed text-lg italic">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-border pt-6">
                <p className="font-medium text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {testimonial.role}，{testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
