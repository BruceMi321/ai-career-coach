import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { user, signUp, signIn, signInWithGoogle, resetPassword } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const authSchema = z.object({
    email: z.string().email(t("请输入有效的邮箱地址", "Please enter a valid email")),
    password: z.string().min(6, t("密码至少6个字符", "Password must be at least 6 characters")),
  });

  const emailSchema = z.string().email(t("请输入有效的邮箱地址", "Please enter a valid email"));

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (searchParams.get("reset") === "true") {
      toast({
        title: t("密码重置", "Password Reset"),
        description: t("请在邮件中点击链接重置密码", "Please click the link in your email to reset password"),
      });
    }
  }, [searchParams, toast, t]);

  const handleAuth = async (type: "login" | "signup") => {
    const result = authSchema.safeParse({ email, password });
    if (!result.success) {
      toast({
        title: t("输入错误", "Input Error"),
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = type === "login" 
        ? await signIn(email, password)
        : await signUp(email, password);

      if (error) {
        let message = error.message;
        if (error.message.includes("User already registered")) {
          message = t("该邮箱已注册，请直接登录", "Email already registered, please sign in");
        } else if (error.message.includes("Invalid login credentials")) {
          message = t("邮箱或密码错误", "Invalid email or password");
        }
        toast({
          title: type === "login" ? t("登录失败", "Login Failed") : t("注册失败", "Registration Failed"),
          description: message,
          variant: "destructive",
        });
      } else {
        toast({
          title: type === "login" ? t("登录成功", "Login Successful") : t("注册成功", "Registration Successful"),
          description: type === "login" ? t("欢迎回来！", "Welcome back!") : t("账号创建成功，欢迎使用！", "Account created successfully!"),
        });
        navigate("/");
      }
    } catch (err) {
      toast({
        title: t("错误", "Error"),
        description: t("操作失败，请稍后重试", "Operation failed, please try again"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast({
          title: t("登录失败", "Login Failed"),
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: t("错误", "Error"),
        description: t("Google 登录失败，请稍后重试", "Google login failed, please try again"),
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast({
        title: t("输入错误", "Input Error"),
        description: t("请输入有效的邮箱地址", "Please enter a valid email"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await resetPassword(email);
      if (error) {
        toast({
          title: t("发送失败", "Send Failed"),
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: t("邮件已发送", "Email Sent"),
          description: t("请查看您的邮箱，点击链接重置密码", "Check your inbox and click the link to reset password"),
        });
        setShowForgotPassword(false);
      }
    } catch (err) {
      toast({
        title: t("错误", "Error"),
        description: t("操作失败，请稍后重试", "Operation failed, please try again"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md mb-4">
        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t("返回主页", "Back to Home")}
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-md border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <span className="text-xl font-bold tracking-tight">
              <span className="font-light">your</span>
              <span className="font-bold italic">way</span>
              <span className="font-light">career</span>
            </span>
          </div>
          <CardTitle className="text-2xl">
            {showForgotPassword ? t("重置密码", "Reset Password") : t("欢迎使用", "Welcome")}
          </CardTitle>
          <CardDescription>
            {showForgotPassword 
              ? t("输入您的邮箱，我们将发送重置链接", "Enter your email and we'll send a reset link")
              : t("登录或注册以保存您的分析记录", "Sign in or register to save your analysis history")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showForgotPassword ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">{t("邮箱", "Email")}</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  onKeyDown={(e) => e.key === "Enter" && handleForgotPassword()}
                />
              </div>
              <Button 
                onClick={handleForgotPassword} 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("发送中...", "Sending...")}
                  </>
                ) : (
                  t("发送重置链接", "Send Reset Link")
                )}
              </Button>
              <Button 
                variant="ghost" 
                className="w-full" 
                onClick={() => setShowForgotPassword(false)}
              >
                {t("返回登录", "Back to Login")}
              </Button>
            </div>
          ) : (
            <>
              {/* Google Login Button */}
              <Button
                variant="outline"
                className="w-full gap-2 mb-4"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                )}
                {t("使用 Google 登录", "Sign in with Google")}
              </Button>

              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">{t("或", "or")}</span>
                </div>
              </div>

              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">{t("登录", "Sign In")}</TabsTrigger>
                  <TabsTrigger value="signup">{t("注册", "Sign Up")}</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">{t("邮箱", "Email")}</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">{t("密码", "Password")}</Label>
                      <Button
                        variant="link"
                        className="px-0 h-auto text-xs text-muted-foreground"
                        onClick={() => setShowForgotPassword(true)}
                      >
                        {t("忘记密码？", "Forgot password?")}
                      </Button>
                    </div>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      onKeyDown={(e) => e.key === "Enter" && handleAuth("login")}
                    />
                  </div>
                  <Button 
                    onClick={() => handleAuth("login")} 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("登录中...", "Signing in...")}
                      </>
                    ) : (
                      t("登录", "Sign In")
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">{t("邮箱", "Email")}</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">{t("密码", "Password")}</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder={t("至少6个字符", "At least 6 characters")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      onKeyDown={(e) => e.key === "Enter" && handleAuth("signup")}
                    />
                  </div>
                  <Button 
                    onClick={() => handleAuth("signup")} 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("注册中...", "Signing up...")}
                      </>
                    ) : (
                      t("创建账号", "Create Account")
                    )}
                  </Button>
                </TabsContent>
              </Tabs>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
