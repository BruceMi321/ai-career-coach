import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-32 bg-primary">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-medium text-primary-foreground mb-6">
            准备好优化您的简历了吗？
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            立即开始使用我们的 AI 工具，让您的简历脱颖而出，获得更多面试机会
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-0"
              onClick={() => {
                document.getElementById("resume-analyzer")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              免费开始分析
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link to="/contact-expert">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground"
              >
                咨询人工专家
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
