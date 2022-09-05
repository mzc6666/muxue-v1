/*
 * @Description: 首页路由
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-04 20:16:48
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-30 09:40:02
 */
import { RouteRecordRaw } from "vue-router";
import { HOME } from "@constants/route";

const home: RouteRecordRaw[] = [
  {
    name: HOME,
    path: "/",
    component: () => import("@pages/home/home-index.vue"),
    meta: {
      title: "首页",
    },
  },
];

export default home;
