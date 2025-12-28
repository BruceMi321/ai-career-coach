import { Target, TrendingUp, Award } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-28">
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/30 to-transparent" />

      <div className="container px-4">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium">
            AI 驱动的职业发展助手
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight leading-tight">
            让您的简历
            <span className="text-primary block md:inline">脱颖而出</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            基于专业 HR 评估框架，AI 智能分析简历与职位匹配度，
            提供个性化的优化建议，助您获得理想的工作机会。
          </p>

          {/* Divider */}
          <div className="w-16 h-px bg-primary mx-auto" />
        </div>

        {/* Feature highlights */}
        <div className="grid gap-8 md:grid-cols-3 mt-16 max-w-5xl mx-auto">
          <div className="group text-center p-8 border-t-2 border-primary/20 hover:border-primary transition-colors">
            <div className="h-12 w-12 mx-auto mb-6 flex items-center justify-center">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-serif text-xl font-medium mb-3">精准匹配分析</h3>
            <p className="text-muted-foreground leading-relaxed">
              智能对比简历与JD，精确识别匹配度和差距
            </p>
          </div>
          
          <div className="group text-center p-8 border-t-2 border-primary/20 hover:border-primary transition-colors">
            <div className="h-12 w-12 mx-auto mb-6 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-serif text-xl font-medium mb-3">多维度评估</h3>
            <p className="text-muted-foreground leading-relaxed">
              从技能、经验、表达等多个维度全面评分
            </p>
          </div>
          
          <div className="group text-center p-8 border-t-2 border-primary/20 hover:border-primary transition-colors">
            <div className="h-12 w-12 mx-auto mb-6 flex items-center justify-center">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-serif text-xl font-medium mb-3">专业优化建议</h3>
            <p className="text-muted-foreground leading-relaxed">
              提供具体可行的改进方案和优化示例
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
