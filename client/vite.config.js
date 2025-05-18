import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import  { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  root: "./",
  plugins: [react()],
  resolve: {
    alias: {
      '@components': resolve(__dirname, './src/components'),
      '@contexts': resolve(__dirname, './src/contexts'),
      '@pages': resolve(__dirname, './src/pages'),
      '@routes': resolve(__dirname, './src/routes'),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
