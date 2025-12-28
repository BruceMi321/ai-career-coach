const StatsSection = () => {
  const stats = [
    { value: "28%", label: "平均面试邀请提升率" },
    { value: "30秒", label: "快速生成分析报告" },
    { value: "92%", label: "用户推荐率" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-primary/5">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            数据见证效果
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            通过我们的 AI 简历优化服务，用户获得了显著的求职成功率提升
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
