import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 优化开发服务器性能
    hmr: {
      overlay: true
    }
  },
  // 优化构建性能
  build: {
    rollupOptions: {
      output: {
        // 自动代码分割，将 node_modules 中的依赖单独打包
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'lucide-vendor';
            }
            return 'vendor';
          }
        }
      },
      // 优化 chunk 大小警告阈值
      chunkSizeWarningLimit: 1000
    },
    // 启用压缩
    minify: 'esbuild',
    // 优化 CSS
    cssCodeSplit: true
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react']
  }
})