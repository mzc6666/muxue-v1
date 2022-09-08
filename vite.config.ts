/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-04 17:00:05
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-08 23:38:49
 */
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // css 预解析
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/scss/index.scss";',
      },
    },
  },
  // 配置路径别名
  resolve: {
    alias: [
      {
        find: "@components",
        replacement: "/src/components",
      },
      {
        find: "@images",
        replacement: "/src/assets/images",
      },
      {
        find: "@pages",
        replacement: "/src/pages",
      },
      {
        find: "@types",
        replacement: "/src/types",
      },
      {
        find: "@apis",
        replacement: "/src/api",
      },
      {
        find: "@constants",
        replacement: "/src/constant",
      },
      {
        find: "@",
        replacement: "/src",
      },
    ],
  },
  base: "./",
  build: {
    outDir: "build",
    assetsDir: "static",
  },
});
