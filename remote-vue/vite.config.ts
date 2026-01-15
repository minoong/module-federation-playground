import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { federation } from '@module-federation/vite';
import dts from 'vite-plugin-dts';
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isProduction = command === 'build';
  const REPO_NAME = 'module-federation-playground';

  const federationConfig = {
    name: 'remote_vue',
    filename: 'remoteEntry.js',
    exposes: {
      './Button': './src/components/Button.vue',
      './DashboardContent': './src/components/DashboardContent.vue',
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
    shared: ['vue'],
    manifest: true,
  };

  return {
    base: isProduction ? `/${REPO_NAME}/remote-vue/` : 'http://localhost:5002/',
    plugins: [
      vue(),
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
      port: 5002,
      origin: 'http://localhost:5002',
    },
    preview: {
      port: 5002,
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
        typePath = typePath.replace(/\.vue$/, '.vue.d.ts'); 
        typeMap[key] = `types/${typePath}`;
      }
      
      const outputPath = path.resolve(__dirname, 'dist/type-map.json');
      fs.writeFileSync(outputPath, JSON.stringify(typeMap, null, 2));
      console.log('Detailed Generated type-map.json');
    }
  }
}
