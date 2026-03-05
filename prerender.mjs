/**
 * Pre-render script for ElectroSafe.homes
 * 
 * Runs AFTER `vite build` completes. It:
 * 1. Spins up a local static server serving the dist/ folder
 * 2. Uses Puppeteer to visit each route
 * 3. Captures the fully rendered HTML (with React content + Helmet tags)
 * 4. Writes the HTML to dist/<route>/index.html so crawlers get real content
 */

import { execSync } from 'child_process';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST_DIR = join(__dirname, 'dist');
const PORT = 4173;

// All routes to pre-render (must match App.tsx routes)
const ROUTES = [
  '/',
  '/assessment',
  '/electrical-load-calculator',
  '/electrical-hazard-risk-predictor',
  '/tenant-request',
  '/surge-protection-guide',
  '/rooms',
  '/appliances',
  '/hardware',
  '/new-home',
  '/everyday-safety',
  '/gallery',
  '/articles',
  '/about',
  '/downloads',
  '/legal',
  '/contact',
  '/emergency',
  '/standards-and-sources',
  '/quick-quiz',
  '/badge',
  // Virality & Growth
  '/score',
  '/challenge',
  '/room-audit',
  '/glossary',
  '/is-it-safe',
  '/bill-detector',
  '/my-home',
  '/landlords',
  '/stories',
  '/safety/india',
  '/safety/usa',
  '/safety/uk',
  // Phase 2 Viral Features
  '/home-buyer-scanner',
  '/quote-analyzer',
  '/breaker-mapper',
  '/diy-quiz',
  '/nursery-safety',
  '/ev-charger',
  '/alarm-calendar',
  '/tenant-demand',
  // Phase 6 Global Calculators
  '/solar-roi-calculator',
  '/ev-charging-cost-calculator',
  '/ghost-power-calculator',
  '/dryer-vent-fire-risk-calculator',
  '/wfh-load-audit',
  '/appliance-life-expectancy-calculator',
  '/lightning-strike-calculator',
  '/holiday-lights',
];

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.webmanifest': 'application/manifest+json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(DIST_DIR, req.url === '/' ? '/index.html' : req.url);
      
      // If no extension, serve index.html (SPA fallback)
      if (!extname(filePath)) {
        filePath = join(DIST_DIR, 'index.html');
      }
      
      if (!existsSync(filePath)) {
        filePath = join(DIST_DIR, 'index.html');
      }

      const ext = extname(filePath);
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      try {
        const content = readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(PORT, () => {
      console.log(`📡 Static server running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function prerender() {
  console.log('\n🚀 ElectroSafe Pre-render Starting...\n');

  // Dynamically import puppeteer
  let puppeteer;
  try {
    puppeteer = await import('puppeteer');
  } catch {
    console.log('📦 Installing puppeteer...');
    execSync('npm install --no-save puppeteer', { stdio: 'inherit' });
    puppeteer = await import('puppeteer');
  }

  const server = await startServer();
  const browser = await puppeteer.default.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let successCount = 0;
  let errorCount = 0;

  for (const route of ROUTES) {
    try {
      const page = await browser.newPage();
      const url = `http://localhost:${PORT}${route}`;
      
      console.log(`  🔄 Rendering: ${route}`);
      
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      
      // Wait a bit for React to finish rendering and Helmet to inject tags
      await page.waitForSelector('#root', { timeout: 10000 });
      await new Promise(r => setTimeout(r, 2000));

      const html = await page.content();
      
      // Create directory structure: dist/route/index.html
      if (route === '/') {
        writeFileSync(join(DIST_DIR, 'index.html'), html, 'utf-8');
      } else {
        const dirPath = join(DIST_DIR, route);
        mkdirSync(dirPath, { recursive: true });
        writeFileSync(join(dirPath, 'index.html'), html, 'utf-8');
      }

      console.log(`  ✅ Done: ${route}`);
      successCount++;
      await page.close();
    } catch (err) {
      console.error(`  ❌ Failed: ${route} - ${err.message}`);
      errorCount++;
    }
  }

  await browser.close();
  server.close();

  console.log(`\n🎉 Pre-render complete! ${successCount} pages rendered, ${errorCount} errors.\n`);
  
  if (errorCount > 0) {
    process.exit(1);
  }
}

prerender().catch((err) => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
