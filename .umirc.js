import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    {
      path: "/",
      component: '@/pages/index',
      wrappers: [
        '@/wrappers/mainAuth',
      ]
    },
    {
      path: "/login",
      component: "login",
      wrappers: [
        '@/wrappers/loginAuth',
      ]
    },
  ],
  npmClient: 'npm',
  publicPath: '/r3f-taichi/',
  base: '/r3f-taichi/',
  hash: true
});
