const fs = require('fs');
let content = fs.readFileSync('src/components/ArchiMadeLanding.tsx', 'utf8');

const replacements = [
  { pattern: /w-\[100vw\]/g, replacement: 'w-screen' },
  { pattern: /border-black\/\[0\.05\]/g, replacement: 'border-black/5' },
  { pattern: /lg:w-\[500px\]/g, replacement: 'lg:w-125' },
  { pattern: /xl:w-\[580px\]/g, replacement: 'xl:w-145' },
  { pattern: /rounded-\[2rem\]/g, replacement: 'rounded-4xl' },
  { pattern: /xl:right-\[-60px\]/g, replacement: 'xl:-right-15' },
  { pattern: /xl:rotate-\[-90deg\]/g, replacement: 'xl:-rotate-90' },
  { pattern: /\[&>\*\]:pointer-events-auto/g, replacement: '*:pointer-events-auto' }
];

replacements.forEach(({pattern, replacement}) => {
  content = content.replace(pattern, replacement);
});

fs.writeFileSync('src/components/ArchiMadeLanding.tsx', content, 'utf8');
console.log('Done!');