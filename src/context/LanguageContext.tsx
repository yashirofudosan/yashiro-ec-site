"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { dictionaries, Locale } from "@/i18n/dictionaries";

interface LanguageContextType {
  locale: Locale;
  toggleLanguage: () => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const toggleLanguage = () => {
    setLocale(prev => prev === "en" ? "ja" : "en");
  };

  const t = (path: string) => {
    const keys = path.split(".");
    let current: any = dictionaries[locale];
    for (const key of keys) {
      if (current[key] === undefined) {
        return path; // Fallback to path key if not found
      }
      current = current[key];
    }
    return current as string;
  };

  return (
    <LanguageContext.Provider value={{ locale, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
