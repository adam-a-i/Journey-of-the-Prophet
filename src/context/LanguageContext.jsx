import { createContext, useState, useContext } from 'react';
import { translations } from '../translations';

// Add debug logging
console.log('Available translations:', translations);

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  
  const t = (key) => {
    // Add error handling and debugging
    if (!translations[language]) {
      console.error(`No translations found for language: ${language}`);
      return '';
    }
    if (!translations[language][key]) {
      console.error(`No translation found for key: ${key} in language: ${language}`);
      return key;
    }
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext); 