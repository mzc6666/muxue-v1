/*
 * @Description: 社区 routes
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-20 15:19:49
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-30 09:48:01
 */
import { RouteRecordRaw } from "vue-router";
import { MAIN_COMMUNITY } from "@constants/route";

const community: RouteRecordRaw[] = [
  {
    path: "community",
    name: MAIN_COMMUNITY,
    component: () => import("@pages/community/index.vue"),
    meta: {
      title: "资源广场",
    },
  },
];

export default community;
