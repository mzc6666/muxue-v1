/*
 * @Description: 路由配置
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-04 19:31:22
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-30 10:01:36
 */
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw,
} from "vue-router";
import logins from "./modules/login";
import home from "./modules/home";
import downloads from "./modules/download";
import main from "./modules/main";
const routes: RouteRecordRaw[] = [...home, ...logins, ...downloads, ...main];

const router = createRouter({
  routes,
  history: createWebHistory(),
  // history: createWebHashHistory(),
});

// 全局守卫
router.beforeEach((to, from) => {
  document.title = String(to.meta.title);
});

export default router;
