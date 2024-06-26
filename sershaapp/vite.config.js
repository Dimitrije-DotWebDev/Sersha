import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.gif', '**/*.png', '**/*.jpg', '**/*.jpeg'],
  server: {
    proxy: {
      '/static': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/static/, '')
      }
    }
  }
})
