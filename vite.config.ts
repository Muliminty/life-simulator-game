import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

// 构建前复制配置文件到 public 目录
function copyConfigFile() {
  return {
    name: 'copy-config',
    buildStart() {
      const configPath = resolve(__dirname, 'config/ai.json');
      const publicConfigDir = resolve(__dirname, 'public/config');
      const publicConfigPath = resolve(publicConfigDir, 'ai.json');
      
      if (existsSync(configPath)) {
        if (!existsSync(publicConfigDir)) {
          mkdirSync(publicConfigDir, { recursive: true });
        }
        copyFileSync(configPath, publicConfigPath);
        console.log('✅ 已复制 AI 配置文件到 public/config/ai.json');
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyConfigFile()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  // 将配置文件作为静态资源处理
  publicDir: 'public',
});

