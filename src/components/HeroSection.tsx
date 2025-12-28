import { Sparkles, Target, TrendingUp, Award } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-12 lg:py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
      </div>

      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            AI 驱动的职业发展助手
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
            让您的简历
            <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
              {" "}脱颖而出
            </span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            基于专业 HR 评估框架，AI 智能分析简历与职位匹配度，
            提供个性化的优化建议，助您获得理想的工作机会。
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid gap-6 md:grid-cols-3 mt-12 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">精准匹配分析</h3>
            <p className="text-sm text-muted-foreground">
              智能对比简历与JD，精确识别匹配度和差距
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">多维度评估</h3>
            <p className="text-sm text-muted-foreground">
              从技能、经验、表达等多个维度全面评分
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">专业优化建议</h3>
            <p className="text-sm text-muted-foreground">
              提供具体可行的改进方案和优化示例
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
