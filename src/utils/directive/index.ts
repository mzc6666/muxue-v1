/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-29 20:58:01
 * @LastEditors: mzc
 * @LastEditTime: 2023-04-27 15:55:03
 */

const vSelect = {
  mounted: (el: any) => {
    el.tagName === "INPUT" ? el.select() : el.querySelector("input").select();
  },
};

export default (app: any) => {
  app.directive("select", vSelect);
};
