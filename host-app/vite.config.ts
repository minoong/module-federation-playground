import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite';

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isProduction = command === 'build';
  const REPO_NAME = 'module-federation-playground';

  return {
    plugins: [
      react(),
      federation({
        name: 'host_app',
        filename: 'remoteEntry.js',
        remotes: {
          remote_react: {
            type: 'module',
            name: 'remote_react',
            entry: isProduction 
              ? `/${REPO_NAME}/remote-react/remoteEntry.js`
              : 'http://localhost:5001/remoteEntry.js',
            entryGlobalName: 'remote_react',
            shareScope: 'default',
          },
          remote_vue: {
            type: 'module',
            name: 'remote_vue',
            entry: isProduction
              ? `/${REPO_NAME}/remote-vue/remoteEntry.js`
              : 'http://localhost:5002/remoteEntry.js',
            entryGlobalName: 'remote_vue',
            shareScope: 'default',
          },
        },
        exposes: {
          './store': './src/lib/store.ts',
        },
        shared: ['react', 'react-dom', 'vue'],
        dts: {
          consumeTypes: true,
        }
      }),
    ],
    base: isProduction ? `/${REPO_NAME}/` : '/',
    server: {
      port: 5000,
      origin: 'http://localhost:5000',
    },
    preview: {
      port: 5000,
    },
    build: {
      target: 'chrome89',
    },
  };
});
