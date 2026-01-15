import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isProduction = command === 'build';
  const REPO_NAME = 'module-federation-playground';

  // Even for iframe, we can keep federation config if we want to expose things, 
  // but for iframe usage, simply running the app is enough. 
  // I'll keep it minimal or consistent. Let's update base and port.

  return {
    base: isProduction ? `/${REPO_NAME}/remote-iframe-react/` : 'http://localhost:5003/',
    plugins: [
      react(),
      // Federation plugin removed/commented out as it's primarily for iframe usage, 
      // or we can keep it if we want hybrid. 
      // For now, let's keep it simple as a standalone app for iframe.
    ],
    server: {
      port: 5003,
      origin: 'http://localhost:5003',
    },
    preview: {
      port: 5003,
    },
    build: {
      target: 'chrome89',
    },
  };
});
