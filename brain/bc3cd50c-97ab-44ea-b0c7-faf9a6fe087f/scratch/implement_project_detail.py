
import os

filepath = r'c:\ALTERNANCE\ArchiMade\src\components\ArchiMadeLanding.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 1. Add ArchiProjectDetail component before ArchiGallery
detail_component = """
// --- PROJECT DETAIL OVERLAY ---
function ArchiProjectDetail({ project, onClose }: { project: any, onClose: () => void }) {
    const overlayRef = useRef(null);
    const contentRef = useRef(null);

    useLayoutEffect(() => {
        if (!project) return;
        
        // Disable main scroll
        if ((window as any).lenis) (window as any).lenis.stop();
        document.body.style.overflow = 'hidden';

        const ctx = gsap.context(() => {
            gsap.fromTo(overlayRef.current, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.5, ease: "power2.out" }
            );
            gsap.fromTo(contentRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power4.out" }
            );
        });

        return () => {
            ctx.revert();
            if ((window as any).lenis) (window as any).lenis.start();
            document.body.style.overflow = '';
        };
    }, [project]);

    if (!project) return null;

    return (
        <div ref={overlayRef} className="fixed inset-0 z-[200] bg-white overflow-y-auto overflow-x-hidden">
            {/* CLOSE BUTTON */}
            <button 
                onClick={onClose}
                className="fixed top-10 right-10 z-[210] group flex items-center gap-4 mix-blend-difference text-white"
            >
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-all">Fermer</span>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                    <X className="w-5 h-5" />
                </div>
            </button>

            <div ref={contentRef} className="w-full">
                {/* HERO SECTION */}
                <div className="h-[80vh] w-full relative">
                    <img src={project.path} alt={project.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-20 left-10 md:left-20 max-w-4xl">
                        <span className="text-white/60 font-mono text-sm mb-4 block">{project.city} // {project.year}</span>
                        <h2 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none">
                            {project.title}
                        </h2>
                    </div>
                </div>

                {/* CONTENT FLOW */}
                <div className="max-w-7xl mx-auto px-10 md:px-20 py-32 space-y-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                        <div className="space-y-10">
                            <h3 className="text-4xl font-bold uppercase tracking-tighter">Vision du projet</h3>
                            <p className="text-xl text-black/60 font-light leading-relaxed">
                                Pour ce projet situé à {project.city}, l'objectif principal était de {project.type.toLowerCase()}. 
                                Nous avons mis l'accent sur {project.specs[0]} et {project.specs[1]} pour créer une harmonie parfaite avec l'environnement existant.
                                Chaque détail a été pensé pour optimiser le confort et l'esthétique contemporaine.
                            </p>
                        </div>
                        <div className="border-l border-black/10 pl-10 space-y-8">
                            <div className="grid grid-cols-2 gap-8">
                                {project.specs.map((spec: string, i: number) => (
                                    <div key={i} className="space-y-1">
                                        <p className="text-[8px] font-mono text-black/30 uppercase tracking-widest">Spécification {i+1}</p>
                                        <p className="text-sm font-bold uppercase">{spec}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* VERTICAL IMAGE STACK */}
                    <div className="space-y-20">
                        <img src={project.pathBefore || project.path} className="w-full h-auto shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000" alt="Detail 1" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                            <img src={project.path} className="w-full h-auto shadow-xl translate-y-20" alt="Detail 2" />
                            <div className="flex items-center">
                                <p className="text-3xl font-light italic text-black/40 leading-relaxed">
                                    "Une architecture qui respire et s'intègre naturellement dans son contexte."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FOOTER CALL TO ACTION */}
                <div className="bg-[#0a0a0a] text-white py-40 px-10 text-center space-y-10">
                    <h4 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">Prêt à lancer votre projet ?</h4>
                    <button 
                        onClick={() => { onClose(); (window as any).lenis?.scrollTo('#contact'); }}
                        className="px-12 py-6 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all"
                    >
                        Nous Contacter
                    </button>
                </div>
            </div>
        </div>
    );
}
"""

# 2. Update ArchiGallery to use the state
new_gallery = """
function ArchiGallery() {
    const sectionRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const [sliderPos, setSliderPos] = useState<Record<number, number>>({});
    const [selectedProject, setSelectedProject] = useState<any>(null);

    const handleSliderChange = (index: number, e: any) => {
        setSliderPos(prev => ({ ...prev, [index]: e.target.value }));
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const container = scrollContainerRef.current;
            if (!container) return;

            const getScrollDistance = () => {
                return container.scrollWidth - window.innerWidth;
            };

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
        <section
            id="réalisations"
            ref={sectionRef}
            className="relative h-screen bg-[#e5e5e5] overflow-hidden font-display z-50"
        >
            {/* OVERLAY DETAIL VIEW */}
            <AnimatePresence>
                {selectedProject && (
                    <ArchiProjectDetail 
                        project={selectedProject} 
                        onClose={() => setSelectedProject(null)} 
                    />
                )}
            </AnimatePresence>

            <div className="absolute top-10 md:top-20 xl:pl-[25vw] px-10 z-50 pointer-events-none">
                <h2 className="text-7xl md:text-[10vw] font-bold tracking-tighter uppercase leading-none text-[#0a0a0a]">
                    Projets
                </h2>
                <div className="flex items-center gap-4 mt-2 opacity-30">
                    <div className="h-[1px] w-20 bg-black"></div>
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Catalogue d'Excellence</span>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                className="flex flex-nowrap h-full items-center gap-0 relative z-30"
                style={{ width: 'fit-content', willChange: 'transform' }}
            >
                <div className="hidden xl:block w-[25vw] shrink-0 h-full" />

                {PROJECTS.map((project, i) => (
                    <div
                        key={i}
                        className="project-card relative shrink-0 w-[100vw] md:w-[70vw] h-screen flex flex-col justify-center px-10 md:px-20 pt-[20vh]"
                    >
                        <div 
                            onClick={() => setSelectedProject(project)}
                            className={cn("relative group w-full h-[50vh] md:h-[60vh] overflow-hidden bg-black/10 shadow-2xl cursor-pointer", project.pathBefore && "cursor-pointer")}
                        >
                            {project.pathBefore ? (
                                <>
                                    <img src={project.pathBefore} alt="Avant" className="absolute inset-0 w-full h-full object-cover grayscale brightness-75" />

                                    <img
                                        src={project.path}
                                        alt="Après"
                                        className="absolute inset-0 w-full h-full object-cover"
                                        style={{ clipPath: `inset(0 ${100 - (sliderPos[i] || 50)}% 0 0)` }}
                                    />

                                    <div className="absolute top-0 bottom-0 w-[1px] bg-white pointer-events-none flex items-center justify-center z-20" style={{ left: `${sliderPos[i] || 50}%` }}>
                                        <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50">
                                            <div className="flex gap-1">
                                                <div className="w-[1px] h-3 bg-white"></div>
                                                <div className="w-[1px] h-3 bg-white"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Slider input - disabled on click so it doesn't open the modal when sliding */}
                                    <input
                                        type="range" min="0" max="100" value={sliderPos[i] || 50} 
                                        onChange={(e) => handleSliderChange(i, e)}
                                        onClick={(e) => e.stopPropagation()}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize m-0 p-0 z-30"
                                    />

                                    <div className="absolute top-4 left-4 text-white text-[10px] font-mono uppercase tracking-widest mix-blend-difference pointer-events-none z-10">Avant</div>
                                    <div className="absolute top-4 right-4 text-white text-[10px] font-mono uppercase tracking-widest mix-blend-difference pointer-events-none z-10">Après</div>
                                </>
                            ) : (
                                <img
                                    src={project.path}
                                    alt={project.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                                />
                            )}

                            <div className="absolute inset-0 p-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-700 bg-black/50 backdrop-blur-[2px] pointer-events-none">
                                <div className="flex justify-between items-start text-white font-mono text-[8px] uppercase tracking-widest">
                                    <p>UID: {i + 100} / {project.city}</p>
                                    <p>REV: 2024</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="px-4 py-2 border border-white/30 text-[10px] font-bold uppercase tracking-widest text-white inline-block">
                                        Voir les détails
                                    </div>
                                    <div className="space-y-2">
                                        {project.specs.map((spec, sIdx) => (
                                            <div key={sIdx} className="flex items-center gap-2">
                                                <div className="w-1 h-1 bg-white rounded-full"></div>
                                                <span className="text-white text-[10px] font-bold uppercase tracking-tighter">{spec}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-between items-end">
                            <div className="space-y-1">
                                <div className="flex items-center gap-4">
                                    <span className="text-xl font-mono text-black/10 italic font-bold">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="text-[10px] uppercase tracking-widest text-black/30 font-bold">{project.city}</span>
                                </div>
                                <h3 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-none">
                                    {project.title}
                                </h3>
                            </div>
                            <div 
                                onClick={() => setSelectedProject(project)}
                                className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer"
                            >
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

# 3. Apply the changes
start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if 'function ArchiGallery()' in line:
        start_idx = i
    if 'function ArchiContact()' in line or 'function ArchiFooter()' in line:
        # Search for the end of ArchiGallery
        # ArchiGallery ends at 1941 (based on previous view)
        pass

# I'll use a safer markers-based replacement
for i, line in enumerate(lines):
    if 'function ArchiGallery()' in line:
        start_idx = i
    if 'id="réalisations"' in line:
        # We are inside ArchiGallery
        pass

# Actually I'll find the line before ArchiGallery
before_gallery = start_idx

# End of ArchiGallery
end_idx = -1
count = 0
for i in range(start_idx, len(lines)):
    if '{' in lines[i]: count += lines[i].count('{')
    if '}' in lines[i]: count -= lines[i].count('}')
    if count == 0 and i > start_idx:
        end_idx = i + 1
        break

if start_idx != -1 and end_idx != -1:
    new_lines = lines[:start_idx] + [detail_component + "\\n", new_gallery + "\\n"] + lines[end_idx:]
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("Successfully implemented Project Detail Overlay system.")
else:
    print(f"Error: start={start_idx}, end={end_idx}")
