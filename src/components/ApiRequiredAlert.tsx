import { AlertTriangle, Settings } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import ApiSettingsDialog from "./ApiSettingsDialog";

const ApiRequiredAlert = () => {
  const { t } = useLanguage();

  return (
    <Alert variant="warning">
      <AlertTriangle className="h-5 w-5" />
      <AlertTitle>{t("需要配置 AI API", "AI API Configuration Required")}</AlertTitle>
      <AlertDescription>
        <p className="mb-4">
          {t(
            "使用简历分析和模拟面试功能需要配置 AI 服务 API。支持 OpenAI、Google Gemini、Claude、Azure AI 和 OpenRouter。",
            "Resume analysis and mock interview features require an AI API. Supports OpenAI, Google Gemini, Claude, Azure AI, and OpenRouter."
          )}
        </p>
        <ApiSettingsDialog
          trigger={
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              {t("立即配置 API", "Configure API Now")}
            </Button>
          }
        />
      </AlertDescription>
    </Alert>
  );
};

export default ApiRequiredAlert;
