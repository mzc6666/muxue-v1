/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-29 20:58:01
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-03 16:14:19
 */

const vSelect = {
  mounted: (el: any) => {
    el.querySelector("input").select();
  },
};

export default (app: any) => {
  app.directive("select", vSelect);
};
