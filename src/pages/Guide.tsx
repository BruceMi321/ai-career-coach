import { ArrowLeft, FileText, MessageSquare, CheckCircle2, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";

const Guide = () => {
  const { t } = useLanguage();

  const resumeSteps = [
    {
      step: 1,
      title: t("准备简历文本", "Prepare Your Resume"),
      description: t(
        "将您的简历内容复制粘贴到文本框中，支持中英文简历。建议包含完整的工作经历、教育背景和技能描述。",
        "Copy and paste your resume content into the text box. Both Chinese and English resumes are supported. Include complete work experience, education, and skills."
      ),
    },
    {
      step: 2,
      title: t("输入目标职位描述", "Enter Target Job Description"),
      description: t(
        "粘贴您想申请的职位JD（Job Description），AI 将根据职位要求分析您的简历匹配度。职位描述越详细，分析结果越精准。",
        "Paste the job description (JD) you are applying for. The AI will analyze how well your resume matches the requirements. More detailed JD leads to more accurate analysis."
      ),
    },
    {
      step: 3,
      title: t("点击分析获取报告", "Click Analyze to Get Report"),
      description: t(
        "点击分析简历按钮，AI 将在几秒内生成详细的分析报告，包括匹配度评分、优势亮点和改进建议。",
        "Click the Analyze Resume button. The AI will generate a detailed report within seconds, including match score, strengths, and improvement suggestions."
      ),
    },
    {
      step: 3,
      title: t("点击分析获取报告", "Click Analyze to Get Report"),
      description: t(
        "点击分析简历按钮，AI 将在几秒内生成详细的分析报告，包括匹配度评分、优势亮点和改进建议。",
        "Click the Analyze Resume button. The AI will generate a detailed report within seconds, including match score, strengths, and improvement suggestions."
      ),
    },
    {
      step: 4,
      title: t("根据建议优化简历", "Optimize Based on Suggestions"),
      description: t(
        "根据 AI 提供的具体建议修改您的简历，重点关注关键词匹配、经历描述和技能呈现，提升简历竞争力。",
        "Modify your resume based on AI's specific suggestions. Focus on keyword matching, experience descriptions, and skill presentation to enhance competitiveness."
      ),
    },
  ];

  const interviewSteps = [
    {
      step: 1,
      title: t("输入职位信息", "Enter Job Information"),
      description: t(
        "提供目标职位的描述信息，AI 面试官将根据职位要求设计针对性的面试问题，模拟真实面试场景。",
        "Provide the target job description. The AI interviewer will design targeted questions based on job requirements, simulating a real interview scenario."
      ),
    },
    {
      step: 2,
      title: t("开始模拟面试", "Start Mock Interview"),
      description: t(
        "点击开始面试，AI 面试官会像真实面试一样向您提问。支持行为面试、技术面试等多种类型。",
        "Click to start the interview. The AI interviewer will ask questions like a real interviewer. Supports behavioral, technical, and various interview types."
      ),
    },
    {
      step: 3,
      title: t("回答 AI 提问", "Answer AI Questions"),
      description: t(
        "在文本框中输入您的回答，建议使用 STAR 法则（情境、任务、行动、结果）组织您的回答，展现专业素养。",
        "Type your answers in the text box. We recommend using the STAR method (Situation, Task, Action, Result) to organize your responses professionally."
      ),
    },
    {
      step: 4,
      title: t("获取反馈和改进建议", "Get Feedback and Suggestions"),
      description: t(
        "面试结束后，AI 将提供详细的反馈报告，包括回答评分、表现亮点和可改进之处，助您不断提升面试技巧。",
        "After the interview, AI will provide a detailed feedback report, including answer scores, highlights, and areas for improvement to help you continuously enhance interview skills."
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t("返回首页", "Back to Home")}
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container px-4 py-12 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("使用指南", "User Guide")}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t(
              "了解如何使用我们的 AI 工具提升您的求职竞争力",
              "Learn how to use our AI tools to enhance your job search competitiveness"
            )}
          </p>
        </div>

        {/* Resume Analysis Tutorial */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">
                  {t("简历分析教程", "Resume Analysis Tutorial")}
                </CardTitle>
                <CardDescription>
                  {t(
                    "4 个简单步骤，获取专业的简历优化建议",
                    "4 simple steps to get professional resume optimization suggestions"
                  )}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {resumeSteps.map((item, index) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      {item.step}
                    </div>
                    {index < resumeSteps.length - 1 && (
                      <div className="w-px h-full bg-border ml-4 mt-2" />
                    )}
                  </div>
                  <div className="pb-6">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mock Interview Tutorial */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">
                  {t("模拟面试教程", "Mock Interview Tutorial")}
                </CardTitle>
                <CardDescription>
                  {t(
                    "与 AI 面试官对话，提升面试表现",
                    "Practice with AI interviewer to improve your interview performance"
                  )}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {interviewSteps.map((item, index) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      {item.step}
                    </div>
                    {index < interviewSteps.length - 1 && (
                      <div className="w-px h-full bg-border ml-4 mt-2" />
                    )}
                  </div>
                  <div className="pb-6">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="bg-muted/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Lightbulb className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">
                {t("小贴士", "Pro Tips")}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  {t(
                    "简历分析和模拟面试可以配合使用，先优化简历再进行面试练习效果更佳",
                    "Use resume analysis and mock interview together - optimize your resume first, then practice interviewing for best results"
                  )}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  {t(
                    "建议针对不同的目标职位分别进行分析，获取更有针对性的建议",
                    "Analyze separately for different target positions to get more targeted suggestions"
                  )}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  {t(
                    "多次模拟面试可以帮助您熟悉常见问题，提升回答的流畅度和自信心",
                    "Multiple mock interviews help you get familiar with common questions and improve fluency and confidence"
                  )}
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/">
            <Button size="lg" className="gap-2">
              {t("开始使用", "Get Started")}
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Guide;
