import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define remotes manually or read from vite.config.ts if possible.
// For simplicity and robustness, we define them here or read a config.
const remotes = [
  { name: 'remote_react', url: 'http://localhost:5001/type-map.json' },
  { name: 'remote_vue', url: 'http://localhost:5002/type-map.json' }
];

const typesDir = path.resolve(__dirname, 'src/@types');

if (fs.existsSync(typesDir)) {
  fs.rmSync(typesDir, { recursive: true, force: true });
}
fs.mkdirSync(typesDir, { recursive: true });

async function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch ${url}: ${res.statusCode}`));
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function fetchText(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch ${url}: ${res.statusCode}`));
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  console.log('🔄 Syncing types from remotes...');

  for (const remote of remotes) {
    try {
      console.log(`📦 Fetching type map from ${remote.name}...`);
      const typeMap = await fetchJson(remote.url);
      
      const remoteParams = [];
      const baseUrl = remote.url.substring(0, remote.url.lastIndexOf('/'));

      for (const [moduleName, typePath] of Object.entries(typeMap)) {
        // moduleName: ./Button
        // typePath: types/src/components/Button.d.ts
        
        const typeUrl = `${baseUrl}/${typePath}`;
        console.log(`   ⬇️  Downloading types for ${moduleName}...`);
        
        try {
          const typeContent = await fetchText(typeUrl);
          // Clean up "export default" or "declare const" to make it usable in declare module
          // But usually we just wrap it.
          // Warning: If content has 'export default', it might conflict inside declare module?
          // Actually, 'declare module' treats contents as module scope.
          
          const cleanModuleName = moduleName.replace(/^\.\//, '');
          const fullModuleName = `${remote.name}/${cleanModuleName}`;
          
          remoteParams.push(`declare module '${fullModuleName}' {
${typeContent}
}`);
        } catch (e) {
          console.error(`   ❌ Failed to download ${typeUrl}: ${e.message}`);
        }
      }

      if (remoteParams.length > 0) {
        const outputPath = path.join(typesDir, `${remote.name.replace('_', '-')}.d.ts`);
        fs.writeFileSync(outputPath, remoteParams.join('\n\n'));
        console.log(`   ✅ Saved types to ${outputPath}`);
      }
      
    } catch (e) {
      console.error(`   ❌ Failed to sync ${remote.name}: ${e.message}`);
      console.log(`      (Make sure the remote is running via 'npm run preview')`);
    }
  }
  
  console.log('✨ Type sync complete!');
}

main();
