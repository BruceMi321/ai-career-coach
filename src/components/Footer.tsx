import { Link } from "react-router-dom";

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
    <footer className="border-t border-border bg-background">
      <div className="container px-4 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="text-xl tracking-tight">
                <span className="font-light">your</span>
                <span className="font-semibold">way</span>
                <span className="font-light text-primary">career</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              AI 驱动的职业发展平台，助您实现职业目标
            </p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>biz@yourwaycareer.com</p>
              <p>上海</p>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-medium uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-3">
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

        <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 yourwaycareer. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              服务条款
            </Link>
            <Link to="/" className="hover:text-foreground transition-colors">
              隐私政策
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
