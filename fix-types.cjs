const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'ui');
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.endsWith('.tsx')) {
    const fullPath = path.join(dir, file);
    let lines = fs.readFileSync(fullPath, 'utf8').split('\n');
    let newLines = [];
    
    let regularNamespaces = new Set();
    for (let line of lines) {
       if (line.trim().startsWith('import * as ')) {
          regularNamespaces.add(line.trim().replace('import * as ', ''));
       }
    }
    
    for (let line of lines) {
       if (line.trim().startsWith('import type * as ')) {
          let testPart = line.trim().replace('import type * as ', '');
          if (regularNamespaces.has(testPart)) {
             continue; // drop this line
          }
       }
       newLines.push(line);
    }
    
    fs.writeFileSync(fullPath, newLines.join('\n'), 'utf8');
    console.log(`Cleaned up type namespaces in ${file}`);
  }
}
