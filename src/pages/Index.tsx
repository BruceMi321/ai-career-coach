import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import FeatureSection from "@/components/FeatureSection";
import StatsSection from "@/components/StatsSection";
import ResumeAnalyzer from "@/components/ResumeAnalyzer";
import ServicesGrid from "@/components/ServicesGrid";
import TestimonialSection from "@/components/TestimonialSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TrustBadges />
        <FeatureSection />
        <StatsSection />
        <section id="resume-analyzer" className="container px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              立即开始分析
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              输入您的简历和目标职位描述，获取专业的 AI 分析报告
            </p>
          </div>
          <ResumeAnalyzer />
        </section>
        <ServicesGrid />
        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
