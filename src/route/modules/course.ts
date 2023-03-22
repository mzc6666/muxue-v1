/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-20 15:08:53
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-06 23:30:07
 */
import { RouteRecordRaw } from "vue-router";
import {
  MAIN_COURSE,
  MAIN_COURSE_LISTS,
  MAIN_COURSE_ITEM,
  MAIN_COURSE_TASKS,
  MAIN_COURSE_ITEM_CONTENT,
  MAIN_COURSE_ITEM_COMMENTS,
  MAIN_COURSE_ITEM_TITLE_DETAIL,
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
        redirect: { name: MAIN_COURSE_ITEM_CONTENT },
        children: [
          {
            path: "content",
            name: MAIN_COURSE_ITEM_CONTENT,
            component: () =>
              import(
                "@/pages/course/pages/course-detail/course-detail-content/course-detail-content.vue"
              ),
            meta: {
              title: "课程内容",
            },
          },
          {
            path: "comment",
            name: MAIN_COURSE_ITEM_COMMENTS,
            component: () =>
              import(
                "@/pages/course/pages/course-detail/course-detail-comments/course-detail-comments.vue"
              ),
            meta: {
              title: "课程讨论",
            },
          },
          {
            path: "title-detail",
            name: MAIN_COURSE_ITEM_TITLE_DETAIL,
            component: () =>
              import(
                "@/pages/course/pages/course-detail/course-topComment-detail/course-topComment-detail.vue"
              ),
            meta: {
              title: "话题详情",
            },
          },
        ],
      },
      {
        path: "tasks/::secId(\\d+)",
        name: MAIN_COURSE_TASKS,
        component: () =>
          import("@/pages/course/pages/course-tasks/course-tasks.vue"),
        props: (to) => ({
          secId: Number(to.params.secId),
        }),
      },
    ],
  },
];

export default course;
