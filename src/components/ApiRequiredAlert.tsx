import { AlertTriangle, Settings } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import ApiSettingsDialog from "./ApiSettingsDialog";

const ApiRequiredAlert = () => {
  return (
    <Alert variant="destructive" className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
      <AlertTriangle className="h-5 w-5 text-amber-600" />
      <AlertTitle className="text-amber-800 dark:text-amber-200">需要配置 AI API</AlertTitle>
      <AlertDescription className="text-amber-700 dark:text-amber-300">
        <p className="mb-3">
          使用简历分析和模拟面试功能需要配置 AI 服务 API。
          支持 OpenAI、Google Gemini、Claude、Azure AI 和 OpenRouter。
        </p>
        <ApiSettingsDialog
          trigger={
            <Button variant="outline" className="gap-2 border-amber-500 text-amber-700 hover:bg-amber-100 dark:border-amber-600 dark:text-amber-300 dark:hover:bg-amber-900/50">
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
