import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import ScrollReveal from "./ScrollReveal";

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 lg:py-32 bg-primary">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal animation="fade-up">
            <h2 className="text-3xl lg:text-4xl font-serif font-medium text-primary-foreground mb-6">
              {t("准备好优化您的简历了吗？", "Ready to Optimize Your Resume?")}
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={100}>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              {t(
                "立即开始使用我们的 AI 工具，让您的简历脱颖而出，获得更多面试机会",
                "Start using our AI tools now to make your resume stand out and get more interview opportunities"
              )}
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-0"
                onClick={() => {
                  document.getElementById("resume-analyzer")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("免费开始分析", "Start Free Analysis")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link to="/contact-expert">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground"
                >
                  {t("咨询人工专家", "Consult an Expert")}
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
