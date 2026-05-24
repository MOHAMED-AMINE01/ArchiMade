import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
    ArrowUpRight,
    Menu,
    X,
    FileText,
    Layers,
    Box,
    DraftingCompass,
    Monitor,
    FileCheck,
    CheckCircle2,
    Phone,
    Mail,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ShieldCheck,
    Cookie
} from "lucide-react";
import { cn } from "../lib/utils";

// --- CONFIG ---
const IMAGES = {
    logos: {
        v1: "/Logo ArchiMade.png"
    },
    renders: {
        veigne: "/IMAGES/3D/Construction d_une maison individuelle 37250 Veigné.png",
        joue: "/IMAGES/3D/Construction d_une maison individuelle joue les tours 37300.png",
        montlouis: "/IMAGES/3D/Construction d_une maison individuelle Montlouis sur Loire 37270.png",
        mirabeau: "/IMAGES/3D/Création d_une extension 13170 Les pennes Mirabeau.png",
        saintes: "/IMAGES/3D/Modifications de façades d_un entrepôt 17100 saintes.png",
        pexels: "/IMAGES/3D/pexels-perqued-13203180.jpg"
    },
    projects: {
        activites: {
            main: "/IMAGES/Projets finis/Bâtiment d_activités/4 cellules d_activités rue Jacqueline Auriol la ville aux dames 37700.png",
            before: "/IMAGES/Projets finis/Bâtiment d_activités/Capture d_écran 2026-04-11 093951.png"
        },
        esvres: {
            main: "/IMAGES/Projets finis/Construction d_une extension sur maison existant 37320 Esvres/Insertion 2.png",
            before: "/IMAGES/Projets finis/Construction d_une extension sur maison existant 37320 Esvres/WhatsApp Image 2022-10-05 at 09.00.22 (1).jpeg"
        },
        fondettes: {
            main: "/IMAGES/Projets finis/Construction d_une maison individuelle neuve 37230 fondettes/Capture d_écran 2026-04-11 101030.png"
        },
        branchs: {
            main: "/IMAGES/Projets finis/Construction d_une maison individuelle neuve 37320 saint branchs/Capture d_écran 2026-04-11 102547.png"
        },
        cyr_villa: {
            main: "/IMAGES/Projets finis/Construction d_une maison individuelle neuve 37540 saint cyr sur loire/Capture d_écran 2026-04-11 102226.png"
        },
        suze: {
            main: "/IMAGES/Projets finis/Construction d_une maison individuelle neuve 72210 la suze sur sarthe/Capture d_écran 2026-04-11 101430.png"
        },
        ligueil: {
            main: "/IMAGES/Projets finis/construction d_une maison indivuelle neuve 37240 ligueil/Capture d_écran 2026-04-11 102902.png"
        },
        chambray: {
            main: "/IMAGES/Projets finis/creation d_une surelevation au dessus d_un garage 37170 chambray les tours/1abff9e6-a427-41ba-84e4-6202cf7be7ee.jpg",
            before: "/IMAGES/Projets finis/creation d_une surelevation au dessus d_un garage 37170 chambray les tours/46f52069-d1b9-41b3-b202-29c8108447e7.jpg"
        },
        cyr_extension: {
            main: "/IMAGES/Projets finis/Extension sur maison existante 37540/Creation d_une extenstion 37540 saint cyr sur loire - 01.jpeg",
            alt: "/IMAGES/Projets finis/Extension sur maison existante 37540/Creation d_une extenstion 37540 saint cyr sur loire - 02.jpeg",
            before: "/IMAGES/Projets finis/Extension sur maison existante 37540/avant projet.jpeg"
        },
        chanceaux: {
            main: "/IMAGES/Projets finis/Loc office rehabiliation d_une zone de stockage en bureau 37390 chanceaux sur choisille/Capture d_écran 2026-04-10 174146.png",
            gallery: [
                "/IMAGES/Projets finis/Loc office rehabiliation d_une zone de stockage en bureau 37390 chanceaux sur choisille/Capture d_écran 2026-04-10 174722.png",
                "/IMAGES/3D/pexels-perqued-13203180.jpg",
                "/IMAGES/Projets finis/Loc office rehabiliation d_une zone de stockage en bureau 37390 chanceaux sur choisille/Capture d_écran 2026-04-10 174750.png"
            ]
        },
        padel: {
            main: "/Nouvelles images/WhatsApp Image 2026-04-23 at 17.48.14.jpeg",
            gallery: [
                "/Nouvelles images/WhatsApp Image 2026-04-23 at 17.48.13.jpeg",
                "/Nouvelles images/WhatsApp Image 2026-04-23 at 17.48.14 (1).jpeg",
                "/Nouvelles images/WhatsApp Image 2026-04-23 at 17.48.14.jpeg"
            ]
        },
        whatsapp: {
            i1: "/Nouvelles images/WhatsApp Image 2026-04-23 at 17.48.13.jpeg",
            i2: "/Nouvelles images/WhatsApp Image 2026-04-23 at 17.48.14 (1).jpeg",
            i3: "/Nouvelles images/WhatsApp Image 2026-04-23 at 17.48.14.jpeg"
        }
    },
    industrial: {
        activites: {
            main: "/IMAGES/Projets finis/Bâtiment d_activités/4 cellules d_activités rue Jacqueline Auriol la ville aux dames 37700.png",
            alt: "/IMAGES/Projets finis/Bâtiment d_activités/Capture d_écran 2026-04-11 093951.png"
        }
    }
};

const PROJECTS = [
    {
        title: "Villa Contemporaine",
        city: "Joué-lès-Tours",
        year: "2023",
        type: "Neuf",
        path: IMAGES.renders.joue,
        gallery: [IMAGES.renders.joue],
        specs: ["Haut de gamme", "Design épuré"],
        featured: true
    },
    {
        title: "Résidence de Prestige",
        city: "Montlouis-sur-Loire",
        year: "2024",
        type: "Neuf",
        path: IMAGES.renders.montlouis,
        gallery: [IMAGES.renders.montlouis],
        specs: ["Volume", "Clarté"],
        featured: true
    },
    {
        title: "Extension Moderne",
        city: "Les Pennes-Mirabeau",
        year: "2023",
        type: "Extension",
        path: IMAGES.renders.mirabeau,
        gallery: [IMAGES.renders.mirabeau],
        specs: ["Harmonie", "Transition"]
    },
    {
        title: "Pavillon Veigné",
        city: "Veigné",
        year: "2023",
        type: "Neuf",
        path: IMAGES.renders.veigne,
        gallery: [IMAGES.renders.veigne],
        specs: ["Conception 3D", "Modélisation"]
    },
    {
        title: "Modifications de Façades",
        city: "Saintes",
        year: "2024",
        type: "Industriel",
        path: IMAGES.renders.saintes,
        gallery: [IMAGES.renders.saintes],
        specs: ["Modernisation", "Structure"]
    },
    {
        title: "Villa Saint-Cyr",
        city: "Saint-Cyr-sur-Loire",
        year: "2023",
        type: "Neuf",
        path: IMAGES.projects.cyr_villa.main,
        gallery: [IMAGES.projects.cyr_villa.main],
        specs: ["Haut de gamme", "Design épuré"],
        featured: false
    },
    {
        title: "Projet La Suze",
        city: "La Suze-sur-Sarthe",
        year: "2023",
        type: "Neuf",
        path: IMAGES.projects.suze.main,
        gallery: [IMAGES.projects.suze.main],
        specs: ["Volume", "Clarté"],
        featured: false
    },
    {
        title: "Club House Padel Arena",
        city: "Vendôme/Saint Ouen",
        year: "2024",
        type: "Club House",
        path: IMAGES.projects.padel.main,
        gallery: IMAGES.projects.padel.gallery,
        specs: ["Loisirs", "Premium", "Design"],
        featured: true
    },
    {
        title: "Extension Saint-Cyr",
        city: "Saint-Cyr-sur-Loire",
        year: "2024",
        type: "Extension",
        path: IMAGES.projects.cyr_extension.main,
        gallery: [IMAGES.projects.cyr_extension.main],
        specs: ["Volume", "Luminosité", "Modernité"],
        featured: true
    },
    {
        title: "Extension Esvres",
        city: "Esvres",
        year: "2023",
        type: "Extension",
        path: IMAGES.projects.esvres.main,
        gallery: [IMAGES.projects.esvres.main],
        specs: ["Intégration", "Sur-mesure"]
    },
    {
        title: "Surélévation Garage",
        city: "Chambray-lès-Tours",
        year: "2024",
        type: "Extension",
        path: IMAGES.projects.chambray.main,
        gallery: [IMAGES.projects.chambray.main],
        specs: ["Optimisation", "Structure"]
    }
];

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// --- UTILS ---
const ArchiReveal = ({ children, className = "", delay = 0, type = "up" }: { children: React.ReactNode; className?: string; delay?: number; type?: "up" | "down" | "scale" | "fade"; key?: React.Key }) => {
    const elRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const el = elRef.current;
        if (!el) return;

        let fromVars = {};
        if (type === "up") fromVars = { y: 100, opacity: 0 };
        else if (type === "down") fromVars = { y: -100, opacity: 0 };
        else if (type === "scale") fromVars = { scale: 0.8, opacity: 0 };
        else fromVars = { opacity: 0 };

        const ctx = gsap.context(() => {
            gsap.fromTo(el,
                fromVars,
                {
                    y: 0, scale: 1, opacity: 1,
                    duration: 1.2, delay, ease: "power4.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    }
                }
            );
        }, elRef);
        return () => ctx.revert();
    }, [delay, type]);

    return (
        <div ref={elRef} className={cn("opacity-0", className)}>
            {children}
        </div>
    );
};

const ArchiDrawing = ({ type = "circle", className = "", trigger }: { type?: "circle" | "rect" | "lines"; className?: string; trigger: any }) => {
    const svgRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".draw-path",
                { strokeDasharray: 1000, strokeDashoffset: 1000 },
                {
                    strokeDashoffset: 0,
                    duration: 2.5,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: trigger.current,
                        start: "top 80%",
                        end: "top 20%",
                        scrub: 1
                    }
                }
            );
        }, svgRef);
        return () => ctx.revert();
    }, [trigger]);

    return (
        <svg ref={svgRef} className={cn("absolute pointer-events-none opacity-10", className)} viewBox="0 0 400 400" fill="none">
            {type === "circle" && (
                <>
                    <circle className="draw-path" cx="200" cy="200" r="150" stroke="#0a0a0a" strokeWidth="0.5" />
                    <circle className="draw-path" cx="200" cy="200" r="100" stroke="#0a0a0a" strokeWidth="0.2" />
                </>
            )}
            {type === "rect" && (
                <>
                    <rect className="draw-path" x="50" y="50" width="300" height="300" stroke="#0a0a0a" strokeWidth="0.5" />
                    <line className="draw-path" x1="0" y1="200" x2="400" y2="200" stroke="#0a0a0a" strokeWidth="0.2" />
                    <line className="draw-path" x1="200" y1="0" x2="200" y2="400" stroke="#0a0a0a" strokeWidth="0.2" />
                </>
            )}
            {type === "lines" && (
                <>
                    <line className="draw-path" x1="0" y1="100" x2="400" y2="100" stroke="#0a0a0a" strokeWidth="0.5" />
                    <line className="draw-path" x1="0" y1="110" x2="400" y2="110" stroke="#0a0a0a" strokeWidth="0.2" />
                    <line className="draw-path" x1="0" y1="290" x2="400" y2="290" stroke="#0a0a0a" strokeWidth="0.5" />
                    <line className="draw-path" x1="0" y1="300" x2="400" y2="300" stroke="#0a0a0a" strokeWidth="0.2" />
                </>
            )}
        </svg>
    );
};

const SplitTextReveal = ({ text, className = "", delay = 0, scrollTrigger = false }: { text: string; className?: string; delay?: number; scrollTrigger?: boolean }) => {
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = elRef.current;
        if (!el) return;
        const chars = el.querySelectorAll('.split-char');

        const config = {
            opacity: 1, y: 0, rotateX: 0,
            duration: 1.5, stagger: 0.05, ease: "power4.out",
            delay: delay
        };

        if (scrollTrigger) {
            gsap.fromTo(chars,
                { opacity: 0, y: 100, rotateX: -90 },
                {
                    ...config,
                    delay: 0,
                    scrollTrigger: { trigger: el, start: "top 90%" }
                }
            );
        } else {
            gsap.fromTo(chars, { opacity: 0, y: 150, rotateX: -90 }, config);
        }
    }, [delay, scrollTrigger]);

    return (
        <div ref={elRef} className={cn("overflow-hidden flex flex-wrap", className)}>
            {text.split('').map((char, i) => (
                <span key={i} className="split-char inline-block origin-bottom perspective-[1000px]">
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </div>
    );
};

// --- PRELOADER ---
function ArchiPreloader({ onComplete }: { onComplete: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(containerRef.current, {
                    scale: 1.1,
                    opacity: 0,
                    filter: "blur(40px)",
                    duration: 1.5,
                    ease: "power4.inOut",
                    onComplete: onComplete
                });
            }
        });

        // Initial setup
        gsap.set(".char-wrap", { opacity: 0, rotateY: 90, scale: 0.5, y: 20 });
        gsap.set(".border-line-h", { scaleX: 0 });
        gsap.set(".border-line-v", { scaleY: 0 });
        gsap.set(".char-inner", { opacity: 0, y: 30 });
        gsap.set(".preloader-logo", { opacity: 0, scale: 0.8, filter: "blur(20px)" });

        // Entrance for Logo
        tl.to(".preloader-logo", {
            opacity: 1,
            scale: 1.7,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "expo.out"
        });

        // Simulating progress
        gsap.to({ val: 0 }, {
            val: 100,
            duration: 3.5,
            ease: "power2.inOut",
            onUpdate: function () { setProgress(Math.floor(this.targets()[0].val)); }
        });

        // Sequence: Letter by letter
        const chars = document.querySelectorAll(".char-wrap");
        chars.forEach((char, i) => {
            const charTl = gsap.timeline();

            tl.add(charTl, 0.8 + i * 0.06); // Start after logo

            charTl
                .to(char, {
                    opacity: 1,
                    rotateY: 0,
                    scale: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "expo.out"
                })
                // The "Circulating Lines" effect
                .to(char.querySelector(".line-top"), { scaleX: 1, duration: 0.3, ease: "none" }, "-=0.5")
                .to(char.querySelector(".line-right"), { scaleY: 1, duration: 0.3, ease: "none" })
                .to(char.querySelector(".line-bottom"), { scaleX: 1, duration: 0.3, ease: "none" })
                .to(char.querySelector(".line-left"), { scaleY: 1, duration: 0.3, ease: "none" })
                // Reveal the letter itself
                .to(char.querySelector(".char-inner"), {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "back.out(2)"
                }, "-=0.4");
        });

        // Exit transition
        tl.to(".preloader-content", {
            opacity: 0,
            scale: 1.1,
            duration: 0.8,
            ease: "power2.inOut",
            delay: 0.5
        });

    }, [onComplete]);

    const fullText = "ARCHI MADE STUDIO".replace(/\s/g, " "); // Keep spaces for layout
    const words = "ARCHI MADE STUDIO".split(" ");

    return (
        <div ref={containerRef} translate="no" className="notranslate fixed inset-0 z-[1000] bg-[#e5e5e5] flex items-center justify-center overflow-hidden font-display perspective-[1000px]">
            {/* Drafting Paper Background */}
            <div className="absolute inset-0 opacity-[0.1] pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #000 1px, transparent 1px),
                        linear-gradient(to bottom, #000 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px'
                }}></div>

            <div className="preloader-content relative z-10 w-full flex flex-col items-center">

                {/* Logo in Preloader */}
                <div className="preloader-logo mb-30 md:mb-35">
                    <img
                        src="/logo_intro.png"
                        alt="Logo"
                        className="h-24 md:h-38 w-auto object-contain opacity-80"
                    />
                </div>
                {/* Horizontal Sequence of Letters */}
                <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-4 gap-y-4 px-10">
                    {words.map((word, wIdx) => (
                        <div key={wIdx} className="flex gap-1 md:gap-2">
                            {word.split("").map((char, cIdx) => (
                                <div key={cIdx} className="char-wrap relative w-8 h-10 md:w-12 md:h-16 flex items-center justify-center">

                                    {/* Border Lines - Circulating Effect */}
                                    <div className="border-line-h line-top absolute top-0 left-0 right-0 h-[1px] bg-black/40 origin-left"></div>
                                    <div className="border-line-v line-right absolute top-0 right-0 bottom-0 w-[1px] bg-black/40 origin-top"></div>
                                    <div className="border-line-h line-bottom absolute bottom-0 left-0 right-0 h-[1px] bg-black/40 origin-right"></div>
                                    <div className="border-line-v line-left absolute top-0 left-0 bottom-0 w-[1px] bg-black/40 origin-bottom"></div>

                                    {/* The Letter */}
                                    <span className="char-inner text-2xl md:text-5xl font-bold tracking-tighter text-[#0a0a0a] z-10 select-none">
                                        {char}
                                    </span>


                                </div>
                            ))}
                            {/* Spacer for mobile wrap */}
                            <div className="w-4 md:w-8"></div>
                        </div>
                    ))}
                </div>



            </div>

            {/* Side Decorative Measurement */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 opacity-20">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className={cn("h-[1px] bg-black", i % 4 === 0 ? "w-6" : "w-3")}></div>
                        {i % 4 === 0 && <span className="text-[8px] font-mono uppercase">Lvl.0{i}</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}
// --- COMPONENTS ---

const ArchiLogo = ({ className = "", light = false, isScrolling = false }: { className?: string; light?: boolean; isScrolling?: boolean }) => (
    <div className={cn("pointer-events-auto transition-all duration-700 transform-gpu bg-[rgba(255,255,255,0.01)] rounded-xl", className, isScrolling && "scale-75 opacity-40")}>
        <img
            src="/Logo ArchiMade.png"
            alt="ArchiMade Logo"
            className={cn(
                "logo-img h-16 md:h-28 scale-280 md:scale-200 xl:scale-200 ml-5 w-auto object-contain transition-all duration-500 brightness-0 invert",
                light && "brightness-0 invert"
            )}
        />
    </div>
);

// --- NAVIGATION (DESKTOP) ---
function ArchiNav({ isScrolling }: { isScrolling?: boolean }) {
    const menuItems = [
        { name: "À propos", slug: "propos" },
        { name: "Méthode", slug: "methodes" },
        { name: "Réalisations", slug: "realisations" },
        { name: "Expertise", slug: "expertise" },
        { name: "FAQ", slug: "faq" },
        { name: "Contact", slug: "contact" }
    ];

    return (
        <nav className="flex flex-col items-start gap-12 font-sans pointer-events-none">
            {/* MAIN MENU */}
            <ul className="flex flex-col items-start gap-1 pointer-events-auto">
                {menuItems.map((item, i) => (
                    <ArchiReveal key={item.slug} delay={0.4 + i * 0.1}>
                        <li className="overflow-hidden group">
                            <a
                                href={`#${item.slug}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const target = document.getElementById(item.slug);
                                    if (target) {
                                        target.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className={cn(
                                    "pointer-events-auto cursor-pointer font-semibold text-inherit block hover:italic transition-all duration-500 relative transform-gpu bg-[rgba(255,255,255,0.01)] rounded-md px-2 -ml-2",
                                    isScrolling ? "text-2xl opacity-40 scale-90" : "text-4xl lg:text-4xl opacity-100 scale-100"
                                )}
                            >
                                <span className="relative z-10">{item.name}</span>
                                {!isScrolling && (
                                    <div className="nav-underline absolute bottom-1 left-0 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full z-0 opacity-20"></div>
                                )}
                            </a>
                        </li>
                    </ArchiReveal>
                ))}
            </ul>
        </nav>
    );
}

// --- NAVIGATION OVERLAY (MOBILE) ---
function ArchiMenuOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const menuItems = [
        { name: "À propos", slug: "propos" },
        { name: "Services", slug: "expertise" },
        { name: "Méthode", slug: "methodes" },
        { name: "Réalisations", slug: "realisations" },
        { name: "FAQ", slug: "faq" },
        { name: "Contact", slug: "contact" }
    ];

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    return (
        <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? "0%" : "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[200] bg-[#0a0a0a] text-white p-10 md:p-20 flex flex-col font-display"
        >
            <div className="flex justify-between items-start">
                <ArchiLogo light />
                <button
                    onClick={onClose}
                    className="text-xl md:text-2xl font-bold tracking-tighter uppercase focus:outline-none hover:opacity-50 transition-opacity"
                >
                    Close
                </button>
            </div>

            <div className="mt-20 md:mt-40 flex flex-col items-start gap-6 md:gap-10">
                {menuItems.map((item, i) => (
                    <motion.a
                        key={item.slug}
                        href={`#${item.slug}`}
                        onClick={onClose}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                        className="text-5xl md:text-8xl font-bold tracking-tighter uppercase hover:italic transition-all leading-none underline decoration-2 underline-offset-8 decoration-white/0 hover:decoration-white/100"
                    >
                        {item.name}
                    </motion.a>
                ))}
            </div>

            <div className="mt-auto flex flex-col md:flex-row gap-10 md:gap-20">
                <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Inquiries</p>
                    <p className="text-xl font-bold tracking-tight hover:opacity-50 transition-opacity">contact@archi-made.com</p>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute bottom-[-10vw] right-[-10vw] w-[60vw] h-[60vw] border border-white/5 rounded-full pointer-events-none"></div>
            <div className="absolute inset-0 z-[-1] flex items-center justify-center opacity-5 select-none pointer-events-none">
                <h2 className="text-[25vw] font-bold uppercase tracking-tighter leading-none italic">
                    ARCHIMADE
                </h2>
            </div>
        </motion.div>
    );
}

// --- FIXED HEADER (MOBILE) ---
function ArchiHeader({ onMenuClick }: { onMenuClick: () => void }) {
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsHidden(true); // scrolling down
            } else {
                setIsHidden(false); // scrolling up
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <header
            className={cn(
                "xl:hidden fixed top-0 left-0 right-0 z-[150] p-8 flex justify-between items-center mix-blend-difference pointer-events-none transition-transform duration-500",
                isHidden ? "-translate-y-full" : "translate-y-0"
            )}
        >
            <div className="pointer-events-auto">
                <ArchiLogo className="text-white" light />
            </div>
            <button
                onClick={onMenuClick}
                className="pointer-events-auto text-xl font-bold tracking-tighter uppercase text-white focus:outline-none hover:opacity-50 transition-opacity font-display"
            >
                Menu
            </button>
        </header>
    );
}


// --- ARCHITECTURAL BACKGROUND ---
function ArchiBackground() {
    const bgRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Precise rotation for circles
            gsap.from(".bg-circle-anim", {
                rotate: -90,
                scale: 0.9,
                opacity: 0,
                duration: 3,
                stagger: 0.2,
                ease: "expo.out",
                delay: 0.5
            });

            // Deployment of architectural lines
            gsap.from(".bg-line-anim", {
                scale: 0,
                opacity: 0,
                duration: 2.5,
                stagger: 0.1,
                ease: "power4.out",
                delay: 0.8
            });

            // Dot grid fade in
            gsap.from(".bg-dots", {
                opacity: 0,
                duration: 2,
                ease: "none",
                delay: 1.2
            });
        }, bgRef);
        return () => bgRef.current && ctx.revert();
    }, []);

    return (
        <div ref={bgRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#e5e5e5]">
            {/* Minimalist Structural Circles - Maximum Visibility White */}
            <div className="bg-circle-anim absolute top-[20%] left-[65%] -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] border-[1.5px] border-white/90 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]"></div>
            <div className="bg-circle-anim absolute top-[20%] left-[65%] -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] border-[1.5px] border-white/70 rounded-full"></div>
            <div className="bg-circle-anim absolute top-[20%] left-[65%] -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] border-[1px] border-white/50 rounded-full"></div>

            {/* Secondary Axis Circle */}
            <div className="bg-circle-anim absolute bottom-[-10%] left-[5%] w-[40vw] h-[40vw] border-[1px] border-white/60 rounded-full"></div>

            {/* Main Architectural Axis Lines - Solid 1px White */}
            <div className="bg-line-anim absolute left-[25vw] top-0 bottom-0 w-[1px] bg-white/60 hidden md:block origin-top"></div>
            <div className="bg-line-anim absolute left-[75vw] top-0 bottom-0 w-[1px] bg-white/40 hidden md:block origin-bottom"></div>
            <div className="bg-line-anim absolute top-[35vh] left-0 right-0 h-[1px] bg-white/40 origin-left"></div>

            {/* Technical Grid - Enhanced Texture */}
            <div className="bg-dots absolute inset-0 opacity-[0.25]"
                style={{ backgroundImage: 'radial-gradient(#fff 1.5px, transparent 0)', backgroundSize: '50px 50px' }}></div>
        </div>
    );
}

// 1. HERO SECTION
const HERO_MESSAGES = [
    "Accompagnement premium pour particuliers et professionnels. Conception de dossiers techniques complets.",
    "Expertise 3D photoréaliste pour une immersion totale dans vos projets futurs.",
    "Dossiers administratifs et permis de construire gérés avec une précision chirurgicale.",
    "Solutions techniques innovantes pour une architecture durable et esthétique."
];

function ArchiHero() {
    const sectionRef = useRef(null);

    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % HERO_MESSAGES.length);
        }, 4000); // 4s pour une lecture plus posée
        return () => clearInterval(interval);
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // High-end alternating reveal for ALL elements
            const allReveals = gsap.utils.toArray(".archi-title-reveal");

            allReveals.forEach((line: any, i: number) => {
                const isEven = i % 2 === 0;
                gsap.fromTo(line,
                    {
                        x: isEven ? -120 : 120,
                        y: 0,
                        rotateY: isEven ? 25 : -25,
                        scale: 0.95,
                        filter: "blur(10px)",
                        opacity: 0
                    },
                    {
                        x: 0,
                        y: 0,
                        rotateY: 0,
                        scale: 1,
                        filter: "blur(0px)",
                        opacity: 1,
                        duration: 3,
                        ease: "power4.out",
                        delay: 0.5 + (i * 0.12)
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const handleHeroClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('a') || target.closest('nav')) {
            return;
        }

        // Using Lenis for a custom slow and smooth scroll
        if ((window as any).lenis) {
            (window as any).lenis.scrollTo('#propos', {
                duration: 3,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        } else {
            const visionSection = document.getElementById('propos');
            if (visionSection) {
                visionSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <section
            ref={sectionRef}
            onClick={handleHeroClick}
            className="relative h-screen w-full overflow-hidden flex flex-col font-sans bg-transparent cursor-pointer group/hero"
        >
            {/* Largo-Style Container */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center md:justify-start md:pt-[20vh] px-10 md:px-20 md:pl-[24vw] items-start text-left">
                <div className="max-w-6xl relative z-20 flex flex-col items-start px-2">
                    <h1 translate="no" className="notranslate archi-title text-[12vw] md:text-[9.5vw] font-bold tracking-tighter leading-[1.1] md:leading-[0.8] text-[#0a0a0a] flex flex-col items-start relative translate-z-0 mb-12">
                        {/* Title Lines (1, 2, 3) */}
                        {["Concevoir votre", "futur projet"].map((text, idx) => (
                            <div key={idx} className="sentence">
                                <div className="outer relative perspective-[2000px]">
                                    <span className="inner block overflow-hidden md:pb-[0.18em]">
                                        <span className="text block archi-title-reveal">
                                            {text}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </h1>

                    <div className="space-y-6 flex flex-col items-start">


                        {/* Description (Line 5) */}
                        <div className="sentence overflow-hidden max-w-xxl">
                            <div className="outer relative">
                                <span className="inner block overflow-hidden">
                                    <p className="text block archi-title-reveal text-[12px] md:text-lg text-[#0a0a0a] font-medium leading-tight opacity-70">
                                        Permis de construire, déclarations préalables et plans techniques.<br />
                                        Une approche claire et rigoureuse pour donner forme à vos projets.
                                    </p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {/* Bottom Right Metadata - Largo Style (Fixed to screen edges) */}
            < div className="absolute bottom-10 right-8 md:bottom-12 md:right-12 z-50 pointer-events-none flex flex-col items-end text-right" >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="flex flex-col items-end"
                >


                    {/* Rotating Message with Underline */}
                    <div className="relative w-[200px] md:w-[350px] h-12 md:h-12 overflow-hidden border-b border-black/10 pb-1">
                        {HERO_MESSAGES.map((msg, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: textIndex === i ? 1 : 0,
                                    y: textIndex === i ? 0 : -10,
                                }}
                                transition={{ duration: 0.6, ease: "circOut" }}
                                className="absolute right-0 top-0 w-full text-[9px] md:text-[13px] font-bold text-black uppercase tracking-tighter leading-tight pointer-events-auto"
                            >
                                {msg}
                            </motion.p>
                        ))}
                    </div>

                    {/* Progress Indicators */}
                    <div className="mt-4 flex gap-2">
                        {HERO_MESSAGES.map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "h-[1.5px] transition-all duration-700 ease-in-out",
                                    textIndex === i ? "w-8 bg-black" : "w-4 bg-black/10"
                                )}
                            ></div>
                        ))}
                    </div>
                </motion.div>
            </div >
        </section >
    );
}

// 2. ABOUT SECTION
function ArchiAbout() {
    const sectionRef = useRef(null);
    const imgRef = useRef(null);

    const allSteps = [
        { phase: "01", title: "Analyse du besoin", desc: "Nous échangeons sur votre projet, vos attentes, vos contraintes et les éléments déjà disponibles." },
        { phase: "02", title: "Étude du projet", desc: "Nous analysons la faisabilité, les volumes et les premières orientations pour poser une base de travail claire." },
        { phase: "03", title: "Conception", desc: "Les plans prennent forme, les volumes se précisent et les visuels 3D rendent votre projet plus clair." },
        { phase: "04", title: "Démarches administratives", desc: "Permis de construire ou déclaration préalable : votre dossier est préparé avec précision." },
        { phase: "05", title: "Accompagnement", desc: "Suivi rigoureux et conseil stratégique tout au long du cycle." },
        { phase: "06", title: "Remise du projet", desc: "Vous recevez les plans, visuels et documents finalisés pour présenter ou faire avancer votre projet." },
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Heading Split Reveal
            gsap.from(".about-heading span span", {
                opacity: 0,
                y: 40,
                rotateX: -40,
                filter: "blur(5px)",
                stagger: 0.01,
                duration: 1.2,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: ".about-heading",
                    start: "top 80%"
                }
            });

            // Stats Counter Animation
            const stats = document.querySelectorAll(".stat-number");
            stats.forEach(stat => {
                const target = parseFloat(stat.getAttribute("data-target") || "0");
                const obj = { value: 0 };
                gsap.to(obj, {
                    value: target,
                    duration: 2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: stat,
                        start: "top 90%"
                    },
                    onUpdate: () => {
                        stat.textContent = obj.value.toFixed(target % 1 === 0 ? 0 : 1);
                    }
                });
            });

            // Parallax Image
            gsap.fromTo(imgRef.current,
                { y: -50, scale: 1.2 },
                {
                    y: 50, scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".about-img-container",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );

            // Sub-text reveal
            gsap.from(".about-subtext", {
                opacity: 0,
                x: -30,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".about-subtext",
                    start: "top 85%"
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="propos" ref={sectionRef} className="relative bg-transparent overflow-hidden font-display">
            <div className="py-20 md:py-32 xl:pl-[25vw] px-6 md:px-10 xl:pr-20 relative z-10">
                <div className="space-y-4 md:space-y-6">
                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-[#0a0a0a]/30 font-bold block animate-fade-in">Expertise & Accompagnement</span>
                    <h2 className="about-heading text-3xl sm:text-4xl md:text-5xl xl:text-7xl font-bold leading-[1.1] md:leading-[1.1] text-[#0a0a0a] uppercase tracking-tighter max-w-5xl">
                        {"Spécialiste dans la conception de projets de construction.".split(" ").map((word, i) => (
                            <span key={i} className="inline-block whitespace-nowrap mr-[0.2em]">
                                {word.split("").map((char, j) => (
                                    <span key={j} className="inline-block">{char}</span>
                                ))}
                            </span>
                        ))}
                    </h2>
                </div>

                <div className="flex flex-col xl:flex-row gap-12 xl:gap-20 mt-16 md:mt-24">
                    <div className="flex-1 about-subtext">
                        <p className="text-lg sm:text-xl md:text-2xl xl:text-3xl font-light leading-[1.5] md:leading-[1.4] text-[#0a0a0a] tracking-tight border-l-2 md:border-l-4 border-black pl-6 md:pl-8">
                            ArchiMade accompagne particuliers et professionnels dans la préparation de leurs projets de construction.<br />
                            Plans, démarches, projections 3D : chaque élément est pensé pour rendre le projet plus clair, plus lisible et prêt à avancer.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => (window as any).lenis?.scrollTo('#expertise', { duration: 2.5 })}
                            className="mt-12 group relative flex items-center justify-center gap-4 bg-[#0a0a0a] text-white px-8 py-5 rounded-full overflow-hidden transition-all duration-500 shadow-xl"
                        >
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] pl-[0.5em] relative z-10">
                                En savoir plus
                            </span>
                            <div className="relative z-10 flex items-center justify-center">
                                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                            </div>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                        </motion.button>
                    </div>

                    <div className="xl:w-1/3 flex flex-col justify-end mt-12 xl:mt-0 w-full">
                        <div className="grid grid-cols-2 gap-8 md:gap-12 pt-8 md:pt-12 ">
                            <div className="space-y-2 md:space-y-6">
                                <div className="flex items-baseline">
                                    <span className="stat-number text-4xl sm:text-5xl md:text-7xl font-black block text-[#0a0a0a] tracking-tighter" data-target="100">0</span>
                                    <span className="text-xl md:text-2xl font-bold ml-1">%</span>
                                </div>
                                <p className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] xl:tracking-[0.5em] font-bold text-[#0a0a0a]/40">CONFORMITÉ_PC_DP</p>
                            </div>
                            <div className="space-y-2 md:space-y-6">
                                <div className="flex items-baseline">
                                    <span className="stat-number text-4xl sm:text-5xl md:text-7xl font-black block text-[#0a0a0a] tracking-tighter" data-target="0.0">0.0</span>
                                </div>
                                <p className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] xl:tracking-[0.5em] font-bold text-[#0a0a0a]/40">RETARD</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* INTEGRATED PROCESS SECTION */}
            <div id="methodes" className="relative w-full overflow-hidden mt-12 md:mt-24 group/method">
                <div className="about-img-container relative w-full overflow-hidden">
                    <img
                        ref={imgRef}
                        src={IMAGES.renders.joue}
                        alt="Processus ArchiMade"
                        className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover/method:scale-105 transition-transform duration-[2s]"
                    />

                    {/* Dark overlay for text readability - Content defines height */}
                    <div className="relative z-10 bg-black/60 flex flex-col justify-center px-6 md:px-16 xl:pl-[25vw] md:pr-20 py-20 md:py-32 min-h-[400px] md:min-h-[750px] xl:min-h-[600px]">
                        <div className="mb-10 md:mb-20">
                            <ArchiReveal type="fade">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-[1px] bg-white/30"></div>
                                    <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/40 font-bold">Processus</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                                    Notre <span className="text-white/30 italic font-medium">Méthode</span>
                                </h2>
                            </ArchiReveal>
                        </div>

                        <div className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-8 md:gap-x-12 md:gap-y-20 pb-10 md:pb-0 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 lg:grid-cols-3 md:grid-cols-2">
                            {allSteps.map((step, i) => (
                                <div key={i} className="min-w-[85vw] md:min-w-0 snap-center">
                                    <ArchiReveal delay={0.2 + i * 0.1} type="up" className="flex flex-col gap-4">
                                        <div className="flex items-center gap-4">
                                            <span className="text-3xl md:text-3xl font-black text-white/10 font-mono tracking-tighter">{step.phase}</span>
                                            <div className="h-[1px] flex-1 bg-white/10"></div>
                                        </div>
                                        <h3 className="text-white font-bold text-base md:text-base lg:text-lg uppercase tracking-tight">{step.title}</h3>
                                        <p className="text-white/40 text-xs md:text-xs lg:text-sm leading-relaxed font-light max-w-sm">{step.desc}</p>
                                    </ArchiReveal>
                                </div>
                            ))}
                        </div>

                        {/* Mobile Scroll Indicator Dots */}
                        <div className="flex md:hidden justify-center gap-3 mt-4">
                            {allSteps.map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


// 3. SERVICES SECTION (EXPERTISE)
const services = [
    { title: "Permis de Construire", cat: "Architectural", loc: "Tours, FR", area: "450.00 m² / 4843 ft²", img: IMAGES.renders.veigne, desc: "Un dossier complet pour présenter votre projet, structurer les pièces attendues et faciliter vos démarches administratives." },
    { title: "Déclarations Préalables", cat: "Extension", loc: "Bordeaux, FR", area: "85.22 m² / 917 ft²", img: IMAGES.renders.mirabeau, desc: "ArchiMade vous accompagne dans la préparation de votre déclaration préalable pour vos extensions, modifications de façade ou aménagements extérieurs." },
    { title: "Plans d'Exécution", cat: "Technique", loc: "Paris, FR", area: "1200.00 m² / 12916 ft²", img: IMAGES.projects.activites.main, desc: "Des plans précis et documents techniques détaillés pour définir les volumes, les assemblages et les informations nécessaires à la réalisation du projet." },
    { title: "Modélisation 3D", cat: "Visualisation", loc: "Studio", area: "Full Render 8K", img: IMAGES.projects.padel.main, desc: "Une visualisation 3D pour comprendre les volumes, tester les choix esthétiques et mieux vous projeter avant réalisation." },
    { title: "Rendus Photoréalistes", cat: "Marketing", loc: "Digital", area: "Ultra High Def", img: IMAGES.renders.montlouis, desc: "Des rendus 3D haute définition pour visualiser le projet dans une version proche du résultat attendu." },
    { title: "Dossiers Complets", cat: "Consulting", loc: "National", area: "BIM Integrated", img: IMAGES.projects.cyr_extension.alt, desc: "Plans, pièces graphiques et documents administratifs sont réunis dans un dossier structuré pour vos démarches." },
];

function ArchiServices() {
    const containerRef = useRef(null);
    const accordionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [lastExpandedIndex, setLastExpandedIndex] = useState<number | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

        });
        return () => ctx.revert();
    }, []);
    const handleExpand = (index: number) => {
        setLastExpandedIndex(null);
        setExpandedIndex(index);
    };

    const handleClose = (index: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setLastExpandedIndex(index);
        setExpandedIndex(null);
    };


    return (
        <section id="expertise" ref={containerRef} className="bg-transparent font-display relative">
            {/* BACKGROUND DECORATIVE CIRCLES */}
            <ArchiDrawing type="circle" className="-top-20 left-0 md:-left-[10%] w-[120vw] md:w-[60vw] opacity-[0.03]" trigger={containerRef} />

            {/* INTRO DIVIDER BLOCK */}
            <div className="relative py-20 md:py-20 px-10 xl:pl-[25vw] md:pr-20 flex flex-col md:flex-row justify-between items-end gap-16 z-10 bg-transparent">
                <div className="space-y-8 relative w-full md:w-auto">
                    <div className="relative">
                        {/* Down Arrow */}
                        <ArchiReveal type="fade" delay={0.4} className="absolute -left-10 md:-left-16 top-6 md:top-8">
                            <div className="flex items-center justify-center opacity-50">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <polyline points="19 12 12 19 5 12"></polyline>
                                </svg>
                            </div>
                        </ArchiReveal>

                        <h2 className="text-5xl md:text-8xl lg:text-[7vw] font-black text-[#0a0a0a] uppercase tracking-tighter leading-[0.85] flex flex-col">
                            <ArchiReveal type="up" delay={0.2}>
                                <span className="block">Studio</span>
                            </ArchiReveal>
                            <ArchiReveal type="up" delay={0.3}>
                                <span
                                    className="block italic text-transparent mt-2"
                                    style={{ WebkitTextStroke: '1px rgba(10,10,10,0.2)' }}
                                >
                                    conception
                                </span>
                            </ArchiReveal>
                        </h2>
                    </div>
                </div>

                <div className="md:max-w-[320px] lg:max-w-md border-l border-[#0a0a0a]/20 pl-8 mb-4">
                    <ArchiReveal type="fade" delay={0.5}>
                        <p className="text-[#0a0a0a]/60 text-[9px] md:text-[10px] lg:text-[11px] font-bold tracking-[0.15em] leading-[2]">
                            Une approche complète pour préparer, dessiner et visualiser vos projets de construction.<br></br>
                            Permis, plans techniques, modélisation 3D : chaque service répond à une étape clé du projet.
                        </p>
                    </ArchiReveal>
                </div>
            </div>

            {/* ACCORDION CONTAINER - Trigger for UI hiding */}
            <div id="expertise-content" ref={accordionRef} className="relative h-[85vh] lg:h-[85vh] flex flex-col lg:flex-row overflow-hidden border-y border-black/10 z-[110] bg-[#0a0a0a]">
                {services.map((service, index) => {
                    const isActive = activeIndex === index;
                    const isExpanded = expandedIndex === index;
                    const isCollapsing = lastExpandedIndex === index;
                    const anyExpanded = expandedIndex !== null;

                    const flexClass = anyExpanded
                        ? (isExpanded ? "flex-[100]" : "flex-[0] border-none opacity-0 pointer-events-none")
                        : (isActive ? "flex-[4] lg:flex-[6]" : "flex-1");

                    return (
                        <div
                            key={index}
                            onMouseEnter={() => { if (!anyExpanded) setActiveIndex(index); }}
                            className={cn(
                                "relative w-full lg:w-auto h-full transition-all duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] cursor-default overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 group",
                                flexClass
                            )}
                            style={{ perspective: "2500px" }}
                        >
                            {/* 3D WRAPPER */}
                            <div
                                className="w-full h-full relative preserve-3d"
                                style={{
                                    animation: isExpanded
                                        ? 'spin-expand-3d 1.5s cubic-bezier(0.25,1,0.5,1) forwards'
                                        : (isCollapsing ? 'spin-collapse-3d 1.5s cubic-bezier(0.25,1,0.5,1) forwards' : 'none')
                                }}
                            >
                                {/* BACK FACE (LOGO SHOWN AT 180 DEG) */}
                                <div className="absolute inset-0 bg-white flex flex-col items-center justify-center backface-hidden border border-black/5 z-0" style={{ transform: 'rotateY(180deg)' }}>
                                    <div className="relative">
                                        <img
                                            src="/Logo%20ArchiMade.png"
                                            alt="ArchiMade Logo"
                                            className="w-48 md:w-64 relative z-10 drop-shadow-2xl"
                                        />
                                    </div>
                                    <div className="mt-12 flex flex-col items-center gap-2">
                                        <div className="w-8 h-[1px] bg-black/20"></div>
                                        <p className="text-black/40 tracking-[0.6em] font-bold uppercase text-[9px] animate-fade-in delay-500">Processing Data</p>
                                    </div>
                                </div>

                                {/* FRONT FACE (MAIN CONTENT) */}
                                <div className="absolute inset-0 backface-hidden bg-[#0a0a0a] z-10 overflow-hidden">
                                    {/* BACKGROUND IMAGE */}
                                    <div className="absolute inset-0 w-full h-full">
                                        <img
                                            src={service.img}
                                            alt={service.title}
                                            className={cn(
                                                "w-full h-full object-cover transition-all duration-1000",
                                                isActive || isExpanded ? "scale-100 grayscale-0 brightness-100" : "scale-125 grayscale brightness-50"
                                            )}
                                        />
                                        {/* GRADIENT OVERLAY FOR TEXT READABILITY */}
                                        <div className={cn(
                                            "absolute inset-0 transition-opacity duration-1000",
                                            isActive || isExpanded ? "bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100" : "bg-black/60 opacity-100"
                                        )}></div>
                                    </div>

                                    {/* INACTIVE STATE CONTENT (Horizontal on mobile, Vertical on Desktop) */}
                                    <div className={cn(
                                        "absolute inset-0 flex flex-row lg:flex-col justify-between items-center px-6 lg:px-0 py-0 lg:py-10 transition-opacity duration-500 delay-100 pointer-events-none",
                                        isActive || isExpanded ? "opacity-0" : "opacity-100"
                                    )}>
                                        <span className="text-white/40 font-mono text-xs lg:text-sm w-8 lg:w-auto text-left lg:text-center">0{index + 1}</span>
                                        <div className="flex-1 flex items-center justify-start lg:justify-center overflow-hidden w-full lg:w-auto pl-4 lg:pl-0">
                                            <h3 className="text-white font-bold text-xs sm:text-sm md:text-lg lg:text-xl uppercase tracking-widest lg:-rotate-90 whitespace-nowrap truncate lg:overflow-visible">
                                                {service.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* ACTIVE / EXPANDED STATE CONTENT */}
                                    <div className={cn(
                                        "absolute inset-0 flex flex-col p-6 md:p-10 lg:p-16 transition-all duration-700",
                                        isActive || isExpanded ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-10 pointer-events-none",
                                        isExpanded ? "justify-center" : "justify-end"
                                    )}>

                                        {/* CLOSE BUTTON (only visible when expanded) */}
                                        {isExpanded && (
                                            <div
                                                className="absolute top-6 right-6 lg:top-10 lg:right-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white text-white hover:text-black transition-colors z-50 animate-fade-in"
                                                onClick={(e) => handleClose(index, e)}
                                            >
                                                <X className="w-4 h-4 lg:w-5 lg:h-5" />
                                            </div>
                                        )}

                                        {/* HEADER DATA */}
                                        <div className={cn(
                                            "flex flex-col mb-6 lg:mb-10 w-full max-w-6xl transition-all duration-700",
                                            isExpanded ? "lg:flex-col items-start gap-4 lg:gap-10" : "md:flex-row justify-between items-start md:items-end gap-4 lg:gap-10"
                                        )}>
                                            <div>
                                                <span className="text-white/60 font-mono text-xs lg:text-sm mb-2 lg:mb-4 block">0{index + 1} // EXPERTISE</span>
                                                <h2 className={cn(
                                                    "font-black text-white uppercase tracking-tighter leading-none transition-all duration-1000",
                                                    isExpanded ? "text-4xl md:text-6xl lg:text-8xl whitespace-normal" : "text-2xl sm:text-3xl lg:text-4xl xl:text-5xl whitespace-normal lg:whitespace-nowrap"
                                                )}>
                                                    {service.title}
                                                </h2>
                                            </div>

                                            {/* EXPANDED EXTRA TEXT */}
                                            {isExpanded && (
                                                <p className="text-white/80 text-sm sm:text-base lg:text-2xl font-light max-w-3xl leading-relaxed animate-fade-in mt-4 lg:mt-6">
                                                    {service.desc}
                                                </p>
                                            )}
                                        </div>

                                        {/* EXPLORE BUTTON (only visible when NOT expanded) */}
                                        {!isExpanded && (
                                            <div
                                                className="flex items-center gap-3 lg:gap-4 group/btn w-fit cursor-pointer pointer-events-auto"
                                                onClick={() => handleExpand(index)}
                                            >
                                                <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full border border-white/30 flex items-center justify-center group-hover/btn:bg-white transition-colors">
                                                    <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 text-white group-hover/btn:text-black transition-colors" />
                                                </div>
                                                <span className="text-[10px] lg:text-xs font-bold text-white uppercase tracking-widest group-hover/btn:tracking-[0.3em] transition-all">
                                                    Découvrir
                                                </span>
                                            </div>
                                        )}

                                        {/* START PROJECT BUTTON (only visible when expanded) */}
                                        {isExpanded && (
                                            <div
                                                className="mt-6 lg:mt-10 flex items-center gap-3 lg:gap-4 group/btn w-fit cursor-pointer pointer-events-auto bg-white px-6 py-3 lg:px-8 lg:py-4 rounded-full text-black hover:bg-white/90 transition-all animate-fade-in"
                                                onClick={() => {
                                                    (window as any).lenis?.scrollTo('#contact');
                                                    setTimeout(() => handleClose(index, { stopPropagation: () => { } } as any), 1000);
                                                }}
                                            >
                                                <span className="text-xs lg:text-sm font-bold uppercase tracking-widest">
                                                    Démarrer ce projet
                                                </span>
                                                <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5" />
                                            </div>
                                        )}
                                    </div>
                                </div> {/* END FRONT FACE */}
                            </div> {/* END 3D WRAPPER */}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}








function ArchiTransitionOverlay({ isVisible, onComplete, projectTitle }: { isVisible: boolean, onComplete: () => void, projectTitle?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const circle1Ref = useRef<HTMLDivElement>(null);
    const circle2Ref = useRef<HTMLDivElement>(null);
    const greyPanelRef = useRef<HTMLDivElement>(null);
    const blackPanelRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!isVisible) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: onComplete
            });

            // Reset
            gsap.set([circle1Ref.current, circle2Ref.current, textRef.current], { opacity: 0, scale: 0.8 });
            gsap.set([greyPanelRef.current, blackPanelRef.current], { y: "100%" });

            // 1. Shapes & Text Entrance
            tl.to(containerRef.current, { opacity: 1, duration: 0.1 });
            tl.to(circle1Ref.current, { opacity: 1, scale: 1.2, rotation: 45, duration: 1.5, ease: "power4.out" }, 0);
            tl.to(circle2Ref.current, { opacity: 1, scale: 1.5, rotation: -30, duration: 1.8, ease: "power4.out" }, 0.1);
            tl.to(textRef.current, { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }, 0.2);

            // 2. Sliding Panels (Grey then Black)
            tl.to(greyPanelRef.current, {
                y: "0%",
                duration: 0.9,
                ease: "expo.inOut"
            }, 1.2);

            tl.to(blackPanelRef.current, {
                y: "0%",
                duration: 0.9,
                ease: "expo.inOut"
            }, 1.4);

            // 3. Keep black panel while onComplete triggers
        }, containerRef);

        return () => ctx.revert();
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[400] opacity-0">
            {/* Geometric Shapes Background */}
            <div className="absolute inset-0 bg-[#e5e5e5] overflow-hidden">
                <div
                    ref={circle1Ref}
                    className="absolute -top-[20%] -left-[10%] w-[80vw] h-[80vw] border-[100px] border-black/5 rounded-full"
                />
                <div
                    ref={circle2Ref}
                    className="absolute -bottom-[30%] -right-[10%] w-[100vw] h-[100vw] border-[150px] border-black/5 rounded-full"
                />

                <div ref={textRef} className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[15vw] font-black uppercase tracking-tighter text-black/5 select-none text-center leading-[0.8]">{projectTitle || "ArchiMade"}</span>
                </div>
            </div>

            {/* Sliding Windows */}
            <div
                ref={greyPanelRef}
                className="absolute inset-0 bg-[#333] z-40"
            />
            <div
                ref={blackPanelRef}
                className="absolute inset-0 bg-[#0a0a0a] z-50"
            />
        </div>
    );
}


function ArchiProjectDetail({ project, onClose, onNext, key }: { project: any; onClose: () => void; onNext?: (p: any) => void; key?: any }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroImgRef = useRef<HTMLImageElement>(null);
    const nextProjectIndex = (PROJECTS.findIndex(p => p.title === project.title) + 1) % PROJECTS.length;
    const nextProject = PROJECTS[nextProjectIndex];

    useLayoutEffect(() => {
        if (!project) return;
        if ((window as any).lenis) (window as any).lenis.stop();
        document.body.style.overflow = 'hidden';

        const ctx = gsap.context(() => {
            gsap.fromTo(heroImgRef.current,
                { scale: 1.5, filter: "blur(20px)" },
                { scale: 1, filter: "blur(0px)", duration: 2.5, ease: "expo.out" }
            );

            gsap.from(".cinematic-text", {
                opacity: 0,
                y: 50,
                duration: 1.5,
                stagger: 0.15,
                ease: "power4.out",
                delay: 0.5
            });

            gsap.from(".cinematic-img", {
                opacity: 0,
                y: 100,
                duration: 1.5,
                stagger: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".gallery-grid",
                    start: "top 90%",
                    scroller: containerRef.current
                }
            });
        });

        return () => {
            ctx.revert();
            if ((window as any).lenis) (window as any).lenis.start();
            document.body.style.overflow = '';
        };
    }, [project]);

    if (!project) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#0a0a0a]/98 backdrop-blur-3xl overflow-y-auto overflow-x-hidden font-display text-white"
            ref={containerRef}
        >
            {/* Header / Close */}
            <button
                onClick={onClose}
                className="fixed top-6 right-6 md:top-10 md:right-10 z-[250] group flex items-center gap-4"
            >
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60 opacity-0 group-hover:opacity-100 transition-all hidden md:block">Fermer</span>
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-xl">
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                </div>
            </button>

            <div className="w-full">
                {/* Hero Section */}
                <div className="h-[80vh] md:h-screen w-full relative overflow-hidden group">
                    <img
                        ref={heroImgRef}
                        src={encodeURI(project.path)}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90 pointer-events-none z-10"></div>

                    <div className="absolute bottom-10 left-6 md:bottom-20 md:left-20 max-w-5xl space-y-6 pointer-events-none z-20">
                        <div className="flex items-center gap-4 cinematic-text">
                            <div className="w-12 h-[1px] bg-white/40"></div>
                            <span className="text-[10px] font-mono text-white/60 uppercase tracking-[0.5em]">{project.city}</span>
                        </div>
                        <h2 className="text-5xl md:text-[8vw] font-black uppercase tracking-tighter leading-[0.8] cinematic-text drop-shadow-2xl">
                            {project.title}
                        </h2>
                    </div>
                </div>

                {/* Specs Bar */}
                <div className="border-y border-white/10 bg-white/5 backdrop-blur-2xl sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-10 md:px-20 py-8 flex flex-wrap justify-between items-center gap-10">
                        <div className="flex gap-20">
                            <div>
                                <p className="text-[8px] font-mono text-white/30 uppercase mb-1 font-bold tracking-widest">Programme</p>
                                <p className="text-xs font-bold uppercase tracking-widest">{project.type}</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-mono text-white/30 uppercase mb-1 font-bold tracking-widest">Année</p>
                                <p className="text-xs font-bold uppercase tracking-widest">{project.year}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            {project.specs?.map((spec: string, i: number) => (
                                <span key={i} className="text-[9px] border border-white/20 bg-white/5 px-4 py-1.5 rounded-full text-white/80 font-bold uppercase tracking-widest">
                                    {spec}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content Gallery */}
                <div className="py-20 md:py-40 px-6 md:px-20 gallery-grid grid grid-cols-12 gap-8 md:gap-16 max-w-screen-2xl mx-auto">
                    {Array.from(new Set([project.path, ...(project.gallery || [])])).filter(Boolean).map((img: any, i: number) => {
                        let colSpan = "col-span-12";
                        if (i % 3 === 1) colSpan = "col-span-12 md:col-span-8 md:col-start-1";
                        if (i % 3 === 2) colSpan = "col-span-12 md:col-span-7 md:col-start-6";

                        return (
                            <div key={i} className={cn("relative group overflow-hidden cinematic-img rounded-xl", colSpan)}>
                                <div className="aspect-video md:aspect-auto">
                                    <img
                                        src={encodeURI(img)}
                                        className="w-full h-full object-cover shadow-2xl transition-transform duration-1000 group-hover:scale-105"
                                        alt={`Gallery ${i}`}
                                    />
                                </div>
                                <div className="mt-6 flex justify-between items-center opacity-30 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[8px] font-mono uppercase tracking-widest font-bold text-white/60">Asset_{i + 1}.render</span>
                                    <div className="h-[1px] flex-1 mx-8 bg-white/10"></div>
                                    <span className="text-[8px] font-mono uppercase font-bold text-white/40">ID_{project.year}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Philosophy Section */}
                <div className="max-w-4xl mx-auto px-10 md:px-20 py-40 text-center space-y-12">
                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-white/90">Philosophie</h3>
                    <p className="text-xl md:text-3xl font-light text-white/60 leading-relaxed max-w-2xl mx-auto">
                        Chaque projet est une réponse unique à un contexte spécifique. Pour {project.title}, nous avons cherché l'équilibre parfait entre fonction et émotion.
                    </p>
                </div>

                {/* NEXT PROJECT NAVIGATION */}
                <div
                    className="relative w-full h-[60vh] md:h-screen overflow-hidden group cursor-pointer border-t border-white/10"
                    onClick={() => onNext && onNext(nextProject)}
                >
                    <img
                        src={encodeURI(nextProject.path)}
                        alt={nextProject.title}
                        className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1500 ease-out opacity-40 group-hover:opacity-60"
                    />
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8 p-10">
                        <span className="text-xs uppercase tracking-[0.8em] text-white/40 font-bold group-hover:text-white group-hover:tracking-[1em] transition-all duration-700">Projet Suivant</span>
                        <h4 className="text-5xl md:text-9xl font-black uppercase tracking-tighter leading-none text-center group-hover:scale-110 transition-transform duration-1000">
                            {nextProject.title}
                        </h4>
                        <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                            <ArrowUpRight className="w-8 h-8" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}


function ArchiImageModal({ src, onClose }: { src: string; onClose: () => void }) {
    useEffect(() => {
        if ((window as any).lenis) (window as any).lenis.stop();
        document.body.style.overflow = 'hidden';
        return () => {
            if ((window as any).lenis) (window as any).lenis.start();
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="fixed top-6 right-6 z-[1010] w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
            >
                <X className="w-6 h-6" />
            </button>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-7xl w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={encodeURI(src)}
                    alt="Modal"
                    className="max-w-full max-h-full object-contain rounded-sm shadow-2xl"
                />
            </motion.div>
        </motion.div>
    );
}

function ArchiGallery() {
    const sectionRef = useRef<HTMLElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const scrollToNext = () => {
        if ((window as any).lenis) {
            (window as any).lenis.scrollTo("#expertise-3d", { duration: 2 });
        } else {
            document.getElementById("expertise-3d")?.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Prepare all images for the gallery with duplicate prevention
    const seenImages = new Set<string>();
    const galleryItems = PROJECTS.flatMap(project => {
        const items = [];
        // Main image
        if (!seenImages.has(project.path)) {
            items.push({
                src: project.path,
                title: project.title,
                city: project.city,
                label: "RÉALISATION",
                project,
                featured: project.featured
            });
            seenImages.add(project.path);
        }
        
        // Additional gallery images
        if (project.gallery) {
            project.gallery.forEach((img, idx) => {
                if (!seenImages.has(img)) {
                    items.push({
                        src: img,
                        title: project.title,
                        city: project.city,
                        label: "DÉTAIL",
                        project,
                        featured: project.featured && idx === 0
                    });
                    seenImages.add(img);
                }
            });
        }
        return items;
    });

    // Reorder to put featured first
    galleryItems.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".gallery-header", {
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".gallery-header",
                    start: "top 90%"
                }
            });

            const cards = gsap.utils.toArray('.project-card');
            cards.forEach((card: any, i: number) => {
                gsap.from(card, {
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    delay: (i % 3) * 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 95%",
                        toggleActions: "play none none none"
                    }
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="realisations" ref={sectionRef} className="relative w-full bg-transparent font-display z-50 flex flex-col items-center pt-32 md:pt-56 pb-20 px-6 md:px-20 lg:px-32 overflow-hidden">
            <AnimatePresence mode="wait">
                {selectedImage && (
                    <ArchiImageModal
                        src={selectedImage}
                        onClose={() => setSelectedImage(null)}
                    />
                )}
            </AnimatePresence>

            {/* Gallery Header */}
            <div className="w-full mb-20 md:mb-32 gallery-header">
                <div className="md:justify-end flex items-center gap-4 mb-6">
                    <div className="w-12 h-[1px] bg-black/20"></div>
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.5em] text-black/30 font-bold">Réalisations</span>
                </div>
                <h2 className="text-5xl md:text-8xl md:text-end font-black uppercase tracking-tighter leading-[0.85] text-black">
                    L'Art de <br />
                    <span className="text-black/20 italic font-medium">Bâtir</span>
                </h2>
            </div>

            {/* MASONRY GALLERY - Content Trigger for UI hiding */}
            <div id="realisations-content" className="w-full columns-2 lg:columns-3 gap-4 md:gap-8 space-y-4 md:space-y-8">
                {galleryItems.map((item, i) => (
                    <div
                        key={i}
                        onClick={() => setSelectedImage(item.src)}
                        className="project-card break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl bg-neutral-100 shadow-sm border border-black/5"
                    >
                        {/* Image with Parallax Scroll */}
                        <div className="overflow-hidden">
                            <img
                                src={encodeURI(item.src)}
                                alt={item.title}
                                className="w-full h-auto object-cover transition-all duration-[1.5s] group-hover:scale-110 group-hover:rotate-1"
                            />
                        </div>



                        {/* Minimal Info Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-8">
                            <p className="text-white/60 text-[8px] font-mono uppercase tracking-[0.4em] mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.city}</p>
                            <h3 className="text-white text-xl font-black uppercase tracking-tighter leading-none translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{item.title}</h3>
                        </div>
                    </div>
                ))}
            </div>


        </section>
    );
}

function ArchiValues() {
    const sectionRef = useRef<HTMLElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const values = [
        { num: "01", title: "RÉACTIVITÉ", desc: "Un suivi réactif pour faire avancer vos plans, vos démarches et votre dossier." },
        { num: "02", title: "DÉLAIS MAÎTRISÉS", desc: "Chaque projet est organisé avec un calendrier clair pour livrer vos plans et dossiers dans les temps définis." },
        { num: "03", title: "RAYONNEMENT", desc: "ArchiMade accompagne vos projets partout en France, principalement à distance, à partir de vos plans, photos et éléments techniques." },
        { num: "04", title: "FLEXIBILITÉ", desc: "Plans, croquis, relevés ou photos : ArchiMade s'adapte aux éléments disponibles pour démarrer l'étude de votre projet." },
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(imgRef.current, {
                yPercent: 10,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="pourquoi-archimade" className="relative w-full overflow-hidden group/values z-30 font-display bg-[#0a0a0a]">
            <div className="relative w-full overflow-hidden">
                <img
                    ref={imgRef}
                    src={IMAGES.renders.montlouis}
                    alt="Pourquoi ArchiMade ?"
                    className="absolute top-[-10%] left-0 w-full h-[120%] object-cover grayscale brightness-50 group-hover/values:scale-105 transition-transform duration-[2s]"
                />

                {/* Dark overlay for text readability */}
                <div className="relative z-10 bg-black/60 flex flex-col justify-center px-6 md:px-16 xl:pl-[25vw] md:pr-20 py-20 md:py-32 min-h-[400px] md:min-h-[750px] xl:min-h-[600px]">
                    <div className="mb-10 md:mb-20">
                        <ArchiReveal type="fade">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-[1px] bg-white/30"></div>
                                <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/40 font-bold">Pourquoi ArchiMade ?</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none flex flex-col">
                                <span>Conception.</span>
                                <span className="text-white/20 italic font-medium">Projections.</span>
                            </h2>
                        </ArchiReveal>
                    </div>

                    <div className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-8 md:gap-x-12 md:gap-y-20 pb-10 md:pb-0 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 lg:grid-cols-4 md:grid-cols-2">
                        {values.map((v, i) => (
                            <div key={i} className="min-w-[85vw] md:min-w-0 snap-center">
                                <ArchiReveal delay={0.2 + i * 0.1} type="up" className="flex flex-col gap-4">
                                    <div className="flex items-center gap-4">
                                        <span className="text-3xl md:text-3xl font-black text-white/10 font-mono tracking-tighter">{v.num}</span>
                                        <div className="h-[1px] flex-1 bg-white/10"></div>
                                    </div>
                                    <h3 className="text-white font-bold text-base md:text-base lg:text-lg uppercase tracking-tight">{v.title}</h3>
                                    <p className="text-white/40 text-xs md:text-xs lg:text-sm leading-relaxed font-light max-w-sm">{v.desc}</p>
                                </ArchiReveal>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Scroll Indicator Dots */}
                    <div className="flex md:hidden justify-center gap-3 mt-4">
                        {values.map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function ArchiFAQ() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);

    const faqs = [
        { q: "Quels sont vos délais ?", a: "Nous intervenons généralement sous 1 à 2 semaines selon la complexité du projet." },
        { q: "Intervenez-vous dans toute la France ?", a: "Oui, nous accompagnons nos clients sur l'ensemble du territoire grâce à notre workflow digital." },
        { q: "Quels documents dois-je fournir ?", a: "Un plan de masse ou des photos suffisent pour une première étude de faisabilité." }
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".faq-header", {
                x: -50,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "restart none none none"
                }
            });
            gsap.from(".faq-item", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="faq" ref={sectionRef} className="bg-white text-[#1a1a1a] py-32 md:py-28 relative z-20">
            <div className="max-w-4xl mx-auto px-6 md:px-20">
                <div className="faq-header flex items-center gap-4 mb-12">
                    <div className="w-8 h-[1px] bg-black/10"></div>
                    <h3 className="text-[10px] uppercase tracking-[0.4em] text-black/30 font-bold font-display">Questions Fréquentes</h3>
                </div>
                <div className="space-y-1">
                    {faqs.map((faq, i) => (
                        <div key={i} className="faq-item border-b border-black/[0.05]">
                            <button
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                className="w-full py-6 flex justify-between items-center text-left group"
                            >
                                <span className="text-sm md:text-base font-bold uppercase tracking-tight group-hover:pl-2 transition-all duration-300">{faq.q}</span>
                                <div className={cn("w-4 h-4 flex items-center justify-center transition-transform duration-500", openFaq === i ? "rotate-180" : "rotate-0")}>
                                    <ChevronDown className="w-3 h-3 text-black/20" />
                                </div>
                            </button>
                            <AnimatePresence>
                                {openFaq === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <p className="pb-6 text-sm text-black/50 leading-relaxed font-light italic">
                                            {faq.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ArchiContact() {
    const sectionRef = useRef<HTMLElement>(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) return;

        setStatus('sending');
        setErrorMsg('');

        try {
            console.log('🚀 Submitting form data:', formData);
    const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Erreur lors de l\'envoi.');
            }

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (err: any) {
            setStatus('error');
            setErrorMsg(err.message || 'Une erreur est survenue.');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 90%",
                    toggleActions: "restart none none none"
                }
            });

            tl.fromTo(".contact-title",
                { y: 80, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", overwrite: "auto" }
            )
                .fromTo(".contact-desc",
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", overwrite: "auto" },
                    "-=0.8"
                )
                .fromTo(".contact-info-item",
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out", overwrite: "auto" },
                    "-=0.5"
                )
                .fromTo(".contact-form-card",
                    { y: 60, opacity: 0, scale: 0.97 },
                    { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out", overwrite: "auto" },
                    "-=0.8"
                )
                .fromTo(".contact-footer-bar",
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", overwrite: "auto" },
                    "-=0.4"
                );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const buttonContent = () => {
        if (status === 'sending') return (
            <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                Envoi en cours...
            </span>
        );
        if (status === 'success') return (
            <span className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                Message envoyé !
            </span>
        );
        if (status === 'error') return 'Réessayer';
        return 'Envoyer le message';
    };

    return (
        <footer
            ref={sectionRef}
            id="contact"
            className="lg:sticky lg:bottom-0 relative z-0 bg-white text-[#1a1a1a] font-display overflow-hidden w-full min-h-screen py-24 lg:py-0 lg:h-screen flex flex-col justify-center"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 w-full relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 lg:gap-20">
                    {/* Left: Content */}
                    <div className="lg:w-1/2 space-y-10">
                        <div className="space-y-6">
                            <h2 className="contact-title text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
                                CONTACT
                            </h2>
                            <p className="contact-desc text-black/40 text-base md:text-lg font-light leading-relaxed max-w-md">
                                Un projet de construction, une demande de permis ou des plans à réaliser ?<br />
                                Présentez votre besoin via le formulaire, ArchiMade vous répond rapidement.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-10 lg:gap-12 pt-8 border-t border-black/5">
                            <div className="contact-info-item space-y-2">
                                <div className="flex items-center gap-3 text-black/30">
                                    <Mail className="w-4 h-4" />
                                    <span className="text-[9px] uppercase tracking-widest font-bold">Email</span>
                                </div>
                                <a href="mailto:contact@archi-made.com" className="text-lg font-bold hover:opacity-50 transition-opacity whitespace-nowrap">contact@archi-made.com</a>
                            </div>
                            <div className="contact-info-item space-y-2">
                                <div className="flex items-center gap-3 text-black/30">
                                    <Phone className="w-4 h-4" />
                                    <span className="text-[9px] uppercase tracking-widest font-bold">Téléphone</span>
                                </div>
                                <a href="tel:+33624896695" className="text-lg font-bold hover:opacity-50 transition-opacity whitespace-nowrap">+33 6 24 89 66 95</a>
                            </div>
                        </div>
                    </div>

                    {/* Right: Premium Card */}
                    <div className="contact-form-card lg:w-[500px] xl:w-[580px] w-full">
                        <div className="bg-[#0a0a0a] p-8 md:p-12 lg:p-14 rounded-2xl border border-black/5 shadow-2xl relative overflow-hidden text-white">
                            <h3 className="text-xl font-bold uppercase tracking-tight mb-8">Nous contacter</h3>
                            <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <label className="text-[8px] uppercase tracking-widest text-white/30 font-bold">Nom</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-sm focus:border-white/30 outline-none transition-all placeholder:text-white/15 text-white"
                                        placeholder="Votre nom"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[8px] uppercase tracking-widest text-white/30 font-bold">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-sm focus:border-white/30 outline-none transition-all placeholder:text-white/15 text-white"
                                        placeholder="votreemail@exemple.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[8px] uppercase tracking-widest text-white/30 font-bold">Message</label>
                                    <textarea
                                        rows={3}
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-sm focus:border-white/30 outline-none transition-all resize-none placeholder:text-white/15 text-white"
                                        placeholder="Parlez-nous de votre projet..."
                                    />
                                </div>
                                {status === 'error' && (
                                    <p className="text-red-400 text-xs font-medium">{errorMsg}</p>
                                )}
                                <button
                                    type="submit"
                                    disabled={status === 'sending' || status === 'success'}
                                    className={cn(
                                        "w-full py-5 text-[10px] font-black uppercase tracking-[0.4em] rounded-lg transition-all duration-300 transform hover:-translate-y-1",
                                        status === 'success'
                                            ? "bg-emerald-500 text-white"
                                            : status === 'error'
                                                ? "bg-red-500 text-white hover:bg-red-400"
                                                : "bg-white text-black hover:bg-opacity-90",
                                        (status === 'sending' || status === 'success') && "opacity-80 cursor-not-allowed hover:translate-y-0"
                                    )}
                                >
                                    {buttonContent()}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="contact-footer-bar mt-12 md:mt-16 lg:mt-24 pt-8 md:pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center opacity-30 text-[9px] uppercase tracking-[0.2em] font-bold">
                    <p>© {new Date().getFullYear()} ArchiMade Studio — France</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <Link to="/mentions-legales" className="hover:text-black transition-colors uppercase">Mentions légales</Link>
                        <Link to="/confidentialite" className="hover:text-black transition-colors uppercase">Confidentialité</Link>
                        <Link to="/cookies" className="hover:text-black transition-colors uppercase">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// --- COOKIE BANNER COMPONENT ---
function ArchiCookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('archimade-cookies-consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 4000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAction = (type: 'accept' | 'decline') => {
        localStorage.setItem('archimade-cookies-consent', type);
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-6 left-4 right-4 md:bottom-8 md:left-1/2 md:-translate-x-1/2 z-[3000] md:w-auto md:max-w-2xl"
                >
                    <div className="bg-[#0a0a0a]/90 backdrop-blur-[30px] border border-white/10 rounded-[2rem] p-4 md:p-2 flex flex-col md:flex-row items-center gap-4 md:gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group">
                        
                        {/* Left Side: Icon & Context */}
                        <div className="flex items-center gap-4 w-full md:w-auto pl-2 md:pl-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-lg">
                                <Cookie className="w-5 h-5 text-black" />
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white whitespace-nowrap">Studio Experience</h4>
                                <p className="text-[9px] text-white/40 font-light leading-none hidden md:block border-l border-white/10 pl-3">
                                    Nous personnalisons votre parcours digital.
                                </p>
                            </div>
                        </div>

                        {/* Right Side: Actions */}
                        <div className="flex items-center justify-between md:justify-end gap-2 w-full md:w-auto md:ml-auto">
                            <Link 
                                to="/cookies"
                                className="px-3 py-3 text-white/30 text-[9px] font-bold uppercase tracking-widest hover:text-white transition-colors"
                            >
                                Détails
                            </Link>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => handleAction('decline')}
                                    className="px-4 py-2.5 bg-white/5 border border-white/10 text-white/60 text-[9px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-white/10 hover:text-white transition-all duration-300"
                                >
                                    Refuser
                                </button>
                                <button 
                                    onClick={() => handleAction('accept')}
                                    className="px-7 py-2.5 bg-white text-black text-[9px] font-black uppercase tracking-[0.3em] rounded-full hover:scale-105 transition-all duration-300 shadow-xl"
                                >
                                    Accepter
                                </button>
                            </div>
                        </div>

                        {/* Animated Glow Accent */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// --- MAIN PAGE EXPORT ---
export default function ArchiMadeLanding() {
    const [isLoading, setIsLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isUIHidden, setIsUIHidden] = useState(false);
    const mainRef = useRef<HTMLDivElement>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        // Expose lenis globally for component access
        (window as any).lenis = lenis;

        lenis.on('scroll', () => {
            ScrollTrigger.update();
            setIsScrolling(true);
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 200);
        });

        gsap.ticker.add((time) => { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        };
    }, []);

    useLayoutEffect(() => {
        if (!isLoading) {
            const ctx = gsap.context(() => {
                // Entrance animation for the main layout
                gsap.from(".archi-entrance", {
                    opacity: 0,
                    y: 100,
                    duration: 1.5,
                    stagger: 0.2,
                    ease: "power4.out",
                    delay: 0.2,
                    clearProps: "all"
                });


                // UI HIDING LOGIC (Triggered only when content starts)
                // Hiding happens exactly when the section hits the top of the viewport
                ScrollTrigger.create({
                    trigger: "#expertise",
                    start: "top top",
                    endTrigger: "#expertise-3d",
                    end: "bottom 20%",
                    onEnter: () => setIsUIHidden(true),
                    onLeave: () => setIsUIHidden(false),
                    onEnterBack: () => setIsUIHidden(true),
                    onLeaveBack: () => setIsUIHidden(false),
                });

                ScrollTrigger.create({
                    trigger: "#realisations",
                    start: "top top",
                    end: "bottom 20%",
                    onEnter: () => setIsUIHidden(true),
                    onLeave: () => setIsUIHidden(false),
                    onEnterBack: () => setIsUIHidden(true),
                    onLeaveBack: () => setIsUIHidden(false),
                });

            }, mainRef);
            return () => ctx.revert();
        }
    }, [isLoading]);

    return (
        <>
            {isLoading ? (
                <ArchiPreloader onComplete={() => setIsLoading(false)} />
            ) : (
                <div
                    ref={mainRef}
                    className="min-h-screen text-[#0a0a0a] selection:bg-[#0a0a0a] selection:text-white font-sans antialiased overflow-x-hidden block"
                >
                    <ArchiHeader onMenuClick={() => setIsMenuOpen(true)} />
                    <ArchiMenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

                    {/* Global Background UI */}
                    <ArchiBackground />

                    {/* Sticky Contact Button */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: isUIHidden ? 0 : 1, x: isUIHidden ? 50 : 0 }}
                        transition={{ duration: 0.5 }}
                        className={cn(
                            "fixed bottom-8 left-8 md:bottom-12 md:left-12 xl:right-[-60px] xl:top-1/2 xl:-translate-y-1/2 xl:bottom-auto xl:left-auto z-[150] mix-blend-difference transition-all duration-500",
                            isUIHidden ? "pointer-events-none" : "pointer-events-auto"
                        )}
                    >
                        <a
                            href="#contact"
                            className="archi-sticky-contact group relative flex items-center justify-center bg-white text-black w-14 h-14 md:w-auto md:h-auto md:px-8 md:py-4 xl:px-10 xl:py-5 rounded-full xl:rounded-t-full xl:rounded-b-none overflow-hidden transition-all duration-500 hover:pr-14 xl:rotate-[-90deg] xl:origin-center"
                        >
                            <span className="hidden md:block text-[10px] font-bold uppercase tracking-[0.4em] relative z-10 whitespace-nowrap">Nous contacter</span>
                            <Phone className="w-5 h-5 md:hidden relative z-10" />
                            <ArrowUpRight className="w-4 h-4 absolute right-6 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
                        </a>
                    </motion.div>

                    {/* Desktop Left Fixed Frame Column - WITH blend mode (Menu + Logo) */}
                    <div className={cn(
                        "archi-sidebar fixed top-0 left-0 bottom-0 w-[25vw] z-[500] hidden xl:flex flex-col justify-between pt-16 pb-12 px-12 lg:px-16 pointer-events-none mix-blend-difference text-white transition-all duration-700",
                        isUIHidden ? "opacity-0 -translate-x-10" : "opacity-100 translate-x-0"
                    )}>
                        <ArchiNav isScrolling={isScrolling} />
                        <ArchiLogo isScrolling={isScrolling} />
                    </div>

                    {/* Main Content Layout */}
                    <main className="archi-entrance relative z-10 pointer-events-none [&>*]:pointer-events-auto">
                        {/* All components take 100% width, offsets handled internally per section */}
                        <div id="hero">
                            <ArchiHero />
                        </div>

                        {/* <ArchiVision /> */}
                        <ArchiAbout />
                        <ArchiServices />
                        <ArchiGallery />

                        <div className="relative z-20 bg-white">
                            <ArchiValues />
                            <ArchiFAQ />
                        </div>
                        <ArchiContact />
                    </main>

                    <ArchiCookieBanner />

                    {/* Global Animation Styles */}
                    <style dangerouslySetInnerHTML={{
                        __html: `
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }
                @keyframes spin-expand-3d {
                    0% { transform: rotateY(0deg) scale(1); }
                    50% { transform: rotateY(180deg) scale(0.6); }
                    100% { transform: rotateY(360deg) scale(1); }
                }
                @keyframes spin-collapse-3d {
                    0% { transform: rotateY(360deg) scale(1); }
                    50% { transform: rotateY(180deg) scale(0.6); }
                    100% { transform: rotateY(0deg) scale(1); }
                }
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                @keyframes rotate-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                html {
                   scroll-behavior: auto;
                }
            `}} />
                </div>
            )}
        </>
    );
}