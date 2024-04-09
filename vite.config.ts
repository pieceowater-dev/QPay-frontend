import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import checker from 'vite-plugin-checker'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    checker({
      overlay: { initialIsOpen: false },
    }),

    svgr(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
  },
})
