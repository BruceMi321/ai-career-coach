import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const INTERVIEWER_PROMPT = `你是一位资深的面试官，拥有丰富的招聘经验。你的任务是根据职位描述对候选人进行模拟面试。

## 面试风格
- 专业但友好，创造真实的面试氛围
- 根据候选人的回答进行追问，深入了解能力
- 提供即时、建设性的反馈

## 面试类型
根据 interview_type 参数选择问题类型：
- behavioral: 行为面试问题（STAR法则）
- technical: 技术能力问题
- situational: 情景模拟问题
- comprehensive: 综合面试

## 回复格式
你的回复应该是纯文本，直接作为面试官说话。
- 如果是开始面试，先简单介绍自己和面试流程
- 提出一个具体的面试问题
- 如果候选人回答了问题，给予简短评价并追问或提出新问题
- 保持对话自然流畅`;

interface ApiConfig {
  provider: string;
  apiKey: string;
  baseUrl?: string;
  model?: string;
}

async function streamOpenAI(apiConfig: ApiConfig, messages: Array<{role: string; content: string}>) {
  const response = await fetch(`${apiConfig.baseUrl || 'https://api.openai.com/v1'}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiConfig.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: apiConfig.model || "gpt-4o-mini",
      messages,
      stream: true,
    }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${error}`);
  }
  
  return response;
}

async function streamGemini(apiConfig: ApiConfig, messages: Array<{role: string; content: string}>) {
  const model = apiConfig.model || "gemini-2.0-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?key=${apiConfig.apiKey}&alt=sse`;
  
  const contents = messages
    .filter(m => m.role !== "system")
    .map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));
  
  const systemInstruction = messages.find(m => m.role === "system");
  
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction.content }] } : undefined,
    }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${error}`);
  }
  
  // Transform Gemini SSE to OpenAI-compatible SSE
  const reader = response.body?.getReader();
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async pull(controller) {
      if (!reader) {
        controller.close();
        return;
      }
      
      const { done, value } = await reader.read();
      if (done) {
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
        return;
      }
      
      const text = new TextDecoder().decode(value);
      const lines = text.split("\n");
      
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const data = JSON.parse(line.slice(6));
            const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (content) {
              const openaiFormat = {
                choices: [{ delta: { content } }]
              };
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(openaiFormat)}\n\n`));
            }
          } catch (e) {
            // Ignore parse errors
          }
        }
      }
    }
  });
  
  return new Response(stream, {
    headers: { "Content-Type": "text/event-stream" }
  });
}

async function streamClaude(apiConfig: ApiConfig, messages: Array<{role: string; content: string}>) {
  const systemMessage = messages.find(m => m.role === "system");
  const otherMessages = messages.filter(m => m.role !== "system");
  
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiConfig.apiKey,
      "Content-Type": "application/json",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: apiConfig.model || "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      stream: true,
      system: systemMessage?.content,
      messages: otherMessages,
    }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Claude API error: ${response.status} - ${error}`);
  }
  
  // Transform Claude SSE to OpenAI-compatible SSE
  const reader = response.body?.getReader();
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async pull(controller) {
      if (!reader) {
        controller.close();
        return;
      }
      
      const { done, value } = await reader.read();
      if (done) {
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
        return;
      }
      
      const text = new TextDecoder().decode(value);
      const lines = text.split("\n");
      
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.type === "content_block_delta" && data.delta?.text) {
              const openaiFormat = {
                choices: [{ delta: { content: data.delta.text } }]
              };
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(openaiFormat)}\n\n`));
            }
          } catch (e) {
            // Ignore parse errors
          }
        }
      }
    }
  });
  
  return new Response(stream, {
    headers: { "Content-Type": "text/event-stream" }
  });
}

async function streamOpenRouter(apiConfig: ApiConfig, messages: Array<{role: string; content: string}>) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiConfig.apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://career-coach.lovable.app",
    },
    body: JSON.stringify({
      model: apiConfig.model || "openai/gpt-4o-mini",
      messages,
      stream: true,
    }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
  }
  
  return response;
}

async function streamAI(apiConfig: ApiConfig, messages: Array<{role: string; content: string}>) {
  switch (apiConfig.provider) {
    case "openai":
    case "azure":
      return streamOpenAI(apiConfig, messages);
    case "gemini":
      return streamGemini(apiConfig, messages);
    case "claude":
      return streamClaude(apiConfig, messages);
    case "openrouter":
      return streamOpenRouter(apiConfig, messages);
    default:
      throw new Error(`Unsupported provider: ${apiConfig.provider}`);
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, jobDescription, interviewType = 'behavioral', apiConfig } = await req.json();

    if (!apiConfig || !apiConfig.apiKey) {
      return new Response(
        JSON.stringify({ error: "请先配置AI API" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Starting mock interview with ${apiConfig.provider} - type: ${interviewType}`);

    const systemMessage = `${INTERVIEWER_PROMPT}

## 目标职位描述
${jobDescription}

## 当前面试类型
${interviewType}`;

    const fullMessages = [
      { role: "system", content: systemMessage },
      ...messages
    ];

    const response = await streamAI(apiConfig, fullMessages);

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });

  } catch (error) {
    console.error("Error in mock-interview function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "面试服务暂时不可用" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
