/*
 * @Description: 下载页面相关路由
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-05 22:56:05
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-30 09:43:19
 */
import { RouteRecordRaw } from "vue-router";
import { DOWNLOAD } from "@constants/route";

const downloads: RouteRecordRaw[] = [
  {
    name: DOWNLOAD,
    path: "/download",
    component: () => import("@pages/download/download-index.vue"),
    meta: {
      title: "应用下载",
    },
  },
];

export default downloads;
