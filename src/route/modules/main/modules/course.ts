/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-20 15:08:53
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-30 09:48:19
 */
import { RouteRecordRaw } from "vue-router";
import { MAIN_COURSE } from "@constants/route";

const course: RouteRecordRaw[] = [
  {
    path: "course",
    name: MAIN_COURSE,
    component: () => import("@/pages/course/index.vue"),
    meta: {
      title: "课程",
    },
  },
];

export default course;
