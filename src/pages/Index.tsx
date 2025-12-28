import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ResumeAnalyzer from "@/components/ResumeAnalyzer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <section className="container px-4 pb-20">
          <ResumeAnalyzer />
        </section>
      </main>
      <footer className="border-t border-border/50 py-8">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 职业发展教练 · AI 驱动的简历优化工具</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
