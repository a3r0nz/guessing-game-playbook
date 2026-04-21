import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2022',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          data: ['./src/data/tree.ts']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
});
