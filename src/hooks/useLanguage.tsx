import { createContext, useContext, useState, useEffect } from "react";

type Language = "zh" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (zh: string, en: string) => string;
  isTransitioning: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem("language");
    if (stored === "zh" || stored === "en") return stored;
    return "zh";
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSetLanguage = (lang: Language) => {
    if (lang === language) return;
    
    setIsTransitioning(true);
    
    // Small delay for fade out effect
    setTimeout(() => {
      setLanguage(lang);
      localStorage.setItem("language", lang);
      
      // Fade back in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 150);
    }, 150);
  };

  const t = (zh: string, en: string) => {
    return language === "zh" ? zh : en;
  };

  // Add transition class to body during language switch
  useEffect(() => {
    if (isTransitioning) {
      document.body.classList.add("language-transitioning");
    } else {
      document.body.classList.remove("language-transitioning");
    }
  }, [isTransitioning]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, isTransitioning }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
