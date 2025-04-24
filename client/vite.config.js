import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import  { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  root: "./",
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': resolve(__dirname, './src/assets'),
      '@components': resolve(__dirname, './src/components'),
      '@contexts': resolve(__dirname, './src/contexts'),
      '@layouts': resolve(__dirname, './src/layouts'),
      '@pages': resolve(__dirname, './src/pages'),
      '@routes': resolve(__dirname, './src/routes'),
      '@services': resolve(__dirname, './src/services'),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
