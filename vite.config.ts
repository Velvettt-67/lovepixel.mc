import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-three': ['three', 'three-stdlib'],
          'vendor-r3f': ['@react-three/fiber', '@react-three/drei'],
          'vendor-motion': ['motion'],
          'vendor-lenis': ['lenis'],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
