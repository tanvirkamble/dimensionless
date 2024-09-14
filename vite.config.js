import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@emotion/react': '@emotion/react',
      '@emotion/styled': '@emotion/styled',
    },
  },
  build: {
    rollupOptions: {
      external: ['uuid', 'axios'],
    },
  },
});
