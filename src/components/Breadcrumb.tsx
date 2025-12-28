import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface RouteConfig {
  path: string;
  labelZh: string;
  labelEn: string;
}

const routeConfigs: RouteConfig[] = [
  { path: '/', labelZh: '首页', labelEn: 'Home' },
  { path: '/auth', labelZh: '登录/注册', labelEn: 'Login/Signup' },
  { path: '/contact-expert', labelZh: '联系专家', labelEn: 'Contact Expert' },
  { path: '/guide', labelZh: '使用指南', labelEn: 'Guide' },
  { path: '/pricing', labelZh: '定价方案', labelEn: 'Pricing' },
  { path: '/about', labelZh: '关于我们', labelEn: 'About Us' },
  { path: '/help', labelZh: '帮助中心', labelEn: 'Help Center' },
  { path: '/admin', labelZh: '管理后台', labelEn: 'Admin' },
  { path: '/sitemap', labelZh: '网站地图', labelEn: 'Sitemap' },
];

const PageBreadcrumb = () => {
  const location = useLocation();
  const { language } = useLanguage();
  
  // Don't show breadcrumb on home page
  if (location.pathname === '/') {
    return null;
  }

  const currentRoute = routeConfigs.find(route => route.path === location.pathname);
  
  if (!currentRoute) {
    return null;
  }

  const getLabel = (route: RouteConfig) => {
    return language === 'zh' ? route.labelZh : route.labelEn;
  };

  const homeRoute = routeConfigs.find(route => route.path === '/');

  return (
    <BreadcrumbRoot className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <Home className="h-4 w-4" />
              <span>{homeRoute ? getLabel(homeRoute) : 'Home'}</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="text-foreground font-medium">
            {getLabel(currentRoute)}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
};

export default PageBreadcrumb;
export { routeConfigs };
