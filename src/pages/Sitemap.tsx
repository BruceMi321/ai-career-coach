import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBreadcrumb from '@/components/Breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Home, 
  LogIn, 
  Phone, 
  BookOpen, 
  CreditCard, 
  Users, 
  HelpCircle, 
  Map,
  ExternalLink
} from 'lucide-react';

interface SitemapItem {
  path: string;
  labelZh: string;
  labelEn: string;
  descriptionZh: string;
  descriptionEn: string;
  icon: React.ReactNode;
  category: 'main' | 'user' | 'info';
}

const sitemapItems: SitemapItem[] = [
  {
    path: '/',
    labelZh: '首页',
    labelEn: 'Home',
    descriptionZh: '了解我们的AI简历分析和面试服务',
    descriptionEn: 'Learn about our AI resume analysis and interview services',
    icon: <Home className="h-5 w-5" />,
    category: 'main'
  },
  {
    path: '/guide',
    labelZh: '使用指南',
    labelEn: 'Guide',
    descriptionZh: '学习如何使用我们的平台功能',
    descriptionEn: 'Learn how to use our platform features',
    icon: <BookOpen className="h-5 w-5" />,
    category: 'main'
  },
  {
    path: '/pricing',
    labelZh: '定价方案',
    labelEn: 'Pricing',
    descriptionZh: '查看我们的服务价格和套餐',
    descriptionEn: 'View our service pricing and packages',
    icon: <CreditCard className="h-5 w-5" />,
    category: 'main'
  },
  {
    path: '/about',
    labelZh: '关于我们',
    labelEn: 'About Us',
    descriptionZh: '了解我们的团队和使命',
    descriptionEn: 'Learn about our team and mission',
    icon: <Users className="h-5 w-5" />,
    category: 'info'
  },
  {
    path: '/help',
    labelZh: '帮助中心',
    labelEn: 'Help Center',
    descriptionZh: '获取常见问题解答和支持',
    descriptionEn: 'Get FAQs and support',
    icon: <HelpCircle className="h-5 w-5" />,
    category: 'info'
  },
  {
    path: '/contact-expert',
    labelZh: '联系专家',
    labelEn: 'Contact Expert',
    descriptionZh: '与我们的专家团队取得联系',
    descriptionEn: 'Get in touch with our expert team',
    icon: <Phone className="h-5 w-5" />,
    category: 'info'
  },
  {
    path: '/auth',
    labelZh: '登录/注册',
    labelEn: 'Login/Signup',
    descriptionZh: '登录您的账户或创建新账户',
    descriptionEn: 'Login to your account or create a new one',
    icon: <LogIn className="h-5 w-5" />,
    category: 'user'
  },
];

const Sitemap = () => {
  const { t, language } = useLanguage();

  const getLabel = (item: SitemapItem) => language === 'zh' ? item.labelZh : item.labelEn;
  const getDescription = (item: SitemapItem) => language === 'zh' ? item.descriptionZh : item.descriptionEn;

  const mainPages = sitemapItems.filter(item => item.category === 'main');
  const infoPages = sitemapItems.filter(item => item.category === 'info');
  const userPages = sitemapItems.filter(item => item.category === 'user');

  const renderSection = (title: string, items: SitemapItem[]) => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Link key={item.path} to={item.path}>
            <Card className="h-full hover:shadow-md transition-shadow hover:border-primary/50 group">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base group-hover:text-primary transition-colors">
                  {item.icon}
                  {getLabel(item)}
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{getDescription(item)}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 pt-24">
        <PageBreadcrumb />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Map className="h-8 w-8 text-primary" />
            {t('网站地图', 'Sitemap')}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t('浏览我们网站的所有页面', 'Browse all pages on our website')}
          </p>
        </div>

        <div className="space-y-8">
          {renderSection(t('主要页面', 'Main Pages'), mainPages)}
          {renderSection(t('信息页面', 'Information'), infoPages)}
          {renderSection(t('用户入口', 'User Access'), userPages)}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sitemap;
