import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Static build. Works on Vercel, Netlify, or GitHub Pages out of the box.
export default defineConfig({
  plugins: [react()],
  base: './',
});
