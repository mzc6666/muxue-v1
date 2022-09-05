/*
 * @Description: 聊天相关路由
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-20 15:04:28
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-30 09:47:44
 */
import { RouteRecordRaw } from "vue-router";
import { MAIN_CHATTING } from "@constants/route";

const chatting: RouteRecordRaw[] = [
  {
    path: "chatting",
    name: MAIN_CHATTING,
    component: () => import("@/pages/chatting/index.vue"),
    meta: {
      title: "聊天",
    },
  },
];

export default chatting;
