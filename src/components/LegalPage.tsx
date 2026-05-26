import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, ShieldCheck, Cookie, Scale, FileText, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

type LegalType = 'mentions' | 'privacy' | 'cookies';

const content = {
    mentions: {
        title: "Mentions",
        subtitle: "Légales",
        icon: <Scale className="w-5 h-5 text-white/40" />,
        sections: [
            {
                h: "Éditeur du site",
                p: "Le site internet ArchiMade, accessible à l’adresse www.archi-made.com, est édité par :\n\nARCHI-MADE LTD\nStatut juridique : Société commerciale étrangère immatriculée au RCS\nCapital social : 1 000 €\nSiège social : 20 Wenlock Road, W1B 3HH London, Royaume-Uni\nSIRET : 101 715 993 00024\nRCS : RCS Tours\nNuméro de TVA intracommunautaire : non indiqué (à compléter si applicable)\nAdresse email : contact@archi-made.com\n\nDirecteur de la publication : Damien DE SOUSA"
            },
            {
                h: "Hébergement",
                p: "Le site est hébergé par :\n\nSquarespace Domains LLC\nAdresse : 225 Varick Street, New York, NY 10014, États-Unis\nSite internet : https://domains.squarespace.com"
            },
            {
                h: "Activité",
                p: "ArchiMade accompagne ses clients dans la conception et la formalisation de projets architecturaux, notamment à travers la réalisation de dossiers administratifs, déclarations préalables, permis de construire, plans techniques, plans d’exécution et modélisations 3D.\n\nLes informations présentées sur le site ont une vocation informative et commerciale. Elles ne constituent pas un engagement contractuel ferme tant qu’un devis, une proposition ou un contrat n’a pas été validé par les parties."
            },
            {
                h: "Propriété intellectuelle",
                p: "L’ensemble des contenus présents sur le site, incluant notamment les textes, visuels, photographies, graphismes, logos, éléments de mise en page, icônes, vidéos, documents téléchargeables et structure générale du site, est protégé par le droit de la propriété intellectuelle.\n\nToute reproduction, représentation, modification, adaptation, diffusion ou exploitation, totale ou partielle, des contenus du site, sans autorisation écrite préalable de l’éditeur, est strictement interdite.\n\nToute utilisation non autorisée pourra faire l’objet de poursuites."
            },
            {
                h: "Responsabilité",
                p: "ArchiMade s’efforce de fournir sur son site des informations exactes, à jour et accessibles. Toutefois, l’éditeur ne peut garantir l’absence d’erreurs, d’omissions ou d’interruptions temporaires du service.\n\nL’utilisateur reconnaît utiliser le site sous sa seule responsabilité. ArchiMade ne pourra être tenue responsable des dommages directs ou indirects résultant de l’accès au site, de son utilisation, ou de l’impossibilité d’y accéder."
            },
            {
                h: "Liens externes",
                p: "Le site peut contenir des liens vers des sites tiers. ArchiMade n’exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leurs contenus, pratiques ou politiques de confidentialité."
            },
            {
                h: "Contact",
                p: "Pour toute question relative au site ou à son contenu, l’utilisateur peut contacter ArchiMade à l’adresse suivante :\n\ncontact@archi-made.com"
            }
        ]
    },
    cookies: {
        title: "Politique",
        subtitle: "Cookies",
        icon: <Cookie className="w-6 h-6 text-white/40" />,
        sections: [
            {
                h: "Qu’est-ce qu’un cookie ?",
                p: "Un cookie est un petit fichier déposé sur le terminal de l’utilisateur lors de la consultation d’un site internet. Il peut permettre au site de fonctionner correctement, de mémoriser certains choix, de mesurer l’audience ou d’améliorer l’expérience utilisateur.\n\nLa CNIL distingue les cookies strictement nécessaires au fonctionnement du site, qui peuvent être exemptés de consentement, des cookies soumis à consentement préalable, notamment certains cookies publicitaires, de mesure d’audience ou de suivi."
            },
            {
                h: "Cookies utilisés sur le site",
                p: "Le site www.archi-made.com peut utiliser différents types de cookies.\n\nCookies strictement nécessaires :\nCes cookies sont indispensables au bon fonctionnement du site. Ils permettent notamment d’assurer la navigation, la sécurité, l’affichage correct des pages et l’accès aux fonctionnalités essentielles. Ces cookies ne nécessitent pas le consentement préalable de l’utilisateur.\n\nCookies de mesure d’audience :\nCes cookies permettent de comprendre comment les visiteurs utilisent le site, quelles pages sont consultées, combien de temps les utilisateurs restent sur le site et comment ils arrivent sur les différentes pages. Ils ont pour objectif d’améliorer la qualité du site, son ergonomie et ses performances. Selon l’outil utilisé et son paramétrage, ces cookies peuvent nécessiter le consentement préalable de l’utilisateur."
            },
            {
                h: "Cookies tiers",
                p: "Le site peut intégrer des services tiers, par exemple :\n- Outil de mesure d’audience\n- Carte interactive\n- Vidéo intégrée\n- Formulaire externe\n- Module de prise de contact\n- Réseaux sociaux\n\nCes services peuvent déposer leurs propres cookies. ArchiMade n’a pas toujours le contrôle direct sur ces cookies tiers. L’utilisateur est invité à consulter les politiques de confidentialité des services concernés."
            },
            {
                h: "Consentement",
                p: "Lors de sa première visite sur le site, l’utilisateur peut être invité à accepter, refuser ou personnaliser l’utilisation des cookies non essentiels.\n\nLe refus des cookies non essentiels n’empêche pas l’accès au site. L’utilisateur peut modifier ses préférences à tout moment via le module de gestion des cookies disponible sur le site."
            },
            {
                h: "Durée de conservation",
                p: "Les cookies sont conservés pour une durée limitée, adaptée à leur finalité :\n- Les cookies de consentement peuvent être conservés afin de mémoriser les choix de l’utilisateur.\n- Les cookies de mesure d’audience sont conservés selon la durée prévue par l’outil utilisé.\n- Les cookies strictement nécessaires sont conservés uniquement pendant la durée nécessaire au fonctionnement du site."
            },
            {
                h: "Gestion via le navigateur",
                p: "L’utilisateur peut également configurer son navigateur afin d’accepter, refuser ou supprimer les cookies. Les paramètres varient selon le navigateur utilisé : Chrome, Safari, Firefox, Edge ou tout autre navigateur.\n\nLa désactivation de certains cookies peut toutefois affecter le bon fonctionnement de certaines fonctionnalités du site."
            },
            {
                h: "Contact",
                p: "Pour toute question relative à l’utilisation des cookies, l’utilisateur peut contacter ArchiMade à l’adresse suivante :\n\ncontact@archi-made.com"
            }
        ]
    },
    privacy: {
        title: "Données",
        subtitle: "Privées",
        icon: <ShieldCheck className="w-6 h-6 text-white/40" />,
        sections: [
            {
                h: "Introduction",
                p: "La présente politique de confidentialité a pour objectif d’informer les utilisateurs du site www.archi-made.com sur la manière dont leurs données personnelles peuvent être collectées, utilisées et protégées.\n\nArchiMade s’engage à traiter les données personnelles dans le respect du Règlement général sur la protection des données, dit RGPD, et de la loi Informatique et Libertés. La CNIL rappelle que chaque service en ligne doit limiter la collecte de données au strict nécessaire et informer clairement les personnes concernées sur l’usage de leurs données."
            },
            {
                h: "Responsable du traitement",
                p: "Le responsable du traitement des données personnelles est :\n\nARCHI-MADE LTD\nAdresse : 20 Wenlock Road, W1B 3HH London, Royaume-Uni\nEmail : contact@archi-made.com"
            },
            {
                h: "Données collectées",
                p: "Dans le cadre de l’utilisation du site, ArchiMade peut être amenée à collecter les données suivantes :\n- Nom et prénom\n- Adresse email\n- Numéro de téléphone\n- Nom de l’entreprise, le cas échéant\n- Informations transmises via un formulaire de contact ou de demande de projet\n- Adresse IP et données de navigation, uniquement lorsque cela est nécessaire au bon fonctionnement du site ou à la mesure d’audience\n\nAucune donnée sensible n’est collectée volontairement par ArchiMade via le site."
            },
            {
                h: "Finalités de la collecte",
                p: "Les données collectées peuvent être utilisées pour :\n- Répondre aux demandes envoyées via le formulaire de contact\n- Étudier une demande de projet\n- Établir un devis ou une proposition commerciale\n- Assurer le suivi d’une relation client\n- Améliorer le fonctionnement et la performance du site\n- Sécuriser le site et prévenir les usages frauduleux\n- Respecter les obligations légales et administratives applicables"
            },
            {
                h: "Base légale du traitement",
                p: "Les traitements de données réalisés par ArchiMade reposent, selon les cas, sur :\n- Le consentement de l’utilisateur, lorsqu’il remplit volontairement un formulaire\n- L’intérêt légitime d’ArchiMade à répondre aux demandes reçues et à assurer la sécurité du site\n- L’exécution de mesures précontractuelles ou contractuelles, lorsqu’une demande porte sur un projet ou une prestation\n- Le respect d’obligations légales, notamment en matière comptable, fiscale ou administrative"
            },
            {
                h: "Durée de conservation",
                p: "Les données personnelles sont conservées uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées.\n\nÀ titre indicatif :\n- Les données issues d’un formulaire de contact peuvent être conservées jusqu’à 3 ans après le dernier échange avec l’utilisateur.\n- Les données relatives à un client peuvent être conservées pendant la durée de la relation contractuelle, puis archivées pendant les délais légaux applicables.\n- Les données liées aux obligations comptables et fiscales peuvent être conservées pendant la durée imposée par la réglementation en vigueur.\n- Les cookies et traceurs sont conservés selon les durées précisées dans la politique cookies du site."
            },
            {
                h: "Destinataires des données",
                p: "Les données collectées sont destinées à ArchiMade et, lorsque cela est nécessaire, à ses prestataires techniques ou administratifs. Ces prestataires peuvent intervenir notamment pour l’hébergement du site, la maintenance technique, la gestion des formulaires, la messagerie professionnelle ou les outils de mesure d’audience.\n\nArchiMade ne vend pas les données personnelles de ses utilisateurs à des tiers."
            },
            {
                h: "Transfert hors UE",
                p: "Dans la mesure du possible, ArchiMade privilégie des prestataires situés au sein de l’Union européenne. Si certains outils utilisés impliquent un transfert de données en dehors de l’Union européenne, ArchiMade veille à ce que ces transferts soient encadrés par des garanties appropriées, conformément à la réglementation applicable."
            },
            {
                h: "Droits des utilisateurs",
                p: "Conformément à la réglementation applicable, l’utilisateur dispose des droits suivants :\n- Droit d’accès à ses données\n- Droit de rectification\n- Droit d’effacement\n- Droit d’opposition\n- Droit à la limitation du traitement\n- Droit à la portabilité des données, lorsque cela est applicable\n- Droit de retirer son consentement à tout moment, lorsque le traitement repose sur le consentement\n\nPour exercer ses droits, l’utilisateur peut contacter ArchiMade à l’adresse suivante : contact@archi-made.com\n\nEn cas de difficulté, l’utilisateur peut également introduire une réclamation auprès de la CNIL."
            },
            {
                h: "Sécurité des données",
                p: "ArchiMade met en œuvre des mesures techniques et organisationnelles raisonnables afin de protéger les données personnelles contre l’accès non autorisé, la perte, l’altération, la divulgation ou la destruction. Cependant, aucun système informatique ne peut garantir une sécurité absolue."
            },
            {
                h: "Modification",
                p: "ArchiMade se réserve le droit de modifier la présente politique de confidentialité à tout moment, notamment pour l’adapter aux évolutions du site, de ses services ou de la réglementation. La version applicable est celle publiée sur le site au moment de la consultation."
            }
        ]
    }
};

export default function LegalPage({ type }: { type: LegalType }) {
    const activeContent = content[type];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [type]);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-display selection:bg-white selection:text-black overflow-x-hidden relative">
            {/* Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3BaseFilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/baseFilter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-[60] px-6 md:px-12 py-10 flex justify-between items-center">
                <Link to="/" className="group flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full pl-2 pr-8 py-2 hover:bg-white hover:text-black transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-black/5 transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.4em]">Retour</span>
                </Link>
                <div className="hidden md:block">
                    <img src="/Logo ArchiMade.png" alt="Logo" className="h-7 w-auto invert opacity-30 hover:opacity-100 transition-opacity duration-700" />
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
                            <div className="w-10 h-[1px] bg-white/20" />
                            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40">Section Juridique</span>
                        </div>
                        <h1 className="text-6xl md:text-[10rem] xl:text-[13rem] font-black uppercase tracking-tighter leading-[0.75] text-white">
                            {activeContent.title}
                            <span className="block text-white/5 outline-text">{activeContent.subtitle}</span>
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
                                        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/5 to-transparent" />
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
                                <p className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-black mb-2">Besoin d'assistance ?</p>
                                <a href="mailto:contact@archi-made.com" className="text-3xl font-black tracking-tight hover:opacity-50 transition-opacity">contact@archi-made.com</a>
                            </div>
                        </div>
                        <div className="text-center md:text-right space-y-2">
                            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-white/20">
                                © {new Date().getFullYear()} ArchiMade Studio
                            </p>
                            <p className="text-[9px] uppercase tracking-[0.5em] text-white/10">Architecture d'exception — France</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .outline-text {
                    -webkit-text-stroke: 1px rgba(255,255,255,0.15);
                    color: transparent;
                }
            `}} />
        </div>
    );
}     
