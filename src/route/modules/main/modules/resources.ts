/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-20 13:34:28
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-07 10:53:54
 */
import { RouteRecordRaw } from "vue-router";
import {
  MAIN_RESOURCE,
  MAIN_RESOURCE_MYRESOURCE,
  MAIN_RESOURCE_RESOURCEITEM,
  MAIN_RESOURCE_FOLDERITEM,
} from "@/constant/route";

const resources: RouteRecordRaw[] = [
  {
    path: "resource",
    name: MAIN_RESOURCE,
    component: () => import("@pages/resources/index.vue"),
    meta: {
      title: "我的资源",
    },
    children: [
      {
        path: "",
        name: MAIN_RESOURCE_MYRESOURCE,
        component: () => import("@pages/resources/my-resources.vue"),
      },
      {
        path: "resource/:sId(\\d+)",
        name: MAIN_RESOURCE_RESOURCEITEM,
        component: () => import("@pages/resources/resource-item/index.vue"),
        props: (to) => ({
          sId: parseInt(to.params.sId as string),
        }),
      },
      {
        path: "resource/:sId(\\d+)/folder/:foId(\\d+)",
        name: MAIN_RESOURCE_FOLDERITEM,
        component: () => import("@pages/resources/folder-item/index.vue"),
        props: (to) => ({
          foId: parseInt(to.params.foId as string),
          sId: parseInt(to.params.sId as string),
        }),
      },
    ],
  },
];

export default resources;
