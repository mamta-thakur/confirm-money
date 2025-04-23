import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  // base: '/super-money-clone/',
  // base: '/',
  plugins: [react()],
  build: {
    sourcemap: true, // Enable source maps
  },
})