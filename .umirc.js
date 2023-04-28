import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],
  npmClient: 'npm',
  publicPath: '/r3f-taichi/',
  base: '/r3f-taichi/',
  hash: true
});
