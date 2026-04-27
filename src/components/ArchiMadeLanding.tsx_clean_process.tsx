// 4. PROCESS / METHOD SECTION (MÉTHODES)
function ArchiProcess() {
    const sectionRef = useRef(null);
    const steps = [
        { title: "Analyse du besoin", phase: "PHASE 01", desc: "Audit initial et définition des objectifs de votre projet. Analyse des contraintes et du cahier des charges." },
        { title: "Étude du projet", phase: "PHASE 02", desc: "Analyse de faisabilité technique et réglementaire (PLU). Esquisses préliminaires et validation du concept." },
        { title: "Production", phase: "PHASE 03", desc: "Élaboration des plans techniques détaillés et modélisations 3D haute fidélité pour validation finale." },
        { title: "Constitution", phase: "PHASE 04", desc: "Montage du dossier administratif complet (PC, DP) conforme aux normes en vigueur et dépôt." },
        { title: "Accompagnement", phase: "PHASE 05", desc: "Suivi rigoureux jusqu'à la finalisation et validation de votre dossier par les autorités compétentes." },
    ];

    return (
        <section id="méthodes" ref={sectionRef} className="relative py-32 md:py-60 bg-[#0a0a0a] overflow-hidden font-display">
            {/* TECHNICAL GRID BACKGROUND */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}></div>
            
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

            <div className="w-full relative z-10 xl:pl-[25vw] px-6 md:px-10 md:pr-20">
                {/* HEADER */}
                <div className="flex flex-col mb-20 md:mb-40">
                    <ArchiReveal type="fade">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-8 h-[1px] bg-white/20"></div>
                            <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.5em]">Architecture du Projet</span>
                        </div>
                    </ArchiReveal>
                    
                    <h2 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white uppercase leading-none">
                        <ArchiReveal type="up" delay={0.1}>
                            Notre <span className="italic font-light text-white/30">Méthode</span>
                        </ArchiReveal>
                    </h2>
                </div>

                {/* STEPS GRID */}
                <div className="relative">
                    {/* Vertical line for mobile/tablet progress vibe */}
                    <div className="absolute left-6 md:left-10 top-0 bottom-0 w-[1px] bg-white/5 hidden sm:block"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-16 md:gap-y-32">
                        {steps.map((step, i) => (
                            <div key={i} className="relative group pl-12 md:pl-24 lg:pl-0">
                                <ArchiReveal type="fade" delay={0.2 + i * 0.1}>
                                    <div className="relative">
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="text-white font-mono text-[10px] tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/10 uppercase">
                                                {step.phase}
                                            </span>
                                            <div className="h-[1px] flex-1 bg-white/10 group-hover:bg-white/30 transition-colors"></div>
                                            <span className="text-white/20 font-mono text-xs">0{i + 1}</span>
                                        </div>

                                        <div className="space-y-6">
                                            <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter group-hover:italic transition-all duration-500">
                                                {step.title}
                                            </h4>
                                            
                                            <p className="text-sm md:text-base lg:text-lg text-white/40 font-light leading-relaxed max-w-md group-hover:text-white/60 transition-colors">
                                                {step.desc}
                                            </p>
                                        </div>

                                        <span className="absolute -left-8 md:-left-12 lg:-left-20 -top-6 text-[100px] md:text-[150px] font-black text-white/[0.02] pointer-events-none group-hover:text-white/[0.05] transition-colors leading-none">
                                            {i + 1}
                                        </span>
                                    </div>
                                </ArchiReveal>
                            </div>
                        ))}
                    </div>
                </div>

                {/* BOTTOM METADATA */}
                <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-30">
                    <div className="flex gap-10">
                        <div className="space-y-1">
                            <p className="text-[8px] font-mono uppercase text-white">System_Status</p>
                            <p className="text-[10px] font-black uppercase text-white">Operational</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[8px] font-mono uppercase text-white">Workflow_Standard</p>
                            <p className="text-[10px] font-black uppercase text-white">ISO_ARCHI_2024</p>
                        </div>
                    </div>
                    <p className="text-[10px] font-mono uppercase text-white">© 2024 ArchiMade Methodology</p>
                </div>
            </div>
        </section>
    );
}

// 5. PROJECTS / VISUAL GALLERY (STICKY HORIZONTAL SCROLL - STABLE & FAST)
// 5. PROJECTS / VISUAL GALLERY (HORIZONTAL SCROLL - TRANSFORM PIN)
