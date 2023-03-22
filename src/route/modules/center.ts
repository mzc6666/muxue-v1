import { RouteRecordRaw } from "vue-router";
import { MAIN_MY_CENTER } from '@/constant/route'


const centersRoutes : RouteRecordRaw[] = [
 {
  path: 'my-center',
  name: MAIN_MY_CENTER,
  component: () => import("@/pages/my-center/my-center.vue"),
  meta: {
    title: '我的中心'
  }
 }
]

export default centersRoutes;