const { readdirSync, statSync } = require('node:fs');
const { join, resolve } = require('node:path');
const { spawnSync } = require('node:child_process');

const roots = ['src', 'scripts'];
const files = [];

function collectJavaScript(directory) {
  for (const entry of readdirSync(directory)) {
    const fullPath = join(directory, entry);
    if (statSync(fullPath).isDirectory()) collectJavaScript(fullPath);
    else if (fullPath.endsWith('.js') && fullPath !== __filename) files.push(fullPath);
  }
}

for (const root of roots) collectJavaScript(resolve(root));

for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}

console.log(`Syntax check passed for ${files.length} JavaScript files.`);
