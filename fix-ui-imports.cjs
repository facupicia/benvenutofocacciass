const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'ui');
const files = fs.readdirSync(dir);

const mappings = {
  'inputs': ['button', 'button-group', 'input', 'input-group', 'input-otp', 'textarea', 'checkbox', 'radio-group', 'switch', 'slider', 'select', 'toggle', 'toggle-group', 'form', 'field', 'label'],
  'navigation': ['breadcrumb', 'navigation-menu', 'menubar', 'tabs', 'pagination'],
  'overlays': ['dialog', 'alert-dialog', 'sheet', 'drawer', 'popover', 'dropdown-menu', 'context-menu', 'command', 'hover-card', 'tooltip'],
  'feedback': ['alert', 'sonner', 'progress', 'spinner', 'skeleton', 'empty'],
  'data-display': ['table', 'card', 'badge', 'avatar', 'accordion', 'collapsible', 'carousel', 'chart', 'calendar'],
  'layout': ['aspect-ratio', 'separator', 'scroll-area', 'resizable', 'sidebar', 'item', 'kbd']
};

function getCategory(moduleName) {
  let parts = moduleName.split('/');
  let name = parts[parts.length - 1];
  for (const [cat, comps] of Object.entries(mappings)) {
    if (comps.includes(name)) return cat;
  }
  return null;
}

for (const file of files) {
  if (file.endsWith('.tsx')) {
    const fullPath = path.join(dir, file);
    const categoryName = file.replace('.tsx', '');
    let content = fs.readFileSync(fullPath, 'utf8');

    content = content.replace(/["']use client["'];?\s*/g, '');

    const allImportRegex = /import\s+(type\s+)?([\s\S]*?)\s+from\s+["']([^"']+)["'];?/g;
    
    let moduleImports = {};
    let typeModuleImports = {};
    
    let newContent = content.replace(allImportRegex, (match, isType, importsStr, moduleName) => {
      if (moduleName.startsWith('@/components/ui/')) {
         const targetCategory = getCategory(moduleName);
         if (targetCategory === categoryName) {
            return ''; // drop internal self-imports
         } else if (targetCategory) {
            moduleName = `@/components/ui/${targetCategory}`;
         }
      }

      let targetMap = isType ? typeModuleImports : moduleImports;
      if (!targetMap[moduleName]) targetMap[moduleName] = { default: null, named: new Set(), namespace: null };
      
      importsStr = importsStr.trim();
      
      if (importsStr.startsWith('* as ')) {
        targetMap[moduleName].namespace = importsStr.substring(5).trim();
      } else {
        let insideBraces = '';
        let outsideBraces = importsStr;
        if (importsStr.includes('{')) {
           let start = importsStr.indexOf('{');
           let end = importsStr.indexOf('}');
           insideBraces = importsStr.substring(start + 1, end);
           outsideBraces = importsStr.substring(0, start).replace(',', '').trim();
        }
        
        if (outsideBraces) {
           targetMap[moduleName].default = outsideBraces;
        }
        
        if (insideBraces) {
           insideBraces.split(',').forEach(v => {
             let val = v.trim();
             if (val) targetMap[moduleName].named.add(val);
           });
        }
      }
      return '';
    });

    let topImports = '"use client";\n\n';
    
    function buildImports(tMap, isTypePrefix) {
      for (const [moduleName, importData] of Object.entries(tMap)) {
         let prefix = isTypePrefix ? 'import type ' : 'import ';
         if (importData.namespace) {
           topImports += `${prefix}* as ${importData.namespace} from "${moduleName}";\n`;
         } 
         
         let parts = [];
         if (importData.default) parts.push(importData.default);
         if (importData.named.size > 0) parts.push(`{ ${Array.from(importData.named).join(', ')} }`);
         
         if (parts.length > 0) {
           topImports += `${prefix}${parts.join(', ')} from "${moduleName}";\n`;
         }
      }
    }

    buildImports(moduleImports, false);
    buildImports(typeModuleImports, true);

    newContent = topImports + '\n' + newContent.replace(/^\s+/, '');
    fs.writeFileSync(fullPath, newContent, 'utf8');
    console.log(`Consolidated imports in ${file}`);
  }
}
