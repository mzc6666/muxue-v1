/*
 * @Description: 入口文件
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-04 17:00:05
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-02 14:38:25
 */
import "./assets/iconfont/iconfont.js";
import { createApp } from "vue";
import { createPinia } from "pinia";
// import pinia from "./store/index.js";
import PiniaPersist from "pinia-plugin-persist";
import router from "./route";
import App from "./App.vue";
import initFn from "@/utils/init";
import naive from "./plugins/naive";

const app = createApp(App);
initFn(app);
const pinia = createPinia();
pinia.use(PiniaPersist);
app.use(pinia).use(router).use(naive).mount("#app");
