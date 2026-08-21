import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    host: true, // อนุญาตให้เข้าถึงจากทุกอุปกรณ์ในเครือข่ายเดียวกัน (Mobile, Tablet, PC)
    port: 5173
  }
})
