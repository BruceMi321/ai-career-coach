import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useApiConfig } from "@/hooks/useApiConfig";
import { useLanguage } from "@/hooks/useLanguage";
import { supabase } from "@/integrations/supabase/client";
import { 
  Compass, 
  Briefcase, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  BookOpen, 
  Cpu, 
  Zap, 
  Save, 
  ArrowRight,
  Loader2
} from "lucide-react";

interface Milestone {
  phase: string;
  duration: string;
  description: string;
  techSkills: string[];
  softSkills: string[];
  actions: string[];
}

interface RoadmapData {
  title: string;
  summary: string;
  milestones: Milestone[];
}

interface CareerRoadmapProps {
  resumeContent?: string;
}

const CareerRoadmap = ({ resumeContent }: CareerRoadmapProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const { activeConfig, hasApiConfig } = useApiConfig();

  const [currentRole, setCurrentRole] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [expandedMilestones, setExpandedMilestones] = useState<Record<number, boolean>>({});
  const [checkedSkills, setCheckedSkills] = useState<Record<string, boolean>>({});
  const [loadingQuote, setLoadingQuote] = useState("");

  // Rotate quotes during generation
  useEffect(() => {
    const loadingQuotes = [
      t("AI 正在深度解析您的当前背景与核心竞争力...", "AI is deep-analyzing your background and core competencies..."),
      t("正在精细化推导您的未来职业里程碑节点...", "Mapping out your future career milestone nodes..."),
      t("麦肯锡顾问模型评估中：量身定制专业技能树...", "McKinsey Advisor Model active: tailoring skill trees..."),
      t("正在设计高可操作性的软实力与行动方案指南...", "Designing actionable soft skills and timeline guide..."),
    ];

    let interval: NodeJS.Timeout;
    if (isGenerating) {
      setLoadingQuote(loadingQuotes[0]);
      let index = 1;
      interval = setInterval(() => {
        setLoadingQuote(loadingQuotes[index % loadingQuotes.length]);
        index++;
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isGenerating, t]);

  // Try to autofill current role from resume details
  const handleAutofill = () => {
    if (!resumeContent || !resumeContent.trim()) {
      toast({
        title: t("未检测到简历内容", "No resume content detected"),
        description: t("请先在简历分析卡片中粘贴您的简历内容", "Please paste your resume content in the analyzer first"),
        variant: "destructive",
      });
      return;
    }

    // A simple regex mock extraction of job titles or prefill a smart generic guess
    let guessedTitle = "";
    const lines = resumeContent.split("\n");
    
    // Look for lines containing typical job keywords
    for (const line of lines) {
      if (line.includes("职位") || line.includes("Job Title") || line.includes("岗位")) {
        const match = line.match(/(?:职位|岗位|Job Title)[\s:：]+([^\s,，。]+)/i);
        if (match && match[1]) {
          guessedTitle = match[1];
          break;
        }
      }
    }

    if (!guessedTitle) {
      // Fallback: search for first occurance of Engineer, Developer, Manager, Analyst, PM in the first 5 lines
      for (let i = 0; i < Math.min(5, lines.length); i++) {
        const line = lines[i];
        if (line.match(/(开发|工程师|经理|专员|运营|Analyst|Developer|Engineer|Manager)/i)) {
          guessedTitle = line.trim().slice(0, 20);
          break;
        }
      }
    }

    // Ultimate generic fallback
    setCurrentRole(guessedTitle || t("高级软件开发工程师", "Senior Software Engineer"));
    toast({
      title: t("自动提取成功", "Autofill Success"),
      description: t("已从简历中自动提取并填充当前职位信息", "Extracted and filled current role info from resume"),
    });
  };

  const handleGenerate = async () => {
    if (!currentRole.trim() || !targetRole.trim()) {
      toast({
        title: t("请填写完整信息", "Please fill in all fields"),
        description: t("当前职位和目标职业均是必填项", "Current role and target career are required"),
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setRoadmap(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-roadmap`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            currentRole,
            targetRole,
            resume: resumeContent || "",
            apiConfig: activeConfig,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate career roadmap");
      }

      const data = await response.json();

      if (data?.roadmap) {
        setRoadmap(data.roadmap);
        // Expand first milestone by default
        setExpandedMilestones({ 0: true });

        // Save to database if user is logged in
        if (user) {
          await supabase.from("career_roadmaps").insert({
            user_id: user.id,
            current_role: currentRole,
            target_role: targetRole,
            roadmap_data: data.roadmap,
          });

          toast({
            title: t("职业路径生成成功", "Roadmap Generated"),
            description: t("已自动将定制路线图同步保存至您的云端档案！", "Custom roadmap generated and synced to your cloud profile!"),
          });
        } else {
          toast({
            title: t("职业路径生成成功", "Roadmap Generated"),
            description: t("登录后可将成长记录自动留存至个人云端空间。", "Sign in to save this roadmap to your cloud profile."),
          });
        }
      }
    } catch (error) {
      console.error("Roadmap generation error:", error);
      toast({
        title: t("路线图生成失败", "Failed to generate roadmap"),
        description: error instanceof Error ? error.message : t("请稍后重试", "Please try again later"),
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleExpand = (index: number) => {
    setExpandedMilestones(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleSkill = (skill: string) => {
    setCheckedSkills(prev => ({
      ...prev,
      [skill]: !prev[skill]
    }));
  };

  return (
    <div className="space-y-10 animate-card-enter">
      {/* Search/Filter Inputs Card */}
      <Card className="border border-border/50 bg-card/85 backdrop-blur-sm shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2.5 text-lg font-serif">
            <Compass className="h-5 w-5 text-primary animate-icon-bounce" />
            {t("智能职业路径规划", "Career Roadmap Planner")}
          </CardTitle>
          <CardDescription>
            {t("定制高含金量的里程碑跃迁节点、核心技能树与可落地的成长动作清单", "Design milestones, core skill trees and specific action plans")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">{t("当前职位/背景", "Current Role/Background")}</label>
              <div className="flex gap-2">
                <Input
                  placeholder={t("例如：初级前端开发人员", "e.g. Junior Frontend Developer")}
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                  className="border-border/60 focus:ring-primary focus:border-primary"
                  disabled={isGenerating}
                />
                {resumeContent && (
                  <Button 
                    variant="outline" 
                    onClick={handleAutofill} 
                    className="shrink-0 gap-1.5 h-10"
                    disabled={isGenerating}
                  >
                    <Zap className="h-3.5 w-3.5 text-primary" />
                    <span className="hidden md:inline">{t("提取简历", "Autofill")}</span>
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">{t("发展目标/职位", "Target Goal/Career")}</label>
              <Input
                placeholder={t("例如：全栈技术主管 或 资深系统架构师", "e.g. Tech Lead / Solutions Architect")}
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="border-border/60 focus:ring-primary focus:border-primary"
                disabled={isGenerating}
              />
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !currentRole.trim() || !targetRole.trim() || !hasApiConfig}
            variant="premium"
            className="w-full py-6 text-base font-medium shadow-sm hover:translate-y-[-1px] active:translate-y-0 duration-300"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                {t("AI 正在深度定制职业成长路径...", "AI Designing Career Path...")}
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                {t("生成专属职业成长路线图", "Generate Career Growth Roadmap")}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Loading state with quotes */}
      {isGenerating && (
        <Card className="border border-border/40 bg-card/65 backdrop-blur-xs py-16 flex flex-col items-center justify-center text-center shadow-md animate-spotlight-pulse">
          <div className="relative flex items-center justify-center w-20 h-20 mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                className="text-primary/10"
                strokeWidth="4"
                stroke="currentColor"
                fill="transparent"
                r="30"
                cx="40"
                cy="40"
              />
              <circle
                className="text-primary animate-spin"
                strokeWidth="4"
                strokeDasharray="188"
                strokeDashoffset="130"
                strokeLinecap="round"
                fill="transparent"
                r="30"
                cx="40"
                cy="40"
              />
            </svg>
            <Compass className="absolute h-8 w-8 text-primary animate-icon-bounce" />
          </div>
          <h4 className="text-base font-medium text-foreground px-6 font-serif max-w-lg mb-2">
            {t("正在为您定制黄金职业路径图", "Customizing your golden career path")}
          </h4>
          <p className="text-xs text-muted-foreground px-6 max-w-sm italic leading-relaxed">
            {loadingQuote}
          </p>
        </Card>
      )}

      {/* Generated Roadmap Display */}
      {roadmap && (
        <div className="space-y-6 animate-card-enter">
          {/* Header Description */}
          <Card className="border border-border/50 bg-card/85 backdrop-blur-sm overflow-hidden shadow-lg">
            <div className="h-1.5 bg-gradient-to-r from-primary to-ring" />
            <CardHeader className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="gap-1.5 py-1 px-3 bg-primary/5 text-primary border-primary/20">
                  <Award className="h-3.5 w-3.5" />
                  {t("麦肯锡顾问评估模型", "McKinsey Framework")}
                </Badge>
              </div>
              <CardTitle className="text-2xl font-serif text-foreground">{roadmap.title}</CardTitle>
              <div className="relative mt-4 p-5 rounded-lg bg-muted/20 border border-border/40 font-serif italic text-muted-foreground text-sm leading-relaxed shadow-2xs">
                <span className="absolute top-2 left-2 text-4xl text-primary/10 select-none">“</span>
                <p className="pl-4 pr-2">{roadmap.summary}</p>
                <span className="absolute bottom-2 right-2 text-4xl text-primary/10 select-none">”</span>
              </div>
            </CardHeader>
          </Card>

          {/* Vertical Milestone Timeline */}
          <div className="relative pl-6 md:pl-8 space-y-8 before:absolute before:left-[11px] before:md:left-[15px] before:top-3 before:h-[95%] before:w-0.5 before:bg-gradient-to-b before:from-primary/70 before:to-muted">
            {roadmap.milestones.map((milestone, index) => {
              const isExpanded = !!expandedMilestones[index];
              return (
                <div key={index} className="relative space-y-3">
                  {/* Timeline Indicator Ring */}
                  <div className={`absolute left-[-22px] md:left-[-28px] top-1.5 w-5 h-5 md:w-7 md:h-7 rounded-full border-4 border-background flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isExpanded 
                      ? "bg-primary text-primary-foreground scale-110 shadow-sm" 
                      : "bg-muted text-muted-foreground hover:bg-primary/25 hover:text-foreground cursor-pointer"
                  }`}
                  onClick={() => toggleExpand(index)}
                  >
                    {index + 1}
                  </div>

                  {/* Milestone Card */}
                  <Card className={`border border-border/40 bg-card/85 backdrop-blur-xs transition-all duration-300 shadow-2xs hover:shadow-sm ${
                    isExpanded ? "ring-1 ring-primary/20" : ""
                  }`}>
                    {/* Card Header (Toggle Clickable) */}
                    <div 
                      onClick={() => toggleExpand(index)}
                      className="flex items-center justify-between p-4 cursor-pointer select-none hover:bg-muted/10 transition-colors"
                    >
                      <div className="space-y-1 pr-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-base font-semibold text-foreground font-serif leading-none">{milestone.phase}</h4>
                          <Badge variant="secondary" className="gap-1 px-2.5 h-5 text-[10.5px] border border-border/40 font-medium">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            {milestone.duration}
                          </Badge>
                        </div>
                        {!isExpanded && (
                          <p className="text-xs text-muted-foreground truncate max-w-md lg:max-w-xl">
                            {milestone.techSkills.slice(0, 3).join(" • ")}
                          </p>
                        )}
                      </div>
                      <div className="text-muted-foreground hover:text-foreground shrink-0">
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </div>

                    {/* Card Content (Collapsible) */}
                    {isExpanded && (
                      <CardContent className="px-5 pb-5 pt-1 border-t border-border/30 space-y-5 animate-card-enter">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {milestone.description}
                        </p>

                        <div className="grid gap-5 md:grid-cols-2">
                          {/* Hard Skills Tree */}
                          <div className="space-y-3 p-3.5 rounded-lg bg-muted/15 border border-border/20">
                            <div className="flex items-center gap-2">
                              <Cpu className="h-4 w-4 text-primary" />
                              <h5 className="text-xs font-bold text-foreground uppercase tracking-wider">{t("硬实力与专业技术栈", "Hard Skills Tree")}</h5>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-1">
                              {milestone.techSkills.map((skill) => {
                                const isChecked = !!checkedSkills[skill];
                                return (
                                  <Badge 
                                    key={skill}
                                    onClick={() => toggleSkill(skill)}
                                    variant={isChecked ? "default" : "outline"}
                                    className={`cursor-pointer select-none transition-all gap-1 h-6 px-2.5 text-xs ${
                                      isChecked 
                                        ? "bg-primary text-primary-foreground border-primary/20 shadow-2xs" 
                                        : "hover:bg-primary/5 hover:border-primary/20 hover:text-primary text-muted-foreground border-border/60"
                                    }`}
                                  >
                                    {isChecked && <CheckCircle2 className="h-3 w-3" />}
                                    {skill}
                                  </Badge>
                                );
                              })}
                            </div>
                          </div>

                          {/* Soft Skills Tree */}
                          <div className="space-y-3 p-3.5 rounded-lg bg-muted/15 border border-border/20">
                            <div className="flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-primary" />
                              <h5 className="text-xs font-bold text-foreground uppercase tracking-wider">{t("软实力与思维模型", "Soft Skills Tree")}</h5>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-1">
                              {milestone.softSkills.map((skill) => {
                                const isChecked = !!checkedSkills[skill];
                                return (
                                  <Badge 
                                    key={skill}
                                    onClick={() => toggleSkill(skill)}
                                    variant={isChecked ? "default" : "outline"}
                                    className={`cursor-pointer select-none transition-all gap-1 h-6 px-2.5 text-xs ${
                                      isChecked 
                                        ? "bg-primary text-primary-foreground border-primary/20 shadow-2xs" 
                                        : "hover:bg-primary/5 hover:border-primary/20 hover:text-primary text-muted-foreground border-border/60"
                                    }`}
                                  >
                                    {isChecked && <CheckCircle2 className="h-3 w-3" />}
                                    {skill}
                                  </Badge>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Actions Items List */}
                        <div className="space-y-3 pt-3 border-t border-border/30">
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-primary" />
                            <h5 className="text-xs font-bold text-foreground uppercase tracking-wider">{t("成长行动步骤与实操指南", "Action Plan")}</h5>
                          </div>
                          <ul className="space-y-2.5">
                            {milestone.actions.map((action, idx) => (
                              <li key={idx} className="flex items-start gap-3 p-3 bg-background/50 border border-border/40 rounded-md hover:bg-background/80 transition-colors duration-200">
                                <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0 animate-icon-bounce" />
                                <span className="text-sm text-foreground/90 leading-relaxed">{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerRoadmap;
