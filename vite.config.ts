import path from 'path'

import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import svgr from 'vite-plugin-svgr'

import react from '@vitejs/plugin-react'

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
      app: `${path.resolve(__dirname, './src/app/')}`,
      entities: `${path.resolve(__dirname, './src/entities/')}`,
      features: path.resolve(__dirname, './src/features'),
      pages: `${path.resolve(__dirname, './src/pages')}`,
      shared: `${path.resolve(__dirname, './src/shared')}`,
      widget: `${path.resolve(__dirname, './src/widget')}`,
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
  },
})
