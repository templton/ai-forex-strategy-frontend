import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@containers': path.resolve(__dirname, 'src/containers'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@router': path.resolve(__dirname, 'src/router'),
    },
  },
});
