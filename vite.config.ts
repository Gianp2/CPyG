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
        '@': path.resolve(__dirname, './src'),
      },
      dedupe: ['firebase'], // 🔥 IMPORTANTE
    },

    build: {
      target: 'esnext',
      minify: 'esbuild',
      cssCodeSplit: true,

      commonjsOptions: {
        transformMixedEsModules: true,
      },

      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // ❌ ELIMINAMOS firebase de acá

              if (id.includes('react')) {
                return 'vendor-react';
              }

              return 'vendor';
            }
          },
        },
      },
    },

    optimizeDeps: {
      include: [
        'firebase/app',
        'firebase/auth',
        'firebase/firestore',
        'firebase/storage',
      ],
    },

    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});