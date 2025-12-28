import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-bold text-primary">404</h1>
        <div className="space-y-2">
          <p className="text-2xl font-medium text-foreground">
            {t("页面未找到", "Page Not Found")}
          </p>
          <p className="text-muted-foreground max-w-md">
            {t(
              "抱歉，您访问的页面不存在或已被移除。",
              "Sorry, the page you are looking for does not exist or has been removed."
            )}
          </p>
        </div>
        <Link to="/">
          <Button className="gap-2">
            <Home className="h-4 w-4" />
            {t("返回主页", "Back to Home")}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
