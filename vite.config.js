import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom', 'scheduler'],
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['babasti.my.id', 'www.babasti.my.id'],
  },
})
