import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // Apuntamos a src para mejor orden
      },
    },
    build: {
      // Optimizaciones de construcción
      target: 'esnext',
      minify: 'esbuild', // Es más rápido y eficiente
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          // Esta es la magia: separa las librerías en archivos independientes
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('firebase')) {
                return 'vendor-firebase'; // Firebase en su propio archivo
              }
              if (id.includes('react')) {
                return 'vendor-react'; // React en su propio archivo
              }
              return 'vendor'; // El resto de librerías
            }
          },
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});