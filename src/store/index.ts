/*
 * @Description: pinia实例
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-08 16:16:56
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-04 12:29:39
 */
import useResourcesStore from "./modules/resource";
import useUserStore from "./modules/user";
import useMessageStore from "./modules/message";
import useClassStore from './modules/course'

import { createPinia } from "pinia";


export { useResourcesStore,useUserStore ,useMessageStore, useClassStore};
