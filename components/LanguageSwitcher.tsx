import { useLanguage } from '../lib/useLanguage';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2 items-center text-sm">
      <span className="text-neutral-500">Language:</span>
      <button
        onClick={() => setLanguage('en')}
        className={language === 'en' ? 'text-primary-600 font-medium' : 'text-neutral-600 hover:text-neutral-900'}
      >
        EN
      </button>
      <span className="text-neutral-300">/</span>
      <button
        onClick={() => setLanguage('th')}
        className={language === 'th' ? 'text-primary-600 font-medium' : 'text-neutral-600 hover:text-neutral-900'}
      >
        TH
      </button>
    </div>
  );
}