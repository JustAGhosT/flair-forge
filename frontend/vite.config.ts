import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ssr: resolve(__dirname, 'src/ssr/entry-server.tsx'),
        'ssr-client': resolve(__dirname, 'src/ssr/entry-client.tsx')
      },
      output: {
        dir: 'dist/ssr',
        format: 'esm'
      }
    },
    ssr: true,
    outDir: 'dist/ssr',
    emptyOutDir: false
  },
  ssr: {
    external: ['react', 'react-dom']
  }
})
