// https://vite.dev/config/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    host: true,
    port: 5173,
    strictPort: true,

    allowedHosts: [
      'craftdex.in',        //  allow your domain
      '.craftdex.in',       //  allow subdomains (www, etc)
      '.trycloudflare.com', // optional (can keep)
    ],

    proxy: {
      '/api': 'http://localhost:3000'
    },
  },
})
