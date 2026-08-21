const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Specific replacements first
  let newContent = content
    .replace(/pastel-bg/g, 'theme-bg')
    .replace(/pastel-card/g, 'theme-light')
    .replace(/pastel-header/g, 'theme-light')
    .replace(/pastel-purple/g, 'theme-primary')
    .replace(/pastel-dark/g, 'theme-dark')
    .replace(/pastel-muted/g, 'theme-muted')
    .replace(/border-pastel/g, 'border-theme')
    .replace(/card-pastel/g, 'card-theme')
    .replace(/btn-pastel-/g, 'btn-theme-')
    .replace(/text-pastel-/g, 'text-theme-')
    .replace(/bg-pastel-/g, 'bg-theme-');

  // Catch remaining loose 'pastel' to 'theme' (case sensitive)
  newContent = newContent.replace(/pastel/g, 'theme');

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Updated:', file);
  }
});
