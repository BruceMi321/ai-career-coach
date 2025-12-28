import { useState, useEffect } from "react";
import { LogOut, User, ChevronDown, ArrowRight, Moon, Sun, Globe, Menu, X, Sparkles, MessageSquare, BookOpen, CreditCard, Users, HelpCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ApiSettingsDialog from "./ApiSettingsDialog";

const GUIDE_STORAGE_KEY = "header-guide-seen";

const Header = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem(GUIDE_STORAGE_KEY);
    if (!hasSeenGuide) {
      const timer = setTimeout(() => setShowGuide(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissGuide = () => {
    setShowGuide(false);
    localStorage.setItem(GUIDE_STORAGE_KEY, "true");
  };

  const scrollToFeature = (tab: "analyze" | "interview") => {
    const element = document.getElementById("resume-analyzer");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("switchResumeTab", { detail: tab }));
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: t("使用指南", "Guide"), href: "#", icon: BookOpen },
    { label: t("价格", "Pricing"), href: "#", icon: CreditCard },
  ];

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container flex h-14 items-center justify-between px-4">
        {/* Brand */}
        <Link to="/" className="flex items-center shrink-0 group">
          <span className="text-xl md:text-2xl tracking-wide font-heading">
            <span className="font-light text-muted-foreground group-hover:text-foreground transition-colors">your</span>
            <span className="font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">way</span>
            <span className="font-medium text-foreground">career</span>
          </span>
        </Link>

        {/* Desktop Navigation - Simplified */}
        <nav className="hidden lg:flex items-center gap-4 mx-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t("更多", "More")}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <Link to="#">{t("关于我们", "About")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="#">{t("帮助中心", "Help")}</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-1">
          {/* Quick Access Buttons - Compact icons with tooltips */}
          <TooltipProvider delayDuration={300}>
            <div className="hidden sm:flex items-center">
              <Popover open={showGuide} onOpenChange={setShowGuide}>
                <PopoverTrigger asChild>
                  <div className="flex items-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            scrollToFeature("analyze");
                            dismissGuide();
                          }}
                          className="h-8 w-8 px-0 text-muted-foreground hover:text-foreground"
                        >
                          <Sparkles className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>{t("简历分析", "Resume Analysis")}</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            scrollToFeature("interview");
                            dismissGuide();
                          }}
                          className="h-8 w-8 px-0 text-muted-foreground hover:text-foreground"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>{t("模拟面试", "Mock Interview")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-64 p-3" 
                  side="bottom" 
                  align="center"
                  onPointerDownOutside={dismissGuide}
                >
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      {t("✨ 快捷入口", "✨ Quick Access")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t(
                        "点击这里可以直接跳转到简历分析或模拟面试功能，无需滚动页面。",
                        "Click here to jump directly to Resume Analysis or Mock Interview without scrolling."
                      )}
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full text-xs h-7"
                      onClick={dismissGuide}
                    >
                      {t("知道了", "Got it")}
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </TooltipProvider>

          <div className="hidden sm:block w-px h-5 bg-border mx-1" />

          {/* Language Toggle - Desktop */}
          <div className="hidden sm:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 px-2 gap-1.5 text-muted-foreground">
                  <Globe className="h-3.5 w-3.5" />
                  <span className="text-xs">{language === "zh" ? "中" : "EN"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={() => setLanguage("zh")}
                  className={language === "zh" ? "bg-muted" : ""}
                >
                  中文
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage("en")}
                  className={language === "en" ? "bg-muted" : ""}
                >
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleTheme} className="h-8 w-8 px-0">
            {theme === "light" ? (
              <Moon className="h-3.5 w-3.5" />
            ) : (
              <Sun className="h-3.5 w-3.5" />
            )}
          </Button>

          <div className="hidden sm:block w-px h-5 bg-border mx-2" />

          {/* API Settings - Hidden on mobile */}
          <div className="hidden sm:block">
            <ApiSettingsDialog />
          </div>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-1.5 px-2">
                  <User className="h-3.5 w-3.5" />
                  <span className="hidden md:inline max-w-24 truncate text-xs">{user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={signOut} className="gap-2">
                  <LogOut className="h-3.5 w-3.5" />
                  {t("退出登录", "Sign Out")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  {t("登录", "Sign In")}
                </Button>
              </Link>
              <Link to="/contact-expert">
                <Button size="sm" className="h-8 text-xs gap-1.5">
                  {t("专家咨询", "Expert")}
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu - DropdownMenu */}
          <div className="lg:hidden">
            <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 px-0 ml-1"
                >
                  {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[140px] animate-fade-in">
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.label} asChild>
                    <Link 
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="#" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {t("关于我们", "About")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="#" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    {t("帮助中心", "Help")}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
