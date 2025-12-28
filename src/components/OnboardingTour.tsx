import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, ChevronLeft, ChevronRight, Sparkles, MessageSquare, Settings, Target, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const TOUR_STORAGE_KEY = "onboarding-tour-completed";

interface TourStep {
  target: string;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  icon: React.ElementType;
  position?: "top" | "bottom" | "left" | "right";
}

const tourSteps: TourStep[] = [
  {
    target: "",
    title: "欢迎使用 yourwaycareer",
    titleEn: "Welcome to yourwaycareer",
    content: "让我们快速了解如何使用这个 AI 职业发展助手，帮助您提升求职竞争力。",
    contentEn: "Let's take a quick tour of this AI career assistant to help boost your job search.",
    icon: Rocket,
    position: "bottom",
  },
  {
    target: '[data-tour-step="quick-access"]',
    title: "快捷入口",
    titleEn: "Quick Access",
    content: "点击这里可以直接跳转到简历分析或模拟面试功能，无需滚动页面。",
    contentEn: "Click here to jump directly to Resume Analysis or Mock Interview without scrolling.",
    icon: Target,
    position: "bottom",
  },
  {
    target: '[data-tour-step="tabs"]',
    title: "功能切换",
    titleEn: "Feature Tabs",
    content: "在这里切换简历分析和模拟面试功能。输入职位描述后，AI 将为您提供专业分析。",
    contentEn: "Switch between Resume Analysis and Mock Interview here. Enter job details and AI will provide professional analysis.",
    icon: Sparkles,
    position: "top",
  },
  {
    target: '[data-tour-step="analyze-tab"]',
    title: "简历分析",
    titleEn: "Resume Analysis",
    content: "粘贴您的简历和目标职位，获取 AI 驱动的匹配度评分和优化建议。",
    contentEn: "Paste your resume and target job to get AI-powered matching scores and optimization tips.",
    icon: Sparkles,
    position: "top",
  },
  {
    target: '[data-tour-step="interview-tab"]',
    title: "模拟面试",
    titleEn: "Mock Interview",
    content: "与 AI 进行真实面试模拟，练习回答技巧，提升面试表现。",
    contentEn: "Practice real interview scenarios with AI to improve your interview performance.",
    icon: MessageSquare,
    position: "top",
  },
  {
    target: '[data-tour-step="api-settings"]',
    title: "API 设置",
    titleEn: "API Settings",
    content: "配置您的 AI API 密钥以启用智能分析功能。支持多种服务商。",
    contentEn: "Configure your AI API key to enable intelligent analysis. Multiple providers supported.",
    icon: Settings,
    position: "bottom",
  },
];

interface OnboardingTourProps {
  externalOpen?: boolean;
  onExternalOpenChange?: (open: boolean) => void;
}

export const OnboardingTour = ({ externalOpen, onExternalOpenChange }: OnboardingTourProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const isControlled = externalOpen !== undefined;
  const open = isControlled ? externalOpen : internalOpen;
  const setOpen = isControlled ? onExternalOpenChange! : setInternalOpen;

  const updateTargetRect = useCallback(() => {
    const step = tourSteps[currentStep];
    if (step.target) {
      const element = document.querySelector(step.target);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        setTargetRect(null);
      }
    } else {
      setTargetRect(null);
    }
  }, [currentStep]);

  useEffect(() => {
    if (open) {
      updateTargetRect();
      window.addEventListener("resize", updateTargetRect);
      window.addEventListener("scroll", updateTargetRect, true);
      return () => {
        window.removeEventListener("resize", updateTargetRect);
        window.removeEventListener("scroll", updateTargetRect, true);
      };
    }
  }, [open, currentStep, updateTargetRect]);

  useEffect(() => {
    if (open) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleSkip();
        } else if (e.key === "ArrowRight" || e.key === "Enter") {
          handleNext();
        } else if (e.key === "ArrowLeft") {
          handlePrev();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, currentStep]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem(TOUR_STORAGE_KEY, "true");
    setCurrentStep(0);
    setOpen(false);
  };

  const handleComplete = () => {
    localStorage.setItem(TOUR_STORAGE_KEY, "true");
    setCurrentStep(0);
    setOpen(false);
  };

  if (!open) return null;

  const step = tourSteps[currentStep];
  const StepIcon = step.icon;

  const getCardPosition = (): React.CSSProperties => {
    if (!targetRect) {
      return {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      };
    }

    const padding = 16;
    const cardHeight = 200;
    const cardWidth = 320;

    let top = 0;
    let left = 0;

    switch (step.position) {
      case "top":
        top = targetRect.top - cardHeight - padding;
        left = targetRect.left + targetRect.width / 2 - cardWidth / 2;
        break;
      case "bottom":
      default:
        top = targetRect.bottom + padding;
        left = targetRect.left + targetRect.width / 2 - cardWidth / 2;
        break;
      case "left":
        top = targetRect.top + targetRect.height / 2 - cardHeight / 2;
        left = targetRect.left - cardWidth - padding;
        break;
      case "right":
        top = targetRect.top + targetRect.height / 2 - cardHeight / 2;
        left = targetRect.right + padding;
        break;
    }

    // Ensure card stays within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < padding) left = padding;
    if (left + cardWidth > viewportWidth - padding) left = viewportWidth - cardWidth - padding;
    if (top < padding) top = padding;
    if (top + cardHeight > viewportHeight - padding) top = viewportHeight - cardHeight - padding;

    return {
      position: "fixed",
      top: `${top}px`,
      left: `${left}px`,
    };
  };

  const overlay = (
    <div className="fixed inset-0 z-[9998]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={handleSkip} />
      
      {/* Spotlight hole for target */}
      {targetRect && (
        <div
          className="absolute border-2 border-primary rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] transition-all duration-300"
          style={{
            top: targetRect.top - 4,
            left: targetRect.left - 4,
            width: targetRect.width + 8,
            height: targetRect.height + 8,
          }}
        />
      )}

      {/* Tour Card */}
      <Card
        ref={cardRef}
        className={cn(
          "z-[9999] w-80 p-4 shadow-lg animate-scale-in",
          !targetRect && "max-w-sm"
        )}
        style={getCardPosition()}
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <StepIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-base">
                  {t(step.title, step.titleEn)}
                </h4>
                <span className="text-xs text-muted-foreground">
                  {currentStep + 1} / {tourSteps.length}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 -mr-2 -mt-1"
              onClick={handleSkip}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t(step.content, step.contentEn)}
          </p>

          {/* Progress dots */}
          <div className="flex justify-center gap-1.5">
            {tourSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentStep
                    ? "bg-primary w-4"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              {t("上一步", "Previous")}
            </Button>
            <Button size="sm" onClick={handleNext} className="gap-1">
              {currentStep === tourSteps.length - 1 ? (
                t("完成", "Finish")
              ) : (
                <>
                  {t("下一步", "Next")}
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  return createPortal(overlay, document.body);
};

export const resetOnboardingTour = () => {
  localStorage.removeItem(TOUR_STORAGE_KEY);
};

export const hasCompletedTour = () => {
  return localStorage.getItem(TOUR_STORAGE_KEY) === "true";
};

export default OnboardingTour;
