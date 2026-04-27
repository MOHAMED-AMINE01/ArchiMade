
import os

filepath = r'c:\ALTERNANCE\ArchiMade\src\components\ArchiMadeLanding.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add helper to encode paths
# 2. Update card layout for uniformity
# 3. Use encodeURI for images

import re

# Update ArchiGallery to use uniform layout and encodeURI
new_gallery_code = """
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

    // Helper to safely encode paths with special characters
    const safePath = (p: string) => encodeURI(p).replace(/#/g, '%23').replace(/\\?/g, '%3F');

    return (
        <section
            id="réalisations"
            ref={sectionRef}
            className="relative h-screen bg-[#f0f0f0] overflow-hidden font-display z-50"
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
                <h2 className="text-7xl md:text-[10vw] font-bold tracking-tighter uppercase leading-none text-black/10">
                    Projets
                </h2>
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
                        className="project-card relative shrink-0 w-[85vw] md:w-[65vw] h-[80vh] flex flex-col justify-end px-10 md:px-16 pb-20"
                    >
                        <div 
                            onClick={() => setSelectedProject(project)}
                            className="relative group w-full h-[50vh] md:h-[55vh] overflow-hidden bg-black/5 shadow-xl cursor-pointer"
                        >
                            {project.pathBefore ? (
                                <>
                                    <img src={safePath(project.pathBefore)} alt="Avant" className="absolute inset-0 w-full h-full object-cover grayscale brightness-90" />
                                    <img
                                        src={safePath(project.path)}
                                        alt="Après"
                                        className="absolute inset-0 w-full h-full object-cover"
                                        style={{ clipPath: `inset(0 ${100 - (sliderPos[i] || 50)}% 0 0)` }}
                                    />
                                    <input
                                        type="range" min="0" max="100" value={sliderPos[i] || 50} 
                                        onChange={(e) => handleSliderChange(i, e)}
                                        onClick={(e) => e.stopPropagation()}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                                    />
                                </>
                            ) : (
                                <img
                                    src={safePath(project.path)}
                                    alt={project.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                                />
                            )}
                            
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                                <div className="px-6 py-3 border border-white/40 text-white text-[10px] font-bold uppercase tracking-[0.4em] backdrop-blur-sm">
                                    Explorer le dossier
                                </div>
                            </div>
                        </div>

                        {/* UNIFORM BOTTOM ALIGNMENT */}
                        <div className="mt-12 flex justify-between items-start border-t border-black/5 pt-8">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-mono text-black/20 font-bold">0{i + 1}</span>
                                    <span className="text-[10px] uppercase tracking-widest text-black/40 font-bold">{project.city}</span>
                                </div>
                                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                                    {project.title}
                                </h3>
                                <p className="text-[9px] text-black/30 font-bold uppercase tracking-widest">{project.type}</p>
                            </div>
                            <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all cursor-pointer">
                                <ArrowUpRight className="w-5 h-5 opacity-40 group-hover:opacity-100" />
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

# Replace the component
content = re.sub(r'function ArchiGallery\(\) \{.*?\}', new_gallery_code, content, flags=re.DOTALL)

# Also update safePath in ArchiProjectDetail
content = content.replace('src={img}', 'src={encodeURI(img)}')
content = content.replace('src={project.path}', 'src={encodeURI(project.path)}')
content = content.replace('src={project.pathBefore}', 'src={encodeURI(project.pathBefore)}')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated ArchiGallery with uniform layout and safe path encoding.")
