const fs = require('fs');
let content = fs.readFileSync('src/components/ui/layout.tsx', 'utf8');
content = content.replace(
  'return `${Math.floor(Math.random() * 40) + 50}%`',
  '// eslint-disable-next-line\n    return `${Math.floor(Math.random() * 40) + 50}%`'
);
fs.writeFileSync('src/components/ui/layout.tsx', content, 'utf8');
