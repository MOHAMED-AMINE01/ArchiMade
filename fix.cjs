const fs = require('fs');
let content = fs.readFileSync('src/components/ArchiMadeLanding.tsx', 'utf8');

const replacements = [
  { pattern: /w-\[1px\]/g, replacement: 'w-px' },
  { pattern: /h-\[1px\]/g, replacement: 'h-px' },
  { pattern: /h-\[2px\]/g, replacement: 'h-0.5' },
  { pattern: /border-\[1px\]/g, replacement: 'border' },
  { pattern: /\[#0a0a0a\]/g, replacement: 'brand-dark' },
  { pattern: /z-\[(\d+)\]/g, replacement: 'z-$1' },
  { pattern: /duration-\[(\d+)ms\]/g, replacement: 'duration-$1' },
  { pattern: /decoration-white\/100/g, replacement: 'decoration-white' },
  { pattern: /w-\[200px\]/g, replacement: 'w-50' },
  { pattern: /w-\[350px\]/g, replacement: 'w-87.5' },
  { pattern: /leading-\[1\.5\]/g, replacement: 'leading-normal' },
  { pattern: /leading-\[2\]/g, replacement: 'leading-loose' },
  { pattern: /min-h-\[400px\]/g, replacement: 'min-h-100' },
  { pattern: /min-h-\[750px\]/g, replacement: 'min-h-187.5' },
  { pattern: /min-h-\[600px\]/g, replacement: 'min-h-150' },
  { pattern: /-left-\[(\d+)%\]/g, replacement: 'left-[-$1%]' },
  { pattern: /-top-\[(\d+)%\]/g, replacement: 'top-[-$1%]' },
  { pattern: /-bottom-\[(\d+)%\]/g, replacement: 'bottom-[-$1%]' },
  { pattern: /-right-\[(\d+)%\]/g, replacement: 'right-[-$1%]' },
  { pattern: /border-\[(\d+)px\]/g, replacement: 'border-$1' },
  { pattern: /bg-gradient-to-([trbl])/g, replacement: 'bg-linear-to-$1' },
];

replacements.forEach(({pattern, replacement}) => {
  content = content.replace(pattern, replacement);
});

fs.writeFileSync('src/components/ArchiMadeLanding.tsx', content, 'utf8');
console.log('Done!');
