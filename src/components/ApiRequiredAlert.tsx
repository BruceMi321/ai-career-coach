import { AlertTriangle, Settings } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import ApiSettingsDialog from "./ApiSettingsDialog";

const ApiRequiredAlert = () => {
  return (
    <Alert variant="warning">
      <AlertTriangle className="h-5 w-5" />
      <AlertTitle>需要配置 AI API</AlertTitle>
      <AlertDescription>
        <p className="mb-4">
          使用简历分析和模拟面试功能需要配置 AI 服务 API。
          支持 OpenAI、Google Gemini、Claude、Azure AI 和 OpenRouter。
        </p>
        <ApiSettingsDialog
          trigger={
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              立即配置 API
            </Button>
          }
        />
      </AlertDescription>
    </Alert>
  );
};

export default ApiRequiredAlert;
