
with open(r'c:\ALTERNANCE\ArchiMade\src\components\ArchiMadeLanding.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Remove lines from 1475 to 1500 (indices 1474 to 1499)
new_lines = lines[:1474] + lines[1500:]

with open(r'c:\ALTERNANCE\ArchiMade\src\components\ArchiMadeLanding.tsx', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
