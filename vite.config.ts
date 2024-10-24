import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    hmr: true
  },
  resolve: {
    alias: {
      'buffer': 'buffer/',
    }
  },
  define: {
    'process.env': {},
    'global': {},
  }

})
