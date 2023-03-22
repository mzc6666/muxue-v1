/*
 * @Description: 社区 routes
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-20 15:19:49
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-08 19:41:00
 */
import { RouteRecordRaw } from "vue-router";
import {
  MAIN_COMMUNITY,
  MAIN_COMMUNITY_ARTICLE_ADD,
  MAIN_COMMUNITY_ARTICLE_DETAIL,
  MAIN_COMMUNITY_COLLECTIONS,
  MAIN_COMMUNITY_HOME,
  MAIN_COMMUNTIY_LIKES,
} from "@constants/route";

const community: RouteRecordRaw[] = [
  {
    path: "community",
    name: MAIN_COMMUNITY,
    component: () => import("@pages/community/index.vue"),
    meta: {
      title: "社区",
    },
    redirect: {
      name: MAIN_COMMUNITY_HOME,
    },
    children: [
      {
        path: "home",
        name: MAIN_COMMUNITY_HOME,
        component: () =>
          import("@/pages/community/pages/community-home/community-home.vue"),
        meta: {
          title: "社区首页",
        },
      },
      {
        path: "collections",
        name: MAIN_COMMUNITY_COLLECTIONS,
        component: () =>
          import(
            "@/pages/community/pages/community-collections/community-collections.vue"
          ),
        meta: {
          title: "社区-我的收藏",
        },
      },
      {
        path: "my-likes",
        name: MAIN_COMMUNTIY_LIKES,
        component: () =>
          import("@/pages/community/pages/communtiy-likes/community-likes.vue"),
        meta: {
          title: "社区-我的点赞",
        },
      },
      {
        path: "article-add",
        name: MAIN_COMMUNITY_ARTICLE_ADD,
        component: () =>
          import(
            "@/pages/community/pages/communtiy-article-add/community-article-add.vue"
          ),
        meta: {
          title: "社区-添加文章",
        },
      },
      {
        path: "article:id(\\d+)",
        name: MAIN_COMMUNITY_ARTICLE_DETAIL,
        component: () =>
          import(
            "@/pages/community/pages/community-article-detail/community-article-detail.vue"
          ),
        meta: {
          title: "社区-文章详情",
        },
        props: (to) => ({ id: Number(to.params.id) }),
      },
    ],
  },
];

export default community;
