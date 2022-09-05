/*
 * @Description: 项目初始化
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-04 19:22:43
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-29 21:06:03
 */

import axios from "axios";
import svgIcon from "@components/svg-icon/svg-icon.vue";
import Vue, { initCustomFormatter } from "vue";
import registerGlobalRective from "../directive";
/**
 * @description: axios配置默认值
 * @return {void}
 * @author: mzc
 */

const axiosInit = () => {
  axios.defaults.baseURL = "https://mock.apifox.cn/m1/1283173-0-default/mx/v1";
  axios.defaults.timeout = 4000;
  axios.defaults.headers.post["Content-Type"] = "application/json";
};

/**
 * @description: 全局注册 svg-icon 组件
 * @return {*}
 * @author: mzc
 */

const registerSvgIcon = (app: any) => {
  app.component("svg-icon", svgIcon);
};

/**
 * @description: 初始化rem
 * @return {*}
 * @author: mzc
 */

const initRem = () => {
  resize();
  function resize() {
    document.documentElement.style.fontSize =
      document.documentElement.clientWidth / 20 + "px";
  }
  window.onresize = resize;
};

/**
 * @description: 初始化函数，用于项目的初始化工作
 * @return {*}
 * @author: mzc
 */

export default (app: any) => {
  axiosInit();
  registerSvgIcon(app);
  initRem();
  registerGlobalRective(app);
};
