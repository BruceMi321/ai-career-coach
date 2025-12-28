import { LogOut, User, ChevronDown, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ApiSettingsDialog from "./ApiSettingsDialog";

const navItems = [
  { label: "简历分析", href: "/" },
  { label: "模拟面试", href: "/" },
  { label: "使用指南", href: "#" },
  { label: "价格", href: "#" },
];

const Header = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Brand */}
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center">
            <span className="text-xl tracking-tight">
              <span className="font-light">your</span>
              <span className="font-semibold">way</span>
              <span className="font-light text-primary">career</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
              >
                {item.label}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
                  更多
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[140px]">
                <DropdownMenuItem asChild>
                  <Link to="#" className="cursor-pointer">关于我们</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="#" className="cursor-pointer">帮助中心</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          <ApiSettingsDialog />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline max-w-32 truncate">{user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={signOut} className="gap-2 cursor-pointer">
                  <LogOut className="h-4 w-4" />
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="font-normal">
                  登录
                </Button>
              </Link>
              <Link to="/contact-expert">
                <Button variant="outline" size="sm" className="gap-2">
                  寻找人工专家
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
