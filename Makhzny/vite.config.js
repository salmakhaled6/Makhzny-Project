import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ لو الموقع الرئيسي في دومين فرعي أو مجلد فرعي (مثلاً makhzny.com/folder/)
export default defineConfig({
  plugins: [react()],
  base: './' // ✅ مهم جداً لتصحيح روابط الـ assets
})
