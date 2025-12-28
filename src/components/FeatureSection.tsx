import { Check } from "lucide-react";
import { useCountAnimation } from "@/hooks/useCountAnimation";
import { useLanguage } from "@/hooks/useLanguage";
import ScrollReveal from "@/components/ScrollReveal";

interface FeatureBlockProps {
  title: string;
  highlight: string;
  description: string;
  features: string[];
  imagePosition: "left" | "right";
  visualType: "matching" | "evaluation" | "optimization";
}

const MatchingVisual = () => {
  const { count, ref } = useCountAnimation({ end: 85, duration: 1500 });
  const { t } = useLanguage();
  
  return (
    <div ref={ref} className="border-t-2 border-primary p-10 lg:p-12 bg-muted/30">
      <div className="text-6xl lg:text-7xl font-serif font-medium text-primary mb-4">
        {count}<span className="text-3xl lg:text-4xl">%</span>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        {t(
          "AI 智能分析简历与职位的匹配程度，精准定位提升方向",
          "AI analyzes resume-job match and precisely identifies improvement areas"
        )}
      </p>
    </div>
  );
};

const EvaluationVisual = () => {
  const { count, ref } = useCountAnimation({ end: 4, duration: 1000 });
  const { t } = useLanguage();
  
  return (
    <div ref={ref} className="border-t-2 border-primary p-10 lg:p-12 bg-muted/30">
      <div className="text-6xl lg:text-7xl font-serif font-medium text-primary mb-4">
        {count}<span className="text-3xl lg:text-4xl">{t("维度", "Dims")}</span>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        {t(
          "技能匹配、经验相关、表达清晰、关键词覆盖全面评估",
          "Skills, experience, clarity, and keywords - comprehensive evaluation"
        )}
      </p>
    </div>
  );
};

const OptimizationVisual = () => {
  const { count, ref } = useCountAnimation({ end: 30, duration: 1200 });
  const { t } = useLanguage();
  
  return (
    <div ref={ref} className="border-t-2 border-primary p-10 lg:p-12 bg-muted/30">
      <div className="text-6xl lg:text-7xl font-serif font-medium text-primary mb-4">
        {count}<span className="text-3xl lg:text-4xl">{t("秒", "sec")}</span>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        {t(
          "快速生成专业优化建议，立即获得可行的改进方案",
          "Generate professional optimization suggestions instantly"
        )}
      </p>
    </div>
  );
};

const FeatureBlock = ({ title, highlight, description, features, imagePosition, visualType }: FeatureBlockProps) => {
  const content = (
    <ScrollReveal animation={imagePosition === "left" ? "fade-right" : "fade-left"}>
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.15em] text-primary font-medium">
          {highlight}
        </p>
        <h2 className="text-3xl lg:text-4xl font-serif font-medium leading-tight">
          {title}
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {description}
        </p>
        <ul className="space-y-4 pt-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="h-5 w-5 rounded-full border border-primary flex items-center justify-center shrink-0 mt-0.5">
                <Check className="h-3 w-3 text-primary" />
              </div>
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  );

  const visual = (
    <ScrollReveal animation={imagePosition === "left" ? "fade-left" : "fade-right"}>
      {visualType === "matching" ? <MatchingVisual /> :
       visualType === "evaluation" ? <EvaluationVisual /> :
       <OptimizationVisual />}
    </ScrollReveal>
  );

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
  const { t } = useLanguage();

  return (
    <section className="py-20 lg:py-32">
      <div className="container px-4 space-y-24 lg:space-y-32">
        <FeatureBlock
          highlight={t("智能分析", "Smart Analysis")}
          title={t("精准识别简历与职位的匹配度", "Precisely Identify Resume-Job Match")}
          description={t(
            "我们的 AI 系统能够深入分析您的简历与目标职位要求，找出关键匹配点和需要改进的地方。",
            "Our AI system deeply analyzes your resume against target job requirements, identifying key matches and areas for improvement."
          )}
          features={[
            t("自动提取职位要求中的关键技能和经验", "Auto-extract key skills and experience from job requirements"),
            t("智能匹配您的背景与职位需求", "Intelligently match your background with job needs"),
            t("提供详细的匹配度评分和分析报告", "Provide detailed match scores and analysis reports"),
          ]}
          imagePosition="right"
          visualType="matching"
        />

        <FeatureBlock
          highlight={t("多维评估", "Multi-Dimensional")}
          title={t("全方位评估您的简历质量", "Comprehensive Resume Quality Assessment")}
          description={t(
            "从多个维度对您的简历进行专业评估，确保每一个细节都能给招聘官留下深刻印象。",
            "Professionally evaluate your resume from multiple dimensions, ensuring every detail impresses recruiters."
          )}
          features={[
            t("技能匹配度、经验相关性、表达清晰度", "Skills match, experience relevance, clarity of expression"),
            t("行业关键词覆盖率分析", "Industry keyword coverage analysis"),
            t("ATS 系统友好度检测", "ATS system compatibility check"),
          ]}
          imagePosition="left"
          visualType="evaluation"
        />

        <FeatureBlock
          highlight={t("专业建议", "Expert Advice")}
          title={t("获得具体可行的优化方案", "Get Actionable Optimization Plans")}
          description={t(
            "不只是告诉您问题在哪里，更提供具体的修改建议和优化示例，让您立即行动。",
            "Not just identifying issues, but providing specific suggestions and optimization examples for immediate action."
          )}
          features={[
            t("针对每个改进点提供具体修改建议", "Specific modification suggestions for each improvement"),
            t("提供优化后的示例表达", "Optimized example expressions provided"),
            t("帮助您突出核心竞争优势", "Help highlight your core competitive advantages"),
          ]}
          imagePosition="right"
          visualType="optimization"
        />
      </div>
    </section>
  );
};

export default FeatureSection;
