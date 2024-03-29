/*
 * @Description: 路由配置
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-04 19:31:22
 * @LastEditors: Austral
 * @LastEditTime: 2023-05-15 20:10:50
 */
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import {
  DOWNLOAD,
  HOME,
  LOGIN,
  MAIN,
  MAIN_RESOURCE,
  NOT_FOUND_404,
} from "@constants/route";

import resources from "./modules/resources";
import backlog from "./modules/backlog";
import chatting from "./modules/chatting";
import community from "./modules/community";
import course from "./modules/course";
import resourceSquare from "./modules/resource-square";
import studyRoom from "./modules/study-room";
import centersRoutes from "./modules/center";
import studyResource from "./modules/study-resource";

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
      redirect: { name: 'studyResource' },
      children: [
        ...studyResource,
        // ...resources,
        // ...resourceSquare,
        ...backlog,
        ...chatting,
        ...community,
        ...course,
        ...studyRoom,
        ...centersRoutes,
      ],
    },
    {
      path: "/:param(.*)",
      name: NOT_FOUND_404,
      component: () => import("@/pages/404/404.vue"),
      meta: {
        title: "404 Not Found",
      },
    },
  ],
  history: createWebHistory(),
  strict: true,
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
