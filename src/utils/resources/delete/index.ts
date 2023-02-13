/*
 * @Description: 删除 资源 / 文件夹 / 文件 通用调用模板
 * @Version:
 * @Autor: mzc
 * @Date: 2022-09-28 21:25:14
 * @LastEditors: mzc
 * @LastEditTime: 2022-10-04 15:12:47
 */

import { Dialog, Message } from "@/utils/public";
import {
  deleteFolder,
  deleteResource,
  fileDelete,
} from "@apis/modules/resources";

// 策略对象
const deleteStrategy: resourceStrategist = {
  resource: (id: number, ...rest: any[]) => deleteResource(id, ...rest),
  folder: (id: number, ...rest: any[]) => deleteFolder(id, ...rest),
  file: (id: number, ...rest: any[]) => fileDelete(id, ...rest),
};

/**
 * @description: 副作用模板， 传入数组 和 索引 用于删除子项
 * @param {Array} lists 列表
 * @param {number} index 索引
 * @return {*}
 * @author: mzc
 */

export const deleteEffect =
  (lists: Array<any>, index: number) => (result: any) => {
    if (result.data.code === "200") {
      lists.splice(index, 1);
      Message("success", result.data.msg);
    }
  };

/**
 * @description: 删除 资源/文件夹/文件    通用模板
 * @param {Function} deleteFn  删除函数
 * @param {Function} activeEffect 删除成功的副作用
 * @param {Function} errorEffect 删除失败的副作用
 * @return {*}
 * @author: mzc
 */

const onDelete = (
  deleteFn: Function,
  activeEffect: Function,
  errorEffect: Function
) => {
  Dialog("warning", {
    title: "确定删除吗",
    content: "10天内可以从回收站撤销",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      try {
        const result = await deleteFn();
        activeEffect(result);
      } catch (err) {
        errorEffect(err);
      }
    },
  });
};

/**
 * @description: 删除回调函数模板
 * @param {Types} type 删除的类型
 * @param {resourceStrategist} rules 不同删除类型下的解决方法
 * @return {*}
 * @author: mzc
 */

export const handleDelete =
  (type: Types, rules: resourceStrategist = deleteStrategy) =>
  (id: number, ...rest: any[]) =>
  (
    activeEffect: Function,
    errorEffect: Function = (err: Error) => {
      console.log(`[Error] ${type} delete error: ${err}`);
    }
  ) => {
    console.log("activeEffect", activeEffect);
    onDelete(() => rules[type](id, ...rest), activeEffect, errorEffect);
  };

export const handleResourceDelete = handleDelete("resource");
export const handleFolderDelete = handleDelete("folder");
export const handleFileDelete = handleDelete("file");
