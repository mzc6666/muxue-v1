/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-20 15:15:54
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-05 23:40:51
 */
import { RouteRecordRaw } from "vue-router";
import {
  MAIN_RESOURCESQUARE,
  MAIN_RESOURCESQUARE_HOME,
  MAIN_RESOURCESQUARE_RANKS,
  MAIN_RESOURCESQUARE_ITEM_DETAIL,
  MAIN_RESOUCESQUARE_SEARCH,
} from "@constants/route";

const resourceSquare: RouteRecordRaw[] = [
  {
    path: "resource-square",
    name: MAIN_RESOURCESQUARE,
    component: () => import("@pages/resource-square/index.vue"),
    meta: {
      title: "资源广场",
    },
    redirect: { name: MAIN_RESOURCESQUARE_HOME },
    children: [
      {
        path: "home",
        name: MAIN_RESOURCESQUARE_HOME,
        component: () =>
          import(
            "@/pages/resource-square/pages/resource-square-home/resource-square-home.vue"
          ),
        meta: {
          title: "广场首页",
        },
      },
      {
        path: "ranks",
        name: MAIN_RESOURCESQUARE_RANKS,
        component: () =>
          import(
            "@/pages/resource-square/pages/resource-square-ranks/resource-square-ranks.vue"
          ),
        meta: {
          title: "资源排行",
        },
      },
      {
        path: "detai",
        name: MAIN_RESOURCESQUARE_ITEM_DETAIL,
        component: () =>
          import(
            "@/pages/resource-square/pages/resource-item-detail/resource-item-detail.vue"
          ),
        meta: {
          title: "资源详情",
        },
      },
      {
        path: ":searchValue",
        name: MAIN_RESOUCESQUARE_SEARCH,
        component: () =>
          import(
            "@/pages/resource-square/pages/resouce-square-search/resouce-square-search.vue"
          ),
        meta: {
          title: "资源查询",
        },
        props: (to) => ({ searchValue: to.params.searchValue }),
      },
    ],
  },
];

export default resourceSquare;
