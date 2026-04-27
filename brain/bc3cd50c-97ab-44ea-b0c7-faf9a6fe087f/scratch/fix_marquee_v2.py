
import os

filepath = r'c:\ALTERNANCE\ArchiMade\src\components\ArchiMadeLanding.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_logic = """    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const m1 = marquee1Ref.current;
            const m2 = marquee2Ref.current;
            if (!m1 || !m2) return;

            // Clear any existing animations
            gsap.killTweensOf([m1, m2]);

            // Row 1: Left to Right movement (simulated by xPercent)
            gsap.to(m1, {
                xPercent: -25,
                ease: "none",
                duration: 30,
                repeat: -1,
            });

            // Row 2: Right to Left movement
            gsap.set(m2, { xPercent: -25 });
            gsap.to(m2, {
                xPercent: 0,
                ease: "none",
                duration: 35,
                repeat: -1,
            });
        });
        
        return () => ctx.revert();
    }, []);
"""

start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if 'useLayoutEffect(() => {' in line and 'marquee1Ref.current' in lines[i+2]:
        start_idx = i
    if 'return () => {' in line and 'anim1.kill()' in lines[i+1]:
        end_idx = i + 4
        break

if start_idx != -1 and end_idx != -1:
    new_lines = lines[:start_idx] + [new_logic] + lines[end_idx:]
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("Successfully fixed marquee animation logic with GSAP context.")
else:
    print(f"Error finding indices: start={start_idx}, end={end_idx}")
