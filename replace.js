const fs = require('fs');
const glob = require('glob');

const files = glob.sync('**/*.{ts,tsx,js,jsx,md,json,jsonc,prisma,sql,sh,py,css,html,example}', { 
  ignore: ['node_modules/**', '.next/**', '.git/**', '.agents/**'] 
});

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content
    .replace(/RHIZORA TECH/g, 'RHIZORA TECH')
    .replace(/rhizora-tech/g, 'rhizora-tech')
    .replace(/RHIZORA TECH/g, 'RHIZORA TECH')
    .replace(/rt-counted/g, 'rt-counted');
    
  newContent = newContent.replace(/DEV<span className="text-orange-500">FUSION<\/span>/g, 'RT<span className="text-orange-500">.</span>');

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Updated: ' + file);
  }
}
