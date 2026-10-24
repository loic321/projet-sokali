import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base : le site est servi sous /projet-sokali/ sur GitHub Pages.
// proxy : en développement, /api sera redirigé vers ton backend Express.
export default defineConfig({
  base: '/projet-sokali/',
  plugins: [react(), tailwindcss()],
  server: { proxy: { '/api': 'http://localhost:3000' } },
})
