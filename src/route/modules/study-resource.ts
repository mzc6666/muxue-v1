import {RouteRecordRaw} from 'vue-router';
import resources from "./resources";
import resourceSquare from "./resource-square";
import { MAIN_RESOURCE } from '@constants/route';

const studyResource: RouteRecordRaw[] = [
  {
    path:'studyResource',
    name:'studyResource',
    component:()=>import('@pages/study-resource/index.vue'),
    meta: {
      title:'学习资源'
    },
    redirect: {name:MAIN_RESOURCE},
    children:[
      ...resources,
      ...resourceSquare,
    ]
  }
]

export default studyResource;