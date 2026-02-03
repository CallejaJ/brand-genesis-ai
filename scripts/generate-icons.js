const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '../node_modules/lucide-react/dist/esm/icons');
const OUTPUT_FILE = path.join(__dirname, '../lib/icons.ts');

const files = fs.readdirSync(ICONS_DIR).filter(file => file.endsWith('.js'));

let output = `// Auto-generated icons from lucide-react
export const lucidePaths: Record<string, string> = {
`;

let count = 0;

files.forEach(file => {
  const content = fs.readFileSync(path.join(ICONS_DIR, file), 'utf8');
  const iconName = file.replace('.js', '');

  // Extract the array of elements
  const match = content.match(/createLucideIcon\("[^"]+",\s*(\[[\s\S]*?\])\);/);
  if (match) {
    const elementsArrayStr = match[1];
    
    // Naive parsing of the array string to find individual elements
    // Elements look like: ["tag", { key: "val", d: "..." }]
    // We want to reconstruct SVG strings.
    
    let svgContent = '';
    
    // Regex to find each element: ["tag", { ... }]
    const elementRegex = /\[\s*"([a-z]+)"\s*,\s*(\{[\s\S]*?\})\s*\]/g;
    let elementMatch;
    
    while ((elementMatch = elementRegex.exec(elementsArrayStr)) !== null) {
      const tag = elementMatch[1];
      const attrsStr = elementMatch[2];
      
      let attrs = '';
      const attrRegex = /([a-zA-Z0-9-]+):\s*"([^"]+)"/g;
      let attrMatch;
      
      while ((attrMatch = attrRegex.exec(attrsStr)) !== null) {
        const key = attrMatch[1];
        const val = attrMatch[2];
        if (key !== 'key') { // Skip 'key' prop
            attrs += ` ${key}="${val}"`;
        }
      }
      
      // Handle self-closing tags for common SVG elements
      svgContent += `<${tag}${attrs}/>`;
    }

    if (svgContent) {
        output += `  "${iconName}": '${svgContent}',\n`;
        count++;
    }
  }
});

output += `};

export const getLucideIconPath = (iconName: string) => {
  return lucidePaths[iconName] || lucidePaths.star;
};
`;

fs.writeFileSync(OUTPUT_FILE, output);
console.log(`Generated ${count} icons in ${OUTPUT_FILE}`);
