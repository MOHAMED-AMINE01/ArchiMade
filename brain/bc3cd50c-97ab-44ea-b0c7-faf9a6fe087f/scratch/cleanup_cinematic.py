
import os
import re

filepath = r'c:\ALTERNANCE\ArchiMade\src\components\ArchiMadeLanding.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Define the components in a clean way
# ArchiTransitionOverlay
# ArchiProjectDetail
# ArchiGallery

transition_code = """
function ArchiTransitionOverlay({ isVisible, onComplete }: { isVisible: boolean, onComplete: () => void }) {
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

            gsap.set([circle1Ref.current, circle2Ref.current, textRef.current], { opacity: 0, scale: 0.8 });
            gsap.set([greyPanelRef.current, blackPanelRef.current], { y: "100%" });

            tl.to(containerRef.current, { opacity: 1, duration: 0.1 });
            tl.to(circle1Ref.current, { opacity: 1, scale: 1.2, rotation: 45, duration: 1.5, ease: "power4.out" }, 0);
            tl.to(circle2Ref.current, { opacity: 1, scale: 1.5, rotation: -30, duration: 1.8, ease: "power4.out" }, 0.1);
            tl.to(textRef.current, { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }, 0.2);

            tl.to(greyPanelRef.current, { y: "0%", duration: 0.9, ease: "expo.inOut" }, 1.2);
            tl.to(blackPanelRef.current, { y: "0%", duration: 0.9, ease: "expo.inOut" }, 1.4);
        }, containerRef);

        return () => ctx.revert();
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[400] opacity-0">
            <div className="absolute inset-0 bg-[#e5e5e5] overflow-hidden">
                <div ref={circle1Ref} className="absolute -top-[20%] -left-[10%] w-[80vw] h-[80vw] border-[100px] border-black/5 rounded-full" />
                <div ref={circle2Ref} className="absolute -bottom-[30%] -right-[10%] w-[100vw] h-[100vw] border-[150px] border-black/5 rounded-full" />
                <div ref={textRef} className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[15vw] font-black uppercase tracking-tighter text-black/5 select-none">ArchiMade</span>
                </div>
            </div>
            <div ref={greyPanelRef} className="absolute inset-0 bg-[#333] z-40" />
            <div ref={blackPanelRef} className="absolute inset-0 bg-[#0a0a0a] z-50" />
        </div>
    );
}

function ArchiProjectDetail({ project, onClose }: { project: any, onClose: () => void }) {
    const heroImgRef = useRef(null);

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
                delay: 1
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
            className="fixed inset-0 z-[200] bg-[#0a0a0a] overflow-y-auto overflow-x-hidden font-display text-white"
        >
            <button 
                onClick={onClose}
                className="fixed top-10 right-10 z-[210] group flex items-center gap-4 text-white mix-blend-difference"
            >
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-all">Studio Index</span>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors backdrop-blur-md">
                    <X className="w-5 h-5" />
                </div>
            </button>

            <div className="w-full">
                <div className="h-screen w-full relative overflow-hidden">
                    <img ref={heroImgRef} src={encodeURI(project.path)} alt={project.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-20 left-10 md:left-20 max-w-5xl space-y-6">
                        <div className="flex items-center gap-4 cinematic-text">
                            <div className="w-12 h-[1px] bg-white/40"></div>
                            <span className="text-[10px] font-mono text-white/60 uppercase tracking-[0.5em]">{project.city}</span>
                        </div>
                        <h2 className="text-7xl md:text-[15vw] font-black uppercase tracking-tighter leading-[0.8] cinematic-text">
                            {project.title}
                        </h2>
                    </div>
                </div>

                <div className="border-y border-white/5 bg-white/[0.02] backdrop-blur-md sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-10 md:px-20 py-8 flex flex-wrap justify-between items-center gap-10">
                        <div className="flex gap-20">
                            <div>
                                <p className="text-[8px] font-mono text-white/30 uppercase mb-1">Programme</p>
                                <p className="text-xs font-bold uppercase">{project.type}</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-mono text-white/30 uppercase mb-1">Ann\\u00e9e</p>
                                <p className="text-xs font-bold uppercase">{project.year}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            {project.specs.map((spec: string, i: number) => (
                                <span key={i} className="text-[9px] border border-white/10 px-3 py-1 rounded-full text-white/60 font-bold uppercase tracking-widest">
                                    {spec}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="py-20 space-y-0">
                    {project.gallery && project.gallery.map((img: string, i: number) => (
                        <div key={i} className="relative w-full group overflow-hidden">
                            {i === 0 && project.pathBefore ? (
                                <div className="h-[80vh] md:h-screen w-full relative cinematic-img">
                                    <img src={encodeURI(project.pathBefore)} className="absolute inset-0 w-full h-full object-cover grayscale brightness-75" alt="Before" />
                                    <img src={encodeURI(project.path)} className="absolute inset-0 w-full h-full object-cover" style={{ clipPath: `inset(0 \${100 - (50)}% 0 0)` }} alt="After" />
                                </div>
                            ) : (
                                <div className="w-full py-20 px-4 md:px-10 cinematic-img">
                                    <img src={encodeURI(img)} className="w-full h-auto object-cover shadow-2xl group-hover:scale-[1.02] transition-transform duration-1000" alt={`Gallery \${i}`} />
                                    <div className="mt-4 flex justify-between items-center opacity-30 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[8px] font-mono uppercase tracking-widest font-bold">Image_Capture_\${i+1}.raw</span>
                                        <div className="h-[1px] flex-1 mx-10 bg-white/10"></div>
                                        <span className="text-[8px] font-mono uppercase font-bold">Vault_System_ID: \${project.year}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto px-10 md:px-20 py-40 text-center space-y-12">
                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic cinematic-text">Philosophie</h3>
                    <p className="text-xl md:text-3xl font-light text-white/60 leading-relaxed cinematic-text">
                        Concevoir c'est anticiper. Pour {project.title}, nous avons fusionn\\u00e9 esth\\u00e9tique brute et rigueur technique pour cr\\u00e9er un espace intemporel.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

function ArchiGallery() {
    const sectionRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const [sliderPos, setSliderPos] = useState<Record<number, number>>({});
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [pendingProject, setPendingProject] = useState<any>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleSliderChange = (index: number, e: any) => {
        setSliderPos(prev => ({ ...prev, [index]: e.target.value }));
    };

    const handleProjectClick = (project: any) => {
        setPendingProject(project);
        setIsTransitioning(true);
    };

    const handleTransitionComplete = () => {
        setSelectedProject(pendingProject);
        setPendingProject(null);
        setTimeout(() => setIsTransitioning(false), 500);
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const container = scrollContainerRef.current;
            if (!container) return;
            const getScrollDistance = () => container.scrollWidth - window.innerWidth;

            gsap.to(container, {
                x: () => -getScrollDistance(),
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    pinType: "transform",
                    scrub: 1,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    end: () => "+=" + getScrollDistance(),
                }
            });
            ScrollTrigger.refresh();
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="r\\u00e9alisations" ref={sectionRef} className="relative h-screen bg-[#e5e5e5] overflow-hidden font-display z-50">
            <ArchiTransitionOverlay isVisible={isTransitioning} onComplete={handleTransitionComplete} />
            <AnimatePresence>
                {selectedProject && <ArchiProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />}
            </AnimatePresence>

            <div className="absolute top-10 md:top-20 xl:pl-[25vw] px-10 z-50 pointer-events-none">
                <h2 className="text-7xl md:text-[10vw] font-bold tracking-tighter uppercase leading-none text-[#0a0a0a]">Projets</h2>
                <div className="flex items-center gap-4 mt-2 opacity-30">
                    <div className="h-[1px] w-20 bg-black"></div>
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Catalogue d'Excellence</span>
                </div>
            </div>

            <div ref={scrollContainerRef} className="flex flex-nowrap h-full items-center gap-0 relative z-30" style={{ width: 'fit-content', willChange: 'transform' }}>
                <div className="hidden xl:block w-[25vw] shrink-0 h-full" />
                {PROJECTS.map((project, i) => (
                    <div key={i} className="project-card relative shrink-0 w-[100vw] md:w-[70vw] h-screen flex flex-col justify-center px-10 md:px-20 pt-[20vh]">
                        <div onClick={() => handleProjectClick(project)} className={cn("relative group w-full h-[50vh] md:h-[60vh] overflow-hidden bg-black/10 shadow-2xl cursor-pointer", project.pathBefore && "cursor-pointer")}>
                            {project.pathBefore ? (
                                <>
                                    <img src={encodeURI(project.pathBefore)} alt="Avant" className="absolute inset-0 w-full h-full object-cover grayscale brightness-75" />
                                    <img src={encodeURI(project.path)} alt="Apr\\u00e8s" className="absolute inset-0 w-full h-full object-cover" style={{ clipPath: `inset(0 \${100 - (sliderPos[i] || 50)}% 0 0)` }} />
                                    <div className="absolute top-0 bottom-0 w-[1px] bg-white pointer-events-none z-20" style={{ left: `\${sliderPos[i] || 50}%` }} />
                                    <input type="range" min="0" max="100" value={sliderPos[i] || 50} onChange={(e) => handleSliderChange(i, e)} onClick={(e) => e.stopPropagation()} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize m-0 p-0 z-30" />
                                </>
                            ) : (
                                <img src={encodeURI(project.path)} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" />
                            )}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-700 bg-black/50 backdrop-blur-[2px] pointer-events-none">
                                <div className="flex justify-between items-start text-white font-mono text-[8px] uppercase tracking-widest font-bold">
                                    <p>UID: {i + 100} / {project.city}</p>
                                    <p>REV: 2024</p>
                                </div>
                                <div className="px-4 py-2 border border-white/30 text-[10px] font-bold uppercase tracking-widest text-white inline-block">Voir les d\\u00e9tails</div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-between items-end">
                            <div className="space-y-1">
                                <div className="flex items-center gap-4">
                                    <span className="text-xl font-mono text-black/10 italic font-bold">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="text-[10px] uppercase tracking-widest text-black/30 font-bold">{project.city}</span>
                                </div>
                                <h3 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-none">{project.title}</h3>
                            </div>
                            <div onClick={() => handleProjectClick(project)} className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                ))}
                <div className="w-[10vw] md:w-[30vw] shrink-0 h-full" />
            </div>
        </section>
    );
}
"""

# Now find where to replace
# We need to replace from the start of ArchiTransitionOverlay (if it exists) or ArchiProjectDetail
# up to the start of TechnicalShowcase

start_marker = "function ArchiTransitionOverlay"
if start_marker not in content:
    start_marker = "function ArchiProjectDetail"

end_marker = "// 5.5 TECHNICAL SHOWCASE"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + transition_code + "\\n\\n" + content[end_idx:]
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully cleaned up and repaired cinematic transition code.")
else:
    print(f"Error finding markers: start={start_idx}, end={end_idx}")
