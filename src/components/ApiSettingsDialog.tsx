import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApiConfig, API_PROVIDERS, ApiConfig } from "@/hooks/useApiConfig";
import { useLanguage } from "@/hooks/useLanguage";
import { Settings, Plus, Trash2, Check, Eye, EyeOff, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ApiSettingsDialogProps {
  trigger?: React.ReactNode;
}

const ApiSettingsDialog = ({ trigger }: ApiSettingsDialogProps) => {
  const { configs, activeConfig, addConfig, removeConfig, setActiveProvider } = useApiConfig();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({});

  // Form state
  const [provider, setProvider] = useState<ApiConfig["provider"]>("openai");
  const [apiKey, setApiKey] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [model, setModel] = useState("");

  const selectedProviderInfo = API_PROVIDERS.find((p) => p.id === provider);

  const resetForm = () => {
    setProvider("openai");
    setApiKey("");
    setBaseUrl("");
    setModel("");
    setShowAddForm(false);
  };

  const handleAddConfig = () => {
    if (!apiKey.trim()) {
      toast({
        title: t("请输入API密钥", "Please enter API key"),
        variant: "destructive",
      });
      return;
    }

    if (selectedProviderInfo?.requiresBaseUrl && !baseUrl.trim()) {
      toast({
        title: t("请输入API端点地址", "Please enter API endpoint"),
        variant: "destructive",
      });
      return;
    }

    addConfig({
      provider,
      apiKey: apiKey.trim(),
      baseUrl: baseUrl.trim() || selectedProviderInfo?.baseUrl,
      model: model || selectedProviderInfo?.defaultModel,
    });

    toast({
      title: t("API配置已保存", "API Configuration Saved"),
      description: `${selectedProviderInfo?.name} ${t("配置成功", "configured successfully")}`,
    });

    resetForm();
  };

  const handleRemoveConfig = (providerId: string) => {
    removeConfig(providerId);
    toast({
      title: t("API配置已删除", "API Configuration Removed"),
    });
  };

  const toggleShowApiKey = (providerId: string) => {
    setShowApiKey((prev) => ({ ...prev, [providerId]: !prev[providerId] }));
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return "••••••••";
    return key.slice(0, 4) + "••••••••" + key.slice(-4);
  };

  const existingProviders = configs.map((c) => c.provider);
  const availableProviders = API_PROVIDERS.filter(
    (p) => !existingProviders.includes(p.id)
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            {t("API 设置", "API Settings")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("AI API 配置", "AI API Configuration")}</DialogTitle>
          <DialogDescription>
            {t(
              "配置您的AI服务API密钥。支持多种AI服务商，可随时切换。",
              "Configure your AI API keys. Multiple providers supported, switch anytime."
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Existing Configs */}
          {configs.length > 0 && (
            <div className="space-y-3">
              <Label className="text-base">{t("已配置的服务", "Configured Services")}</Label>
              {configs.map((config) => {
                const providerInfo = API_PROVIDERS.find((p) => p.id === config.provider);
                const isActive = activeConfig?.provider === config.provider;
                return (
                  <Card
                    key={config.provider}
                    className={`transition-colors ${isActive ? "border-primary" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{providerInfo?.name}</span>
                              {isActive && (
                                <Badge variant="secondary" className="text-xs">
                                  <Check className="h-3 w-3 mr-1" />
                                  {t("当前使用", "Active")}
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                              <span>
                                {showApiKey[config.provider]
                                  ? config.apiKey
                                  : maskApiKey(config.apiKey)}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => toggleShowApiKey(config.provider)}
                              >
                                {showApiKey[config.provider] ? (
                                  <EyeOff className="h-3 w-3" />
                                ) : (
                                  <Eye className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                            {config.model && (
                              <div className="text-xs text-muted-foreground mt-1">
                                {t("模型", "Model")}: {config.model}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!isActive && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setActiveProvider(config.provider)}
                            >
                              {t("使用此服务", "Use This")}
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleRemoveConfig(config.provider)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Add New Config */}
          {!showAddForm && availableProviders.length > 0 && (
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => {
                setShowAddForm(true);
                setProvider(availableProviders[0].id);
              }}
            >
              <Plus className="h-4 w-4" />
              {t("添加 API 配置", "Add API Configuration")}
            </Button>
          )}

          {showAddForm && (
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base">{t("添加新的 API 配置", "Add New API Configuration")}</Label>
                  <Button variant="ghost" size="sm" onClick={resetForm}>
                    {t("取消", "Cancel")}
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>{t("选择服务商", "Select Provider")}</Label>
                  <Select value={provider} onValueChange={(v) => setProvider(v as ApiConfig["provider"])}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availableProviders.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          <div>
                            <div className="font-medium">{p.name}</div>
                            <div className="text-xs text-muted-foreground">{p.description}</div>
                          </div>
                        </SelectItem>
                      ))
                      }
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t("API 密钥", "API Key")}</Label>
                  <Input
                    type="password"
                    placeholder={t(
                      `请输入您的 ${selectedProviderInfo?.name} API 密钥`,
                      `Enter your ${selectedProviderInfo?.name} API key`
                    )}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    {t("API密钥仅保存在您的浏览器本地", "API key is stored locally in your browser")}
                    {selectedProviderInfo && (
                      <a
                        href={getApiKeyUrl(provider)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        {t("获取密钥", "Get Key")}
                        <ExternalLink className="h-3 w-3 ml-0.5" />
                      </a>
                    )}
                  </p>
                </div>

                {selectedProviderInfo?.requiresBaseUrl && (
                  <div className="space-y-2">
                    <Label>{t("API 端点地址", "API Endpoint")}</Label>
                    <Input
                      placeholder={t(
                        "例如: https://your-resource.openai.azure.com",
                        "e.g., https://your-resource.openai.azure.com"
                      )}
                      value={baseUrl}
                      onChange={(e) => setBaseUrl(e.target.value)}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label>{t("模型（可选）", "Model (Optional)")}</Label>
                  <Select value={model || selectedProviderInfo?.defaultModel} onValueChange={setModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedProviderInfo?.models.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))
                      }
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleAddConfig} className="w-full">
                  {t("保存配置", "Save Configuration")}
                </Button>
              </CardContent>
            </Card>
          )}

          {configs.length === 0 && !showAddForm && (
            <div className="text-center py-8 text-muted-foreground">
              <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>{t("尚未配置任何 API", "No API configured yet")}</p>
              <p className="text-sm">{t("请添加至少一个 AI 服务 API 以使用分析功能", "Add at least one AI API to use analysis features")}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

function getApiKeyUrl(provider: string): string {
  switch (provider) {
    case "openai":
      return "https://platform.openai.com/api-keys";
    case "gemini":
      return "https://aistudio.google.com/app/apikey";
    case "claude":
      return "https://console.anthropic.com/settings/keys";
    case "azure":
      return "https://portal.azure.com/#blade/Microsoft_Azure_ProjectOxford/CognitiveServicesHub/OpenAI";
    case "openrouter":
      return "https://openrouter.ai/keys";
    default:
      return "#";
  }
}

export default ApiSettingsDialog;
