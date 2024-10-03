import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://puppymarket-deploy-1.onrender.com',
      }
    },
  },
  publicDir: 'uploads',

})
