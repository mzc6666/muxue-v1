/*
 * @Description: 自习室 routes
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-20 15:12:15
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-19 16:29:42
 */
import { RouteRecordRaw } from "vue-router";
import {
  MAIN_STUDYROOM,
  MAIN_STUDYROOM_DETAIL,
  MAIN_STUDYROOM_HOME,
} from "@constants/route";

const studyRoom: RouteRecordRaw[] = [
  {
    path: "study-room",
    name: MAIN_STUDYROOM,
    component: () => import("@/pages/study-room/index.vue"),
    meta: {
      title: "自习室",
    },
    redirect: {
      name: MAIN_STUDYROOM_HOME,
    },
    children: [
      {
        path: "",
        name: MAIN_STUDYROOM_HOME,
        component: () =>
          import(
            "@/pages/study-room/pages/Study-Room-Home/Study-Room-Home.vue"
          ),
        meta: {
          title: "自习室",
        },
      },
      {
        path: "detail",
        name: MAIN_STUDYROOM_DETAIL,
        component: () =>
          import(
            "@/pages/study-room/pages/Study-Room-Detail/Study-Room-Detail.vue"
          ),
        meta: {
          title: "自习室-详情",
        },
        props: (to) => ({
          id: Number(to.query.id),
        }),
      },
    ],
  },
];

export default studyRoom;
