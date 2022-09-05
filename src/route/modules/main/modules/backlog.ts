/*
 * @Description: 待办
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-20 15:01:35
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-30 09:47:22
 */
import { RouteRecordRaw } from "vue-router";
import { MAIN_BACKLOG } from "@constants/route";
const backlog: RouteRecordRaw[] = [
  {
    path: "backlog",
    name: MAIN_BACKLOG,
    component: () => import("@/pages/backlog/index.vue"),
    meta: {
      title: "我的待办",
    },
  },
];

export default backlog;
