/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-20 15:15:54
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-24 09:41:13
 */
import { RouteRecordRaw } from "vue-router";
import { MAIN_RESOURCESQUARE } from "@constants/route";

const resourceSquare: RouteRecordRaw[] = [
  {
    path: "resource-square",
    name: MAIN_RESOURCESQUARE,
    component: () => import("@pages/resource-square/index.vue"),
    meta: {
      title: "资源广场",
    },
  },
];

export default resourceSquare;
