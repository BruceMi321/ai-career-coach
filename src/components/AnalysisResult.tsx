import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Lightbulb, 
  CheckCircle2,
  AlertCircle,
  FileEdit
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
  if (percentage >= 80) return "text-green-600";
  if (percentage >= 60) return "text-yellow-600";
  return "text-red-600";
};

const getScoreGradient = (score: number) => {
  if (score >= 80) return "from-green-500 to-emerald-500";
  if (score >= 60) return "from-yellow-500 to-orange-500";
  return "from-red-500 to-rose-500";
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "高":
      return "destructive";
    case "中":
      return "default";
    default:
      return "secondary";
  }
};

const AnalysisResult = ({ data }: AnalysisResultProps) => {
  if (data.parseError && data.rawAnalysis) {
    return (
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>分析结果</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-wrap text-sm">{data.rawAnalysis}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Score Overview */}
      {data.totalScore !== undefined && (
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
          <div className={`h-2 bg-gradient-to-r ${getScoreGradient(data.totalScore)}`} />
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">综合评分</CardTitle>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className={`text-6xl font-bold bg-gradient-to-r ${getScoreGradient(data.totalScore)} bg-clip-text text-transparent`}>
                {data.totalScore}
              </span>
              <span className="text-2xl text-muted-foreground">/100</span>
            </div>
          </CardHeader>
          <CardContent>
            {data.overallAnalysis && (
              <p className="text-center text-muted-foreground max-w-2xl mx-auto">
                {data.overallAnalysis}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="dimensions" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px] mx-auto">
          <TabsTrigger value="dimensions" className="gap-2">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">维度分析</span>
          </TabsTrigger>
          <TabsTrigger value="strengths" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">优劣势</span>
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="gap-2">
            <Lightbulb className="h-4 w-4" />
            <span className="hidden sm:inline">改进建议</span>
          </TabsTrigger>
          <TabsTrigger value="optimized" className="gap-2">
            <FileEdit className="h-4 w-4" />
            <span className="hidden sm:inline">优化示例</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dimensions" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {data.dimensions?.map((dim, index) => (
              <Card key={index} className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{dim.name}</CardTitle>
                    <span className={`text-lg font-bold ${getScoreColor(dim.score, dim.maxScore)}`}>
                      {dim.score}/{dim.maxScore}
                    </span>
                  </div>
                  <Progress 
                    value={(dim.score / dim.maxScore) * 100} 
                    className="h-2"
                  />
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{dim.analysis}</p>
                  {dim.suggestions && dim.suggestions.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-foreground">改进建议：</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {dim.suggestions.map((suggestion, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            {suggestion}
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

        <TabsContent value="strengths" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                  核心优势
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {data.keyStrengths?.map((strength, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-600">
                  <AlertCircle className="h-5 w-5" />
                  待改进项
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {data.keyWeaknesses?.map((weakness, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <TrendingDown className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="suggestions" className="mt-6">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                优先改进建议
              </CardTitle>
              <CardDescription>
                按优先级排序的具体改进建议
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.prioritizedSuggestions?.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border/50"
                  >
                    <Badge variant={getPriorityColor(item.priority) as "default" | "secondary" | "destructive"}>
                      {item.priority}优先
                    </Badge>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium text-sm">{item.suggestion}</p>
                      <p className="text-xs text-muted-foreground">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimized" className="mt-6">
          <div className="space-y-6">
            {data.optimizedSections?.summary && (
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-base">优化后的个人简介</CardTitle>
                  <CardDescription>参考示例，可直接使用或根据实际情况调整</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm leading-relaxed">{data.optimizedSections.summary}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {data.optimizedSections?.experience && (
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-base">优化后的工作经历描述</CardTitle>
                  <CardDescription>示例展示如何更好地描述工作成就</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
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
