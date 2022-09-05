/*
 * @Description: 登录注册的路由
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-04 19:49:59
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-30 09:42:38
 */
import { RouteRecordRaw } from "vue-router";
import { LOGIN } from "@constants/route";

const logins: RouteRecordRaw[] = [
  {
    name: LOGIN,
    path: "/login",
    component: () => import("@pages/login/login-index.vue"),
    meta: {
      title: "登录-注册",
    },
  },
];

export default logins;
