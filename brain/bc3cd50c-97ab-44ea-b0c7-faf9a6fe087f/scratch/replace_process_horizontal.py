
import os

filepath = r'c:\ALTERNANCE\ArchiMade\src\components\ArchiMadeLanding.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_component = """// 4. PROCESS / METHOD SECTION (MÉTHODES) - HORIZONTAL PINNED VERSION
function ArchiProcess() {
    const sectionRef = useRef(null);
    const scrollRef = useRef(null);
    const steps = [
        { title: "Analyse du besoin", phase: "01", category: "AUDIT", desc: "Audit initial et définition des objectifs de votre projet. Analyse des contraintes et du cahier des charges." },
        { title: "Étude du projet", phase: "02", category: "CONCEPT", desc: "Analyse de faisabilité technique et réglementaire (PLU). Esquisses préliminaires et validation du concept." },
        { title: "Production", phase: "03", category: "PRODUCTION", desc: "Élaboration des plans techniques détaillés et modélisations 3D haute fidélité pour validation finale." },
        { title: "Constitution", phase: "04", category: "DOSSIER", desc: "Montage du dossier administratif complet (PC, DP) conforme aux normes en vigueur et dépôt." },
        { title: "Accompagnement", phase: "05", category: "LIVRAISON", desc: "Suivi rigoureux jusqu'à la finalisation et validation de votre dossier par les autorités compétentes." },
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (window.innerWidth >= 1024) {
                const scrollWidth = scrollRef.current.scrollWidth;
                const windowWidth = window.innerWidth;
                const scrollDistance = scrollWidth - windowWidth;

                gsap.to(scrollRef.current, {
                    x: -scrollDistance,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        pin: true,
                        pinType: "transform",
                        scrub: 1,
                        start: "top top",
                        end: () => `+=${scrollDistance}`,
                        invalidateOnRefresh: true,
                    }
                });

                // Progress bar animation
                gsap.fromTo(".process-progress-bar", 
                    { width: "0%" },
                    { 
                        width: "100%", 
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top top",
                            end: () => `+=${scrollDistance}`,
                            scrub: 1
                        }
                    }
                );
            }
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="méthodes" ref={sectionRef} className="relative bg-[#0a0a0a] overflow-hidden font-display">
            {/* Desktop Horizontal Wrapper */}
            <div className="hidden lg:block h-screen w-full relative">
                {/* Fixed Progress HUD */}
                <div className="absolute top-12 left-12 md:left-[25vw] right-12 z-50 flex justify-between items-end">
                    <div className="space-y-4">
                        <span className="text-[10px] text-white/30 font-bold uppercase tracking-[0.6em] block">Architecture du Workflow</span>
                        <h2 className="text-6xl font-bold text-white tracking-tighter uppercase italic">Méthode</h2>
                    </div>
                    <div className="w-64 space-y-2">
                        <div className="flex justify-between text-[8px] font-mono text-white/40 uppercase tracking-widest">
                            <span>Progress</span>
                            <span>Workflow_v1.0</span>
                        </div>
                        <div className="h-[1px] w-full bg-white/10 relative">
                            <div className="process-progress-bar absolute top-0 left-0 h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                        </div>
                    </div>
                </div>

                <div ref={scrollRef} className="flex h-full items-center px-[25vw]">
                    {steps.map((step, i) => (
                        <div key={i} className="w-[50vw] shrink-0 pr-40 relative group">
                            <div className="relative">
                                {/* Decorative elements */}
                                <span className="absolute -top-32 -left-20 text-[20vw] font-black text-white/[0.02] leading-none select-none group-hover:text-white/[0.04] transition-colors">
                                    0{i + 1}
                                </span>
                                
                                <div className="space-y-8 relative z-10">
                                    <div className="flex items-center gap-6">
                                        <div className="px-4 py-1 border border-white/20 rounded-full text-[10px] font-mono text-white/60 tracking-widest uppercase">
                                            {step.category}
                                        </div>
                                        <div className="w-12 h-[1px] bg-white/20"></div>
                                    </div>

                                    <h3 className="text-7xl xl:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] group-hover:italic transition-all duration-700">
                                        {step.title}
                                    </h3>

                                    <p className="text-xl text-white/40 font-light leading-relaxed max-w-md group-hover:text-white/70 transition-colors">
                                        {step.desc}
                                    </p>
                                </div>

                                {/* Technical details decoration */}
                                <div className="mt-12 grid grid-cols-2 gap-8 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                                    <div className="border-l border-white/50 pl-4 space-y-1">
                                        <p className="text-[8px] font-mono text-white uppercase">PHASE_ID</p>
                                        <p className="text-[10px] font-bold text-white uppercase">{step.phase}_ARCHI</p>
                                    </div>
                                    <div className="border-l border-white/50 pl-4 space-y-1">
                                        <p className="text-[8px] font-mono text-white uppercase">STATUS</p>
                                        <p className="text-[10px] font-bold text-white uppercase">VALIDATED</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Extra space at the end */}
                    <div className="w-[20vw] shrink-0"></div>
                </div>

                {/* Background Grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '100px 100px'
                    }}></div>
            </div>

            {/* Mobile/Tablet Vertical Wrapper */}
            <div className="lg:hidden py-32 px-6 sm:px-10 space-y-24">
                <div className="space-y-4 mb-20">
                    <span className="text-[10px] text-white/30 font-bold uppercase tracking-[0.6em] block">Architecture du Workflow</span>
                    <h2 className="text-5xl font-bold text-white tracking-tighter uppercase italic">Méthode</h2>
                </div>

                {steps.map((step, i) => (
                    <ArchiReveal key={i} type="fade">
                        <div className="relative border-l border-white/10 pl-8 space-y-6">
                            <div className="absolute -left-[1.5px] top-0 w-[3px] h-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                            
                            <div className="flex items-center gap-4">
                                <span className="text-white/20 font-mono text-xs">0{i + 1}</span>
                                <span className="text-[10px] font-mono text-white/60 tracking-widest uppercase bg-white/5 px-2 py-0.5 rounded border border-white/10">
                                    {step.category}
                                </span>
                            </div>

                            <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
                                {step.title}
                            </h3>

                            <p className="text-sm text-white/40 font-light leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    </ArchiReveal>
                ))}
            </div>
        </section>
    );
}
"""

start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if '// 4. PROCESS / METHOD SECTION' in line:
        start_idx = i
    if 'function ArchiGallery' in line:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    new_lines = lines[:start_idx] + [new_component + "\\n"] + lines[end_idx:]
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("Successfully updated ArchiProcess component.")
else:
    print(f"Error: Could not find start/end markers. start_idx={start_idx}, end_idx={end_idx}")
