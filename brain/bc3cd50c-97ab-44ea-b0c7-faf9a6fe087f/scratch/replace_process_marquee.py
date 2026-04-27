
import os

filepath = r'c:\ALTERNANCE\ArchiMade\src\components\ArchiMadeLanding.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_component = """// 4. PROCESS / METHOD SECTION (MÉTHODES) - DUAL INFINITE MARQUEE
function ArchiProcess() {
    const marquee1Ref = useRef(null);
    const marquee2Ref = useRef(null);

    const stepsRow1 = [
        { title: "Analyse du besoin", phase: "01", category: "AUDIT", desc: "Audit initial et définition des objectifs." },
        { title: "Production", phase: "03", category: "PRODUCTION", desc: "Plans techniques et modélisations 3D." },
        { title: "Accompagnement", phase: "05", category: "LIVRAISON", desc: "Suivi jusqu'à la finalisation." },
    ];

    const stepsRow2 = [
        { title: "Étude du projet", phase: "02", category: "CONCEPT", desc: "Analyse de faisabilité et PLU." },
        { title: "Constitution", phase: "04", category: "DOSSIER", desc: "Montage du dossier administratif." },
        { title: "Validation", phase: "06", category: "CONFORMITÉ", desc: "Vérification des normes techniques." },
    ];

    // Helper to duplicate steps for infinite effect
    const infiniteRow1 = [...stepsRow1, ...stepsRow1, ...stepsRow1];
    const infiniteRow2 = [...stepsRow2, ...stepsRow2, ...stepsRow2];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Row 1: Left to Right
            gsap.to(marquee1Ref.current, {
                xPercent: -33.33,
                ease: "none",
                duration: 30,
                repeat: -1,
            });

            // Row 2: Right to Left
            gsap.set(marquee2Ref.current, { xPercent: -33.33 });
            gsap.to(marquee2Ref.current, {
                xPercent: 0,
                ease: "none",
                duration: 35,
                repeat: -1,
            });
        });
        return () => ctx.revert();
    }, []);

    const StepCard = ({ step, i }: { step: any, i: number }) => (
        <div className="w-[300px] md:w-[450px] shrink-0 px-4 group">
            <div className="relative p-8 md:p-12 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden">
                <div className="absolute -right-4 -bottom-4 text-8xl font-black text-white/[0.03] select-none group-hover:text-white/[0.06] transition-colors leading-none italic">
                    {step.phase}
                </div>
                
                <div className="space-y-6 relative z-10">
                    <div className="flex items-center gap-4">
                        <span className="text-[9px] font-mono text-white/40 tracking-[0.3em] uppercase bg-white/5 px-3 py-1 rounded-full">
                            {step.category}
                        </span>
                        <div className="h-[1px] w-8 bg-white/20"></div>
                    </div>

                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none group-hover:translate-x-2 transition-transform duration-500">
                        {step.title}
                    </h3>

                    <p className="text-sm md:text-base text-white/40 font-light leading-relaxed max-w-[280px]">
                        {step.desc}
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <section id="méthodes" className="relative py-24 md:py-40 bg-[#0a0a0a] overflow-hidden font-display z-10">
            {/* Background Text Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none opacity-[0.02] select-none">
                <h2 className="text-[25vw] font-black text-white uppercase leading-none tracking-tighter">PROCESS</h2>
            </div>

            {/* Header */}
            <div className="relative z-10 xl:pl-[25vw] px-10 mb-16 md:mb-24">
                <ArchiReveal type="fade">
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] text-white/30 font-bold uppercase tracking-[0.8em]">Flux Opérationnel</span>
                        <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter italic">Méthode</h2>
                    </div>
                </ArchiReveal>
            </div>

            {/* Marquee Rows */}
            <div className="space-y-8 md:space-y-12 relative z-10">
                {/* ROW 1 */}
                <div className="relative flex overflow-hidden">
                    <div ref={marquee1Ref} className="flex whitespace-nowrap">
                        {infiniteRow1.map((step, i) => (
                            <StepCard key={i} step={step} i={i} />
                        ))}
                    </div>
                </div>

                {/* ROW 2 */}
                <div className="relative flex overflow-hidden">
                    <div ref={marquee2Ref} className="flex whitespace-nowrap">
                        {infiniteRow2.map((step, i) => (
                            <StepCard key={i} step={step} i={i} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Technical grid backdrop */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}></div>
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
    print("Successfully updated ArchiProcess component to Dual Marquee.")
else:
    print(f"Error: Could not find markers. start_idx={start_idx}, end_idx={end_idx}")
