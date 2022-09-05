/*
 * @Description: main内的路由
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-08 15:08:11
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-30 09:43:43
 */
import { RouteRecordRaw } from "vue-router";
import resources from "./modules/resources";
import backlog from "./modules/backlog";
import chatting from "./modules/chatting";
import course from "./modules/course";
import studyRoom from "./modules/study-room";
import resourceSquare from "./modules/resource-square";
import community from "./modules/community";
import { MAIN, MAIN_RESOURCE } from "@constants/route";
const main: RouteRecordRaw[] = [
  {
    name: MAIN,
    path: "/main",
    component: () => import("@pages/main/index.vue"),
    redirect: {
      name: MAIN_RESOURCE,
    },
    meta: {
      title: "主页",
    },
    children: [
      ...resources,
      ...backlog,
      ...chatting,
      ...course,
      ...studyRoom,
      ...resourceSquare,
      ...community,
    ],
  },
];

export default main;
