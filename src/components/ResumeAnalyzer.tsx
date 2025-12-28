import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, FileText, Briefcase, Sparkles, MessageSquare } from "lucide-react";
import AnalysisResult from "./AnalysisResult";
import MockInterview from "./MockInterview";

interface AnalysisData {
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
}

const ResumeAnalyzer = () => {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisData | null>(null);
  const [activeTab, setActiveTab] = useState("analyze");
  const { toast } = useToast();
  const { user } = useAuth();

  const handleAnalyze = async () => {
    if (!resume.trim() || !jobDescription.trim()) {
      toast({
        title: "请填写完整信息",
        description: "简历和职位描述都是必填项",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-resume", {
        body: { resume, jobDescription },
      });

      if (error) throw error;

      if (data?.analysis) {
        setAnalysisResult(data.analysis);
        
        // Save to history if user is logged in
        if (user) {
          await supabase.from("analysis_history").insert({
            user_id: user.id,
            job_description: jobDescription,
            resume: resume,
            analysis_result: data.analysis,
            total_score: data.analysis.totalScore || null,
          });
        }

        toast({
          title: "分析完成",
          description: user ? "评估报告已生成并保存" : "评估报告已生成，登录后可保存历史记录",
        });
      }
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "分析失败",
        description: error instanceof Error ? error.message : "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="analyze" className="gap-2">
            <Sparkles className="h-4 w-4" />
            简历分析
          </TabsTrigger>
          <TabsTrigger value="interview" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            模拟面试
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analyze" className="mt-8 space-y-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Briefcase className="h-5 w-5 text-primary" />
                  目标职位描述 (JD)
                </CardTitle>
                <CardDescription>
                  粘贴您想要申请的职位描述
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="请粘贴职位描述，包括：
• 岗位职责
• 任职要求
• 技能要求
• 学历要求等..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[300px] resize-none bg-background/50"
                />
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-primary" />
                  个人简历
                </CardTitle>
                <CardDescription>
                  粘贴您的简历内容
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="请粘贴您的简历内容，包括：
• 个人信息
• 教育背景
• 工作经历
• 项目经验
• 技能特长等..."
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  className="min-h-[300px] resize-none bg-background/50"
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !resume.trim() || !jobDescription.trim()}
              size="lg"
              className="min-w-[200px] gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  AI 正在分析...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  开始智能分析
                </>
              )}
            </Button>
          </div>

          {analysisResult && <AnalysisResult data={analysisResult} />}
        </TabsContent>

        <TabsContent value="interview" className="mt-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Briefcase className="h-5 w-5 text-primary" />
                  目标职位描述 (JD)
                </CardTitle>
                <CardDescription>
                  面试官将根据此职位进行提问
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="请粘贴职位描述..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[200px] resize-none bg-background/50"
                />
              </CardContent>
            </Card>

            <MockInterview jobDescription={jobDescription} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeAnalyzer;
