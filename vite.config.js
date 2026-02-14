import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Penting: base harus '/' jika menggunakan custom domain (sonzaix.me)
  // Jika tidak pakai custom domain, biasanya '/nama-repo/'
  base: '/', 
})
