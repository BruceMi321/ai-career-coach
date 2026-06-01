import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/hooks/useLanguage";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Lightbulb, 
  CheckCircle2,
  AlertCircle,
  FileEdit,
  Copy,
  Check,
  Award,
  Sparkles
} from "lucide-react";

interface AnalysisResultProps {
  data: {
    totalScore?: number;
    dimensions?: Array<{
      name: string;
      score: number;
      maxScore: number;
      analysis: string;
      suggestions: string[];
    }>;
    overallAnalysis?: string;
    keyStrengths?: string[];
    keyWeaknesses?: string[];
    prioritizedSuggestions?: Array<{
      priority: string;
      suggestion: string;
      reason: string;
    }>;
    optimizedSections?: {
      summary?: string;
      experience?: string;
    };
    rawAnalysis?: string;
    parseError?: boolean;
  };
}

const getScoreColor = (score: number, maxScore: number) => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return "text-green-600 dark:text-emerald-400";
  if (percentage >= 60) return "text-yellow-600 dark:text-amber-400";
  return "text-red-600 dark:text-rose-400";
};

const getScoreGradient = (score: number) => {
  if (score >= 80) return "from-green-500 to-emerald-500";
  if (score >= 60) return "from-yellow-500 to-orange-500";
  return "from-red-500 to-rose-500";
};

const AnalysisResult = ({ data }: AnalysisResultProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedExperience, setCopiedExperience] = useState(false);

  const getPriorityColor = (priority: string) => {
    if (priority === t("高", "High")) return "destructive";
    if (priority === t("中", "Medium")) return "default";
    return "secondary";
  };

  const handleCopy = async (text: string, type: "summary" | "experience") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "summary") {
        setCopiedSummary(true);
        setTimeout(() => setCopiedSummary(false), 2000);
      } else {
        setCopiedExperience(true);
        setTimeout(() => setCopiedExperience(false), 2000);
      }
      toast({
        title: t("已复制", "Copied"),
        description: t("已成功复制到剪贴板", "Successfully copied to clipboard"),
      });
    } catch (err) {
      toast({
        title: t("复制失败", "Copy Failed"),
        description: t("请手动选择复制", "Please copy manually"),
        variant: "destructive",
      });
    }
  };

  if (data.parseError && data.rawAnalysis) {
    return (
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-md">
        <CardHeader>
          <CardTitle className="font-serif">{t("分析结果", "Analysis Results")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">{data.rawAnalysis}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8 animate-card-enter">
      {/* Score Overview - Premium Radial Gauge & Quote */}
      {data.totalScore !== undefined && (
        <Card className="border border-border/50 bg-card/85 backdrop-blur-md overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
          <div className={`h-1.5 bg-gradient-to-r ${getScoreGradient(data.totalScore)}`} />
          <CardContent className="p-6 md:p-8">
            <div className="grid gap-8 md:grid-cols-12 items-center">
              {/* Circular Gauge */}
              <div className="md:col-span-4 flex flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r border-border/40">
                <div className="relative flex items-center justify-center w-40 h-40 animate-spotlight-appear">
                  <svg className="w-full h-full transform -rotate-90">
                    <defs>
                      <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" />
                        <stop offset="100%" stopColor="hsl(var(--ring))" />
                      </linearGradient>
                    </defs>
                    <circle
                      className="text-muted/15"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                      r="65"
                      cx="80"
                      cy="80"
                    />
                    <circle
                      className="transition-all duration-1000 ease-out"
                      stroke="url(#scoreGrad)"
                      strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 65}`}
                      strokeDashoffset={`${2 * Math.PI * 65 * (1 - data.totalScore / 100)}`}
                      strokeLinecap="round"
                      fill="transparent"
                      r="65"
                      cx="80"
                      cy="80"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-5xl font-bold tracking-tight text-foreground">{data.totalScore}</span>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium mt-1">
                      {t("分", "Score")}
                    </span>
                  </div>
                </div>
                <Badge variant="outline" className="mt-4 gap-1.5 py-1 px-3 bg-primary/5 text-primary border-primary/20 shadow-2xs">
                  <Award className="h-3.5 w-3.5 text-primary" />
                  {data.totalScore >= 80 ? t("表现优秀", "Excellent") : data.totalScore >= 60 ? t("匹配度良好", "Good Match") : t("急需优化", "Needs Work")}
                </Badge>
              </div>

              {/* McKinsey-style Assessment Quote */}
              <div className="md:col-span-8 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary animate-icon-bounce" />
                  <h3 className="text-xl font-medium font-serif text-foreground">{t("AI 专家评估报告", "AI Expert Evaluation")}</h3>
                </div>
                <div className="relative p-5 rounded-lg bg-muted/20 border border-border/40 font-serif italic text-muted-foreground text-[15px] leading-relaxed shadow-2xs">
                  <span className="absolute top-2 left-2 text-4xl text-primary/10 select-none">“</span>
                  <p className="pl-4 pr-2">
                    {data.overallAnalysis}
                  </p>
                  <span className="absolute bottom-2 right-2 text-4xl text-primary/10 select-none">”</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs list with luxury modern styling */}
      <Tabs defaultValue="dimensions" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px] mx-auto h-11 bg-muted/50 p-1 border border-border/40">
          <TabsTrigger value="dimensions" className="gap-2 data-[state=active]:shadow-sm">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">{t("维度分析", "Dimensions")}</span>
          </TabsTrigger>
          <TabsTrigger value="strengths" className="gap-2 data-[state=active]:shadow-sm">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">{t("优劣势", "Strengths")}</span>
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="gap-2 data-[state=active]:shadow-sm">
            <Lightbulb className="h-4 w-4" />
            <span className="hidden sm:inline">{t("改进建议", "Suggestions")}</span>
          </TabsTrigger>
          <TabsTrigger value="optimized" className="gap-2 data-[state=active]:shadow-sm">
            <FileEdit className="h-4 w-4" />
            <span className="hidden sm:inline">{t("优化示例", "Examples")}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dimensions" className="mt-8 focus-visible:outline-none">
          <div className="grid gap-5 md:grid-cols-2">
            {data.dimensions?.map((dim, index) => (
              <Card key={index} className="border border-border/40 bg-card/80 backdrop-blur-sm hover:translate-y-[-2px] transition-all duration-300 shadow-2xs hover:shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[15px] font-medium text-foreground">{dim.name}</CardTitle>
                    <span className={`text-base font-bold ${getScoreColor(dim.score, dim.maxScore)}`}>
                      {dim.score}/{dim.maxScore}
                    </span>
                  </div>
                  <Progress 
                    value={(dim.score / dim.maxScore) * 100} 
                    className="h-1.5"
                  />
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{dim.analysis}</p>
                  {dim.suggestions && dim.suggestions.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-border/30">
                      <p className="text-xs font-semibold text-foreground tracking-wide uppercase">{t("优化路径：", "Action Steps:")}</p>
                      <ul className="text-xs text-muted-foreground space-y-1.5">
                        {dim.suggestions.map((suggestion, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span className="leading-relaxed">{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="strengths" className="mt-8 focus-visible:outline-none">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border border-border/40 bg-card/85 backdrop-blur-sm shadow-2xs">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  {t("核心优势与亮点", "Key Strengths & Highlights")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3.5">
                  {data.keyStrengths?.map((strength, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-foreground/90 bg-muted/20 p-3 rounded-md border border-border/20">
                      <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-border/40 bg-card/85 backdrop-blur-sm shadow-2xs">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-amber-600 dark:text-amber-400">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  {t("潜在短板与待改进项", "Areas for Improvement")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3.5">
                  {data.keyWeaknesses?.map((weakness, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-foreground/90 bg-muted/20 p-3 rounded-md border border-border/20">
                      <TrendingDown className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="suggestions" className="mt-8 focus-visible:outline-none">
          <Card className="border border-border/40 bg-card/85 backdrop-blur-sm shadow-2xs">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg font-serif">
                <Lightbulb className="h-5 w-5 text-primary" />
                {t("优先改进建议", "Priority Improvements")}
              </CardTitle>
              <CardDescription>
                {t("基于紧急程度与影响范围为您推荐的定制优化建议", "Custom optimization suggestions tailored based on priority")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.prioritizedSuggestions?.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-4 p-4 rounded-lg bg-background/60 border border-border/40 hover:bg-background/80 transition-colors duration-200"
                  >
                    <Badge variant={getPriorityColor(item.priority) as "default" | "secondary" | "destructive"} className="shrink-0 font-medium">
                      {item.priority}{t("优先", " Priority")}
                    </Badge>
                    <div className="flex-1 space-y-1">
                      <p className="font-semibold text-sm text-foreground leading-relaxed">{item.suggestion}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimized" className="mt-8 focus-visible:outline-none">
          <div className="space-y-6">
            {data.optimizedSections?.summary && (
              <Card className="border border-border/40 bg-card/85 backdrop-blur-sm shadow-2xs hover:shadow-sm transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div>
                    <CardTitle className="text-[15px] font-semibold text-foreground">{t("优化后的个人简介", "Optimized Summary")}</CardTitle>
                    <CardDescription className="mt-1">{t("直接应用于简历开篇，展现专业定位", "Position yourself in the opening of your resume")}</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleCopy(data.optimizedSections!.summary!, "summary")}
                    className="gap-1.5 h-8 shrink-0"
                  >
                    {copiedSummary ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                    {copiedSummary ? t("已复制", "Copied") : t("复制", "Copy")}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 shadow-2xs">
                    <p className="text-sm leading-relaxed text-foreground/90 font-serif">{data.optimizedSections.summary}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {data.optimizedSections?.experience && (
              <Card className="border border-border/40 bg-card/85 backdrop-blur-sm shadow-2xs hover:shadow-sm transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div>
                    <CardTitle className="text-[15px] font-semibold text-foreground">{t("优化后的工作经历描述", "Optimized Experience Description")}</CardTitle>
                    <CardDescription className="mt-1">{t("示范如何运用量化成果与强动作性词汇润色项目描述", "Learn to quantify achievements and apply powerful action verbs")}</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleCopy(data.optimizedSections!.experience!, "experience")}
                    className="gap-1.5 h-8 shrink-0"
                  >
                    {copiedExperience ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                    {copiedExperience ? t("已复制", "Copied") : t("复制", "Copy")}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 shadow-2xs">
                    <p className="text-sm leading-relaxed text-foreground/90 font-serif whitespace-pre-wrap">
                      {data.optimizedSections.experience}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalysisResult;
