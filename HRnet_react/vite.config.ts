import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Additional Vite-specific build options
    minify: 'esbuild', // Default is 'esbuild', can be changed to 'terser' if needed
  }
})
