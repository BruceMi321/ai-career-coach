import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface ApiConfig {
  provider: "openai" | "gemini" | "claude" | "azure" | "openrouter";
  apiKey: string;
  baseUrl?: string;
  model?: string;
}

export const API_PROVIDERS = [
  {
    id: "openai" as const,
    name: "OpenAI",
    description: "GPT-4o, GPT-4, GPT-3.5等模型",
    baseUrl: "https://api.openai.com/v1",
    defaultModel: "gpt-4o-mini",
    models: ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-3.5-turbo"],
  },
  {
    id: "gemini" as const,
    name: "Google Gemini",
    description: "Gemini Pro, Gemini Flash等模型",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    defaultModel: "gemini-2.0-flash",
    models: ["gemini-2.0-flash", "gemini-1.5-pro", "gemini-1.5-flash"],
  },
  {
    id: "claude" as const,
    name: "Anthropic Claude",
    description: "Claude 3.5 Sonnet, Claude 3 Opus等模型",
    baseUrl: "https://api.anthropic.com/v1",
    defaultModel: "claude-3-5-sonnet-20241022",
    models: ["claude-3-5-sonnet-20241022", "claude-3-opus-20240229", "claude-3-haiku-20240307"],
  },
  {
    id: "azure" as const,
    name: "Microsoft Azure AI",
    description: "Azure OpenAI服务",
    baseUrl: "",
    defaultModel: "gpt-4o",
    models: ["gpt-4o", "gpt-4", "gpt-35-turbo"],
    requiresBaseUrl: true,
  },
  {
    id: "openrouter" as const,
    name: "OpenRouter",
    description: "统一接口访问多种模型",
    baseUrl: "https://openrouter.ai/api/v1",
    defaultModel: "openai/gpt-4o-mini",
    models: ["openai/gpt-4o", "openai/gpt-4o-mini", "anthropic/claude-3.5-sonnet", "google/gemini-pro"],
  },
];

interface ApiConfigContextType {
  configs: ApiConfig[];
  activeConfig: ApiConfig | null;
  addConfig: (config: ApiConfig) => void;
  removeConfig: (provider: string) => void;
  setActiveProvider: (provider: string) => void;
  hasApiConfig: boolean;
}

const ApiConfigContext = createContext<ApiConfigContextType | undefined>(undefined);

const STORAGE_KEY = "career-coach-api-configs";
const ACTIVE_KEY = "career-coach-active-provider";

export const ApiConfigProvider = ({ children }: { children: ReactNode }) => {
  const [configs, setConfigs] = useState<ApiConfig[]>([]);
  const [activeProvider, setActiveProviderState] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const activeStored = localStorage.getItem(ACTIVE_KEY);
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setConfigs(parsed);
        if (activeStored && parsed.some((c: ApiConfig) => c.provider === activeStored)) {
          setActiveProviderState(activeStored);
        } else if (parsed.length > 0) {
          setActiveProviderState(parsed[0].provider);
        }
      } catch (e) {
        console.error("Failed to parse stored API configs:", e);
      }
    }
  }, []);

  const saveConfigs = (newConfigs: ApiConfig[]) => {
    setConfigs(newConfigs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfigs));
  };

  const addConfig = (config: ApiConfig) => {
    const newConfigs = configs.filter((c) => c.provider !== config.provider);
    newConfigs.push(config);
    saveConfigs(newConfigs);
    
    if (!activeProvider || !newConfigs.some((c) => c.provider === activeProvider)) {
      setActiveProvider(config.provider);
    }
  };

  const removeConfig = (provider: string) => {
    const newConfigs = configs.filter((c) => c.provider !== provider);
    saveConfigs(newConfigs);
    
    if (activeProvider === provider && newConfigs.length > 0) {
      setActiveProvider(newConfigs[0].provider);
    } else if (newConfigs.length === 0) {
      setActiveProviderState("");
      localStorage.removeItem(ACTIVE_KEY);
    }
  };

  const setActiveProvider = (provider: string) => {
    setActiveProviderState(provider);
    localStorage.setItem(ACTIVE_KEY, provider);
  };

  const activeConfig = configs.find((c) => c.provider === activeProvider) || null;
  const hasApiConfig = configs.length > 0;

  return (
    <ApiConfigContext.Provider
      value={{
        configs,
        activeConfig,
        addConfig,
        removeConfig,
        setActiveProvider,
        hasApiConfig,
      }}
    >
      {children}
    </ApiConfigContext.Provider>
  );
};

export const useApiConfig = () => {
  const context = useContext(ApiConfigContext);
  if (context === undefined) {
    throw new Error("useApiConfig must be used within an ApiConfigProvider");
  }
  return context;
};
