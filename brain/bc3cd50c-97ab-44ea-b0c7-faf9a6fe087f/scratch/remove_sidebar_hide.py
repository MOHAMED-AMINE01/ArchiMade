
import os

filepath = r'c:\ALTERNANCE\ArchiMade\src\components\ArchiMadeLanding.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if 'useLayoutEffect(() => {' in line and 'ScrollTrigger.create({' in lines[i+2]:
        start_idx = i
    if 'return () => ctx.revert();' in line and i > start_idx and start_idx != -1:
        end_idx = i + 2
        break

if start_idx != -1 and end_idx != -1:
    new_lines = lines[:start_idx] + lines[end_idx:]
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("Successfully removed sidebar hiding logic in ArchiServices.")
else:
    print(f"Error finding indices: start={start_idx}, end={end_idx}")
