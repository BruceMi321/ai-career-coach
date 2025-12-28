import { Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xl font-semibold">职业发展教练</span>
        </div>
        <nav className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">AI 驱动的简历优化</span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
