import { useState, useEffect } from "react";
import { Sparkles, MessageSquare, FileText, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const WELCOME_STORAGE_KEY = "welcome-dialog-seen";
const WELCOME_NEVER_SHOW_KEY = "welcome-dialog-never-show";

interface WelcomeDialogProps {
  externalOpen?: boolean;
  onExternalOpenChange?: (open: boolean) => void;
}

const WelcomeDialog = ({ externalOpen, onExternalOpenChange }: WelcomeDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [neverShow, setNeverShow] = useState(false);
  const { t } = useLanguage();

  // Determine if dialog is controlled externally
  const isControlled = externalOpen !== undefined;
  const open = isControlled ? externalOpen : internalOpen;
  const setOpen = isControlled ? onExternalOpenChange! : setInternalOpen;

  useEffect(() => {
    // Only auto-show on first visit if not controlled externally
    if (!isControlled) {
      const hasSeenWelcome = localStorage.getItem(WELCOME_STORAGE_KEY);
      const neverShowAgain = localStorage.getItem(WELCOME_NEVER_SHOW_KEY);
      
      if (!hasSeenWelcome && !neverShowAgain) {
        const timer = setTimeout(() => setInternalOpen(true), 500);
        return () => clearTimeout(timer);
      }
    }
  }, [isControlled]);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem(WELCOME_STORAGE_KEY, "true");
    
    if (neverShow) {
      localStorage.setItem(WELCOME_NEVER_SHOW_KEY, "true");
    }
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

        {/* Don't show again checkbox - only show if not triggered from menu */}
        {!isControlled && (
          <div className="flex items-center space-x-2 py-2">
            <Checkbox
              id="never-show"
              checked={neverShow}
              onCheckedChange={(checked) => setNeverShow(checked as boolean)}
            />
            <label
              htmlFor="never-show"
              className="text-xs text-muted-foreground cursor-pointer"
            >
              {t("不再显示此引导", "Don't show this guide again")}
            </label>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Button onClick={handleGetStarted} className="w-full gap-2">
            {t("开始使用", "Get Started")}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              handleClose();
              // Trigger the onboarding tour after closing
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent("startOnboardingTour"));
              }, 300);
            }} 
            className="w-full"
          >
            {t("查看功能导览", "Take Feature Tour")}
          </Button>
          <Button variant="ghost" onClick={handleClose} className="w-full text-muted-foreground">
            {t("稍后探索", "Explore Later")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Export function to reset welcome dialog (for settings)
export const resetWelcomeDialog = () => {
  localStorage.removeItem(WELCOME_STORAGE_KEY);
  localStorage.removeItem(WELCOME_NEVER_SHOW_KEY);
};

export default WelcomeDialog;
