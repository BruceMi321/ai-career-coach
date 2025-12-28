import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const HR_EVALUATION_PROMPT = `你是一位资深的HR专家和职业顾问，拥有15年以上的招聘和人才评估经验。

请根据以下HR评估框架对简历进行全面分析：

## 评估维度（总分100分）

### 1. 岗位匹配度（25分）
- 技能匹配：候选人的技术技能是否符合JD要求
- 经验匹配：工作年限和行业经验是否满足
- 学历匹配：教育背景是否符合要求

### 2. 工作经历质量（25分）
- 职业发展路径：是否有清晰的晋升轨迹
- 成就量化：是否用数据和成果描述工作
- 项目经验：是否有相关的项目案例

### 3. 简历呈现专业度（20分）
- 结构清晰度：信息组织是否合理
- 语言表达：是否简洁专业
- 关键词优化：是否包含行业关键词

### 4. 个人特质与软技能（15分）
- 团队协作：是否体现团队合作能力
- 领导力：是否有带团队经验
- 学习能力：是否有持续学习的证据

### 5. 竞争优势分析（15分）
- 独特亮点：有哪些突出的优势
- 潜在风险：有哪些可能的短板
- 市场竞争力：在人才市场的定位

请按以下JSON格式输出分析结果：
{
  "totalScore": 数字,
  "dimensions": [
    {
      "name": "维度名称",
      "score": 数字,
      "maxScore": 数字,
      "analysis": "详细分析",
      "suggestions": ["改进建议1", "改进建议2"]
    }
  ],
  "overallAnalysis": "总体评价",
  "keyStrengths": ["优势1", "优势2", "优势3"],
  "keyWeaknesses": ["不足1", "不足2"],
  "prioritizedSuggestions": [
    {
      "priority": "高/中/低",
      "suggestion": "建议内容",
      "reason": "原因说明"
    }
  ],
  "optimizedSections": {
    "summary": "优化后的个人简介",
    "experience": "优化后的工作经历描述示例"
  }
}`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { resume, jobDescription } = await req.json();
    
    if (!resume || !jobDescription) {
      return new Response(
        JSON.stringify({ error: "请提供简历和职位描述" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Analyzing resume with AI...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: HR_EVALUATION_PROMPT },
          { 
            role: "user", 
            content: `请分析以下简历与职位的匹配度：

## 目标职位描述（JD）
${jobDescription}

## 候选人简历
${resume}

请按照评估框架进行全面分析，并以JSON格式输出结果。`
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "请求过于频繁，请稍后再试" }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI服务额度已用尽，请联系管理员" }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Try to parse JSON from the response
    let analysisResult;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || 
                        content.match(/```\n?([\s\S]*?)\n?```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      analysisResult = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      // Return the raw content if JSON parsing fails
      analysisResult = { 
        rawAnalysis: content,
        parseError: true 
      };
    }

    console.log("Resume analysis completed successfully");

    return new Response(
      JSON.stringify({ analysis: analysisResult }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in analyze-resume function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "分析失败，请稍后重试" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
