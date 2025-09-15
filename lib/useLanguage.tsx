import { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'th';
type Translations = Record<string, any>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations>({});

  useEffect(() => {
    // Try to load language from localStorage
    const storedLang = localStorage.getItem('language') as Language;
    if (storedLang) {
      setLanguage(storedLang);
    }

    // Load translations for current language
    import(`../i18n/${language}.json`)
      .then((module) => setTranslations(module.default))
      .catch(console.error);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }

    return typeof value === 'string' ? value : key;
  };

  const handleSetLanguage = (lang: Language) => {
    localStorage.setItem('language', lang);
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}