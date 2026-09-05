import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Seo from './Seo';
import LanguageSwitcher from './LanguageSwitcher';
import { useLocaleContext } from '../i18n/LocaleContext';
import { homePath } from '../i18n/routes';

// Soft-404 guard: rendered by the catch-all "*" route for any unknown path that
// reaches the client router. Emits noindex so it is never indexed; the server
// (Vercel) also returns a real 404 status for unknown paths - see vercel.json.
export default function NotFound() {
    const { locale, t } = useLocaleContext();
    return (
        <div className="min-h-screen bg-[#050505] text-white font-display selection:bg-white selection:text-black overflow-x-hidden relative flex items-center justify-center px-6">
            <Seo
                path="/404"
                title={t.seo.notFound.title}
                description={t.seo.notFound.description}
                noindex
                noAlternates
            />

            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-12">
                <div className="space-y-6">
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-10 h-px bg-white/20" />
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40">{t.notFound.eyebrow}</span>
                        <div className="w-10 h-px bg-white/20" />
                    </div>
                    <h1 className="text-7xl md:text-[12rem] font-black uppercase tracking-tighter leading-[0.75] text-white">
                        404
                    </h1>
                    <p className="text-white/40 text-base md:text-xl leading-[1.6] font-light tracking-wide">
                        {t.notFound.text}
                    </p>
                </div>

                <Link
                    to={homePath(locale)}
                    className="group inline-flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full pl-2 pr-8 py-2 hover:bg-white hover:text-black transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                >
                    <span className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-black/5 transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-[0.4em]">{t.notFound.cta}</span>
                </Link>

                <LanguageSwitcher tone="light" className="justify-center" />
            </div>
        </div>
    );
}
