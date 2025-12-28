import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, ChevronLeft, ChevronRight, Sparkles, MessageSquare, Settings, Target, Rocket, Trophy, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const TOUR_STORAGE_KEY = "onboarding-tour-completed";
const FIRST_VISIT_KEY = "first-visit-handled";

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

// Confetti component for celebration
const Confetti = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    color: ['hsl(var(--primary))', 'hsl(var(--accent))', '#FFD700', '#FF6B6B', '#4ECDC4'][Math.floor(Math.random() * 5)],
    size: 6 + Math.random() * 8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000] overflow-hidden">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti"
          style={{
            left: `${piece.left}%`,
            top: '-20px',
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

// Celebration modal
const CelebrationModal = ({ onClose }: { onClose: () => void }) => {
  const { t } = useLanguage();
  const [showConfetti, setShowConfetti] = useState(true);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      <Card className="relative z-10 w-80 p-6 text-center animate-celebration-bounce shadow-2xl">
        <div className="space-y-4">
          <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-pulse-glow">
            <Trophy className="h-10 w-10 text-primary animate-bounce-slow" />
            <PartyPopper className="absolute -top-2 -right-2 h-6 w-6 text-accent animate-wiggle" />
          </div>
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("恭喜完成导览！", "Tour Complete!")}
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              {t(
                "您已了解所有核心功能，现在开始提升您的求职竞争力吧！",
                "You've learned all core features. Start boosting your job search now!"
              )}
            </p>
          </div>
          <Button onClick={onClose} className="w-full gap-2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Sparkles className="h-4 w-4" />
            {t("开始使用", "Get Started")}
          </Button>
        </div>
      </Card>
    </div>
  );
};

interface OnboardingTourProps {
  externalOpen?: boolean;
  onExternalOpenChange?: (open: boolean) => void;
  autoStart?: boolean;
}

export const OnboardingTour = ({ externalOpen, onExternalOpenChange, autoStart = false }: OnboardingTourProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [stepKey, setStepKey] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { toast } = useToast();

  const isControlled = externalOpen !== undefined;
  const open = isControlled ? externalOpen : internalOpen;
  const setOpen = isControlled ? onExternalOpenChange! : setInternalOpen;

  // Auto-start tour for first-time visitors
  useEffect(() => {
    if (autoStart && !isControlled) {
      const hasCompletedTour = localStorage.getItem(TOUR_STORAGE_KEY);
      const firstVisitHandled = localStorage.getItem(FIRST_VISIT_KEY);
      
      if (!hasCompletedTour && !firstVisitHandled) {
        localStorage.setItem(FIRST_VISIT_KEY, "true");
        const timer = setTimeout(() => setInternalOpen(true), 800);
        return () => clearTimeout(timer);
      }
    }
  }, [autoStart, isControlled]);

  // Step A: updateTargetRect 只做测量，不滚动
  const updateTargetRect = useCallback(() => {
    const step = tourSteps[currentStep];
    if (step.target) {
      const element = document.querySelector(step.target);
      if (element) {
        const rect = element.getBoundingClientRect();
        // 只有当 rect 有显著变化时才更新 state，减少不必要的重渲染
        setTargetRect((prev) => {
          if (!prev) return rect;
          const changed =
            Math.abs(prev.top - rect.top) > 1 ||
            Math.abs(prev.left - rect.left) > 1 ||
            Math.abs(prev.width - rect.width) > 1 ||
            Math.abs(prev.height - rect.height) > 1;
          return changed ? rect : prev;
        });
      } else {
        setTargetRect(null);
      }
    } else {
      setTargetRect(null);
    }
  }, [currentStep]);

  // Step B: 仅在步骤切换时执行一次滚动
  useEffect(() => {
    if (!open) return;

    const step = tourSteps[currentStep];
    if (!step.target) return;

    const element = document.querySelector(step.target);
    if (!element) return;

    // 检查是否是 Header 内的元素或固定/粘性元素
    const isInHeader = element.closest('header') !== null;
    const computedStyle = getComputedStyle(element);
    const isFixedOrSticky = computedStyle.position === 'fixed' || computedStyle.position === 'sticky';

    // Header 内的元素或固定/粘性元素不需要滚动，它们本来就在视口内
    if (isInHeader || isFixedOrSticky) {
      return;
    }

    // 非 Header 元素：滚动到视图，使用 auto 避免动画叠加导致抖动
    element.scrollIntoView({ behavior: "auto", block: "center" });
  }, [open, currentStep]);

  // Step C: 使用 rAF 优化 scroll/resize 事件处理
  useEffect(() => {
    if (!open) return;

    let rafId: number | null = null;

    const handleUpdate = () => {
      if (rafId) return; // 如果已经有 pending 的 rAF，跳过
      rafId = requestAnimationFrame(() => {
        updateTargetRect();
        rafId = null;
      });
    };

    // 初始测量
    updateTargetRect();

    window.addEventListener("resize", handleUpdate);
    window.addEventListener("scroll", handleUpdate, true);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleUpdate);
      window.removeEventListener("scroll", handleUpdate, true);
    };
  }, [open, currentStep, updateTargetRect]);

  // Elevate target element z-index during tour
  useEffect(() => {
    if (open && targetRect) {
      const step = tourSteps[currentStep];
      if (step.target) {
        const element = document.querySelector(step.target) as HTMLElement;
        if (element) {
          const originalZIndex = element.style.zIndex;
          const originalPointerEvents = element.style.pointerEvents;
          
          // 获取计算后的 position，只有当元素是 static 时才需要设置 relative
          // 否则保持原有的定位方式，避免布局重排导致页面抖动
          const computedStyle = getComputedStyle(element);
          const computedPosition = computedStyle.position;
          const originalPosition = element.style.position;
          
          if (computedPosition === 'static') {
            element.style.position = 'relative';
          }
          
          element.style.zIndex = '10000';
          element.style.pointerEvents = 'auto';
          
          return () => {
            if (computedPosition === 'static') {
              element.style.position = originalPosition;
            }
            element.style.zIndex = originalZIndex;
            element.style.pointerEvents = originalPointerEvents;
          };
        }
      }
    }
  }, [open, currentStep, targetRect]);

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
      setStepKey(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setStepKey(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem(TOUR_STORAGE_KEY, "true");
    setCurrentStep(0);
    setOpen(false);
    toast({
      title: t("已跳过导览", "Tour Skipped"),
      description: t("您可以在菜单中随时重新查看", "You can restart it from the menu anytime"),
    });
  };

  const handleComplete = () => {
    localStorage.setItem(TOUR_STORAGE_KEY, "true");
    setCurrentStep(0);
    setOpen(false);
    setShowCelebration(true);
  };

  const handleCelebrationClose = () => {
    setShowCelebration(false);
    // Scroll to resume analyzer section
    const element = document.getElementById("resume-analyzer");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (showCelebration) {
    return createPortal(<CelebrationModal onClose={handleCelebrationClose} />, document.body);
  }

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
    const cardHeight = 220;
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

  const spotPadding = 8;

  const overlay = (
    <div className="fixed inset-0 z-[9998] pointer-events-none">
      {/* 4-block overlay with hole for target */}
      {targetRect ? (
        <>
          {/* Top overlay */}
          <div 
            className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm pointer-events-auto"
            style={{ height: Math.max(0, targetRect.top - spotPadding) }}
            onClick={handleSkip}
          />
          {/* Bottom overlay */}
          <div 
            className="fixed left-0 right-0 bottom-0 bg-background/80 backdrop-blur-sm pointer-events-auto"
            style={{ top: targetRect.bottom + spotPadding }}
            onClick={handleSkip}
          />
          {/* Left overlay */}
          <div 
            className="fixed left-0 bg-background/80 backdrop-blur-sm pointer-events-auto"
            style={{ 
              top: targetRect.top - spotPadding,
              width: Math.max(0, targetRect.left - spotPadding),
              height: targetRect.height + spotPadding * 2
            }}
            onClick={handleSkip}
          />
          {/* Right overlay */}
          <div 
            className="fixed right-0 bg-background/80 backdrop-blur-sm pointer-events-auto"
            style={{ 
              top: targetRect.top - spotPadding,
              left: targetRect.right + spotPadding,
              height: targetRect.height + spotPadding * 2
            }}
            onClick={handleSkip}
          />
          
          {/* Spotlight border and glow */}
          <div
            className="fixed rounded-lg border-2 border-primary animate-spotlight-pulse pointer-events-none"
            style={{
              top: targetRect.top - spotPadding,
              left: targetRect.left - spotPadding,
              width: targetRect.width + spotPadding * 2,
              height: targetRect.height + spotPadding * 2,
              boxShadow: '0 0 0 4px hsl(var(--primary) / 0.3), 0 0 30px 10px hsl(var(--primary) / 0.2)',
            }}
          />
          {/* Inner shimmer highlight */}
          <div
            className="fixed rounded-lg bg-primary/5 pointer-events-none animate-highlight-shimmer"
            style={{
              top: targetRect.top,
              left: targetRect.left,
              width: targetRect.width,
              height: targetRect.height,
            }}
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm pointer-events-auto" onClick={handleSkip} />
      )}

      {/* Tour Card */}
      <Card
        ref={cardRef}
        key={stepKey}
        className={cn(
          "z-[9999] w-80 p-4 shadow-2xl border-primary/20 animate-card-enter pointer-events-auto",
          !targetRect && "max-w-sm"
        )}
        style={getCardPosition()}
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center animate-icon-bounce">
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
              className="h-8 w-8 -mr-2 -mt-1 hover:bg-destructive/10 hover:text-destructive"
              onClick={handleSkip}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <p className="text-sm text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {t(step.content, step.contentEn)}
          </p>

          {/* Progress bar */}
          <div className="relative h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
            />
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-1.5">
            {tourSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentStep(index);
                  setStepKey(prev => prev + 1);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentStep
                    ? "bg-primary w-6 shadow-[0_0_8px_2px_hsl(var(--primary)/0.4)]"
                    : index < currentStep
                    ? "bg-primary/50"
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
            <Button size="sm" onClick={handleNext} className="gap-1 min-w-[100px]">
              {currentStep === tourSteps.length - 1 ? (
                <>
                  <Trophy className="h-4 w-4" />
                  {t("完成", "Finish")}
                </>
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
  localStorage.removeItem(FIRST_VISIT_KEY);
};

export const hasCompletedTour = () => {
  return localStorage.getItem(TOUR_STORAGE_KEY) === "true";
};

export default OnboardingTour;
