const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'ui');
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.endsWith('.tsx')) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Remove all existing "use client" directives
    content = content.replace(/["']use client["'];?\s*/g, '');
    
    // Add one at the top
    content = '"use client";\n\n' + content;
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Fixed "use client" in ${file}`);
  }
}
