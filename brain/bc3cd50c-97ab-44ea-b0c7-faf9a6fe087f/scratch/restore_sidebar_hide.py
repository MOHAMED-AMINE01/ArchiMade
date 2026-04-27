
import os

filepath = r'c:\ALTERNANCE\ArchiMade\src\components\ArchiMadeLanding.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

service_logic = """    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top 10%",
                end: "bottom 20%",
                onEnter: () => gsap.to([".archi-sidebar", ".xl-hidden.fixed"], { autoAlpha: 0, duration: 0.2 }),
                onLeave: () => gsap.to([".archi-sidebar", ".xl-hidden.fixed"], { autoAlpha: 1, duration: 0.1 }),
                onEnterBack: () => gsap.to([".archi-sidebar", ".xl-hidden.fixed"], { autoAlpha: 0, duration: 0.2 }),
                onLeaveBack: () => gsap.to([".archi-sidebar", ".xl-hidden.fixed"], { autoAlpha: 1, duration: 0.1 }),
            });
        });
        return () => ctx.revert();
    }, []);
"""

# Find where ArchiServices starts
for i, line in enumerate(lines):
    if 'function ArchiServices()' in line:
        # Insert after the refs
        lines.insert(i + 7, service_logic + "\\n")
        break

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(lines)
print("Restored sidebar hiding in ArchiServices with faster reappear.")
