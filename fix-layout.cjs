const fs = require('fs');
let content = fs.readFileSync('src/components/ui/layout.tsx', 'utf8');

// remove lines 166-170 (index 165 for 5 lines)
let lines = content.split('\n');
lines.splice(165, 5);
content = lines.join('\n');

// update line 14
content = content.replace(
  'import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/overlays";',
  'import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/overlays";'
);

fs.writeFileSync('src/components/ui/layout.tsx', content, 'utf8');
