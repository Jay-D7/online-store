import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/online-store/', // Ensures assets are served correctly in production
  server: {
    open: true, // This will open the browser automatically
  },
});
