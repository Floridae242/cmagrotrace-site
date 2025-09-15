import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../lib/useLanguage';

export default function Footer(){
  const { t } = useLanguage();
  return (
    <footer className="border-t border-neutral-200 mt-12">
      <div className="container py-8 grid md:grid-cols-3 gap-6">
        <div>
          <div className="font-semibold">CM‑AgroTrace</div>
          <p className="small mt-2">QR traceability for Chiang Mai longan. Scan to see origin and timeline.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">{t('nav.links')}</div>
          <ul className="space-y-1 small">
            <li><Link href="/why">{t('nav.why')}</Link></li>
            <li><Link href="/features">{t('nav.features')}</Link></li>
            <li><Link href="/tech">{t('nav.tech')}</Link></li>
            <li><Link href="/faq">{t('nav.faq')}</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">{t('nav.contact')}</div>
          <p className="small">Email: pilot@cm-agrotrace.th</p>
          <LanguageSwitcher />
        </div>
      </div>
      <div className="border-t border-neutral-200 py-4">
        <div className="container small text-neutral-500">© {new Date().getFullYear()} CM‑AgroTrace. All rights reserved.</div>
      </div>
    </footer>
  );
}
