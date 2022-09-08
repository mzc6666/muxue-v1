/*
 * @Description: 入口文件
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-04 17:00:05
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-08 23:16:49
 */
import "./assets/iconfont/iconfont.js";
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "./route";
import App from "./App.vue";
import initFn from "@/utils/init";
import naive from "./plugins/naive";

const app = createApp(App);
initFn(app);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia).use(router).use(naive).mount("#app");
console.log("app begin");
