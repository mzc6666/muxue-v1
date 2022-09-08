/*
 * @Description: 我的资源页面使用的工具函数
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-24 10:29:43
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-06 11:40:39
 */

import { createFolder, uploadFiles } from "@apis/modules/resources";
import { AxiosPromise, AxiosResponse } from "axios";
import { Message } from "../public";

/**
 * @description: 构造文件夹结构
 * @param {FileList} files 文件
 * @return {*}
 * @author: mzc
 */

/**
 * @description: 上传文件夹的结构
 * @param {FileList} files
 * @return {*}
 * @author: mzc
 */

export const buildFileTreeStruct = (files: FileList) => {
  const treeObj = { dires: {}, files: [] };
  let beginDireName: string = "";
  for (let i = 0; i < files.length; i++) {
    const rs = files[i].webkitRelativePath.split("/");
    beginDireName = rs[0];
    let curPos: any = treeObj; // 起始位置
    for (let j = 1; j < rs.length - 1; j++) {
      let key = rs[j];
      if (curPos.dires[key]) {
        curPos = curPos.dires[key];
      } else {
        curPos.dires[key] = { dires: {}, files: [] };
        curPos = curPos.dires[key];
      }
    }
    curPos.files.push(files[i]);
  }
  return [beginDireName, treeObj];
};

/**
 * @description: 创建文件夹
 * @param {any} treePos 文件夹状态
 * @param {number} id 文件夹ID
 * @param {Array<Promise<AxiosPromise>>} promiseAll promise对象数组
 * @return {*}
 * @author: mzc
 */

export const createFullFolder = async (
  rId: number,
  folderId: number,
  name: any,
  treeObj: any
) => {
  /**
   * @description: 递归函数(创建文件夹并上传文件)
   * @param {any} treeObj object结构
   * @param {number} sId 资源ID
   * @param {number} folderId 文件夹ID
   * @param {Array<Promise<AxiosResponse>>} promiseAll promise数组
   * @return {*}
   * @author: mzc
   */
  const create = async (treeObj: any, sId: number, folderId: number) => {
    for (let file of treeObj.files) {
      await uploadFiles(file, 2, folderId);
      console.log("上传文件", file.name);
    }
    for (let name of Object.keys(treeObj.dires)) {
      try {
        const result = await createFolder(rId, folderId, name);
        console.log("新建文件夹", name);
        create(treeObj.dires[name], sId, result.data.data);
      } catch (err) {
        console.log("createFolder error", err);
      }
    }
  };

  return new Promise(async (resolve, reject) => {
    try {
      const result = await createFolder(rId, folderId, name);
      await create(treeObj, rId, result.data.data);
      Message("success", "上传成功");
      resolve("");
    } catch (err) {
      console.log("createFullFolder error", err);
    }
  });
};
