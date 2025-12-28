import { Link } from "react-router-dom";
import { Briefcase, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    产品: [
      { label: "简历分析", href: "/" },
      { label: "模拟面试", href: "/" },
      { label: "职业规划", href: "/" },
    ],
    服务: [
      { label: "人工专家咨询", href: "/contact-expert" },
      { label: "企业服务", href: "/" },
      { label: "合作伙伴", href: "/" },
    ],
    资源: [
      { label: "使用指南", href: "/" },
      { label: "常见问题", href: "/" },
      { label: "博客", href: "/" },
    ],
    公司: [
      { label: "关于我们", href: "/" },
      { label: "联系我们", href: "/contact-expert" },
      { label: "隐私政策", href: "/" },
    ],
  };

  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container px-4 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">yourwaycareer</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              AI 驱动的职业发展平台，助您实现职业目标
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>biz@yourwaycareer.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+86 400-123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>上海</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 yourwaycareer. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              服务条款
            </Link>
            <Link to="/" className="hover:text-foreground transition-colors">
              隐私政策
            </Link>
            <Link to="/" className="hover:text-foreground transition-colors">
              Cookie 政策
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
