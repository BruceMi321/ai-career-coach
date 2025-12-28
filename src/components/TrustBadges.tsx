import { useLanguage } from "@/hooks/useLanguage";
import ScrollReveal from "@/components/ScrollReveal";

const TrustBadges = () => {
  const { t } = useLanguage();

  const badges = [
    { label: "500+", desc: t("企业合作", "Partners") },
    { label: "10,000+", desc: t("用户信赖", "Users") },
    { label: "95%", desc: t("满意度", "Satisfaction") },
    { label: t("全球", "Global"), desc: t("服务覆盖", "Coverage") },
  ];

  return (
    <section className="py-10 border-y border-border">
      <div className="container px-4">
        <ScrollReveal animation="fade-up">
          <div className="flex flex-wrap items-center justify-center divide-x divide-border">
            {badges.map((badge, index) => (
              <div key={index} className="px-8 md:px-12 text-center">
                <p className="text-2xl font-serif font-medium text-foreground">{badge.label}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{badge.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TrustBadges;
