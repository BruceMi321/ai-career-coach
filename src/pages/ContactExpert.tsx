import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { Loader2, ArrowLeft } from "lucide-react";
import { z } from "zod";

const ContactExpert = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  const formSchema = z.object({
    name: z.string().trim().min(1, t("请输入名字", "Please enter your first name")),
    surname: z.string().trim().min(1, t("请输入姓氏", "Please enter your last name")),
    company: z.string().optional(),
    email: z.string().trim().email(t("请输入有效的邮箱地址", "Please enter a valid email")),
    phone: z.string().trim().min(1, t("请输入电话号码", "Please enter your phone number")),
    helpMessage: z.string().trim().min(1, t("请描述您需要的帮助", "Please describe how we can help")),
    hearAboutUs: z.string().min(1, t("请选择您是如何了解我们的", "Please select how you heard about us")),
  });

  type FormData = z.infer<typeof formSchema>;

  const hearAboutUsOptions = [
    { value: "search", label: t("搜索引擎", "Search Engine") },
    { value: "social", label: t("社交媒体", "Social Media") },
    { value: "friend", label: t("朋友推荐", "Friend Referral") },
    { value: "advertisement", label: t("广告", "Advertisement") },
    { value: "other", label: t("其他", "Other") },
  ];

  const [formData, setFormData] = useState<FormData>({
    name: "",
    surname: "",
    company: "",
    email: "",
    phone: "",
    helpMessage: "",
    hearAboutUs: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = formSchema.safeParse(formData);
    if (!result.success) {
      toast({
        title: t("表单错误", "Form Error"),
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: t("提交成功", "Submitted Successfully"),
      description: t("我们的专家将尽快与您联系！", "Our expert will contact you soon!"),
    });

    setIsLoading(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-lg mb-4">
        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t("返回主页", "Back to Home")}
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-lg border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <span className="text-xl font-bold tracking-tight">
              <span className="font-light">your</span>
              <span className="font-bold italic">way</span>
              <span className="font-light">career</span>
            </span>
          </div>
          <CardTitle className="text-2xl">{t("联系职业专家", "Contact an Expert")}</CardTitle>
          <CardDescription>{t("填写表单，我们的专家将尽快与您联系", "Fill out the form and our expert will contact you soon")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  {t("名字", "First Name")} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder={t("请输入名字", "Enter first name")}
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">
                  {t("姓氏", "Last Name")} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="surname"
                  placeholder={t("请输入姓氏", "Enter last name")}
                  value={formData.surname}
                  onChange={(e) => handleChange("surname", e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">{t("公司", "Company")}</Label>
              <Input
                id="company"
                placeholder={t("请输入公司名称（选填）", "Enter company name (optional)")}
                value={formData.company}
                onChange={(e) => handleChange("company", e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                {t("邮箱", "Email")} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                {t("电话号码", "Phone Number")} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder={t("请输入电话号码", "Enter phone number")}
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="helpMessage">
                {t("我们如何帮助您？", "How can we help you?")} <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="helpMessage"
                placeholder={t("请描述您需要的帮助...", "Describe how we can help...")}
                value={formData.helpMessage}
                onChange={(e) => handleChange("helpMessage", e.target.value)}
                disabled={isLoading}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hearAboutUs">
                {t("您是如何了解我们的？", "How did you hear about us?")} <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.hearAboutUs}
                onValueChange={(value) => handleChange("hearAboutUs", value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("请选择", "Please select")} />
                </SelectTrigger>
                <SelectContent>
                  {hearAboutUsOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("提交中...", "Submitting...")}
                </>
              ) : (
                t("提交", "Submit")
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactExpert;
