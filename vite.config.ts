import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The platform proxies the dev server from a per-sandbox hostname. Only widen the
// host allowlist while running inside the Base44 preview sandbox.
const isPreview = process.env.BASE44_PREVIEW_MODE === '1'
const sandboxDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: isPreview
      ? ['.' + (sandboxDomain ?? 'e2b.app'), 'localhost', '127.0.0.1']
      : undefined,
  },
})
