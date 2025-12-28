import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft } from "lucide-react";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().trim().min(1, "请输入名字"),
  surname: z.string().trim().min(1, "请输入姓氏"),
  company: z.string().optional(),
  email: z.string().trim().email("请输入有效的邮箱地址"),
  phone: z.string().trim().min(1, "请输入电话号码"),
  helpMessage: z.string().trim().min(1, "请描述您需要的帮助"),
  hearAboutUs: z.string().min(1, "请选择您是如何了解我们的"),
});

type FormData = z.infer<typeof formSchema>;

const hearAboutUsOptions = [
  { value: "search", label: "搜索引擎" },
  { value: "social", label: "社交媒体" },
  { value: "friend", label: "朋友推荐" },
  { value: "advertisement", label: "广告" },
  { value: "other", label: "其他" },
];

const ContactExpert = () => {
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
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = formSchema.safeParse(formData);
    if (!result.success) {
      toast({
        title: "表单错误",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "提交成功",
      description: "我们的专家将尽快与您联系！",
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
            返回主页
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
          <CardTitle className="text-2xl">联系职业专家</CardTitle>
          <CardDescription>填写表单，我们的专家将尽快与您联系</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  名字 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="请输入名字"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">
                  姓氏 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="surname"
                  placeholder="请输入姓氏"
                  value={formData.surname}
                  onChange={(e) => handleChange("surname", e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">公司</Label>
              <Input
                id="company"
                placeholder="请输入公司名称（选填）"
                value={formData.company}
                onChange={(e) => handleChange("company", e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                邮箱 <span className="text-destructive">*</span>
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
                电话号码 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="请输入电话号码"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="helpMessage">
                我们如何帮助您？ <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="helpMessage"
                placeholder="请描述您需要的帮助..."
                value={formData.helpMessage}
                onChange={(e) => handleChange("helpMessage", e.target.value)}
                disabled={isLoading}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hearAboutUs">
                您是如何了解我们的？ <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.hearAboutUs}
                onValueChange={(value) => handleChange("hearAboutUs", value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择" />
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
                  提交中...
                </>
              ) : (
                "提交"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactExpert;