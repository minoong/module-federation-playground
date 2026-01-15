import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite';
import dts from 'vite-plugin-dts';
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isProduction = command === 'build';
  const REPO_NAME = 'module-federation-playground';

  const federationConfig = {
    name: 'remote_react',
    filename: 'remoteEntry.js',
    exposes: {
      './Button': './src/components/Button.tsx',
      './Header': './src/exposes/Header.tsx',
      './InteractiveCard': './src/exposes/InteractiveCard.tsx',
    },
    remotes: {
      host_app: {
        type: 'module',
        name: 'host_app',
        entry: isProduction
          ? `/${REPO_NAME}/remoteEntry.js`
          : 'http://localhost:5000/remoteEntry.js',
        entryGlobalName: 'host_app',
        shareScope: 'default',
      },
    },
    shared: ['react', 'react-dom'],
    manifest: true,
  };

  return {
    base: isProduction ? `/${REPO_NAME}/remote-react/` : 'http://localhost:5001/',
    plugins: [
      react(),
      dts({
        insertTypesEntry: false, 
        rollupTypes: false,
        include: ['src'],
        outDir: 'dist/types',
        tsconfigPath: './tsconfig.build.json'
      }),
      federation(federationConfig),
      generateTypeMap(federationConfig),
    ],
    server: {
      port: 5001,
      origin: 'http://localhost:5001',
    },
    preview: {
      port: 5001,
    },
    build: {
      target: 'chrome89',
    },
  };
});

function generateTypeMap(federationConfig: any) {
  return {
    name: 'generate-type-map',
    writeBundle() {
      const typeMap: Record<string, string> = {};
      
      for (const [key, value] of Object.entries(federationConfig.exposes)) {
        let typePath = (value as string).replace(/^\.\/src\//, ''); // Remove ./src/ prefix
        typePath = typePath.replace(/\.tsx?$/, '.d.ts'); 
        typeMap[key] = `types/${typePath}`;
      }
      
      // Use __dirname safely or assume it works in CJS context of vite.config.ts
      const outputPath = path.resolve(__dirname, 'dist/type-map.json');
      fs.writeFileSync(outputPath, JSON.stringify(typeMap, null, 2));
      console.log('Detailed Generated type-map.json');
    }
  }
}
