import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Bind to all network interfaces
    port: 5173,       // Default Vite port
    strictPort: true, // Ensures it doesn’t switch ports if 5173 is busy
    allowedHosts: ['js.dpfurner.xyz']
  }
})
