import { CheckCircle, Zap, Shield, BarChart3 } from "lucide-react";
import { useCountAnimation } from "@/hooks/useCountAnimation";

interface FeatureBlockProps {
  title: string;
  highlight: string;
  description: string;
  features: string[];
  imagePosition: "left" | "right";
  icon: React.ReactNode;
  visualType: "matching" | "evaluation" | "optimization";
}

const DotGrid = () => (
  <div className="absolute inset-0 opacity-30">
    <div 
      className="h-full w-full"
      style={{
        backgroundImage: 'radial-gradient(circle, hsl(var(--muted-foreground)) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
    />
  </div>
);

const MatchingVisual = () => {
  const { count, ref } = useCountAnimation({ end: 85, duration: 1500 });
  
  return (
    <div ref={ref} className="relative rounded-2xl border border-border bg-card overflow-hidden">
      <DotGrid />
      <div className="relative p-8 lg:p-10 flex flex-col items-center justify-center min-h-[280px]">
        <div className="text-6xl lg:text-7xl font-light text-primary">
          {count}<span className="text-3xl lg:text-4xl">%</span>
        </div>
        <p className="mt-4 text-muted-foreground text-center max-w-xs">
          AI 智能分析简历与职位的匹配程度，精准定位提升方向
        </p>
      </div>
    </div>
  );
};

const EvaluationVisual = () => {
  const { count, ref } = useCountAnimation({ end: 4, duration: 1000 });
  
  return (
    <div ref={ref} className="relative rounded-2xl border border-border bg-card overflow-hidden">
      <DotGrid />
      <div className="relative p-8 lg:p-10 flex flex-col items-center justify-center min-h-[280px]">
        <div className="text-6xl lg:text-7xl font-light text-primary">
          {count}<span className="text-3xl lg:text-4xl">维度</span>
        </div>
        <p className="mt-4 text-muted-foreground text-center max-w-xs">
          技能匹配、经验相关、表达清晰、关键词覆盖全面评估
        </p>
      </div>
    </div>
  );
};

const OptimizationVisual = () => {
  const { count, ref } = useCountAnimation({ end: 30, duration: 1200 });
  
  return (
    <div ref={ref} className="relative rounded-2xl border border-border bg-card overflow-hidden">
      <DotGrid />
      <div className="relative p-8 lg:p-10 flex flex-col items-center justify-center min-h-[280px]">
        <div className="text-6xl lg:text-7xl font-light text-primary">
          {count}<span className="text-3xl lg:text-4xl">秒</span>
        </div>
        <p className="mt-4 text-muted-foreground text-center max-w-xs">
          快速生成专业优化建议，立即获得可行的改进方案
        </p>
      </div>
    </div>
  );
};

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
