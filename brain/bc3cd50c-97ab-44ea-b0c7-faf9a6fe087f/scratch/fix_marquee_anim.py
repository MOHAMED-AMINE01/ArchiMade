
import os

filepath = r'c:\ALTERNANCE\ArchiMade\src\components\ArchiMadeLanding.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_logic = """    useLayoutEffect(() => {
        const m1 = marquee1Ref.current;
        const m2 = marquee2Ref.current;
        if (!m1 || !m2) return;

        const anim1 = gsap.to(m1, {
            xPercent: -25,
            ease: "none",
            duration: 30,
            repeat: -1,
        });

        gsap.set(m2, { xPercent: -25 });
        const anim2 = gsap.to(m2, {
            xPercent: 0,
            ease: "none",
            duration: 35,
            repeat: -1,
        });

        return () => {
            anim1.kill();
            anim2.kill();
        };
    }, []);
"""

start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if 'useLayoutEffect(() => {' in line and 'marquee1Ref.current' in lines[i+2]:
        start_idx = i
    if 'return () => ctx.revert();' in line and i > start_idx and start_idx != -1:
        end_idx = i + 2
        break

if start_idx != -1 and end_idx != -1:
    new_lines = lines[:start_idx] + [new_logic] + lines[end_idx:]
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("Successfully fixed marquee animation logic.")
else:
    # Fallback search
    print(f"Error finding indices: start={start_idx}, end={end_idx}")
