import { Target, TrendingUp, Award } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import ScrollReveal from "./ScrollReveal";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 lg:py-28">
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/30 to-transparent" />

      <div className="container px-4">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <ScrollReveal animation="fade" delay={0}>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium">
              {t("AI 驱动的职业发展助手", "AI-Powered Career Assistant")}
            </p>
          </ScrollReveal>
          
          <ScrollReveal animation="fade-up" delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight leading-tight">
              {t("让您的简历", "Make Your Resume")}
              <span className="text-primary block md:inline">{t("脱颖而出", " Stand Out")}</span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal animation="fade-up" delay={200}>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t(
                "基于专业 HR 评估框架，AI 智能分析简历与职位匹配度，提供个性化的优化建议，助您获得理想的工作机会。",
                "AI analyzes resume-job fit based on professional HR frameworks, providing personalized optimization suggestions to help you land your dream job."
              )}
            </p>
          </ScrollReveal>

          {/* Divider */}
          <ScrollReveal animation="scale" delay={300}>
            <div className="w-16 h-px bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        {/* Feature highlights */}
        <div className="grid gap-8 md:grid-cols-3 mt-16 max-w-5xl mx-auto">
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="group text-center p-8 border-t-2 border-primary/20 hover:border-primary transition-colors h-full">
              <div className="h-12 w-12 mx-auto mb-6 flex items-center justify-center">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-medium mb-3">
                {t("精准匹配分析", "Precise Match Analysis")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("智能对比简历与JD，精确识别匹配度和差距", "Smart comparison between resume and JD to identify fit and gaps")}
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fade-up" delay={200}>
            <div className="group text-center p-8 border-t-2 border-primary/20 hover:border-primary transition-colors h-full">
              <div className="h-12 w-12 mx-auto mb-6 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-medium mb-3">
                {t("多维度评估", "Multi-dimensional Evaluation")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("从技能、经验、表达等多个维度全面评分", "Comprehensive scoring across skills, experience, and presentation")}
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fade-up" delay={300}>
            <div className="group text-center p-8 border-t-2 border-primary/20 hover:border-primary transition-colors h-full">
              <div className="h-12 w-12 mx-auto mb-6 flex items-center justify-center">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-medium mb-3">
                {t("专业优化建议", "Professional Suggestions")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("提供具体可行的改进方案和优化示例", "Actionable improvement plans and optimization examples")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
