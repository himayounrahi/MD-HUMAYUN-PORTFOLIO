import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ---------------------------------------------------------------------------
// DEPLOYMENT NOTE — read this before you deploy.
//
// `base` controls the URL prefix all built assets are loaded from.
//
//   Vercel / Netlify / custom domain  ->  base: '/'
//   GitHub Pages at user.github.io/REPO -> base: '/REPO/'
//
// You are currently on GitHub Pages at:
//   https://mdhumayun7.github.io/MD-HUMAYUN-PORTFOLIO/
// so the repo name below must match your repository exactly (case-sensitive).
// If you move to Vercel later, change this single line to '/'.
// ---------------------------------------------------------------------------
export default defineConfig({
  plugins: [react()],
  base: '/MD-HUMAYUN-PORTFOLIO/',
  build: {
    outDir: 'dist',
    // Split the three interactive demos out of the main bundle so the page
    // loads fast and they only download when a visitor opens one.
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion'],
        },
      },
    },
  },
})
