/*
 * @Description: 路由配置
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-04 19:31:22
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-02 15:04:19
 */
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import { DOWNLOAD, HOME, LOGIN, MAIN, MAIN_RESOURCE } from "@constants/route";

import resources from "./modules/resources";
import backlog from "./modules/backlog";
import chatting from "./modules/chatting";
import community from "./modules/community";
import course from "./modules/course";
import resourceSquare from "./modules/resource-square";
import studyRoom from "./modules/study-room";
import centersRoutes from "./modules/center";

const router = createRouter({
  routes: [
    {
      path: "/",
      name: HOME,
      component: () => import("@/pages/home/home-index.vue"),
      meta: {
        title: "首页",
      },
    },
    {
      path: "/login",
      name: LOGIN,
      component: () => import("@/pages/login/login-index.vue"),
      meta: {
        title: "登录-注册",
      },
    },
    {
      path: "/download",
      name: DOWNLOAD,
      component: () => import("@/pages/download/download-index.vue"),
      meta: {
        title: "下载",
      },
    },
    {
      path: "/main",
      name: MAIN,
      component: () => import("@/pages/main/index.vue"),
      meta: {
        title: "主页",
      },
      redirect: { name: MAIN_RESOURCE },
      children: [
        ...resources,
        ...backlog,
        ...chatting,
        ...community,
        ...course,
        ...resourceSquare,
        ...studyRoom,
        ...centersRoutes,
      ],
    },
  ],
  history: createWebHistory(),
  // history: createWebHashHistory(),
});

// 全局守卫
router.beforeEach((to, from, next) => {
  // 没有token，仅可访问一些页面
  if (
    JSON.parse(localStorage.getItem("user-store") as string)?.token ||
    [DOWNLOAD, HOME, LOGIN].includes(to.name as string)
  ) {
    next();
  } else {
    next({ name: LOGIN });
  }
  // next();
  document.title = String(to.meta.title);
});

export default router;
