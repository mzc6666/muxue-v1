/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-20 15:08:53
 * @LastEditors: mzc
 * @LastEditTime: 2023-01-06 21:32:13
 */
import { RouteRecordRaw } from "vue-router";
import {
  MAIN_COURSE,
  MAIN_COURSE_LISTS,
  MAIN_COURSE_ITEM,
  MAIN_COURSE_TASKS,
} from "@constants/route";

const course: RouteRecordRaw[] = [
  {
    path: "course",
    name: MAIN_COURSE,
    component: () => import("@/pages/course/index.vue"),
    redirect: { name: MAIN_COURSE_LISTS },
    meta: {
      title: "课程",
    },
    children: [
      {
        path: "lists",
        name: MAIN_COURSE_LISTS,
        component: () =>
          import("@/pages/course/pages/course-list/course-list.vue"),
        meta: {
          title: "我的课程",
        },
      },
      {
        path: ":id(\\d+)",
        name: MAIN_COURSE_ITEM,
        component: () =>
          import("@/pages/course/pages/course-detail/course-detail.vue"),
        props: (to) => ({ cId: Number(to.params.id) }),
      },
      {
        path: "tasks/:cId(\\d+)/:chId(\\d+)/:secId(\\d+)",
        name: MAIN_COURSE_TASKS,
        component: () =>
          import("@/pages/course/pages/course-tasks/course-tasks.vue"),
        props: (to) => ({
          cId: Number(to.params.cId),
          chId: Number(to.params.chId),
          secId: Number(to.params.secId),
        }),
      },
    ],
  },
];

export default course;
