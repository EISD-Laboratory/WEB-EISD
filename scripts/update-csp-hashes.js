/**
 * Post-build script: Extract SHA-256 hashes from all inline scripts
 * in the Next.js static export and update vercel.json CSP automatically.
 *
 * Run after `next build` via: node scripts/update-csp-hashes.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const OUT_DIR = path.join(__dirname, '..', 'out');
const VERCEL_JSON = path.join(__dirname, '..', 'vercel.json');

function findHtmlFiles(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

function extractInlineScriptHashes(htmlFiles) {
  const hashes = new Set();
  const regex = /<script>([^<]+)<\/script>/g;

  for (const file of htmlFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    let match;
    while ((match = regex.exec(content)) !== null) {
      const scriptContent = match[1];
      const hash = crypto.createHash('sha256').update(scriptContent, 'utf-8').digest('base64');
      hashes.add(`'sha256-${hash}'`);
    }
    regex.lastIndex = 0;
  }

  return Array.from(hashes).sort();
}

function updateVercelJson(hashes) {
  const vercelConfig = JSON.parse(fs.readFileSync(VERCEL_JSON, 'utf-8'));

  const headers = vercelConfig.headers[0].headers;
  const cspHeader = headers.find(h => h.key === 'Content-Security-Policy');

  if (!cspHeader) {
    console.error('ERROR: Content-Security-Policy header not found in vercel.json');
    process.exit(1);
  }

  const scriptSrc = `script-src 'self' ${hashes.join(' ')}`;

  const newValue = cspHeader.value.replace(
    /script-src\s+[^;]+/,
    scriptSrc
  );

  cspHeader.value = newValue;

  fs.writeFileSync(VERCEL_JSON, JSON.stringify(vercelConfig, null, 2) + '\n', 'utf-8');

  return newValue;
}

console.log('Scanning HTML files in out/ ...');
const htmlFiles = findHtmlFiles(OUT_DIR);
console.log(`Found ${htmlFiles.length} HTML files.`);

const hashes = extractInlineScriptHashes(htmlFiles);
console.log(`Found ${hashes.length} unique inline script hashes:`);
hashes.forEach(h => console.log(`  ${h}`));

const newCsp = updateVercelJson(hashes);
console.log('\nUpdated vercel.json CSP:');
console.log(newCsp);
console.log('\nDone!');
