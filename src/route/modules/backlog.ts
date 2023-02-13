/*
 * @Description: 待办
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-20 15:01:35
 * @LastEditors: mzc
 * @LastEditTime: 2023-01-05 09:30:18
 */
import { RouteRecordRaw } from "vue-router";
import { MAIN_BACKLOG, MAIN_BACKLOG_MY_BACKLOG } from "@constants/route";
const backlog: RouteRecordRaw[] = [
  {
    path: "backlog",
    name: MAIN_BACKLOG,
    component: () => import("@/pages/backlog/index.vue"),
    meta: {
      title: "我的待办",
    },
    redirect: { name: MAIN_BACKLOG_MY_BACKLOG },
    children: [
      {
        path: "my-backlog",
        name: MAIN_BACKLOG_MY_BACKLOG,
        component: () =>
          import("@/pages/backlog/pages/my-backlog/my-backlog.vue"),
      },
    ],
  },
];

export default backlog;
