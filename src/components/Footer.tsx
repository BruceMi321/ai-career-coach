import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

const Footer = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  (props, ref) => {
    const { t } = useLanguage();

    const footerLinks = {
      [t("产品", "Products")]: [
        { label: t("简历分析", "Resume Analysis"), href: "/" },
        { label: t("模拟面试", "Mock Interview"), href: "/" },
        { label: t("职业规划", "Career Planning"), href: "/" },
      ],
      [t("服务", "Services")]: [
        { label: t("专家咨询", "Expert Consultation"), href: "/contact-expert" },
        { label: t("企业服务", "Enterprise"), href: "/" },
        { label: t("合作伙伴", "Partners"), href: "/" },
      ],
      [t("资源", "Resources")]: [
        { label: t("使用指南", "Guide"), href: "/" },
        { label: t("常见问题", "FAQ"), href: "/" },
        { label: t("博客", "Blog"), href: "/" },
      ],
      [t("公司", "Company")]: [
        { label: t("关于我们", "About"), href: "/" },
        { label: t("联系我们", "Contact"), href: "/contact-expert" },
        { label: t("隐私政策", "Privacy"), href: "/" },
      ],
    };

    return (
      <footer ref={ref} className="border-t border-border bg-background" {...props}>
        <div className="container px-4 py-12 lg:py-16">
          {/* Mobile: Stacked layout */}
          <div className="lg:hidden space-y-10">
            {/* Brand - Mobile */}
            <div className="text-center pb-8 border-b border-border">
              <Link to="/" className="inline-block mb-4 group">
                <span className="text-2xl tracking-wide font-heading">
                  <span className="font-light text-muted-foreground group-hover:text-foreground transition-colors">your</span>
                  <span className="font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">way</span>
                  <span className="font-medium text-foreground">career</span>
                </span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {t("AI 驱动的职业发展平台", "AI-powered career development platform")}
              </p>
            </div>

            {/* Links Grid - Mobile */}
            <div className="grid grid-cols-2 gap-8">
              {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title}>
                  <h4 className="text-xs font-medium uppercase tracking-wider text-foreground mb-3">{title}</h4>
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

            {/* Contact - Mobile */}
            <div className="text-center pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">biz@yourwaycareer.com</p>
              <p className="text-sm text-muted-foreground">{t("上海", "Shanghai")}</p>
            </div>
          </div>

          {/* Desktop: Original layout */}
          <div className="hidden lg:grid grid-cols-5 gap-12">
            {/* Brand */}
            <div>
              <Link to="/" className="inline-block mb-6 group">
                <span className="text-2xl tracking-wide font-heading">
                  <span className="font-light text-muted-foreground group-hover:text-foreground transition-colors">your</span>
                  <span className="font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">way</span>
                  <span className="font-medium text-foreground">career</span>
                </span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {t("AI 驱动的职业发展平台，助您实现职业目标", "AI-powered career platform to achieve your goals")}
              </p>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>biz@yourwaycareer.com</p>
                <p>{t("上海", "Shanghai")}</p>
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

          {/* Bottom bar */}
          <div className="border-t border-border mt-10 lg:mt-16 pt-6 lg:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground order-2 sm:order-1">
              © 2026 yourwaycareer. {t("保留所有权利", "All rights reserved")}.
            </p>
            <div className="flex gap-6 text-xs text-muted-foreground order-1 sm:order-2">
              <Link to="/" className="hover:text-foreground transition-colors">
                {t("服务条款", "Terms")}
              </Link>
              <Link to="/" className="hover:text-foreground transition-colors">
                {t("隐私政策", "Privacy")}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = "Footer";

export default Footer;
