import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ChevronDown, Mail } from "lucide-react";
import {
  ResponsiveImage,
  IMAGE_SIZES,
  intrinsicFromSrc,
} from "./ResponsiveImage";
import Seo, { SITE_URL } from "./Seo";
import { ORG_ID } from "./StructuredData";
import {
  type DedicatedPage as PageData,
  type Crumb,
  getPageBySlug,
} from "../data/pages";

const AREA_SERVED = [
  { "@type": "AdministrativeArea", name: "Indre-et-Loire" },
  { "@type": "City", name: "Tours" },
  { "@type": "Country", name: "France" },
];

function abs(path: string): string {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}

// BreadcrumbList + a Service node (service pages) or area-served Service node
// (location pages). provider links back to the shared Organization @id so every
// sub-page schema is unified with the home entity graph.
function PageSchema({ page }: { page: PageData }) {
  const crumbs: Crumb[] = [
    { name: "Accueil", path: "/" },
    ...page.trail,
    { name: page.crumb, path: page.slug },
  ];

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };

  const service =
    page.kind === "service"
      ? {
          "@type": "Service",
          "@id": `${abs(page.slug)}#service`,
          name: page.serviceName,
          serviceType: page.serviceType,
          description: page.description,
          url: abs(page.slug),
          provider: { "@id": ORG_ID },
          areaServed: AREA_SERVED,
        }
      : {
          "@type": "Service",
          "@id": `${abs(page.slug)}#service`,
          name: `Dessinateur en bâtiment à ${page.place}`,
          serviceType: "Conception de plans et dossiers d'urbanisme",
          description: page.description,
          url: abs(page.slug),
          provider: { "@id": ORG_ID },
          areaServed: [
            {
              "@type": page.placeType ?? "City",
              name: page.place,
            },
          ],
        };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [breadcrumb, service],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(graph)}</script>
    </Helmet>
  );
}

function FaqList({ faq }: { faq: PageData["faq"] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div className="space-y-1">
      {faq.map((item, i) => {
        const open = openFaq === i;
        const answerId = `page-faq-answer-${i}`;
        return (
          <div key={i} className="border-b border-white/10">
            <button
              onClick={() => setOpenFaq(open ? null : i)}
              aria-expanded={open}
              aria-controls={answerId}
              className="w-full py-6 flex justify-between items-center text-left gap-6 group"
            >
              <span className="text-base md:text-lg font-bold tracking-tight text-white group-hover:pl-2 transition-all duration-300">
                {item.q}
              </span>
              <span
                className={
                  "shrink-0 w-5 h-5 flex items-center justify-center transition-transform duration-500 " +
                  (open ? "rotate-180" : "rotate-0")
                }
              >
                <ChevronDown className="w-4 h-4 text-white/30" />
              </span>
            </button>
            {/* Answer ALWAYS mounted (crawlable in raw HTML); animated height/
                opacity on the persistent node. Collapsed = aria-hidden + inert. */}
            <motion.div
              id={answerId}
              initial={false}
              animate={open ? "open" : "closed"}
              variants={{
                open: { height: "auto", opacity: 1 },
                closed: { height: 0, opacity: 0 },
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden={!open}
              inert={!open ? true : undefined}
              className="overflow-hidden"
            >
              <p className="pb-6 pr-10 text-white/50 text-base leading-relaxed font-light max-w-3xl">
                {item.a}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

export default function DedicatedPage({ page }: { page: PageData }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page.slug]);

  const crumbs: Crumb[] = [
    { name: "Accueil", path: "/" },
    ...page.trail,
    { name: page.crumb, path: page.slug },
  ];
  const heroIntrinsic = intrinsicFromSrc(page.hero.src);
  const related = page.related
    .map((slug) => getPageBySlug(slug))
    .filter((p): p is PageData => Boolean(p));

  return (
    <div className="min-h-screen bg-[#050505] text-white font-display selection:bg-white selection:text-black overflow-x-hidden relative">
      <Seo path={page.slug} title={page.title} description={page.description} />
      <PageSchema page={page} />

      {/* Grain Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3BaseFilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/baseFilter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-60 px-6 md:px-12 py-10 flex justify-between items-center">
        <Link
          to="/"
          className="group flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full pl-2 pr-8 py-2 hover:bg-white hover:text-black transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
        >
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-black/5 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-[0.4em]">
            Accueil
          </span>
        </Link>
        <div className="hidden md:block">
          <ResponsiveImage
            src="/img/logo-archimade.webp"
            alt="ArchiMade Studio, dessinateur en bâtiment à Tours"
            width={intrinsicFromSrc("/img/logo-archimade.webp").width}
            height={intrinsicFromSrc("/img/logo-archimade.webp").height}
            loading="lazy"
            sizes={IMAGE_SIZES.logo}
            className="h-7 w-auto invert opacity-30 hover:opacity-100 transition-opacity duration-700"
          />
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24 pt-40 pb-32">
        {/* Breadcrumb */}
        <nav
          aria-label="Fil d'Ariane"
          className="mb-12 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/30 font-bold"
        >
          {crumbs.map((c, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <span key={c.path} className="flex items-center gap-2">
                {isLast ? (
                  <span className="text-white/60">{c.name}</span>
                ) : (
                  <Link
                    to={c.path}
                    className="hover:text-white transition-colors"
                  >
                    {c.name}
                  </Link>
                )}
                {!isLast && <span className="text-white/15">/</span>}
              </span>
            );
          })}
        </nav>

        {/* Header */}
        <header className="mb-16 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-px bg-white/20" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">
                {page.eyebrow}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl xl:text-7xl font-black uppercase tracking-tighter leading-[0.95] text-white max-w-5xl">
              {page.h1}
            </h1>
            <p className="page-lead text-lg md:text-2xl text-white/50 font-light leading-relaxed max-w-3xl whitespace-pre-line">
              {page.intro}
            </p>
          </motion.div>
        </header>

        {/* Hero image (above the fold -> eager + high priority for LCP) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mb-24 overflow-hidden rounded-3xl border border-white/10"
        >
          <ResponsiveImage
            src={page.hero.src}
            alt={page.hero.alt}
            width={heroIntrinsic.width}
            height={heroIntrinsic.height}
            loading="eager"
            fetchPriority="high"
            sizes={IMAGE_SIZES.galleryWide}
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* Content sections */}
        <article className="page-body space-y-24">
          {page.sections.map((section, idx) => (
            <motion.section
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
              className="group"
            >
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-white/30 tabular-nums">
                    0{idx + 1}
                  </div>
                  <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
                    {section.h2}
                  </h2>
                </div>
                <div className="pl-16 relative space-y-6">
                  <div className="absolute left-5 top-0 bottom-0 w-px bg-linear-to-b from-white/20 via-white/5 to-transparent" />
                  {section.paras.map((p, pi) => (
                    <p
                      key={pi}
                      className="text-white/50 text-base md:text-xl leading-[1.7] font-light tracking-wide max-w-4xl"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </motion.section>
          ))}

          {/* FAQ */}
          <section className="pt-8">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-px bg-white/20" />
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
                Questions fréquentes
              </h2>
            </div>
            <FaqList faq={page.faq} />
          </section>
        </article>

        {/* Related pages */}
        {related.length > 0 && (
          <section className="mt-28 pt-16 border-t border-white/10">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mb-8">
              À découvrir aussi
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={r.slug}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-6 hover:bg-white hover:text-black transition-all duration-500"
                >
                  <span className="text-sm font-bold uppercase tracking-tight leading-snug">
                    {r.crumb}
                  </span>
                  <ArrowUpRight className="w-5 h-5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mt-20 pt-16 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
              Demander un devis gratuit
            </h2>
            <p className="text-white/40 font-light max-w-md leading-relaxed">
              Présentez-nous votre projet : nous étudions sa faisabilité et vous
              répondons sans engagement.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <Link
                to="/#contact"
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-white/90 transition-colors"
              >
                Demander un devis gratuit
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:contact@archi-made.com"
                className="inline-flex items-center gap-2 text-sm font-bold text-white/60 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                contact@archi-made.com
              </a>
            </div>
          </div>
          <div className="text-left md:text-right space-y-2 shrink-0">
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-white/20">
              © {__BUILD_YEAR__} ArchiMade Studio
            </p>
            <p className="text-[9px] uppercase tracking-[0.4em] text-white/10">
              Conception de plans & modélisation 3D, Indre-et-Loire & France
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
