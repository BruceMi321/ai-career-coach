import { CheckCircle, Zap, Shield, BarChart3, FileText, Target, TrendingUp, Star, Award } from "lucide-react";

interface FeatureBlockProps {
  title: string;
  highlight: string;
  description: string;
  features: string[];
  imagePosition: "left" | "right";
  icon: React.ReactNode;
  visualType: "matching" | "evaluation" | "optimization";
}

const MatchingVisual = () => (
  <div className="relative">
    <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 p-6 flex flex-col justify-center">
      {/* Resume vs JD comparison */}
      <div className="flex gap-4 items-start">
        <div className="flex-1 bg-background rounded-xl border border-border p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium">您的简历</span>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-primary/40 rounded w-full" />
            <div className="h-2 bg-primary/30 rounded w-4/5" />
            <div className="h-2 bg-muted rounded w-3/5" />
          </div>
        </div>
        <div className="flex-1 bg-background rounded-xl border border-border p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium">职位要求</span>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-primary/40 rounded w-full" />
            <div className="h-2 bg-primary/30 rounded w-3/4" />
            <div className="h-2 bg-muted rounded w-4/5" />
          </div>
        </div>
      </div>
      {/* Match indicator */}
      <div className="mt-4 bg-background rounded-lg border border-primary/30 p-3 flex items-center justify-between">
        <span className="text-sm font-medium">匹配度</span>
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
            <div className="w-4/5 h-full bg-primary rounded-full" />
          </div>
          <span className="text-sm font-bold text-primary">85%</span>
        </div>
      </div>
    </div>
    <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-primary/20 rounded-full blur-3xl" />
  </div>
);

const EvaluationVisual = () => (
  <div className="relative">
    <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 p-6 flex items-center justify-center">
      <div className="bg-background rounded-xl border border-border p-5 shadow-lg w-full">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">多维度评估</span>
        </div>
        <div className="space-y-3">
          {[
            { label: "技能匹配", value: 90, color: "bg-primary" },
            { label: "经验相关", value: 75, color: "bg-primary/80" },
            { label: "表达清晰", value: 85, color: "bg-primary/70" },
            { label: "关键词覆盖", value: 70, color: "bg-primary/60" },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-16 shrink-0">{item.label}</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${item.color} rounded-full`} 
                  style={{ width: `${item.value}%` }} 
                />
              </div>
              <span className="text-xs font-medium w-8">{item.value}%</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
          <span className="text-sm text-muted-foreground">综合评分</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-4 w-4 fill-primary text-primary" />
            ))}
            <Star className="h-4 w-4 text-muted" />
          </div>
        </div>
      </div>
    </div>
    <div className="absolute -top-4 -left-4 h-20 w-20 bg-primary/15 rounded-full blur-2xl" />
  </div>
);

const OptimizationVisual = () => (
  <div className="relative">
    <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 p-6 flex items-center justify-center">
      <div className="bg-background rounded-xl border border-border p-5 shadow-lg w-full">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">优化建议</span>
        </div>
        <div className="space-y-3">
          {[
            { status: "done", text: "添加量化成果数据" },
            { status: "done", text: "突出核心技能关键词" },
            { status: "pending", text: "优化项目描述结构" },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-2 rounded-lg bg-muted/30">
              <div className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${
                item.status === "done" ? "bg-primary/20" : "bg-muted"
              }`}>
                {item.status === "done" ? (
                  <CheckCircle className="h-3 w-3 text-primary" />
                ) : (
                  <div className="h-2 w-2 rounded-full bg-muted-foreground/50" />
                )}
              </div>
              <span className="text-xs">{item.text}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">优化进度</span>
            <span className="font-medium text-primary">2/3 完成</span>
          </div>
          <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="w-2/3 h-full bg-primary rounded-full" />
          </div>
        </div>
      </div>
    </div>
    <div className="absolute -bottom-6 -right-6 h-28 w-28 bg-primary/20 rounded-full blur-3xl" />
  </div>
);

const FeatureBlock = ({ title, highlight, description, features, imagePosition, icon, visualType }: FeatureBlockProps) => {
  const content = (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
        {icon}
        <span>{highlight}</span>
      </div>
      <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
        {title}
      </h2>
      <p className="text-muted-foreground text-lg">
        {description}
      </p>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const visual = visualType === "matching" ? <MatchingVisual /> :
                 visualType === "evaluation" ? <EvaluationVisual /> :
                 <OptimizationVisual />;

  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      {imagePosition === "left" ? (
        <>
          {visual}
          {content}
        </>
      ) : (
        <>
          {content}
          {visual}
        </>
      )}
    </div>
  );
};

const FeatureSection = () => {
  return (
    <section className="py-20 lg:py-32">
      <div className="container px-4 space-y-24 lg:space-y-32">
        <FeatureBlock
          highlight="智能分析"
          title="精准识别简历与职位的匹配度"
          description="我们的 AI 系统能够深入分析您的简历与目标职位要求，找出关键匹配点和需要改进的地方。"
          features={[
            "自动提取职位要求中的关键技能和经验",
            "智能匹配您的背景与职位需求",
            "提供详细的匹配度评分和分析报告",
          ]}
          imagePosition="right"
          icon={<Zap className="h-4 w-4" />}
          visualType="matching"
        />

        <FeatureBlock
          highlight="多维评估"
          title="全方位评估您的简历质量"
          description="从多个维度对您的简历进行专业评估，确保每一个细节都能给招聘官留下深刻印象。"
          features={[
            "技能匹配度、经验相关性、表达清晰度",
            "行业关键词覆盖率分析",
            "ATS 系统友好度检测",
          ]}
          imagePosition="left"
          icon={<BarChart3 className="h-4 w-4" />}
          visualType="evaluation"
        />

        <FeatureBlock
          highlight="专业建议"
          title="获得具体可行的优化方案"
          description="不只是告诉您问题在哪里，更提供具体的修改建议和优化示例，让您立即行动。"
          features={[
            "针对每个改进点提供具体修改建议",
            "提供优化后的示例表达",
            "帮助您突出核心竞争优势",
          ]}
          imagePosition="right"
          icon={<Shield className="h-4 w-4" />}
          visualType="optimization"
        />
      </div>
    </section>
  );
};

export default FeatureSection;
