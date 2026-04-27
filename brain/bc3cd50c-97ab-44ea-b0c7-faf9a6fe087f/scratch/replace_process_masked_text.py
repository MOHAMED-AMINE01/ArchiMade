
import os

filepath = r'c:\ALTERNANCE\ArchiMade\src\components\ArchiMadeLanding.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_component = """// 4. PROCESS / METHOD SECTION (MÉTHODES) - DUAL RAW TEXT MARQUEE
function ArchiProcess() {
    const marquee1Ref = useRef(null);
    const marquee2Ref = useRef(null);

    const stepsRow1 = [
        { title: "Analyse du besoin", phase: "01" },
        { title: "Production", phase: "03" },
        { title: "Accompagnement", phase: "05" },
    ];

    const stepsRow2 = [
        { title: "Étude du projet", phase: "02" },
        { title: "Constitution", phase: "04" },
        { title: "Validation", phase: "06" },
    ];

    const infiniteRow1 = [...stepsRow1, ...stepsRow1, ...stepsRow1, ...stepsRow1];
    const infiniteRow2 = [...stepsRow2, ...stepsRow2, ...stepsRow2, ...stepsRow2];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(marquee1Ref.current, {
                xPercent: -25,
                ease: "none",
                duration: 25,
                repeat: -1,
            });

            gsap.set(marquee2Ref.current, { xPercent: -25 });
            gsap.to(marquee2Ref.current, {
                xPercent: 0,
                ease: "none",
                duration: 30,
                repeat: -1,
            });
        });
        return () => ctx.revert();
    }, []);

    const TextItem = ({ step }: { step: any }) => (
        <div className="flex items-center gap-12 md:gap-24 px-12 md:px-24">
            <span className="text-[10px] md:text-xs font-mono text-white/20 tracking-[0.5em] uppercase translate-y-[-100%]">
                Phase_{step.phase}
            </span>
            <h3 className="text-6xl md:text-[10vw] font-black text-white uppercase tracking-tighter leading-none hover:italic hover:text-white/60 transition-all duration-500 cursor-default">
                {step.title}
            </h3>
        </div>
    );

    return (
        <section id="méthodes" className="relative py-24 md:py-48 bg-[#0a0a0a] overflow-hidden font-display">
            {/* Header / Intro */}
            <div className="relative z-10 xl:pl-[25vw] px-10 mb-20">
                <ArchiReveal type="fade">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-8 h-[1px] bg-white/20"></div>
                        <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.8em]">Workflow</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">Méthode</h2>
                </ArchiReveal>
            </div>

            {/* Marquee Container with Masking */}
            <div className="xl:ml-[25vw] relative overflow-hidden">
                {/* Gradient Fade Edges */}
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent z-20 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent z-20 pointer-events-none"></div>

                <div className="space-y-4 md:space-y-8">
                    {/* ROW 1 */}
                    <div className="relative flex overflow-hidden">
                        <div ref={marquee1Ref} className="flex whitespace-nowrap py-4">
                            {infiniteRow1.map((step, i) => (
                                <TextItem key={i} step={step} />
                            ))}
                        </div>
                    </div>

                    {/* ROW 2 */}
                    <div className="relative flex overflow-hidden">
                        <div ref={marquee2Ref} className="flex whitespace-nowrap py-4">
                            {infiniteRow2.map((step, i) => (
                                <TextItem key={i} step={step} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none select-none">
                <div className="flex flex-col items-center justify-center h-full text-[30vw] font-black text-white leading-none">
                    <span>ARCHI</span>
                    <span>MADE</span>
                </div>
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
    print("Successfully updated ArchiProcess to Masked Raw Text Marquee.")
else:
    print(f"Error: Could not find markers.")
