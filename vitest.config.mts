import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['tests/int/**/*.int.spec.ts'],
    server: {
      deps: {
        // Payload admin dependencies import CSS (e.g. react-image-crop).
        // Inline them so Vite transforms CSS instead of Node trying to load .css directly.
        inline: [/react-image-crop/, /@payloadcms\//, /payload/],
      },
    },
  },
})
