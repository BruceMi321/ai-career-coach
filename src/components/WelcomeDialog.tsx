import { useState, useEffect } from "react";
import { Sparkles, MessageSquare, FileText, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const WELCOME_STORAGE_KEY = "welcome-dialog-seen";

const WelcomeDialog = () => {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem(WELCOME_STORAGE_KEY);
    if (!hasSeenWelcome) {
      // Delay slightly to let the page load first
      const timer = setTimeout(() => setOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem(WELCOME_STORAGE_KEY, "true");
  };

  const handleGetStarted = () => {
    handleClose();
    // Scroll to the resume analyzer section
    const element = document.getElementById("resume-analyzer");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: Sparkles,
      title: t("智能简历分析", "Smart Resume Analysis"),
      description: t(
        "AI 驱动的简历评分和优化建议，帮助你脱颖而出",
        "AI-powered resume scoring and optimization tips to help you stand out"
      ),
    },
    {
      icon: MessageSquare,
      title: t("模拟面试", "Mock Interview"),
      description: t(
        "与 AI 进行真实面试模拟，提升面试表现",
        "Practice real interview scenarios with AI to improve your performance"
      ),
    },
    {
      icon: FileText,
      title: t("职位匹配", "Job Matching"),
      description: t(
        "根据目标职位分析简历匹配度，精准优化",
        "Analyze resume fit based on target positions for precise optimization"
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl">
            {t("欢迎来到 yourwaycareer", "Welcome to yourwaycareer")} 👋
          </DialogTitle>
          <DialogDescription className="text-center">
            {t(
              "AI 驱动的职业发展助手，助你开启理想职业之路",
              "AI-powered career assistant to help you achieve your dream career"
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <feature.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium">{feature.title}</h4>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={handleGetStarted} className="w-full gap-2">
            {t("开始使用", "Get Started")}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" onClick={handleClose} className="w-full text-muted-foreground">
            {t("稍后探索", "Explore Later")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeDialog;
