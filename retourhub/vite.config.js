import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Dit zorgt ervoor dat alles goed geladen wordt, zonder padproblemen
  build: {
    outDir: 'dist', // Zorg ervoor dat de output naar de 'dist' map gaat
  }
})
