/*
 * @Description: pinia实例
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-08 16:16:56
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-02 14:38:43
 */
import useResourcesStore from "./modules/resource";
import useUserStore from "./modules/user";
import useMessageStore from "./modules/message";

import { createPinia } from "pinia";


export { useResourcesStore,useUserStore ,useMessageStore};
