const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const mappings = {
  'inputs': ['button', 'button-group', 'input', 'input-group', 'input-otp', 'textarea', 'checkbox', 'radio-group', 'switch', 'slider', 'select', 'toggle', 'toggle-group', 'form', 'field', 'label'],
  'navigation': ['breadcrumb', 'navigation-menu', 'menubar', 'tabs', 'pagination'],
  'overlays': ['dialog', 'alert-dialog', 'sheet', 'drawer', 'popover', 'dropdown-menu', 'context-menu', 'command', 'hover-card', 'tooltip'],
  'feedback': ['alert', 'sonner', 'progress', 'spinner', 'skeleton', 'empty'],
  'data-display': ['table', 'card', 'badge', 'avatar', 'accordion', 'collapsible', 'carousel', 'chart', 'calendar'],
  'layout': ['aspect-ratio', 'separator', 'scroll-area', 'resizable', 'sidebar', 'item', 'kbd']
};

// First pass: replace individual component paths with their category path
function passOne(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && file !== 'ui' && file !== 'ui-new') {
      passOne(fullPath);
    } else if (stat.isFile() && (file.endsWith('.ts') || file.endsWith('.tsx'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      for (const [category, components] of Object.entries(mappings)) {
        for (const component of components) {
          const regexStr = `from ['"]@/components/ui/${component}['"]`;
          const regex = new RegExp(regexStr, 'g');
          if (regex.test(content)) {
            content = content.replace(regex, `from "@/components/ui/${category}"`);
            changed = true;
          }
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated paths in ${fullPath}`);
      }
    }
  }
}

// Second pass: consolidate multiple imports from the same category into a single import
function passTwo(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && file !== 'ui' && file !== 'ui-new') {
      passTwo(fullPath);
    } else if (stat.isFile() && (file.endsWith('.ts') || file.endsWith('.tsx'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      for (const category of Object.keys(mappings)) {
        const importRegexStr = `import\\s+\\{([^}]+)\\}\\s+from\\s+['"]@/components/ui/${category}['"]`;
        const categoryImportRegex = new RegExp(importRegexStr, 'g');
        
        const matches = [...content.matchAll(categoryImportRegex)];
        if (matches.length > 1) {
          let combinedImports = new Set();
          for (const match of matches) {
             const importsStr = match[1];
             importsStr.split(',').forEach(i => combinedImports.add(i.trim().replace(/\n/g, '')));
             content = content.replace(match[0], ''); // remove all instances
          }
          
          const validImports = Array.from(combinedImports).filter(i => i.trim() !== '');
          if (validImports.length > 0) {
             const newImport = `import { ${validImports.join(', ')} } from "@/components/ui/${category}"\n`;
             // Add to the top of the file
             content = newImport + content.replace(/^\s+/, '');
          }
        }
      }

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Consolidated imports in ${fullPath}`);
      }
    }
  }
}

console.log("Running Pass 1...");
passOne(srcDir);
console.log("Running Pass 2...");
passTwo(srcDir);
console.log("Done.");
