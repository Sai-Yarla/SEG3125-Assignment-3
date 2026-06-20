const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf-8');

// Remove dark theme variables block (first match)
css = css.replace(/\[data-theme="dark"\]\s*\{[^}]+\}/, '');

// Change light theme variables block (first match) to :root
css = css.replace(/\[data-theme="light"\]\s*\{/, ':root {');

// For all other occurrences of light theme, replace `[data-theme="light"] ` with ``
// so that the rules apply globally and override the previous ones.
css = css.replace(/\[data-theme="light"\] /g, '');

fs.writeFileSync('src/index.css', css);
console.log('Fixed CSS');
