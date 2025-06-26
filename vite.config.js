import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        maximumFileSizeToCacheInBytes: 3000000 // 3MB limit
      },
      manifest: {
        name: 'MOMO YVAN Portfolio',
        short_name: 'Portfolio',
        description: 'Professional portfolio of MOMO GODI YVAN',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    outDir: 'dist', // Keep as dist for most platforms
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // Three.js core
          'three-core': ['three'],
          
          // Three.js React integration
          'three-react': ['@react-three/fiber', '@react-three/drei'],
          
          // Animation libraries
          'animation': ['framer-motion', 'gsap'],
          
          // UI components
          'ui': ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Increase to 1MB
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true
      }
    }
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'three',
      '@react-three/fiber',
      '@react-three/drei'
    ]
  },
  server: {
    host: true,
    port: 3000
  }
})