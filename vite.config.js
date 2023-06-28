import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
   server: {
    proxy: {
        '/api': { 
          target: 'https://agile-reef-32463-2ad3559c3e00.herokuapp.com/', 
          changeOrigin: true, 
          secure: false, 
          rewrite: (path) => path.replace(/^\/api/, "") 
      },
    },
  },
  plugins: [react()]
})