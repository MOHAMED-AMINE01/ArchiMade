import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import gsap from "gsap";
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
    Facebook
} from "lucide-react";
import { cn } from "../lib/utils";
import { AnimatePresence, motion } from "framer-motion";

// --- CONFIG ---
const IMAGES = {
    vision: "/IMAGES/3D/Construction d_une maison individuelle Montlouis sur Loire 37270.png",
    about: "/IMAGES/3D/Construction d_une maison individuelle joue les tours 37300.png",
    gallery: [
        "/IMAGES/Projets finis/Construction d_une maison individuelle neuve 37540 saint cyr sur loire/Capture d_écran 2026-04-11 102226.png",
        "/IMAGES/Projets finis/Construction d_une maison individuelle neuve 37230 fondettes/Capture d_écran 2026-04-11 101030.png",
        "/IMAGES/Projets finis/Bâtiment d_activités/4 cellules d_activités rue Jacqueline Auriol la ville aux dames 37700.png"
    ]
};

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
                "h-16 md:h-20 scale-250 ml-10 w-auto object-contain",
                light && "brightness-0 invert"
            )}
        />
    </motion.div>
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
                                className="text-4xl lg:text-4xl font-semibold text-[#0a0a0a] block hover:italic transition-all relative"
                            >
                                <span className="relative z-10">{item.name}</span>
                                <div className="absolute bottom-1 left-0 w-0 h-[2px] bg-black transition-all duration-500 group-hover:w-full z-0 opacity-20"></div>
                            </a>
                        </li>
                    </ArchiReveal>
                ))}
            </ul>

            {/* SNS LINKS */}
            <ul className="flex flex-col items-start gap-1">
                <motion.li
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    <a href="#" className="text-xs font-bold tracking-widest text-[#0a0a0a]/40 hover:text-black transition-colors uppercase">Facebook</a>
                </motion.li>
                <motion.li
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                >
                    <a href="#" className="text-xs font-bold tracking-widest text-[#0a0a0a]/40 hover:text-black transition-colors uppercase">Instagram</a>
                </motion.li>
            </ul>
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
                    <div className="flex gap-8">
                        <a href="#" className="text-xl font-bold tracking-tight hover:opacity-50 transition-opacity">Instagram</a>
                        <a href="#" className="text-xl font-bold tracking-tight hover:opacity-50 transition-opacity">Facebook</a>
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
        <header className="md:hidden fixed top-0 left-0 right-0 z-[150] p-8 flex justify-between items-center mix-blend-difference pointer-events-none">
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

// 1.5 VISION SECTION
function ArchiVision() {
    const sectionRef = useRef(null);
    const imgRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".vision-title", {
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%"
                }
            });
            gsap.to(imgRef.current, {
                yPercent: 15,
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
        <section id="archi-vision" ref={sectionRef} className="relative min-h-[80vh] w-full bg-black/5 backdrop-blur-[2px] border-y border-black/10 flex flex-col items-center justify-center py-20 overflow-hidden font-display">
            <div className="w-full relative">
                <div className="relative aspect-[21/9] md:aspect-[2.5/1] w-full overflow-hidden group">
                    <img
                        ref={imgRef}
                        src={IMAGES.vision}
                        alt="Rendu 3D Villa Contemporaine - ArchiMade"
                        className="w-full h-[140%] object-cover absolute -top-[20%] filter grayscale group-hover:grayscale-0 transition-all duration-1000 brightness-75 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-[#0a0a0a]/30 group-hover:bg-0 transition-all duration-1000"></div>

                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center px-10 pointer-events-none">
                        <h2 className="vision-title text-[8vw] font-bold text-white tracking-tighter leading-none text-center mix-blend-difference uppercase italic">
                            Innovation &<br />Réalisme
                        </h2>
                    </div>
                </div>

                <div className="mt-16 flex flex-col md:flex-row justify-between gap-10 md:pl-[25vw] px-10 md:pr-20 ">
                    <div className="md:w-1/2">
                        <p className="text-xs uppercase tracking-[0.4em] text-[#0a0a0a]/40 mb-6 font-semibold">NOTRE VISION 3D</p>
                        <h3 className="text-3xl md:text-4xl font-light leading-tight text-[#0a0a0a] uppercase tracking-tighter">
                            Visualisez votre futur avant même le premier coup de pelle.
                        </h3>
                    </div>
                    <div className="md:w-1/3 flex flex-col justify-end">
                        <p className="text-sm text-[#0a0a0a]/60 leading-relaxed uppercase font-bold tracking-wide text-right italic underline decoration-black/20 decoration-2">
                            "Des rendus d'une précision chirurgicale pour une validation projet accélérée."
                        </p>
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
            gsap.from(".about-content > *", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%"
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="propos" ref={sectionRef} className="relative bg-transparent overflow-hidden font-display">
            <ArchiDrawing type="lines" className="top-20 left-0 w-full opacity-5" trigger={sectionRef} />
            <div className="w-full flex flex-col">
                <div className="py-32 md:pl-[25vw] px-10 md:pr-20 about-content relative z-10">
                    <ArchiReveal className="space-y-4">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-[#0a0a0a]/40 font-bold">Expertise & Accompagnement</span>
                        <h2 className="text-4xl md:text-6xl font-bold leading-tight text-[#0a0a0a] uppercase tracking-tighter max-w-6xl">
                            Spécialiste dans la conception de projets de construction.
                        </h2>
                    </ArchiReveal>
                    <div className="flex flex-col md:flex-row gap-16 mt-20">
                        <ArchiReveal className="flex-1" delay={0.2}>
                            <p className="text-xl md:text-2xl font-bold leading-relaxed text-[#0a0a0a] uppercase tracking-tight italic">
                                ArchiMade accompagne particuliers et professionnels dans la réalisation de leurs démarches administratives. Nous intervenons sur la production de plans techniques et d’exécution ainsi que sur la modélisation 3D.
                            </p>
                            <a href="#expertise" className="mt-8 inline-block text-xl font-bold underline decoration-2 underline-offset-8">En savoir plus</a>
                        </ArchiReveal>
                        <ArchiReveal className="flex-1 space-y-12" delay={0.4}>
                            <div className="grid grid-cols-2 gap-12 pt-10 border-t border-black/10">
                                <div className="space-y-4">
                                    <span className="text-4xl md:text-5xl font-bold block text-[#0a0a0a] tracking-tighter underline">100%</span>
                                    <p className="text-xs uppercase tracking-widest font-bold text-[#0a0a0a]/60">CONFORMITÉ</p>
                                </div>
                                <div className="space-y-4">
                                    <span className="text-4xl md:text-5xl font-bold block text-[#0a0a0a] tracking-tighter underline decoration-black/20">0.0</span>
                                    <p className="text-xs uppercase tracking-widest font-bold text-[#0a0a0a]/60">RETARD</p>
                                </div>
                            </div>
                        </ArchiReveal>
                    </div>
                </div>

                <ArchiReveal type="scale" className="relative aspect-[21/9] w-full overflow-hidden group">
                    <img
                        ref={imgRef}
                        src={IMAGES.about}
                        alt="Projet Résidentiel Moderne - ArchiMade 3D"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-[#0a0a0a]/20 group-hover:bg-0 transition-all duration-500"></div>
                </ArchiReveal>
            </div>
        </section>
    );
}

// 3. SERVICES SECTION (EXPERTISE)
const services = [
    { title: "Permis de Construire", desc: "Élaboration de dossiers complets et conformes aux réglementations locales." },
    { title: "Déclarations Préalables", desc: "Accompagnement administratif pour vos projets de rénovation ou d'extension." },
    { title: "Plans Techniques", desc: "Production de plans de masse, coupes et façades avec une précision absolue." },
    { title: "Plans d’Exécution", desc: "Détails constructifs millimétrés pour une réalisation sans encombre." },
    { title: "Modélisation 3D", desc: "Immersion totale pour visualiser les volumes et l'insertion paysagère." },
    { title: "Rendus Photoréalistes", desc: "Valorisation esthétique de vos projets pour une présentation d’exception." },
    { title: "Dossiers Administratifs", desc: "Prise en charge totale des relations avec les services d'urbanisme." },
];

function ArchiServices() {
    const containerRef = useRef(null);

    return (
        <section id="expertise" ref={containerRef} className="relative py-40 bg-transparent font-display">
            <ArchiDrawing type="circle" className="bottom-0 left-[-10%] w-[50vw] opacity-5" trigger={containerRef} />
            <div className="md:pl-[25vw] px-10 md:pr-20 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-10">
                    <ArchiReveal className="space-y-6">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-[#0a0a0a]/40 font-bold">Solutions Architecturales</span>
                        <h2 className="text-6xl md:text-[8vw] font-bold tracking-tighter uppercase leading-[0.8] text-[#0a0a0a]">
                            Expertises<br /><span className="text-[#0a0a0a]/10 italic">Techniques</span>
                        </h2>
                    </ArchiReveal>
                </div>

                <div className="space-y-0">
                    {services.map((s, i) => (
                        <ArchiReveal key={i} delay={i * 0.1}>
                            <div className="group flex flex-col md:flex-row items-center justify-between gap-10 border-b border-[#0a0a0a]/10 py-16 hover:bg-black hover:text-white transition-all duration-500 px-6 -mx-6 px-10 md:px-20">
                                <div className="md:w-1/2 flex items-center gap-12">
                                    <span className={cn("text-xl font-mono text-[#0a0a0a]/20 group-hover:text-white transition-colors")}>{i < 9 ? `0${i + 1}` : i + 1} —</span>
                                    <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">{s.title}</h3>
                                </div>
                                <div className="md:w-1/2 flex justify-between items-center group/btn">
                                    <p className="text-sm md:text-md font-bold text-[#0a0a0a]/60 group-hover:text-white/60 leading-relaxed uppercase tracking-wide max-w-md transition-colors">
                                        {s.desc}
                                    </p>
                                    <ArrowUpRight className="w-10 h-10 text-[#0a0a0a]/20 group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </div>
                            </div>
                        </ArchiReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 4. PROCESS / METHOD SECTION (MÉTHODES)
function ArchiProcess() {
    const steps = [
        { title: "Analyse du besoin", desc: "Audit initial et définition des objectifs de votre projet." },
        { title: "Étude du projet", desc: "Analyse de faisabilité technique et réglementaire (PLU)." },
        { title: "Production", desc: "Élaboration des plans techniques et modélisations 3D." },
        { title: "Constitution", desc: "Montage du dossier administratif complet et conforme." },
        { title: "Accompagnement", desc: "Suivi jusqu'à la finalisation et validation du projet." },
    ];

    return (
        <section id="méthodes" className="relative py-40 bg-[#0a0a0a] overflow-hidden font-display">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-[-20deg] translate-x-20"></div>

            <div className="w-full relative z-10 md:pl-[25vw] px-10 md:pr-20">
                <div className="flex flex-col md:flex-row justify-between items-start mb-32">
                    <div className="space-y-6">
                        <p className="text-xs uppercase tracking-[0.5em] text-white/40 font-bold">WORKFLOW RIGOUREUX</p>
                        <h2 className="text-6xl md:text-9xl font-bold tracking-tighter text-white uppercase italic">
                            Méthode
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32">
                    {steps.map((step, i) => (
                        <div key={i} className="relative group">
                            <span className="absolute -left-10 md:-left-16 top-0 text-7xl md:text-9xl font-bold text-white/5 transition-colors group-hover:text-white/10">{i + 1}</span>
                            <div className="relative pt-8 space-y-4">
                                <h4 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tighter">{step.title}</h4>
                                <p className="text-sm md:text-base text-white/40 uppercase tracking-widest font-medium leading-relaxed max-w-sm">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 5. PROJECTS / VISUAL GALLERY
function ArchiGallery() {
    const sectionRef = useRef(null);
    const images = IMAGES.gallery;

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".gallery-title", {
                x: -100,
                opacity: 0,
                duration: 1.5,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%"
                }
            });
            gsap.from(".gallery-img-wrapper", {
                clipPath: "inset(0% 0% 100% 0%)",
                duration: 1.8,
                stagger: 0.3,
                ease: "power4.inOut",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%"
                }
            });
            // Parallax for gallery images
            gsap.utils.toArray(".parallax-img").forEach((img: any) => {
                gsap.to(img, {
                    yPercent: 10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img,
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
        <section id="réalisations" ref={sectionRef} className="relative py-40 bg-transparent font-display">
            <ArchiDrawing type="rect" className="top-0 right-[-5%] w-[40vw] opacity-5" trigger={sectionRef} />
            <div className="w-full relative z-10">
                <div className="md:pl-[25vw] px-10 md:pr-20 mb-32">
                    <ArchiReveal className="flex flex-col md:flex-row justify-between items-baseline border-b border-black/10 pb-12">
                        <h2 className="gallery-title text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-none">Réalisations</h2>
                        <p className="text-xs uppercase tracking-[0.4em] text-[#0a0a0a]/40 mt-4 md:mt-0 font-bold italic">SÉLECTION DE RENDUS D'EXCEPTION</p>
                    </ArchiReveal>
                </div>

                <div className="gallery-grid space-y-60">
                    {/* Project 1: Full Focus */}
                    <div className="relative group w-full">
                        <ArchiReveal type="scale" className="gallery-img-wrapper aspect-[21/9] w-full overflow-hidden relative">
                            <img src={images[0]} alt="Villa Moderne ArchiMade" className="parallax-img w-full h-[120%] object-cover absolute -top-[10%] grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 brightness-75 group-hover:brightness-100" />

                            {/* Overlay Tech Specs */}
                            <div className="absolute bottom-10 left-10 z-20 text-white/40 font-mono text-[8px] uppercase tracking-widest hidden md:block group-hover:text-white transition-colors">
                                <p>COORD: 45°N 5°E</p>
                                <p>SCALE: 1:100</p>
                                <p>RENDER: CYCLES RX 5.0</p>
                            </div>
                        </ArchiReveal>
                        <ArchiReveal className="mt-12 flex justify-between items-end md:pl-[25vw] px-10 md:pr-20" delay={0.2}>
                            <div className="space-y-4">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-black/40">PROJET 01 / SAINT CYR SUR LOIRE</span>
                                <h3 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none">Villa<br />Contemporaine</h3>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-bold italic mb-2 tracking-tight uppercase underline decoration-black/10">Permis de Construire</p>
                                <p className="text-sm text-[#0a0a0a]/40 font-bold italic border-t border-black/10 pt-2 px-4 inline-block tracking-tighter">Architecture Neuve • 2024</p>
                            </div>
                        </ArchiReveal>
                    </div>

                    {/* Project 2 & 3: Staggered Layout */}
                    <div className="flex flex-col md:flex-row gap-0.5 w-full">
                        <div className="flex-1 space-y-12 group">
                            <ArchiReveal type="scale" className="gallery-img-wrapper aspect-[4/5] w-full overflow-hidden relative">
                                <img src={images[1]} alt="Maison Pierre ArchiMade" className="parallax-img w-full h-[120%] object-cover absolute -top-[10%] grayscale group-hover:grayscale-0 transition-all duration-700" />
                                <div className="absolute top-6 left-6 border border-white/20 p-2 text-[8px] text-white/40 uppercase font-bold group-hover:border-white transition-colors">TYPE: RESIDENTIAL_PLAN_SPEC</div>
                            </ArchiReveal>
                            <ArchiReveal className="md:pl-[25vw] px-10" delay={0.2}>
                                <span className="text-[10px] uppercase tracking-widest font-bold text-black/40 block mb-2">PROJET 02 / FONDETTES</span>
                                <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter italic">Résidence<br />Individuelle</h3>
                            </ArchiReveal>
                        </div>
                        <ArchiReveal className="flex-1 space-y-10 group bg-[#0a0a0a] text-white py-20 px-10 md:pr-20 relative overflow-hidden" type="fade">
                            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                                <img src={images[2]} alt="Background detail" className="w-full h-full object-cover blur-sm" />
                            </div>

                            <div className="md:pl-[5vw] space-y-8 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="h-[1px] w-20 bg-white/20"></div>
                                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">PROJECT DETAILS 03</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between border-b border-white/10 pb-4">
                                        <span className="text-xs uppercase tracking-widest opacity-50 font-medium">Structure</span>
                                        <span className="text-xs uppercase tracking-widest font-bold">Charpente Métallique</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/10 pb-4">
                                        <span className="text-xs uppercase tracking-widest opacity-50 font-medium">Type</span>
                                        <span className="text-xs uppercase tracking-widest font-bold">Bâtiment Industriel 3D</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/10 pb-4">
                                        <span className="text-xs uppercase tracking-widest opacity-50 font-medium">Finitions</span>
                                        <span className="text-xs uppercase tracking-widest font-bold text-white transition-colors">Bardage Anthracite</span>
                                    </div>
                                </div>
                                <h3 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none mt-20">Bâtiment<br />d'Activités</h3>

                                <div className="mt-12 overflow-hidden aspect-video border border-white/10 group-hover:border-white/40 transition-colors">
                                    <img src={images[2]} alt="Industrial View" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        </ArchiReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}

// 6. VALUE SECTION (PROMESSE)
function ArchiValues() {
    return (
        <section className="py-60 bg-[#0a0a0a] text-[#f5f5f5] overflow-hidden relative font-display">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-[150px] pointer-events-none"></div>
            <div className="md:pl-[25vw] px-10 md:pr-20 relative z-10">
                <div className="mb-40 space-y-10">
                    <span className="text-lg md:text-2xl font-light italic text-white/40 block">Pourquoi ArchiMade ?</span>
                    <h2 className="text-7xl md:text-[8vw] font-bold tracking-tighter leading-[0.8] uppercase">
                        Précision,<br /><span className="text-white/10 italic">Disponibilité.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-40">
                    {[
                        { num: "01", title: "Réactivité", desc: "Engagement à respecter systématiquement les délais pour chaque projet." },
                        { num: "02", title: "Zéro Retard", desc: "Garantie de livraison de vos dossiers administratifs sans aucun décalage." },
                        { num: "03", title: "Rayonnement", desc: "Intervention sur l'ensemble du territoire français, principalement à distance." },
                        { num: "04", title: "Polyvalence", desc: "Accompagnement dès que les éléments nécessaires (plans, relevés) sont fournis." },
                    ].map((v, i) => (
                        <div key={i} className="group border-t border-white/10 pt-12 flex flex-col gap-8 hover:border-white/40 transition-colors">
                            <div className="flex justify-between items-center text-3xl md:text-4xl font-bold tracking-tighter uppercase italic">
                                <h3>{v.title}</h3>
                                <span className="text-white/10 group-hover:text-white transition-colors">({v.num})</span>
                            </div>
                            <p className="text-lg md:text-xl font-medium text-white/40 leading-relaxed uppercase tracking-wider max-w-sm">
                                {v.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 7. FINAL CTA / CONTACT
function ArchiContact() {
    return (
        <section id="contact" className="py-32 bg-transparent font-display">
            <div className="md:pl-[25vw] px-10 md:pr-20 flex flex-col lg:flex-row gap-20">
                <div className="flex-1 space-y-12">
                    <div className="space-y-6">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-[#0a0a0a]/40 block font-bold">Contact</span>
                        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-[#0a0a0a] uppercase leading-none italic">
                            Lancez votre<br />projet.
                        </h2>
                    </div>
                    <div className="space-y-8 pt-8">
                        <div className="flex items-center gap-6 group">
                            <div className="w-12 h-12 rounded-full border border-[#0a0a0a]/10 flex items-center justify-center group-hover:bg-[#0a0a0a] transition-all duration-500">
                                <Mail className="w-4 h-4 text-[#0a0a0a] group-hover:text-white transition-all duration-500" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-[#0a0a0a]/40 mb-1 font-bold">Email</p>
                                <p className="text-xl font-bold text-[#0a0a0a]">contact@archimade.studio</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 group">
                            <div className="w-12 h-12 rounded-full border border-[#0a0a0a]/10 flex items-center justify-center group-hover:bg-[#0a0a0a] transition-all duration-500">
                                <Phone className="w-4 h-4 text-[#0a0a0a] group-hover:text-white transition-all duration-500" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-[#0a0a0a]/40 mb-1 font-bold">Téléphone</p>
                                <p className="text-xl font-bold text-[#0a0a0a]">+33 1 23 45 67 89</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-white p-10 md:p-16 border border-black/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)]">
                    <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-[#0a0a0a]/40 font-bold">Nom Complet</label>
                                <input type="text" className="w-full border-b border-[#0a0a0a]/10 py-3 font-medium focus:border-[#0a0a0a] outline-none transition-all placeholder:text-[#0a0a0a]/10 text-sm uppercase tracking-widest" placeholder="votre nom" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-[#0a0a0a]/40 font-bold">Email</label>
                                <input type="email" className="w-full border-b border-[#0a0a0a]/10 py-3 font-medium focus:border-[#0a0a0a] outline-none transition-all placeholder:text-[#0a0a0a]/10 text-sm uppercase tracking-widest" placeholder="nom@exemple.com" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] uppercase tracking-[0.2em] text-[#0a0a0a]/40 font-bold">Quel est votre projet ?</label>
                            <select className="w-full border-b border-[#0a0a0a]/10 py-3 font-medium focus:border-[#0a0a0a] outline-none transition-all text-sm uppercase tracking-widest bg-transparent">
                                <option>Permis de Construire</option>
                                <option>Déclarations Préalables</option>
                                <option>Plans Techniques / 3D</option>
                                <option>Autre demande</option>
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] uppercase tracking-[0.2em] text-[#0a0a0a]/40 font-bold">Message</label>
                            <textarea rows={4} className="w-full border-b border-[#0a0a0a]/10 py-3 font-medium focus:border-[#0a0a0a] outline-none transition-all placeholder:text-[#0a0a0a]/10 text-sm uppercase tracking-widest resize-none" placeholder="détails du projet..." />
                        </div>
                        <button className="w-full py-6 bg-[#0a0a0a] text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:shadow-2xl transition-all duration-500 translate-y-2">
                            Envoyer la demande
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
                    delay: 0.2
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

                    {/* Desktop Left Fixed Frame Column */}
                    <div className="archi-entrance fixed top-0 left-0 bottom-0 w-[25vw] z-[100] hidden md:flex flex-col justify-between pt-16 pb-12 px-12 lg:px-16 pointer-events-none">
                        <div className="pointer-events-auto">
                            <ArchiNav />
                        </div>
                        <div>
                            <ArchiLogo />
                        </div>
                    </div>

                    {/* Main Content Layout */}
                    <main className="archi-entrance relative z-10 pointer-events-none [&>*]:pointer-events-auto overflow-hidden">
                        {/* All components take 100% width, offsets handled internally per section */}
                        <div id="hero">
                            <ArchiHero />
                        </div>

                        <ArchiVision />
                        <ArchiAbout />
                        <ArchiServices />
                        <ArchiProcess />
                        <ArchiGallery />
                        <ArchiValues />
                        <ArchiContact />
                    </main>

                    {/* Footer */}
                    <footer className="py-20 px-10 md:px-20 bg-white border-t border-[#0a0a0a]/5 font-display">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
                            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                <ArchiLogo />
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
                    </footer>

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
