import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // Provides a browser-like environment
    setupFiles: './setupTests.js', // or './src/test/setup.ts'
    css: true,
  },
})
