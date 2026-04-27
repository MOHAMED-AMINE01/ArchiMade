import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
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
    Instagram,
    Facebook,
    ChevronDown
} from "lucide-react";
import { cn } from "../lib/utils";

// --- CONFIG ---
const IMAGES = {
    vision: "/IMAGES/3D/Construction d_une maison individuelle Montlouis sur Loire 37270.png",
    about: "/IMAGES/3D/Construction d_une maison individuelle joue les tours 37300.png",
    renders: [
        "/IMAGES/3D/Construction d_une maison individuelle 37250 Veigné.png",
        "/IMAGES/3D/Création d_une extension 13170 Les pennes Mirabeau.png",
        "/IMAGES/3D/Modifications de façades d_un entrepôt 17100 saintes.png"
    ]
};

const PROJECTS = [
    {
        "title": "Bâtiment d_activités",
        "city": "Inconnu",
        "year": "2024",
        "type": "Projet",
        "path": "/IMAGES/Projets finis/Bâtiment d_activités/4 cellules d_activités rue Jacqueline Auriol la ville aux dames 37700.png",
        "beforePath": "/IMAGES/Projets finis/Bâtiment d_activités/Capture d_écran 2026-04-11 093951.png",
        "gallery": [
            "/IMAGES/Projets finis/Bâtiment d_activités/4 cellules d_activités rue Jacqueline Auriol la ville aux dames 37700.png",
            "/IMAGES/Projets finis/Bâtiment d_activités/Capture d_écran 2026-04-11 093951.png"
        ],
        "specs": [
            "Architecture"
        ]
    },
    {
        "title": "Extension Contemporaine",
        "city": "Esvres",
        "year": "2022",
        "type": "Extension",
        "path": "/IMAGES/Projets finis/Construction d_une extension sur maison existant 37320 Esvres/Insertion 2.png",
        "beforePath": "/IMAGES/Projets finis/Construction d_une extension sur maison existant 37320 Esvres/WhatsApp Image 2022-10-05 at 09.00.22 (1).jpeg",
        "gallery": [
            "/IMAGES/Projets finis/Construction d_une extension sur maison existant 37320 Esvres/Insertion 2.png",
            "/IMAGES/Projets finis/Construction d_une extension sur maison existant 37320 Esvres/WhatsApp Image 2022-10-05 at 09.00.22 (1).jpeg"
        ],
        "specs": [
            "Ossature Bois",
            "Légèreté"
        ]
    },
    {
        "title": "Maison Fondettes",
        "city": "Fondettes",
        "year": "2023",
        "type": "Neuf",
        "path": "/IMAGES/Projets finis/Construction d_une maison individuelle neuve 37230 fondettes/Capture d_écran 2026-04-11 101030.png",
        "beforePath": "/IMAGES/3D/Construction d_une maison individuelle Montlouis sur Loire 37270.png",
        "gallery": [
            "/IMAGES/Projets finis/Construction d_une maison individuelle neuve 37230 fondettes/Capture d_écran 2026-04-11 101030.png"
        ],
        "specs": [
            "Contemporain",
            "Grande Baies"
        ]
    },
    {
        "title": "Maison Saint-Branchs",
        "city": "Saint-Branchs",
        "year": "2023",
        "type": "Neuf",
        "path": "/IMAGES/Projets finis/Construction d_une maison individuelle neuve 37320 saint branchs/Capture d_écran 2026-04-11 102547.png",
        "gallery": [
            "/IMAGES/Projets finis/Construction d_une maison individuelle neuve 37320 saint branchs/Capture d_écran 2026-04-11 102547.png"
        ],
        "specs": [
            "Modernité",
            "Toiture Tuiles"
        ]
    },
    {
        "title": "Villa Saint-Cyr",
        "city": "Saint-Cyr-sur-Loire",
        "year": "2023",
        "type": "Neuf",
        "path": "/IMAGES/Projets finis/Construction d_une maison individuelle neuve 37540 saint cyr sur loire/Capture d_écran 2026-04-11 102226.png",
        "gallery": [
            "/IMAGES/Projets finis/Construction d_une maison individuelle neuve 37540 saint cyr sur loire/Capture d_écran 2026-04-11 102226.png"
        ],
        "specs": [
            "Haut de gamme",
            "Design épuré"
        ]
    },
    {
        "title": "Projet La Suze",
        "city": "La Suze-sur-Sarthe",
        "year": "2023",
        "type": "Neuf",
        "path": "/IMAGES/Projets finis/Construction d_une maison individuelle neuve 72210 la suze sur sarthe/Capture d_écran 2026-04-11 101430.png",
        "gallery": [
            "/IMAGES/Projets finis/Construction d_une maison individuelle neuve 72210 la suze sur sarthe/Capture d_écran 2026-04-11 101430.png"
        ],
        "specs": [
            "Volume",
            "Clarté"
        ]
    },
    {
        "title": "Villa Ligne",
        "city": "Ligueil",
        "year": "2023",
        "type": "Minimalisme",
        "path": "/IMAGES/Projets finis/construction d_une maison indivuelle neuve 37240 ligueil/Capture d_écran 2026-04-11 102902.png",
        "gallery": [
            "/IMAGES/Projets finis/construction d_une maison indivuelle neuve 37240 ligueil/Capture d_écran 2026-04-11 102902.png"
        ],
        "specs": [
            "Toit Mono-pente",
            "Finition Enduit"
        ]
    },
    {
        "title": "Surélévation Garage",
        "city": "Chambray-lès-Tours",
        "year": "2022",
        "type": "Surélévation",
        "path": "/IMAGES/Projets finis/creation d_une surelevation au dessus d_un garage 37170 chambray les tours/46f52069-d1b9-41b3-b202-29c8108447e7.jpg",
        "beforePath": "/IMAGES/Projets finis/creation d_une surelevation au dessus d_un garage 37170 chambray les tours/1abff9e6-a427-41ba-84e4-6202cf7be7ee.jpg",
        "gallery": [
            "/IMAGES/Projets finis/creation d_une surelevation au dessus d_un garage 37170 chambray les tours/1abff9e6-a427-41ba-84e4-6202cf7be7ee.jpg",
            "/IMAGES/Projets finis/creation d_une surelevation au dessus d_un garage 37170 chambray les tours/46f52069-d1b9-41b3-b202-29c8108447e7.jpg"
        ],
        "specs": [
            "Gain d'espace",
            "Optimisation"
        ]
    },
    {
        "title": "Extension Saint-Cyr",
        "city": "Saint-Cyr-sur-Loire",
        "year": "2022",
        "type": "Extension",
        "path": "/IMAGES/Projets finis/Extension sur maison existante 37540/Creation d_une extenstion 37540 saint cyr sur loire - 01.jpeg",
        "beforePath": "/IMAGES/Projets finis/Extension sur maison existante 37540/avant projet.jpeg",
        "gallery": [
            "/IMAGES/Projets finis/Extension sur maison existante 37540/avant projet.jpeg",
            "/IMAGES/Projets finis/Extension sur maison existante 37540/Creation d_une extenstion 37540 saint cyr sur loire - 01.jpeg",
            "/IMAGES/Projets finis/Extension sur maison existante 37540/Creation d_une extenstion 37540 saint cyr sur loire - 02.jpeg"
        ],
        "specs": [
            "Harmonie",
            "Transition"
        ]
    },
    {
        "title": "Réhabilitation Bureaux",
        "city": "Chanceaux-sur-Choisille",
        "year": "2023",
        "type": "Tertiaire",
        "path": "/IMAGES/Projets finis/Loc office rehabiliation d_une zone de stockage en bureau 37390 chanceaux sur choisille/Capture d_écran 2026-04-10 174146.png",
        "gallery": [
            "/IMAGES/Projets finis/Loc office rehabiliation d_une zone de stockage en bureau 37390 chanceaux sur choisille/Capture d_écran 2026-04-10 174146.png",
            "/IMAGES/Projets finis/Loc office rehabiliation d_une zone de stockage en bureau 37390 chanceaux sur choisille/Capture d_écran 2026-04-10 174722.png",
            "/IMAGES/Projets finis/Loc office rehabiliation d_une zone de stockage en bureau 37390 chanceaux sur choisille/Capture d_écran 2026-04-10 174735.png",
            "/IMAGES/Projets finis/Loc office rehabiliation d_une zone de stockage en bureau 37390 chanceaux sur choisille/Capture d_écran 2026-04-10 174750.png"
        ],
        "specs": [
            "Reconversion",
            "Open-space"
        ]
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
                    yPercent: -100,
                    duration: 1.5,
                    ease: "expo.inOut",
                    onComplete: onComplete
                });
            }
        });

        // Initial setup
        gsap.set(".char-wrap", { opacity: 0, rotateY: 90, scale: 0.8 });
        gsap.set(".border-line-h", { scaleX: 0 });
        gsap.set(".border-line-v", { scaleY: 0 });
        gsap.set(".char-inner", { opacity: 0, y: 10 });

        // Simulating progress
        gsap.to({ val: 0 }, {
            val: 100,
            duration: 3,
            ease: "power1.inOut",
            onUpdate: function () { setProgress(Math.floor(this.targets()[0].val)); }
        });

        // Sequence: Letter by letter
        const chars = document.querySelectorAll(".char-wrap");
        chars.forEach((char, i) => {
            const charTl = gsap.timeline();

            tl.add(charTl, i * 0.08); // Slight overlap

            charTl
                .to(char, {
                    opacity: 1,
                    rotateY: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "back.out(1.7)"
                })
                // The "Circulating Lines" effect
                .to(char.querySelector(".line-top"), { scaleX: 1, duration: 0.2, ease: "none" }, "-=0.3")
                .to(char.querySelector(".line-right"), { scaleY: 1, duration: 0.2, ease: "none" })
                .to(char.querySelector(".line-bottom"), { scaleX: 1, duration: 0.2, ease: "none" })
                .to(char.querySelector(".line-left"), { scaleY: 1, duration: 0.2, ease: "none" })
                // Reveal the letter itself
                .to(char.querySelector(".char-inner"), {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "expo.out"
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
        <div ref={containerRef} className="fixed inset-0 z-[1000] bg-[#e5e5e5] flex items-center justify-center overflow-hidden font-display perspective-[1000px]">
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

                                    {/* Micro Coordinates (Style refinement) */}
                                    <div className="absolute -bottom-4 left-0 text-[5px] font-mono opacity-20 uppercase pointer-events-none">
                                        {`P_${wIdx}${cIdx}`}
                                    </div>
                                </div>
                            ))}
                            {/* Spacer for mobile wrap */}
                            <div className="w-4 md:w-8"></div>
                        </div>
                    ))}
                </div>

                {/* Refined Progress Info */}
                <div className="mt-24 w-full max-w-sm flex flex-col items-center px-10">
                    <div className="w-full flex justify-between items-end mb-2">
                        <span className="text-[8px] font-bold tracking-[0.6em] text-black/30 uppercase">Drafting Assembly</span>
                        <span className="text-[10px] font-mono text-black/60">{progress}%</span>
                    </div>
                    <div className="w-full h-[1px] bg-black/10 relative">
                        <div className="absolute inset-y-0 left-0 bg-black transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
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

const ArchiLogo = ({ className = "", light = false }: { className?: string; light?: boolean }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={cn("pointer-events-auto", className)}
    >
        <img
            src="/Logo ArchiMade.png"
            alt="ArchiMade Logo"
            className={cn(
                "logo-img h-16 md:h-20 scale-250 ml-10 w-auto object-contain transition-all duration-500 brightness-0 invert",
                light && "brightness-0 invert"
            )}
        />
    </motion.div>
);

const ArchiMobileSocials = () => (
    <div className="fixed bottom-6 right-6 z-[250] flex flex-col gap-4 xl:hidden pointer-events-auto mix-blend-difference">
        <motion.a
            href="#"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center group hover:border-white transition-all duration-500 overflow-hidden relative"
        >
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            <Facebook className="w-5 h-5 text-white group-hover:text-black transition-colors duration-500 relative z-10" />
        </motion.a>
        <motion.a
            href="#"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center group hover:border-white transition-all duration-500 overflow-hidden relative"
        >
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            <Instagram className="w-5 h-5 text-white group-hover:text-black transition-colors duration-500 relative z-10" />
        </motion.a>
    </div>
);

// --- NAVIGATION (DESKTOP) ---
function ArchiNav() {
    const menuItems = [
        { name: "À Propos", slug: "propos" },
        { name: "Méthode", slug: "méthodes" },
        { name: "Réalisations", slug: "réalisations" },
        { name: "Expertise", slug: "expertise" },
        { name: "Contact", slug: "contact" }
    ];

    return (
        <nav className="flex flex-col items-start gap-12 font-sans">
            {/* MAIN MENU */}
            <ul className="flex flex-col items-start gap-1">
                {menuItems.map((item, i) => (
                    <ArchiReveal key={item.slug} delay={0.4 + i * 0.1}>
                        <li className="overflow-hidden group">
                            <a
                                href={`#${item.slug}`}
                                className="text-4xl lg:text-4xl font-semibold text-inherit block hover:italic transition-all relative"
                            >
                                <span className="relative z-10">{item.name}</span>
                                <div className="nav-underline absolute bottom-1 left-0 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full z-0 opacity-20"></div>
                            </a>
                        </li>
                    </ArchiReveal>
                ))}
            </ul>

            {/* SNS LINKS */}
            <div className="flex flex-row items-center gap-4 mt-8">
                <motion.a
                    href="#"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group hover:border-white transition-all duration-500 overflow-hidden relative"
                >
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                    <Facebook className="w-5 h-5 text-white/60 group-hover:text-black transition-colors duration-500 relative z-10" />
                </motion.a>
                <motion.a
                    href="#"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group hover:border-white transition-all duration-500 overflow-hidden relative"
                >
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                    <Instagram className="w-5 h-5 text-white/60 group-hover:text-black transition-colors duration-500 relative z-10" />
                </motion.a>
            </div>
        </nav>
    );
}

// --- NAVIGATION OVERLAY (MOBILE) ---
function ArchiMenuOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const menuItems = [
        { name: "À Propos", slug: "propos" },
        { name: "Services", slug: "expertise" },
        { name: "Méthode", slug: "méthodes" },
        { name: "Réalisations", slug: "réalisations" },
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
                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Socials</p>
                    <div className="flex flex-col gap-4">
                        <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group hover:border-white transition-all duration-500 overflow-hidden relative">
                            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                            <Instagram className="w-5 h-5 text-white/60 group-hover:text-black transition-colors duration-500 relative z-10" />
                        </a>
                        <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group hover:border-white transition-all duration-500 overflow-hidden relative">
                            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                            <Facebook className="w-5 h-5 text-white/60 group-hover:text-black transition-colors duration-500 relative z-10" />
                        </a>
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Inquiries</p>
                    <p className="text-xl font-bold tracking-tight hover:opacity-50 transition-opacity">contact@archimade.studio</p>
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
    return (
        <header className="xl:hidden fixed top-0 left-0 right-0 z-[150] p-8 flex justify-between items-center mix-blend-difference pointer-events-none">
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

// --- CUSTOM CURSOR ---
function ArchiCursor() {
    const cursorRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.6,
                ease: "power3.out"
            });
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        window.addEventListener("mousemove", moveCursor);

        const interactables = document.querySelectorAll("a, button, .group");
        interactables.forEach(el => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            interactables.forEach(el => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        >
            <motion.div
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    rotate: isHovering ? 45 : 0
                }}
                className="relative w-12 h-12 flex items-center justify-center"
            >
                {/* Custom Double-Line Arrow from Image */}
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Vertical lines */}
                    <line x1="18" y1="5" x2="18" y2="28" stroke="white" strokeWidth="1" />
                    <line x1="22" y1="5" x2="22" y2="28" stroke="white" strokeWidth="1" />
                    {/* Arrow head - double lines */}
                    <path d="M10 20L20 30L30 20" stroke="white" strokeWidth="1.5" />
                    <path d="M7 17L20 30L33 17" stroke="white" strokeWidth="1" opacity="0.5" />
                </svg>
            </motion.div>
        </div>
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
        return () => ctx.revert();
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
    const bgRef = useRef(null);

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
                        xPercent: isEven ? -110 : 110,
                        skewX: isEven ? 15 : -15,
                        opacity: 0
                    },
                    {
                        xPercent: 0,
                        skewX: 0,
                        opacity: 1,
                        duration: 1.8,
                        ease: "expo.out",
                        delay: 0.5 + (i * 0.12)
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const currentDate = new Date().toISOString().split('T')[0].replace(/-/g, '.');
    const currentYear = new Date().getFullYear();

    const handleHeroClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('a') || target.closest('nav')) {
            return;
        }

        // Using Lenis for a custom slow and smooth scroll
        if ((window as any).lenis) {
            (window as any).lenis.scrollTo('#archi-vision', {
                duration: 3,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        } else {
            const visionSection = document.getElementById('archi-vision');
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
            <div className="relative z-10 w-full h-full flex flex-col justify-center md:justify-start md:pt-[15vh] px-10 md:px-20 md:pl-[35vw] items-start text-left">
                <div className="max-w-6xl relative z-20 flex flex-col items-start px-2">
                    <h1 className="archi-title text-[12vw] md:text-[9.5vw] font-bold tracking-tighter leading-[0.8] text-[#0a0a0a] flex flex-col items-start relative translate-z-0 mb-12">
                        {/* Title Lines (1, 2, 3) */}
                        {["Concevoir", "votre futur", "bâtiment."].map((text, idx) => (
                            <div key={idx} className="sentence overflow-hidden">
                                <div className="outer relative">
                                    <span className="inner block overflow-hidden">
                                        <span className="text block archi-title-reveal">
                                            {text}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </h1>

                    <div className="space-y-6 flex flex-col items-start">
                        {/* Subtitle (Line 4) */}
                        <div className="sentence overflow-hidden">
                            <div className="outer relative">
                                <span className="inner block overflow-hidden">
                                    <p className="text block archi-title-reveal text-xl md:text-2xl font-bold text-[#0a0a0a] tracking-tighter leading-none opacity-80 uppercase">
                                        SOLUTIONS TECHNIQUES — EST. {currentYear}
                                    </p>
                                </span>
                            </div>
                        </div>

                        {/* Description (Line 5) */}
                        <div className="sentence overflow-hidden max-w-md">
                            <div className="outer relative">
                                <span className="inner block overflow-hidden">
                                    <p className="text block archi-title-reveal text-[10px] md:text-xs text-[#0a0a0a] font-medium leading-tight opacity-70">
                                        Permis de construire, dossiers administratifs et conceptions techniques.<br />
                                        Expertise 3D photoréaliste incluse pour chaque projet.
                                    </p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Right Metadata - Largo Style (Fixed to screen edges) */}
            <div className="absolute bottom-10 right-8 md:bottom-12 md:right-12 z-50 pointer-events-none flex flex-col items-end text-right">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="flex flex-col items-end"
                >
                    {/* Date */}
                    <span className="text-[8px] md:text-[15px] font-mono text-black/40 mb-2 tracking-widest">{currentDate}</span>

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
            </div>
        </section>
    );
}

function ArchiVision() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const scannerRef = useRef(null);
    const blueprintRef = useRef(null);
    const realityRef = useRef(null);
    const [scanPos, setScanPos] = useState(0);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: window.innerWidth < 768 ? "center center" : "top top",
                    end: window.innerWidth < 768 ? "+=20%" : "+=100%",
                    pin: true,
                    scrub: 1,
                    onUpdate: (self) => setScanPos(Math.round(self.progress * 100)),
                    // RESTORE NAVIGATION COLOR TOGGLE
                    // COLOR TOGGLE REMOVED - NOW USING MIX-BLEND-DIFFERENCE FOR AUTOMATIC THEMING
                    onEnter: () => { },
                    onLeave: () => { },
                    onEnterBack: () => { },
                    onLeaveBack: () => { }
                }
            });

            // 1. Scanner Line movement (Left to Right)
            tl.fromTo(scannerRef.current, { left: "0%" }, { left: "100%", ease: "none" }, 0);

            // 2. Reality layer reveal (Left to Right)
            tl.fromTo(realityRef.current, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 0);

            // TOP TITLE: Left to Right reveal
            tl.fromTo(".vision-title-top",
                { opacity: 0, x: -50, filter: "blur(10px)" },
                { opacity: 1, x: 0, filter: "blur(0px)", duration: 1, ease: "expo.out" },
                0.2
            );

            // BOTTOM TITLE: Right to Left reveal
            tl.fromTo(".vision-title-bottom",
                { opacity: 0, x: 50, filter: "blur(10px)" },
                { opacity: 1, x: 0, filter: "blur(0px)", duration: 1, ease: "expo.out" },
                0.2
            );

            // 4. Background Grid Animation
            tl.to(".vision-bg-grid", { backgroundPosition: "100% 0%", ease: "none" }, 0);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="archi-vision" ref={sectionRef} className="relative w-full h-[60vh] md:h-screen bg-[#060606] overflow-hidden font-sans z-40">
            {/* BACKGROUND: Technical Grid & Dots */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Square Grid */}
                <div className="vision-bg-grid absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgb(255, 255, 255) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '100px 100px',
                    }}>
                </div>
                {/* Dot Grid */}
                <div className="absolute inset-0 opacity-[0.1]"
                    style={{
                        backgroundImage: 'radial-gradient(rgb(255, 255, 255) 1.5px, transparent 0)',
                        backgroundSize: '25px 25px'
                    }}>
                </div>
            </div>

            {/* MAIN VISUAL CONTAINER */}
            <div ref={containerRef} className="relative w-full h-full flex items-center justify-center p-8 md:p-24">

                <div className="relative w-full h-full max-w-7xl aspect-[21/9] flex items-center">

                    {/* TITLE 1: Top Right Border (Horizontal) */}
                    <div className="absolute -top-[1.5px] right-0 z-50 pointer-events-none translate-y-[-50%] pr-4 md:pr-12">
                        <div className="flex items-center gap-4 md:gap-8">

                            <h2 className="vision-title-top text-xs sm:text-2xl md:text-4xl uppercase text-white leading-none whitespace-nowrap">
                                <span className="font-black tracking-tight">Photoréalisme</span>
                                <span className="font-light italic ml-2 md:ml-4 text-white/40 tracking-widest lowercase">Architectural</span>
                                {("Photoréalisme Architectural").split("").map((c, i) => (
                                    <span key={i} className="vision-title-char hidden">{c}</span>
                                ))}
                            </h2>
                        </div>
                    </div>

                    {/* TITLE 2: Bottom Border (Horizontal) */}
                    <div className="absolute -bottom-[1.5px] left-0 z-50 pointer-events-none translate-y-[50%] pl-4 md:pl-12">
                        <div className="flex items-center gap-4 md:gap-8">
                            <h2 className="vision-title-bottom text-xs sm:text-2xl md:text-4xl uppercase text-white leading-none whitespace-nowrap">
                                <span className="font-black tracking-tight">Notre Vision</span>
                                <span className="font-light italic ml-2 md:ml-4 text-white/40 tracking-widest lowercase">Studio</span>
                                {("Notre Vision Studio").split("").map((c, i) => (
                                    <span key={i} className="vision-title-char hidden">{c}</span>
                                ))}
                            </h2>

                        </div>
                    </div>

                    {/* THE VIEWER */}
                    <div className="relative w-full h-full shadow-[0_0_150px_rgba(0,0,0,1)] overflow-hidden border border-white/10 bg-black">
                        {/* Layers */}
                        <div ref={blueprintRef} className="absolute inset-0 z-10">
                            <img
                                src={IMAGES.vision}
                                alt="Blueprint"
                                className="w-full h-full object-cover grayscale brightness-[0.2] contrast-[2] opacity-40"
                            />
                        </div>
                        <div ref={realityRef} className="absolute inset-0 z-20">
                            <img
                                src={IMAGES.vision}
                                alt="Reality"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Scanner Line (Vertical) */}
                        <div ref={scannerRef} className="absolute top-0 bottom-0 w-[2.5px] bg-white z-30 shadow-[0_0_40px_rgba(255,255,255,1)] flex flex-col justify-between py-10">
                            <div className="bg-white text-black text-[8px] font-black px-2 py-0.5 tracking-widest uppercase origin-left rotate-90 translate-x-[50%] whitespace-nowrap">
                                Synchronizing...
                            </div>
                            <div className="text-white font-mono text-[16px] font-bold tracking-[0.2em] origin-left rotate-90 translate-x-[50%]">
                                {scanPos}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// 2. ABOUT SECTION
function ArchiAbout() {
    const sectionRef = useRef(null);
    const imgRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Heading Split Reveal
            gsap.from(".about-heading span", {
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
            <ArchiDrawing type="lines" className="top-10 md:top-20 left-0 w-full opacity-5" trigger={sectionRef} />
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
                        <p className="text-lg sm:text-xl md:text-2xl xl:text-3xl font-light leading-[1.5] md:leading-[1.4] text-[#0a0a0a] uppercase tracking-tight italic border-l-2 md:border-l-4 border-black pl-6 md:pl-8">
                            ArchiMade accompagne particuliers et professionnels dans la réalisation de leurs démarches administratives. Nous intervenons sur la production de plans techniques et d’exécution ainsi que sur la modélisation 3D.
                        </p>
                        <div className="mt-8 md:mt-12 group flex items-center gap-4 md:gap-6 cursor-pointer"
                            onClick={() => (window as any).lenis?.scrollTo('#expertise', { duration: 2.5 })}>
                            <span className="text-xs md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em] font-black group-hover:italic transition-all">En savoir plus</span>
                            <div className="w-8 md:w-12 h-[1px] bg-black group-hover:w-16 md:group-hover:w-24 transition-all duration-500"></div>
                        </div>
                    </div>

                    <div className="xl:w-1/3 flex flex-col justify-end mt-12 xl:mt-0 w-full">
                        <div className="grid grid-cols-2 gap-8 md:gap-12 pt-8 md:pt-12 border-t border-black/10">
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
                                <p className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] xl:tracking-[0.5em] font-bold text-[#0a0a0a]/40">DÉLAIS_RETARD</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-img-container relative aspect-video md:aspect-[21/13] lg:aspect-[21/9] w-full overflow-hidden md:mt-8">
                <img
                    ref={imgRef}
                    src={IMAGES.about}
                    alt="Projet Résidentiel Moderne - ArchiMade 3D"
                    className="w-full h-full object-cover grayscale brightness-90 contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
            </div>
        </section>
    );
}

// 3. SERVICES SECTION (EXPERTISE)
const services = [
    { title: "Permis de Construire", cat: "Architectural", loc: "Tours, FR", area: "450.00 m² / 4843 ft²", img: IMAGES.renders[0] },
    { title: "Déclarations Préalables", cat: "Extension", loc: "Bordeaux, FR", area: "85.22 m² / 917 ft²", img: IMAGES.renders[1] },
    { title: "Plans Techniques", cat: "Structure", loc: "Paris, FR", area: "1200.00 m² / 12916 ft²", img: IMAGES.renders[2] },
    { title: "Plans d’Exécution", cat: "Construction", loc: "Lyon, FR", area: "650.00 m² / 6996 ft²", img: IMAGES.renders[0] },
    { title: "Modélisation 3D", cat: "Visualisation", loc: "Studio", area: "Full Render 8K", img: IMAGES.vision },
    { title: "Rendus Photoréalistes", cat: "Marketing", loc: "Digital", area: "Ultra High Def", img: IMAGES.about },
    { title: "Dossiers Complets", cat: "Consulting", loc: "National", area: "BIM Integrated", img: IMAGES.renders[1] },
];

function ArchiServices() {
    const containerRef = useRef(null);
    const accordionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [lastExpandedIndex, setLastExpandedIndex] = useState<number | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top 10%",
                end: "bottom 20%",
                onEnter: () => gsap.to([".archi-sidebar", ".xl-hidden.fixed"], { autoAlpha: 0, duration: 0.2 }),
                onLeave: () => gsap.to([".archi-sidebar", ".xl-hidden.fixed"], { autoAlpha: 1, duration: 0.1 }),
                onEnterBack: () => gsap.to([".archi-sidebar", ".xl-hidden.fixed"], { autoAlpha: 0, duration: 0.2 }),
                onLeaveBack: () => gsap.to([".archi-sidebar", ".xl-hidden.fixed"], { autoAlpha: 1, duration: 0.1 }),
            });
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
                    <ArchiReveal type="fade" delay={0.1}>
                        <div className="flex items-center gap-4 md:ml-4">
                            <div className="w-12 h-[1px] bg-[#0a0a0a]/30"></div>
                            <span className="text-[10px] text-[#0a0a0a] font-bold uppercase tracking-[0.5em]">Phase 02</span>
                        </div>
                    </ArchiReveal>

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

                        <h2 className="text-6xl md:text-8xl lg:text-[8vw] font-black text-[#0a0a0a] uppercase tracking-tighter leading-[0.85] flex flex-col">
                            <ArchiReveal type="up" delay={0.2}>
                                <span className="block">Studio</span>
                            </ArchiReveal>
                            <ArchiReveal type="up" delay={0.3}>
                                <span
                                    className="block italic text-transparent mt-2"
                                    style={{ WebkitTextStroke: '1px rgba(10,10,10,0.2)' }}
                                >
                                    Expertise
                                </span>
                            </ArchiReveal>
                        </h2>
                    </div>
                </div>

                <div className="md:max-w-[320px] lg:max-w-md border-l border-[#0a0a0a]/20 pl-8 mb-4">
                    <ArchiReveal type="fade" delay={0.5}>
                        <p className="text-[#0a0a0a]/60 text-[9px] md:text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.15em] leading-[2]">
                            Une gamme complète de services architecturaux, de la conception initiale à la modélisation 3D avancée. Déployez chaque panneau pour explorer.
                        </p>
                    </ArchiReveal>
                </div>
            </div>

            {/* ACCORDION CONTAINER */}
            <div ref={accordionRef} className="relative h-[85vh] lg:h-[85vh] flex flex-col lg:flex-row overflow-hidden border-y border-black/10 z-[110] bg-[#0a0a0a]">
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
                                            isExpanded ? "lg:flex-col items-start gap-4 lg:gap-10" : "md:flex-row justify-between items-end gap-4 lg:gap-10"
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
                                                    Nous prenons en charge la totalité de ce service pour vous offrir une expérience sans friction. De l'audit initial à la livraison des rendus finaux, notre équipe d'experts s'assure d'une précision millimétrée et d'un accompagnement sur-mesure.
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



// 4. PROCESS / METHOD SECTION (MÉTHODES) - DUAL RAW TEXT MARQUEE
function ArchiProcess() {
    const marquee1Ref = useRef(null);
    const marquee2Ref = useRef(null);

    const stepsRow1 = [
        { title: "Analyse du besoin", phase: "01" },
        { title: "Production", phase: "03" },
        { title: "Accompagnement", phase: "05" },
    ];

    const stepsRow2 = [
        { title: "Étude du projet", phase: "02" },
        { title: "Constitution", phase: "04" },
        { title: "Validation", phase: "06" },
    ];

    const infiniteRow1 = [...stepsRow1, ...stepsRow1, ...stepsRow1, ...stepsRow1];
    const infiniteRow2 = [...stepsRow2, ...stepsRow2, ...stepsRow2, ...stepsRow2];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const m1 = marquee1Ref.current;
            const m2 = marquee2Ref.current;
            if (!m1 || !m2) return;

            // Ensure they are visible
            gsap.set([m1, m2], { opacity: 1, visibility: "visible" });

            // Row 1
            gsap.to(m1, {
                xPercent: -25,
                ease: "none",
                duration: 40,
                repeat: -1,
                force3D: true,
            });

            // Row 2
            gsap.set(m2, { xPercent: -25 });
            gsap.to(m2, {
                xPercent: 0,
                ease: "none",
                duration: 45,
                repeat: -1,
                force3D: true,
            });
        });

        return () => ctx.revert();
    }, []);

    const TextItem: React.FC<{ step: any }> = ({ step }) => (
        <div className="flex items-center gap-8 md:gap-16 px-8 md:px-16">
            <span className="text-[10px] md:text-xs font-mono text-white/20 tracking-[0.5em] uppercase translate-y-[-100%]">
                Phase_{step.phase}
            </span>
            <h3 className="text-5xl md:text-[8vw] font-black text-white uppercase tracking-tighter leading-none hover:italic hover:text-white/60 transition-all duration-500 cursor-default">
                {step.title}
            </h3>
        </div>
    );

    return (
        <section id="méthodes" className="relative py-24 md:py-48 bg-[#0a0a0a] overflow-hidden font-display">
            {/* Header / Intro */}
            <div className="relative z-10 xl:pl-[25vw] px-10 mb-20">
                <ArchiReveal type="fade">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-8 h-[1px] bg-white/20"></div>
                        <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.8em]">Workflow</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">Méthode</h2>
                </ArchiReveal>
            </div>

            {/* Marquee Container with Masking */}
            <div className="w-full relative overflow-hidden"
                style={{
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 15%, black 25%, black 90%, transparent 100%)',
                    maskImage: 'linear-gradient(to right, transparent 0%, transparent 15%, black 25%, black 90%, transparent 100%)'
                }}>

                <div className="space-y-4 md:space-y-8">
                    {/* ROW 1 */}
                    <div className="relative flex overflow-hidden">
                        <div ref={marquee1Ref} className="flex whitespace-nowrap py-4">
                            {infiniteRow1.map((step, i) => (
                                <TextItem key={i} step={step} />
                            ))}
                        </div>
                    </div>

                    {/* ROW 2 */}
                    <div className="relative flex overflow-hidden">
                        <div ref={marquee2Ref} className="flex whitespace-nowrap py-4">
                            {infiniteRow2.map((step, i) => (
                                <TextItem key={i} step={step} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none select-none">
                <div className="flex flex-col items-center justify-center h-full text-[30vw] font-black text-white leading-none">
                    <span>ARCHI</span>
                    <span>MADE</span>
                </div>
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


function ArchiProjectDetail({ project, onClose, onNext }: { project: any, onClose: () => void, onNext?: (p: any) => void, key?: any }) {
    const heroImgRef = useRef(null);
    const containerRef = useRef(null);

    // Find next project
    const currentIndex = PROJECTS.findIndex(p => p.title === project.title);
    const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

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
                    {(project as any).beforePath ? (
                        <InteractiveBeforeAfter beforeImg={(project as any).beforePath} afterImg={project.path} />
                    ) : (
                        <img
                            ref={heroImgRef}
                            src={encodeURI(project.path)}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                    )}
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
                    {Array.from(new Set([project.path, (project as any).beforePath, ...(project.gallery || [])])).filter(Boolean).map((img: any, i: number) => {
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


function InteractiveBeforeAfter({ beforeImg, afterImg }: { beforeImg: string, afterImg: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [sliderPos, setSliderPos] = useState(50);
    const [isHovered, setIsHovered] = useState(false);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = (x / rect.width) * 100;
        setSliderPos(percent);
    };

    const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length > 0) handleMove(e.touches[0].clientX);
    };

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full overflow-hidden touch-pan-y"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setSliderPos(50);
            }}
            onTouchStart={() => setIsHovered(true)}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => {
                setIsHovered(false);
                setSliderPos(50);
            }}
        >
            {/* Before Image (Background) */}
            <img
                src={encodeURI(beforeImg)}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                style={{ opacity: isHovered ? 0.8 : 0.6 }}
                alt="Avant"
            />

            {/* After Image (Clipped) */}
            <div
                className="absolute inset-0 w-full h-full transition-all duration-75 ease-out will-change-transform"
                style={{ clipPath: `inset(0% ${100 - sliderPos}% 0% 0%)` }}
            >
                <img
                    src={encodeURI(afterImg)}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500 will-change-transform"
                    style={{
                        opacity: isHovered ? 1 : 0.6,
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                    }}
                    alt="Après"
                />
            </div>

            {/* Slider Line & Handle */}
            <div
                className={`absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_20px_rgba(255,255,255,0.9)] z-20 transition-all duration-75 ease-out pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                style={{ left: `${sliderPos}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center px-4 py-2 rounded-full backdrop-blur-md bg-black/50 border border-white/20 text-white text-[9px] font-bold tracking-[0.2em] uppercase whitespace-nowrap shadow-2xl">
                    <span className="opacity-70 mr-3">Avant</span>
                    <span className="w-[1px] h-3 bg-white/30"></span>
                    <span className="ml-3">Après</span>
                </div>
            </div>
        </div>
    );
}

function ArchiGallery() {
    const sectionRef = useRef<HTMLElement>(null);
    const [selectedProject, setSelectedProject] = useState<any>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.stack-card') as HTMLElement[];
            if (cards.length === 0) return;

            // Initial setup with random directions
            const directions = [
                { x: 0, y: "120vh" },   // Bottom
                { x: "-120vw", y: 0 },  // Left
                { x: "120vw", y: 0 },   // Right
                { x: 0, y: "-120vh" },  // Top
            ];

            cards.forEach((card, index) => {
                if (index !== 0) {
                    const dir = directions[index % directions.length];
                    gsap.set(card, { x: dir.x, y: dir.y });
                }
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: `+=${cards.length * 100}%`,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1
                }
            });

            cards.forEach((card, index) => {
                if (index < cards.length - 1) {
                    tl.to(card, {
                        scale: 0.92,
                        opacity: 0.3,
                        transformOrigin: "center center",
                        ease: "power2.inOut",
                        duration: 1
                    }, index);

                    const nextCard = cards[index + 1];
                    tl.to(nextCard, {
                        x: 0,
                        y: 0,
                        ease: "power2.out",
                        duration: 1
                    }, index);
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="réalisations" ref={sectionRef} className="relative w-full h-screen bg-transparent overflow-hidden font-display z-50">
            <AnimatePresence mode="wait">
                {selectedProject && (
                    <ArchiProjectDetail
                        key={selectedProject.title}
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                        onNext={(p) => setSelectedProject(p)}
                    />
                )}
            </AnimatePresence>

            {/* Overarching Title - MOVED TO BOTTOM RIGHT */}
            <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 z-[60] text-right mix-blend-difference text-white pointer-events-none">
                <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.5em] text-white/60">Portfolio</span>
                        <div className="w-12 h-[1px] bg-white/40"></div>
                    </div>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] mt-2">
                        Studio<br /><span className="text-white/30 italic font-medium">Vault.</span>
                    </h2>
                </div>
            </div>

            <div className="relative w-full h-full flex items-center justify-center pt-32 px-4 md:px-20 pb-10">
                <div className="relative w-full max-w-6xl h-full mx-auto" style={{ perspective: "2000px" }}>
                    {PROJECTS.map((project, i) => (
                        <div
                            key={i}
                            className="stack-card absolute inset-0 w-full h-full md:h-[80vh] bg-black rounded-[2rem] md:rounded-[3rem] overflow-hidden cursor-pointer group shadow-2xl"
                            style={{ zIndex: i + 10 }}
                            onClick={() => setSelectedProject(project)}
                        >
                            {(project as any).beforePath ? (
                                <InteractiveBeforeAfter beforeImg={(project as any).beforePath} afterImg={project.path} />
                            ) : (
                                <img
                                    src={encodeURI(project.path)}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000"
                                />
                            )}
                            <div className="absolute inset-0 pointer-events-none z-10"></div>

                            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end pointer-events-none">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full pointer-events-auto">
                                    <div className="text-white">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-xl md:text-3xl font-mono text-white/30 italic font-bold">{(i + 1).toString().padStart(2, '0')}</span>
                                            <div className="w-8 md:w-16 h-[1px] bg-white/30"></div>
                                            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/50 font-bold">{project.city}</span>
                                        </div>
                                        <h3 className="text-4xl md:text-6xl lg:text-[5vw] font-black uppercase tracking-tighter leading-[0.8] group-hover:italic transition-all duration-500 text-white drop-shadow-2xl">
                                            {project.title}
                                        </h3>
                                    </div>
                                    <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 backdrop-blur-md shrink-0">
                                        <ArrowUpRight className="w-5 h-5 md:w-8 md:h-8" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
// 5.5 TECHNICAL SHOWCASE (3D RENDERS)
function TechnicalShowcase() {
    const sectionRef = useRef<HTMLElement>(null);

    const RENDER_IMAGES = [
        { title: "Maison Veigné", type: "Résidentiel", img: "/IMAGES/3D/Construction d_une maison individuelle 37250 Veigné.png" },
        { title: "Maison Montlouis", type: "Résidentiel", img: "/IMAGES/3D/Construction d_une maison individuelle Montlouis sur Loire 37270.png" },
        { title: "Maison Joué-lès-Tours", type: "Résidentiel", img: "/IMAGES/3D/Construction d_une maison individuelle joue les tours 37300.png" },
        { title: "Extension Mirabeau", type: "Extension", img: "/IMAGES/3D/Création d_une extension 13170 Les pennes Mirabeau.png" },
        { title: "Façades Saintes", type: "Professionnel", img: "/IMAGES/3D/Modifications de façades d_un entrepôt 17100 saintes.png" }
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Title Reveals (Main and Final Callout)
            const titleContainers = gsap.utils.toArray('.title-reveal-container');
            titleContainers.forEach((container: any) => {
                const lines = container.querySelectorAll('.title-line');
                gsap.from(lines, {
                    yPercent: 120,
                    duration: 0.5,
                    stagger: 0.15,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 80%",
                        toggleActions: "restart reset restart reset"
                    }
                });
            });

            // Each Image Block Reveal
            const blocks = gsap.utils.toArray('.render-block');
            blocks.forEach((block: any, i: number) => {
                const mask = block.querySelector('.image-mask');
                const img = block.querySelector('.inner-image');
                const title = block.querySelector('.title-reveal');
                const meta = block.querySelector('.meta-reveal');
                const line = block.querySelector('.line-reveal');

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: block,
                        start: "top 85%",
                        toggleActions: "restart reset restart reset"
                    }
                });

                tl.to(mask, {
                    scaleY: 0,
                    transformOrigin: "top",
                    duration: 0.6,
                    ease: "power4.inOut"
                })
                    .fromTo(img,
                        { scale: 1.1, filter: "blur(5px)" },
                        { scale: 1, filter: "blur(0px)", duration: 0.4, ease: "power3.out" },
                        "<0.2"
                    )
                    .from(title, {
                        y: 30,
                        opacity: 0,
                        duration: 0.6,
                        ease: "power3.out"
                    }, "<0.1")
                    .from(meta, {
                        opacity: 0,
                        x: i % 2 === 0 ? -10 : 10,
                        duration: 0.5,
                        ease: "power2.out"
                    }, "<")
                    .from(line, {
                        scaleX: 0,
                        transformOrigin: i % 2 === 0 ? "left" : "right",
                        duration: 0.6,
                        ease: "power3.out"
                    }, "<");

                // Vertical parallax for the image
                gsap.to(img, {
                    yPercent: 15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: block,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="expertise" className="relative py-30 md:py-30 bg-transparent text-[#0a0a0a] overflow-hidden font-display z-40">
            <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">

                {/* Massive Title Section */}
                <div className="mb-20 md:mb-40 title-reveal-container">
                    <div className="flex items-center gap-4 mb-6 md:mb-8 overflow-hidden">
                        <div className="w-8 md:w-12 h-[1px] bg-black/40 title-line"></div>
                        <span className="text-[9px] md:text-xs font-mono uppercase tracking-[0.5em] text-black/60 title-line block">Studio Vault 3D</span>
                    </div>
                    <h2 className="text-[9vw] md:text-[7vw] font-black uppercase tracking-tighter leading-[0.85]">
                        <span className="block overflow-hidden"><span className="block title-line">Photoréalisme</span></span>
                        <span className="block overflow-hidden"><span className="block title-line text-black/30 italic font-medium">Absolu.</span></span>
                    </h2>
                </div>

                {/* Alternating Image Blocks */}
                <div className="space-y-25 md:space-y-40">
                    {RENDER_IMAGES.map((item, i) => (
                        <div key={i} className={`render-block relative flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-20`}>

                            {/* Image Container with Reveal Mask */}
                            <div className="w-full md:w-[60%] relative group overflow-hidden rounded-sm md:rounded-md">
                                <div className="aspect-[4/5] md:aspect-[16/10] relative">
                                    <div className="image-mask absolute inset-0 bg-[#e5e5e5] z-10"></div>
                                    <img
                                        src={encodeURI(item.img)}
                                        alt={item.title}
                                        className="inner-image absolute top-[-10%] left-0 w-full h-[120%] object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000"
                                    />
                                </div>
                                {/* HUD Overlay */}
                                <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20">
                                    <div className="border border-white/40 bg-white/40 backdrop-blur-md p-2 text-[6px] md:text-[8px] font-mono uppercase tracking-[0.3em] text-black font-bold">
                                        SCAN_ID_{i + 1}
                                    </div>
                                    <div className="border border-white/40 bg-white/40 backdrop-blur-md p-2 text-[6px] md:text-[8px] font-mono uppercase tracking-[0.3em] text-black font-bold">
                                        BUFFER: RAW
                                    </div>
                                </div>
                            </div>

                            {/* Typography Content */}
                            <div className={`w-full md:w-[40%] flex flex-col ${i % 2 === 0 ? 'items-start text-left' : 'items-end text-right'}`}>
                                <div className={`meta-reveal flex items-center gap-4 mb-4 md:mb-6 w-full ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                                    {i % 2 !== 0 && <div className="w-8 h-[1px] bg-black/30 line-reveal"></div>}
                                    <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.4em] text-black/50">{item.type}</span>
                                    {i % 2 === 0 && <div className="w-8 h-[1px] bg-black/30 line-reveal"></div>}
                                </div>

                                <h3 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] title-reveal text-[#0a0a0a]">
                                    {item.title}
                                </h3>

                                <p className={`mt-6 text-black/60 font-light text-xs md:text-sm max-w-sm title-reveal leading-relaxed ${i % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
                                    Des rendus haute définition conçus pour sublimer l'architecture. La lumière, les matériaux et l'atmosphère sont étudiés avec une précision chirurgicale.
                                </p>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Final Callout */}
                <div className="mt-30 md:mt-30 text-center title-reveal-container">
                    <h3 className="text-[8vw] md:text-6xl font-black uppercase tracking-tighter leading-tight italic text-[#0a0a0a]">
                        <span className="block overflow-hidden"><span className="block title-line">Une précision</span></span>
                        <span className="block overflow-hidden"><span className="block title-line text-black/30 font-medium">sans compromis.</span></span>
                    </h3>
                </div>
            </div>
        </section>
    );
}

// 6. VALUE SECTION (PROMESSE)
function ArchiValues() {
    const sectionRef = useRef<HTMLElement>(null);

    const values = [
        { num: "01", title: "Réactivité", desc: "Engagement à respecter systématiquement les délais pour chaque projet. La réactivité est notre maître-mot." },
        { num: "02", title: "Zéro Retard", desc: "Garantie absolue de livraison de vos dossiers administratifs et techniques sans aucun décalage." },
        { num: "03", title: "Rayonnement", desc: "Intervention sur l'ensemble du territoire français, principalement à distance, avec une efficacité redoutable." },
        { num: "04", title: "Polyvalence", desc: "Accompagnement immédiat dès que les éléments nécessaires (plans, croquis, relevés) sont fournis." },
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // Titles converge from Left and Right
            gsap.from(".title-left", {
                x: "-100vw",
                opacity: 0,
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: ".title-left",
                    start: "top 85%",
                    toggleActions: "restart reset restart reset"
                }
            });

            gsap.from(".title-right", {
                x: "100vw",
                opacity: 0,
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: ".title-right",
                    start: "top 85%",
                    toggleActions: "restart reset restart reset"
                }
            });

            // Rows converge from alternating sides
            const rows = gsap.utils.toArray('.val-row');
            rows.forEach((row: any, i: number) => {
                gsap.from(row, {
                    x: i % 2 === 0 ? "-100vw" : "100vw",
                    opacity: 0,
                    duration: 1.5,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: row,
                        start: "top 90%",
                        toggleActions: "restart reset restart reset"
                    }
                });
            });

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 md:py-40 bg-[#0a0a0a] text-[#f5f5f5] overflow-hidden font-display relative z-30">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-white/[0.01] blur-[150px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 text-center mb-32 md:mb-52 px-6">
                <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.5em] text-white/40 block mb-8">Pourquoi ArchiMade ?</span>
                <h2 className="text-[12vw] md:text-[9vw] font-black uppercase tracking-tighter leading-[0.85] overflow-hidden">
                    <div className="title-left block">PRÉCISION.</div>
                    <div className="title-right block text-white/20 italic">DISPONIBILITÉ.</div>
                </h2>
            </div>

            <div className="flex flex-col w-full">
                {values.map((v, i) => (
                    <div key={i} className={`val-row w-full flex justify-center py-12 md:py-24 border-y border-white/[0.05] bg-[#0a0a0a] relative`}>
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-white opacity-0 hover:opacity-[0.02] transition-opacity duration-500"></div>

                        <div className={`max-w-7xl w-full px-6 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20`}>

                            <div className="flex items-center gap-8 md:gap-16 w-full md:w-auto">
                                <span className="text-3xl md:text-5xl font-mono text-white/10 font-black">
                                    {v.num}
                                </span>
                                <h3 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter italic whitespace-nowrap">
                                    {v.title}
                                </h3>
                            </div>

                            <div className="w-full md:w-[40%] text-center md:text-left">
                                <p className="text-white/50 font-light text-sm md:text-base leading-relaxed">
                                    {v.desc}
                                </p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

// 7. FINAL CTA / CONTACT
function ArchiContact() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState("VOTRE PROJET...");

    const projectOptions = [
        "Permis de Construire",
        "Déclarations Préalables",
        "Plans Techniques / 3D",
        "Autre demande"
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            // Title animation
            tl.from(".contact-title-word", {
                yPercent: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power4.out"
            })
                .from(".contact-info", {
                    opacity: 0,
                    x: -30,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out"
                }, "-=1")

                // Form animation
                .from(".form-line", {
                    scaleX: 0,
                    transformOrigin: "left",
                    duration: 1,
                    stagger: 0.15,
                    ease: "expo.out"
                }, "-=1")
                .from(".form-input", {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out"
                }, "-=0.8")
                .from(".submit-btn", {
                    y: 30,
                    opacity: 0,
                    duration: 1,
                    ease: "expo.out"
                }, "-=0.5");

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="contact" className="py-22 md:py-20 bg-[#f5f5f5] text-[#0a0a0a] font-display relative overflow-hidden z-40">
            {/* Very subtle background texture/grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10 flex flex-col lg:flex-row gap-20 xl:gap-40">

                {/* Left Side: Info */}
                <div className="flex-1 space-y-16 md:space-y-24">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 overflow-hidden">
                            <div className="w-8 h-[1px] bg-black/40"></div>
                            <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-black/40 font-bold block">Contact</span>
                        </div>
                        <h2 className="text-[13vw] lg:text-[7vw] font-black tracking-tighter uppercase leading-[0.85]">
                            <div className="overflow-hidden"><span className="block contact-title-word">Lancez</span></div>
                            <div className="overflow-hidden"><span className="block contact-title-word">Votre</span></div>
                            <div className="overflow-hidden"><span className="block contact-title-word text-black/30 italic">Projet.</span></div>
                        </h2>
                    </div>

                    <div className="space-y-10">
                        <div className="contact-info flex items-center gap-6 md:gap-8 group cursor-pointer">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#0a0a0a] group-hover:border-[#0a0a0a] transition-all duration-500 overflow-hidden relative">
                                <div className="absolute inset-0 bg-[#0a0a0a] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                                <Mail className="w-5 h-5 md:w-6 md:h-6 text-[#0a0a0a] group-hover:text-white transition-colors duration-500 relative z-10" />
                            </div>
                            <div>
                                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-black/40 mb-1 md:mb-2 font-bold">Email</p>
                                <p className="text-lg md:text-2xl font-bold tracking-tighter">contact@archimade.studio</p>
                            </div>
                        </div>

                        <div className="contact-info flex items-center gap-6 md:gap-8 group cursor-pointer">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#0a0a0a] group-hover:border-[#0a0a0a] transition-all duration-500 overflow-hidden relative">
                                <div className="absolute inset-0 bg-[#0a0a0a] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                                <Phone className="w-5 h-5 md:w-6 md:h-6 text-[#0a0a0a] group-hover:text-white transition-colors duration-500 relative z-10" />
                            </div>
                            <div>
                                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-black/40 mb-1 md:mb-2 font-bold">Téléphone</p>
                                <p className="text-lg md:text-2xl font-bold tracking-tighter">+33 1 23 45 67 89</p>
                            </div>
                        </div>

                        <div className="contact-info flex items-center gap-6 md:gap-8 group cursor-pointer">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#0a0a0a] group-hover:border-[#0a0a0a] transition-all duration-500 overflow-hidden relative">
                                <div className="absolute inset-0 bg-[#0a0a0a] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                                <Instagram className="w-5 h-5 md:w-6 md:h-6 text-[#0a0a0a] group-hover:text-white transition-colors duration-500 relative z-10" />
                            </div>
                            <div>
                                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-black/40 mb-1 md:mb-2 font-bold">Instagram</p>
                                <p className="text-lg md:text-2xl font-bold tracking-tighter">@archimade.studio</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="flex-1 lg:max-w-lg mt-10 lg:mt-0">
                    <form className="space-y-10 md:space-y-12 bg-white p-8 md:p-14 shadow-2xl border border-black/5 rounded-2xl relative" onSubmit={(e) => e.preventDefault()}>

                        <div className="space-y-3 relative overflow-hidden">
                            <label className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-black/40 font-bold block form-input">Nom Complet</label>
                            <input type="text" className="w-full bg-transparent py-2 font-medium focus:outline-none text-sm md:text-base tracking-widest form-input placeholder:text-black/10" placeholder="VOTRE NOM" />
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/10"></div>
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black form-line"></div>
                        </div>

                        <div className="space-y-3 relative overflow-hidden">
                            <label className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-black/40 font-bold block form-input">Email</label>
                            <input type="email" className="w-full bg-transparent py-2 font-medium focus:outline-none text-sm md:text-base tracking-widest form-input placeholder:text-black/10" placeholder="NOM@EXEMPLE.COM" />
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/10"></div>
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black form-line"></div>
                        </div>

                        <div className="space-y-3 relative z-50">
                            <label className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-black/40 font-bold block form-input">Quel est votre projet ?</label>

                            <div className="relative form-input">
                                <button
                                    type="button"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="w-full bg-transparent py-2 flex items-center justify-between focus:outline-none text-sm md:text-base tracking-widest text-left"
                                >
                                    <span className={selectedProject === "VOTRE PROJET..." ? "text-black/30 font-medium" : "text-black/80 font-bold"}>
                                        {selectedProject}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-black/40 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-0 w-full mt-4 bg-white border border-black/5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] z-[100] rounded-md overflow-hidden"
                                        >
                                            {projectOptions.map((opt, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => {
                                                        setSelectedProject(opt);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className="px-6 py-4 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-black/50 hover:text-black hover:bg-[#f5f5f5] cursor-pointer transition-colors border-b border-black/5 last:border-none"
                                                >
                                                    {opt}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/10"></div>
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black form-line"></div>
                        </div>

                        <div className="space-y-3 relative overflow-hidden">
                            <label className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-black/40 font-bold block form-input">Message</label>
                            <textarea rows={3} className="w-full bg-transparent py-2 font-medium focus:outline-none text-sm md:text-base tracking-widest form-input resize-none placeholder:text-black/10" placeholder="DÉTAILS DU PROJET..." />
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/10"></div>
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black form-line"></div>
                        </div>

                        <button className="submit-btn w-full py-5 md:py-6 mt-8 bg-[#0a0a0a] text-white text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-black transition-all duration-300 overflow-hidden relative group rounded-md">
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Envoyer la demande</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

// --- MAIN PAGE EXPORT ---
export default function ArchiMadeLanding() {
    const [isLoading, setIsLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        // Expose lenis globally for component access
        (window as any).lenis = lenis;

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
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
                    <ArchiCursor />
                    <ArchiHeader onMenuClick={() => setIsMenuOpen(true)} />
                    <ArchiMenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

                    {/* Global Background UI */}
                    <ArchiBackground />
                    <ArchiMobileSocials />

                    {/* Desktop Left Fixed Frame Column */}
                    <div className="archi-sidebar fixed top-0 left-0 bottom-0 w-[25vw] z-[100] hidden xl:flex flex-col justify-between pt-16 pb-12 px-12 lg:px-16 pointer-events-none mix-blend-difference text-white">
                        <div className="pointer-events-auto">
                            <ArchiNav />
                        </div>
                        <div className="pointer-events-auto">
                            <ArchiLogo />
                        </div>
                    </div>

                    {/* Main Content Layout */}
                    <main className="archi-entrance relative z-10 pointer-events-none [&>*]:pointer-events-auto">
                        {/* All components take 100% width, offsets handled internally per section */}
                        <div id="hero">
                            <ArchiHero />
                        </div>

                        <ArchiVision />
                        <ArchiAbout />
                        <ArchiServices />
                        <ArchiProcess />
                        <ArchiGallery />

                        <TechnicalShowcase />
                        <ArchiValues />
                        <ArchiContact />
                    </main>

                    {/* Footer */}
                    {/* <footer className="py-0 px-10 md:px-20 bg-white border-t border-[#0a0a0a]/5 font-display">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
                            <div className="flex flex-col items-center md:items-start text-center md:text-left">

                                <p className="text-[10px] uppercase tracking-[0.4em] text-[#0a0a0a]/40 mt-8 font-bold">
                                    © 2026 ArchiMade Studio. Accompagnement architectural premium.<br />
                                    Toute reproduction interdite.
                                </p>
                            </div>
                            <div className="flex flex-col md:flex-row gap-10 items-center md:items-end">
                                <div className="text-center md:text-right space-y-2">
                                    <p className="text-[10px] uppercase tracking-widest text-[#0a0a0a]/40 font-bold">Localisation</p>
                                    <p className="text-xs font-bold uppercase">Intervention France Entière</p>
                                </div>
                                <div className="flex gap-8 border-l border-black/10 pl-8">
                                    <a href="#" className="text-[10px] uppercase tracking-widest text-[#0a0a0a]/40 hover:text-[#0a0a0a] font-bold transition-colors">Mentions Légales</a>
                                    <a href="#" className="text-[10px] uppercase tracking-widest text-[#0a0a0a]/40 hover:text-[#0a0a0a] font-bold transition-colors">Confidentialité</a>
                                </div>
                            </div>
                        </div>
                    </footer> */}

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
                html {
                   scroll-behavior: auto;
                }
            `}} />
                </div>
            )}
        </>
    );
}
