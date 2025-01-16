import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      className="language-switcher"
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
    >
      {language === 'en' ? 'عربي' : 'English'}
    </button>
  );
};

export default LanguageSwitcher; 