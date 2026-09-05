import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail } from "lucide-react";
import { useEffect } from "react";
import {
  ResponsiveImage,
  IMAGE_SIZES,
  intrinsicFromSrc,
} from "./ResponsiveImage";
import Seo from "./Seo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocaleContext } from "../i18n/LocaleContext";
import { homePath } from "../i18n/routes";

type LegalType = "mentions" | "privacy" | "cookies";

export default function LegalPage({ type }: { type: LegalType }) {
  const { locale, t } = useLocaleContext();
  const activeContent = t.legal.docs[type];
  const seo = t.legal.seo[type];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type, locale]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-display selection:bg-white selection:text-black overflow-x-hidden relative">
      <Seo title={seo.title} description={seo.description} />
      {/* Grain Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3BaseFilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/baseFilter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-60 px-6 md:px-12 py-10 flex justify-between items-center">
        <Link
          to={homePath(locale)}
          className="group flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full pl-2 pr-8 py-2 hover:bg-white hover:text-black transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
        >
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-black/5 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-[0.4em]">
            {t.nav.back}
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <LanguageSwitcher tone="light" />
        <div className="hidden md:block">
          <ResponsiveImage
            src="/img/logo-archimade.webp"
            alt={t.alt.logo}
            width={intrinsicFromSrc("/img/logo-archimade.webp").width}
            height={intrinsicFromSrc("/img/logo-archimade.webp").height}
            loading="lazy"
            sizes={IMAGE_SIZES.logo}
            className="h-7 w-auto invert opacity-30 hover:opacity-100 transition-opacity duration-700"
          />
        </div>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24 pt-48 pb-40">
        {/* Huge Header (Full Width) */}
        <header className="mb-32 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-px bg-white/20" />
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40">
                {t.legal.eyebrow}
              </span>
            </div>
            <h1 className="text-6xl md:text-[10rem] xl:text-[13rem] font-black uppercase tracking-tighter leading-[0.75] text-white">
              {activeContent.title}
              <span className="block text-white/5 outline-text">
                {activeContent.subtitle}
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
            className="h-px w-full bg-white/10 origin-left"
          />
        </header>

        {/* Content Sections (Single Column) */}
        <div className="space-y-32">
          {activeContent.sections.map((section, idx) => (
            <motion.section
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="relative group"
            >
              <div className="space-y-10">
                <div className="flex items-center gap-8">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-white/30 tabular-nums">
                    0{idx + 1}
                  </div>
                  <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tight text-white group-hover:pl-4 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
                    {section.h}
                  </h2>
                </div>
                <div className="pl-20 relative">
                  <div className="absolute left-6 top-0 bottom-0 w-px bg-linear-to-b from-white/20 via-white/5 to-transparent" />
                  <div className="text-white/40 text-base md:text-xl leading-[1.6] whitespace-pre-wrap font-light tracking-wide max-w-4xl text-left md:text-justify">
                    {section.p}
                  </div>
                </div>
              </div>
            </motion.section>
          ))}

          {/* Bottom Contact CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="pt-32 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-16"
          >
            <div className="flex items-center gap-8 group">
              <div className="w-20 h-20 rounded-2xl border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
                <Mail className="w-8 h-8" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-black mb-2">
                  {t.legal.help}
                </p>
                <a
                  href="mailto:contact@archi-made.com"
                  className="text-3xl font-black tracking-tight hover:opacity-50 transition-opacity"
                >
                  contact@archi-made.com
                </a>
              </div>
            </div>
            <div className="text-center md:text-right space-y-2">
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-white/20">
                © {__BUILD_YEAR__} ArchiMade Studio
              </p>
              <p className="text-[9px] uppercase tracking-[0.5em] text-white/10">
                {t.footer.tagline}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
                .outline-text {
                    -webkit-text-stroke: 1px rgba(255,255,255,0.15);
                    color: transparent;
                }
            `,
        }}
      />
    </div>
  );
}
