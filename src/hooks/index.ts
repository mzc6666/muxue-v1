/*
 * @Description: 自定义组合式函数
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-28 14:31:58
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-30 09:57:36
 */
import { onBeforeUnmount, onMounted, onUnmounted, ref, unref } from "vue";

/**
 * @description: 组合式函数--事件
 * @param {string} event 事件
 * @param {any} target 目标对象
 * @param {Function} callback 回调函数
 * @return {*}
 * @author: mzc
 */
export const useEvent = (event: string, target: any, callback: Function) => {
  onMounted(() => {
    unref(target).addEventListener(event, callback);
  });
  onBeforeUnmount(() => {
    unref(target).removeEventListener(event, callback);
  });
};

/**
 * @description: 组合式函数-定时器
 * @param {Function} fun 要执行的函数
 * @param {number} gap 时间间隔
 * @return {*}
 * @author: mzc
 */
export const useInterval = (fun: Function, gap : number = 60) => {
  let timer: any = null;
  onMounted(() => {
    timer = setInterval(() => {
      fun();
    }, gap);
  });

  onBeforeUnmount(() => {
    clearInterval(timer);
  });
};
