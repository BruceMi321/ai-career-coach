import { useState } from "react";
import { LogOut, User, ChevronDown, ArrowRight, Moon, Sun, Globe, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ApiSettingsDialog from "./ApiSettingsDialog";

const Header = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: t("简历分析", "Resume"), href: "/" },
    { label: t("模拟面试", "Interview"), href: "/" },
    { label: t("使用指南", "Guide"), href: "#" },
    { label: t("价格", "Pricing"), href: "#" },
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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 mx-8">
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

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="lg:hidden h-8 w-8 px-0 ml-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="#"
              className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("关于我们", "About")}
            </Link>
            <Link
              to="#"
              className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("帮助中心", "Help")}
            </Link>
            
            <div className="pt-4 border-t border-border mt-4 space-y-2">
              {!user && (
                <>
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full" size="sm">
                      {t("登录", "Sign In")}
                    </Button>
                  </Link>
                  <Link to="/contact-expert" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full" size="sm">
                      {t("专家咨询", "Expert Consultation")}
                    </Button>
                  </Link>
                </>
              )}
              
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-muted-foreground">{t("语言", "Language")}</span>
                <div className="flex gap-2">
                  <Button 
                    variant={language === "zh" ? "secondary" : "ghost"} 
                    size="sm" 
                    className="h-7 text-xs"
                    onClick={() => setLanguage("zh")}
                  >
                    中文
                  </Button>
                  <Button 
                    variant={language === "en" ? "secondary" : "ghost"} 
                    size="sm" 
                    className="h-7 text-xs"
                    onClick={() => setLanguage("en")}
                  >
                    EN
                  </Button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
