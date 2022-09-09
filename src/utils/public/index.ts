/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-24 10:25:18
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-06 21:11:15
 */
import { createDiscreteApi } from "naive-ui";

/**
 * @description: 获取表示时间的字符串
 * @param {string} timeStamp `1988-09-18 07:39:53` 如此格式的表示时间的字符串
 * @return {*}
 * @author: mzc
 */

export const getTimeString = (timeStamp: string) => {
  const time = new Date(timeStamp);
  const timeObj = {
    year: time.getFullYear(),
    month: time.getMonth(),
    day: time.getDate(),
    hour: time.getHours(),
    minute: time.getMinutes(),
  };
  return `${timeObj.year.toString().slice(2)}/${
    timeObj.month + 1 < 10 ? "0" + (timeObj.month + 1) : timeObj.month + 1
  }/${timeObj.day < 10 ? "0" + timeObj.day : timeObj.day}  ${
    timeObj.hour < 10 ? "0" + timeObj.hour : timeObj.hour
  }:${timeObj.minute < 10 ? "0" + timeObj.minute : timeObj.minute}`;
};

const { dialog, loadingBar, message, notification } = createDiscreteApi([
  "dialog",
  "loadingBar",
  "message",
  "notification",
]);

/**
 * @description: 弹出消息API
 * @param {'info' | 'error' | 'warning' | 'success' | 'loading'} type 弹出类型
 * @param {string} text 内容
 * @param {any} config 其他配置
 * @return {*}
 * @author: mzc
 */

export const Message = (
  type: "info" | "error" | "warning" | "success" | "loading",
  text: string,
  config: any = { duration: 3000 }
) => {
  message[type](text, config);
};

/**
 * @description: dialog弹出框API
 * @param {'warning' | 'success' | 'error'} type 弹出类型
 * @param {any} config 配置对象
 * @return {*}
 * @author: mzc
 */

export const Dialog = (
  type: "warning" | "success" | "error",
  config: any = {}
) => {
  dialog[type](config);
};

/**
 * @description: 通知API
 * @param {"info" | "success" | "warning" | "error" | "create"} type 类型
 * @param {any} config 配置
 * @return {*}
 * @author: mzc
 */

export const Notification = (
  type: "info" | "success" | "warning" | "error" | "create" = "create",
  config: any = {}
) => {
  notification[type](config);
};

/**
 * @description: 防抖函数
 * @param {Function} fn 执行的函数
 * @param {number} delay 推迟的时间
 * @return {*}
 * @author: mzc
 */

export const Debounce = (fn: Function, delay: number) => {
  let timer: null | number = null;
  return function (...rest: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      fn(...rest);
    }, delay);
  };
};

/**
 * @description: 节流函数
 * @param {Function} fn 执行的函数
 * @param {number} delay 延时的时间
 * @return {*}
 * @author: mzc
 */

export const Throttle = (fn: Function, delay: number) => {
  let door: boolean = true;
  return function (...rest: any[]) {
    if (door) {
      door = false;
      fn(...rest);
      setTimeout(() => {
        door = true;
      }, delay);
    }
  };
};


export const transformSize = (size: number) => {
  const mb = size / 1024 / 1024;
  return mb.toFixed(2) + 'MB';
}