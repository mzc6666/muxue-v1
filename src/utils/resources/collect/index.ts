/*
 * @Description: 收藏 资源 / 文件夹 / 文件  通用回调函数
 * @Version:
 * @Autor: mzc
 * @Date: 2022-09-28 21:51:36
 * @LastEditors: mzc
 * @LastEditTime: 2022-10-04 14:47:23
 */

import { Message } from "@/utils/public";
import { resourceCollect } from "@apis/modules/resources";

/**
 * @description: 收藏功能函数
 * @param {number} id 资源ID
 * @param {array} rest 其他参数
 * @return {Promise}
 * @author: mzc
 */

const collectFn = (id: number, ...rest: any[]) => {
  return resourceCollect(id, ...rest);
};

/**
 * @description: 收藏/取消收藏   通用模板
 * @param {number} id  资源ID
 * @param {Function} activeEffect 成功副作用
 * @param {Function} errorEffect 失败副作用
 * @return {*}
 * @author: mzc
 */

export const handleCollect =
  (id: number, ...rest: any[]) =>
  async (
    activeEffect: Function,
    errorEffect: Function = (err: Error) => {
      console.log(`[Error] collect requrest error ${err}`);
    }
  ) => {
    try {
      const result = await collectFn(id, ...rest);
      activeEffect(result);
    } catch (err) {
      errorEffect(err);
    }
  };

/**
 * @description: 收藏成功的副作用函数
 * @param {any} item 资源项
 * @return {*}
 * @author: mzc
 */

export const collectEffect = (item: any) => (result: any) => {
  if (result.data.code === "200") {
    item.isCollection = !item.isCollection;
    Message("success", result.data.msg);
  }
};
