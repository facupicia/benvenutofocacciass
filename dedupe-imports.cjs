const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'ui');
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.endsWith('.tsx')) {
    const fullPath = path.join(dir, file);
    let lines = fs.readFileSync(fullPath, 'utf8').split('\n');
    let seen = new Set();
    let newLines = [];
    
    for (let line of lines) {
      if (line.trim().startsWith('import ')) {
        let normalizedLine = line.trim();
        if (!seen.has(normalizedLine)) {
          seen.add(normalizedLine);
          newLines.push(line);
        }
      } else {
        newLines.push(line);
      }
    }
    
    fs.writeFileSync(fullPath, newLines.join('\n'), 'utf8');
    console.log(`Fixed duplicates in ${file}`);
  }
}
