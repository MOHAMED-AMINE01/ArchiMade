
import os
import re

filepath = r'c:\ALTERNANCE\ArchiMade\src\components\ArchiMadeLanding.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Define the correct ArchiGallery component
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
                                    <img src={encodeURI(project.pathBefore)} alt="Avant" className="absolute inset-0 w-full h-full object-cover grayscale brightness-75" />
                                    <img
                                        src={encodeURI(project.path)}
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
                                    src={encodeURI(project.path)}
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

# Find the start of ArchiGallery and the end before TechnicalShowcase
# The current broken state is:
# function ArchiGallery() { ... } \n const [selectedProject... \n return ( ... ) \n );
# The TechnicalShowcase starts at "// 5.5 TECHNICAL SHOWCASE"

start_marker = "function ArchiGallery() {"
end_marker = "// 5.5 TECHNICAL SHOWCASE"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + new_gallery + "\\n\\n" + content[end_idx:]
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(new_content)
    print("Successfully repaired ArchiGallery and fixed syntax errors.")
else:
    print(f"Error finding markers: start={start_idx}, end={end_idx}")
