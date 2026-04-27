
import os

filepath = r'c:\ALTERNANCE\ArchiMade\src\components\ArchiMadeLanding.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Add import if missing
if 'framer-motion' not in lines[1]:
    lines.insert(1, 'import { motion, AnimatePresence } from "framer-motion";\\n')

new_component = """
// --- PROJECT DETAIL OVERLAY (CINEMATIC STACK VERSION) ---
function ArchiProjectDetail({ project, onClose }: { project: any, onClose: () => void }) {
    const overlayRef = useRef(null);
    const [localSliderPos, setLocalSliderPos] = useState(50);

    useLayoutEffect(() => {
        if (!project) return;
        if ((window as any).lenis) (window as any).lenis.stop();
        document.body.style.overflow = 'hidden';

        const ctx = gsap.context(() => {
            gsap.from(".cinematic-img", {
                opacity: 0,
                y: 50,
                duration: 1.2,
                stagger: 0.3,
                ease: "power3.out"
            });
            gsap.from(".cinematic-text", {
                opacity: 0,
                x: -30,
                duration: 1,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.5
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
                className="fixed top-10 right-10 z-[210] group flex items-center gap-4 text-white"
            >
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-all">Close Project</span>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                    <X className="w-5 h-5" />
                </div>
            </button>

            <div className="w-full">
                {/* CINEMATIC HERO */}
                <div className="h-screen w-full relative overflow-hidden">
                    <img src={project.path} alt={project.title} className="w-full h-full object-cover scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
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

                {/* PROJECT SPECS BAR */}
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
                                <span key={i} className="text-[9px] border border-white/10 px-3 py-1 rounded-full text-white/60">
                                    {spec}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* THE FAMILY STACK (All images from the folder) */}
                <div className="py-20 space-y-0">
                    {project.gallery && project.gallery.map((img: string, i: number) => (
                        <div key={i} className="relative w-full group overflow-hidden">
                            {/* Special handling for Before/After if we have two images and it's a rehab */}
                            {i === 0 && project.pathBefore && (
                                <div className="h-[80vh] md:h-screen w-full relative cinematic-img">
                                    <img src={project.pathBefore} className="absolute inset-0 w-full h-full object-cover brightness-50" alt="Before" />
                                    <img 
                                        src={project.path} 
                                        className="absolute inset-0 w-full h-full object-cover" 
                                        style={{ clipPath: `inset(0 ${100 - localSliderPos}% 0 0)` }}
                                        alt="After" 
                                    />
                                    <input 
                                        type="range" min="0" max="100" value={localSliderPos}
                                        onChange={(e) => setLocalSliderPos(parseInt(e.target.value))}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="text-[15vw] font-black text-white/5 uppercase select-none">Comparison</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full py-10 px-4 md:px-10 cinematic-img">
                                    <img src={img} className="w-full h-auto object-cover shadow-2xl group-hover:scale-[1.02] transition-transform duration-1000" alt={`Gallery ${i}`} />
                                    <div className="mt-4 flex justify-between items-center opacity-30 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[8px] font-mono uppercase tracking-widest">Image_Capture_{i+1}.raw</span>
                                        <div className="h-[1px] flex-1 mx-10 bg-white/10"></div>
                                        <span className="text-[8px] font-mono uppercase">ArchiMade_Internal_Vault</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* FINAL VISION DESCRIPTION */}
                <div className="max-w-4xl mx-auto px-10 md:px-20 py-40 text-center space-y-12">
                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic cinematic-text">Philosophie du projet</h3>
                    <p className="text-xl md:text-3xl font-light text-white/60 leading-relaxed cinematic-text">
                        Chaque projet est une r\u00e9ponse unique \u00e0 un contexte donn\u00e9. Pour {project.title}, nous avons cherch\u00e9 \u00e0 maximiser l'interaction entre les volumes et la lumi\u00e8re naturelle, tout en garantissant une fonctionnalit\u00e9 irr\u00e9prochable.
                    </p>
                </div>

                {/* NEXT PROJECT SUGGESTION */}
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

start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if '// --- PROJECT DETAIL OVERLAY' in line:
        start_idx = i
    if 'function ArchiGallery' in line:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    new_lines = lines[:start_idx] + [new_component + "\\n"] + lines[end_idx:]
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("Successfully implemented Cinematic Stack with project family grouping.")
else:
    print(f"Error finding indices: start={start_idx}, end={end_idx}")
