import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import ErrorBoundary from '../components/ErrorBoundary';
import { AuthProvider } from '../lib/firebase/auth';
import { LanguageProvider } from '../lib/useLanguage';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <LanguageProvider>
        <SEO />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}
