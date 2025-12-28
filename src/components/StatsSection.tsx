import { useCountAnimation } from "@/hooks/useCountAnimation";
import { useLanguage } from "@/hooks/useLanguage";
import ScrollReveal from "./ScrollReveal";

const StatItem = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const { count, ref } = useCountAnimation({ end: value, duration: 1500 });
  
  return (
    <div ref={ref} className="text-center py-8 px-4">
      <p className="text-5xl lg:text-6xl font-serif font-medium text-primary mb-3">
        {count}<span className="text-3xl lg:text-4xl">{suffix}</span>
      </p>
      <p className="text-muted-foreground text-sm uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
};

const StatsSection = () => {
  const { t } = useLanguage();

  const stats = [
    { value: 28, suffix: "%", label: t("平均面试邀请提升率", "Interview Rate Increase") },
    { value: 30, suffix: t("秒", "s"), label: t("快速生成分析报告", "Fast Report Generation") },
    { value: 92, suffix: "%", label: t("用户推荐率", "User Recommendation") },
  ];

  return (
    <section className="py-20 lg:py-28 border-y border-border">
      <div className="container px-4">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-4">
              {t("数据见证效果", "Results That Speak")}
            </p>
            <h2 className="text-3xl lg:text-4xl font-serif font-medium mb-4">
              {t("真实的用户成果", "Real User Outcomes")}
            </h2>
            <div className="w-16 h-px bg-primary mx-auto mt-6" />
          </div>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-3 max-w-4xl mx-auto divide-y md:divide-y-0 md:divide-x divide-border">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
