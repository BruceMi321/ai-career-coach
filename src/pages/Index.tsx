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
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import OnboardingTour from "@/components/OnboardingTour";
import { useLanguage } from "@/hooks/useLanguage";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Header />
      <main>
        <HeroSection />
        <TrustBadges />
        <FeatureSection />
        <StatsSection />
        <section id="resume-analyzer" className="py-20 lg:py-32 bg-muted/20">
          <div className="container px-4">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-4">
                {t("开始使用", "Get Started")}
              </p>
              <h2 className="text-3xl lg:text-4xl font-serif font-medium mb-4">
                {t("立即开始分析", "Start Your Analysis")}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                {t(
                  "输入您的简历和目标职位描述，获取专业的 AI 分析报告",
                  "Enter your resume and target job description to get a professional AI analysis report"
                )}
              </p>
              <div className="w-16 h-px bg-primary mx-auto mt-6" />
            </div>
            <ResumeAnalyzer />
          </div>
        </section>
        <ServicesGrid />
        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
      <ScrollToTop />
      <OnboardingTour autoStart />
    </div>
  );
};

export default Index;
