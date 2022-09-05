/*
 * @Description: 自习室 routes
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-20 15:12:15
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-30 09:49:09
 */
import { RouteRecordRaw } from "vue-router";
import { MAIN_STUDYROOM } from "@constants/route";

const studyRoom: RouteRecordRaw[] = [
  {
    path: "study-room",
    name: MAIN_STUDYROOM,
    component: () => import("@/pages/study-room/index.vue"),
    meta: {
      title: "自习室",
    },
  },
];

export default studyRoom;
