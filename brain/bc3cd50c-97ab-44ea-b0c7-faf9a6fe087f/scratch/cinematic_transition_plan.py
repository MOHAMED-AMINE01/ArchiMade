
// --- CINEMATIC TRANSITION OVERLAY (LARGO STYLE) ---
function ArchiTransitionOverlay({ isVisible, onComplete }: { isVisible: boolean, onComplete: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const circle1Ref = useRef<HTMLDivElement>(null);
    const circle2Ref = useRef<HTMLDivElement>(null);
    const greyPanelRef = useRef<HTMLDivElement>(null);
    const blackPanelRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!isVisible) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: onComplete
            });

            // 1. Shapes Entrance
            tl.set([circle1Ref.current, circle2Ref.current], { opacity: 0, scale: 0.8 });
            tl.to(containerRef.current, { opacity: 1, duration: 0.3 });
            
            tl.to(circle1Ref.current, { 
                opacity: 1, scale: 1.2, rotation: 45, duration: 1.2, ease: "power4.out" 
            }, 0);
            tl.to(circle2Ref.current, { 
                opacity: 1, scale: 1.5, rotation: -30, duration: 1.5, ease: "power4.out" 
            }, 0.1);

            // 2. Sliding Panels (Grey then Black)
            tl.to(greyPanelRef.current, {
                y: "0%",
                duration: 0.8,
                ease: "expo.inOut"
            }, 0.8);
            
            tl.to(blackPanelRef.current, {
                y: "0%",
                duration: 0.8,
                ease: "expo.inOut"
            }, 1.0);

            // 3. Cleanup shapes in background
            tl.set([circle1Ref.current, circle2Ref.current], { opacity: 0 });
            
        }, containerRef);

        return () => ctx.revert();
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[300] pointer-events-none opacity-0">
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
                
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[15vw] font-black uppercase tracking-tighter text-black/5">ArchiMade</span>
                </div>
            </div>

            {/* Sliding Windows */}
            <div 
                ref={greyPanelRef}
                className="absolute inset-0 bg-[#333] translate-y-full z-40"
            />
            <div 
                ref={blackPanelRef}
                className="absolute inset-0 bg-[#0a0a0a] translate-y-full z-50"
            />
        </div>
    );
}

// --- UPDATED PROJECT DETAIL (ZOOM ENTRY) ---
function ArchiProjectDetail({ project, onClose }: { project: any, onClose: () => void }) {
    const heroImgRef = useRef(null);

    useLayoutEffect(() => {
        if (!project) return;
        if ((window as any).lenis) (window as any).lenis.stop();
        document.body.style.overflow = 'hidden';

        const ctx = gsap.context(() => {
            // ZOOM OUT TO ZOOM IN EFFECT
            gsap.fromTo(heroImgRef.current, 
                { scale: 1.4, filter: "blur(20px)" },
                { scale: 1, filter: "blur(0px)", duration: 2, ease: "expo.out", delay: 0.2 }
            );

            gsap.from(".cinematic-text", {
                opacity: 0,
                y: 30,
                duration: 1.2,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.8
            });

            gsap.from(".cinematic-img", {
                opacity: 0,
                y: 50,
                duration: 1.5,
                stagger: 0.3,
                ease: "power3.out",
                delay: 1.2
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
            {/* CLOSE BUTTON */}
            <button 
                onClick={onClose}
                className="fixed top-10 right-10 z-[210] group flex items-center gap-4 text-white mix-blend-difference"
            >
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-all">Back to Studio</span>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors backdrop-blur-md">
                    <X className="w-5 h-5" />
                </div>
            </button>

            <div className="w-full">
                {/* HERO WITH ZOOM EFFECT */}
                <div className="h-screen w-full relative overflow-hidden">
                    <img 
                        ref={heroImgRef}
                        src={encodeURI(project.path)} 
                        alt={project.title} 
                        className="w-full h-full object-cover" 
                    />
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

                {/* REST OF THE CONTENT (Already fixed in previous turns) */}
                <div className="border-y border-white/5 bg-white/[0.02] backdrop-blur-md sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-10 md:px-20 py-8 flex flex-wrap justify-between items-center gap-10">
                        <div className="flex gap-20">
                            <div>
                                <p className="text-[8px] font-mono text-white/30 uppercase mb-1">Programme</p>
                                <p className="text-xs font-bold uppercase">{project.type}</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-mono text-white/30 uppercase mb-1">Ann\u00e9e</p>
                                <p className="text-xs font-bold uppercase">{project.year}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            {project.specs.map((spec: string, i: number) => (
                                <span key={i} className="text-[9px] border border-white/10 px-3 py-1 rounded-full text-white/60 font-bold">
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
                                    <img 
                                        src={encodeURI(project.path)} 
                                        className="absolute inset-0 w-full h-full object-cover" 
                                        style={{ clipPath: `inset(0 \${100 - (50)}% 0 0)` }} // Default 50% for simplicity in this view
                                        alt="After" 
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="text-[15vw] font-black text-white/5 uppercase select-none">Comparison</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full py-20 px-4 md:px-10 cinematic-img">
                                    <img src={encodeURI(img)} className="w-full h-auto object-cover shadow-2xl group-hover:scale-[1.02] transition-transform duration-1000" alt={`Gallery \${i}`} />
                                    <div className="mt-4 flex justify-between items-center opacity-30 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[8px] font-mono uppercase tracking-widest font-bold">Image_Capture_\${i+1}.raw</span>
                                        <div className="h-[1px] flex-1 mx-10 bg-white/10"></div>
                                        <span className="text-[8px] font-mono uppercase font-bold">ArchiMade_Internal_Vault</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto px-10 md:px-20 py-40 text-center space-y-12">
                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic cinematic-text">Philosophie du projet</h3>
                    <p className="text-xl md:text-3xl font-light text-white/60 leading-relaxed cinematic-text">
                        Chaque projet est une r\u00e9ponse unique \u00e0 un contexte donn\u00e9. Pour {project.title}, nous avons cherch\u00e9 \u00e0 maximiser l'interaction entre les volumes et la lumi\u00e8re naturelle, tout en garantissant une fonctionnalit\u00e9 irr\u00e9prochable.
                    </p>
                </div>

                <div className="bg-white text-black py-40 px-10 md:px-20 flex flex-col md:flex-row justify-between items-center">
                    <div className="space-y-4">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] text-black/40">Suivant</span>
                        <h4 className="text-5xl md:text-8xl font-black uppercase tracking-tighter">Projet Suivant</h4>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-20 h-20 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all"
                    >
                        <ArrowUpRight className="w-8 h-8" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
"""

# Now I'll update the ArchiGallery click handler to use this transition.
# I'll need a state `isTransitioning` and a temporary project storage.

filepath = r'c:\ALTERNANCE\ArchiMade\src\components\ArchiMadeLanding.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# 1. Inject the transition component and update detail
content = re.sub(r'function ArchiProjectDetail\(.*?\}', new_gallery_code, content, flags=re.DOTALL)
# Wait, I used new_gallery_code but I should have used the ArchiProjectDetail code.
# I'll use a python script to do this more precisely.
