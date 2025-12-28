const TrustBadges = () => {
  const badges = [
    { label: "500+", desc: "企业合作" },
    { label: "10,000+", desc: "用户信赖" },
    { label: "95%", desc: "满意度" },
    { label: "全球", desc: "服务覆盖" },
  ];

  return (
    <section className="py-10 border-y border-border">
      <div className="container px-4">
        <div className="flex flex-wrap items-center justify-center divide-x divide-border">
          {badges.map((badge, index) => (
            <div key={index} className="px-8 md:px-12 text-center">
              <p className="text-2xl font-serif font-medium text-foreground">{badge.label}</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
