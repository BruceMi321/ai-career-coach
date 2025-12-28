import { Building2, Users, Award, Globe } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    { icon: Building2, label: "500+", desc: "企业合作" },
    { icon: Users, label: "10,000+", desc: "用户信赖" },
    { icon: Award, label: "95%", desc: "满意度" },
    { icon: Globe, label: "全球", desc: "服务覆盖" },
  ];

  return (
    <section className="py-8 border-y border-border/50 bg-card/30">
      <div className="container px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-3">
              <badge.icon className="h-5 w-5 text-muted-foreground" />
              <div className="text-center">
                <p className="font-semibold text-foreground">{badge.label}</p>
                <p className="text-xs text-muted-foreground">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
