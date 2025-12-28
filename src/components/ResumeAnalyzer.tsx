import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useApiConfig } from "@/hooks/useApiConfig";
import { useLanguage } from "@/hooks/useLanguage";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, FileText, Briefcase, Sparkles, MessageSquare } from "lucide-react";
import AnalysisResult from "./AnalysisResult";
import MockInterview from "./MockInterview";
import ApiRequiredAlert from "./ApiRequiredAlert";

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
  const { activeConfig, hasApiConfig } = useApiConfig();
  const { t } = useLanguage();

  useEffect(() => {
    const handleTabSwitch = (event: CustomEvent<"analyze" | "interview">) => {
      setActiveTab(event.detail);
    };

    window.addEventListener("switchResumeTab", handleTabSwitch as EventListener);
    return () => {
      window.removeEventListener("switchResumeTab", handleTabSwitch as EventListener);
    };
  }, []);

  const handleAnalyze = async () => {
    if (!resume.trim() || !jobDescription.trim()) {
      toast({
        title: t("请填写完整信息", "Please fill in all fields"),
        description: t("简历和职位描述都是必填项", "Resume and job description are required"),
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-resume", {
        body: { resume, jobDescription, apiConfig: activeConfig },
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
          title: t("分析完成", "Analysis Complete"),
          description: user 
            ? t("评估报告已生成并保存", "Report generated and saved")
            : t("评估报告已生成，登录后可保存历史记录", "Report generated. Sign in to save history"),
        });
      }
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: t("分析失败", "Analysis Failed"),
        description: error instanceof Error ? error.message : t("请稍后重试", "Please try again later"),
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-10">
      {!hasApiConfig && <ApiRequiredAlert />}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto h-12 bg-muted/50 p-1">
          <TabsTrigger value="analyze" className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Sparkles className="h-4 w-4" />
            {t("简历分析", "Resume Analysis")}
          </TabsTrigger>
          <TabsTrigger value="interview" className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <MessageSquare className="h-4 w-4" />
            {t("模拟面试", "Mock Interview")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analyze" className="mt-10 space-y-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border border-border bg-background shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg font-serif">
                  <div className="h-8 w-8 rounded flex items-center justify-center bg-primary/10">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </div>
                  {t("目标职位描述", "Target Job Description")}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {t("粘贴您想要申请的职位描述", "Paste the job description you're applying for")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={t(
                    `请粘贴职位描述，包括：
• 岗位职责
• 任职要求
• 技能要求
• 学历要求等...`,
                    `Paste the job description, including:
• Responsibilities
• Requirements
• Skills needed
• Education requirements...`
                  )}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[280px] resize-none border-border focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </CardContent>
            </Card>

            <Card className="border border-border bg-background shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg font-serif">
                  <div className="h-8 w-8 rounded flex items-center justify-center bg-primary/10">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  {t("个人简历", "Your Resume")}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {t("粘贴您的简历内容", "Paste your resume content")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={t(
                    `请粘贴您的简历内容，包括：
• 个人信息
• 教育背景
• 工作经历
• 项目经验
• 技能特长等...`,
                    `Paste your resume content, including:
• Personal info
• Education
• Work experience
• Projects
• Skills...`
                  )}
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  className="min-h-[280px] resize-none border-border focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !resume.trim() || !jobDescription.trim() || !hasApiConfig}
              size="lg"
              variant="premium"
              className="min-w-[220px] gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {t("AI 正在分析...", "AI Analyzing...")}
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  {t("开始智能分析", "Start AI Analysis")}
                </>
              )}
            </Button>
          </div>

          {analysisResult && <AnalysisResult data={analysisResult} />}
        </TabsContent>

        <TabsContent value="interview" className="mt-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border border-border bg-background shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg font-serif">
                  <div className="h-8 w-8 rounded flex items-center justify-center bg-primary/10">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </div>
                  {t("目标职位描述", "Target Job Description")}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {t("面试官将根据此职位进行提问", "Interviewer will ask questions based on this job")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={t("请粘贴职位描述...", "Paste job description...")}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[200px] resize-none border-border focus:border-primary focus:ring-1 focus:ring-primary"
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
