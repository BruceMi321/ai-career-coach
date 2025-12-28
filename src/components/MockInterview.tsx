import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Send, MessageSquare, User, Bot, Play } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface MockInterviewProps {
  jobDescription: string;
}

const INTERVIEW_TYPES = [
  { value: "behavioral", label: "行为面试", description: "基于STAR法则的行为问题" },
  { value: "technical", label: "技术面试", description: "技术能力和专业知识" },
  { value: "situational", label: "情景面试", description: "假设场景的应对能力" },
  { value: "comprehensive", label: "综合面试", description: "全面评估各方面能力" },
];

const MockInterview = ({ jobDescription }: MockInterviewProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [interviewType, setInterviewType] = useState("behavioral");
  const [isStarted, setIsStarted] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const startInterview = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "请先填写职位描述",
        description: "需要职位描述才能开始模拟面试",
        variant: "destructive",
      });
      return;
    }

    setIsStarted(true);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mock-interview`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: [{ role: "user", content: "请开始面试" }],
            jobDescription,
            interviewType,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to start interview");
      }

      await streamResponse(response, []);
    } catch (error) {
      console.error("Interview error:", error);
      toast({
        title: "面试启动失败",
        description: "请稍后重试",
        variant: "destructive",
      });
      setIsStarted(false);
    } finally {
      setIsLoading(false);
    }
  };

  const streamResponse = async (response: Response, currentMessages: Message[]) => {
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let assistantMessage = "";

    if (!reader) return;

    // Add empty assistant message
    setMessages([...currentMessages, { role: "assistant", content: "" }]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ") && line !== "data: [DONE]") {
          try {
            const data = JSON.parse(line.slice(6));
            const content = data.choices?.[0]?.delta?.content;
            if (content) {
              assistantMessage += content;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: assistantMessage };
                return updated;
              });
            }
          } catch (e) {
            // Ignore parse errors for incomplete chunks
          }
        }
      }
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: inputMessage };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mock-interview`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
            jobDescription,
            interviewType,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      await streamResponse(response, updatedMessages);
    } catch (error) {
      console.error("Message error:", error);
      toast({
        title: "发送失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetInterview = () => {
    setMessages([]);
    setIsStarted(false);
  };

  if (!isStarted) {
    return (
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            AI 模拟面试
          </CardTitle>
          <CardDescription>
            选择面试类型，开始模拟面试练习
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">面试类型</label>
            <Select value={interviewType} onValueChange={setInterviewType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {INTERVIEW_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div>
                      <div className="font-medium">{type.label}</div>
                      <div className="text-xs text-muted-foreground">{type.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {!jobDescription.trim() && (
            <p className="text-sm text-amber-600 bg-amber-50 dark:bg-amber-950/50 p-3 rounded-lg">
              请先在上方填写职位描述，然后开始模拟面试
            </p>
          )}

          <Button 
            onClick={startInterview} 
            className="w-full gap-2"
            disabled={!jobDescription.trim() || isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            开始模拟面试
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            模拟面试进行中
          </CardTitle>
          <CardDescription>
            {INTERVIEW_TYPES.find(t => t.value === interviewType)?.label}
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={resetInterview}>
          结束面试
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-[400px] pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
              >
                {message.role === "assistant" && (
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex gap-2">
          <Textarea
            placeholder="输入您的回答..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            className="min-h-[80px] resize-none"
            disabled={isLoading}
          />
          <Button 
            onClick={sendMessage} 
            disabled={!inputMessage.trim() || isLoading}
            size="icon"
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MockInterview;
