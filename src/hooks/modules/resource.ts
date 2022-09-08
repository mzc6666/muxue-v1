/*
 * @Description: hooks
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-28 14:32:25
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-06 21:20:14
 */
import {
  getResourceInfo,
  getFolderInfo,
  getFileInfo,
} from "@apis/modules/resources";
import { isRef, Ref, ref, unref, watchEffect } from "vue";

/**
 * @description: 通过id和type动态获取数据
 * @param {any} id (资源 / 文件夹 / 文件) ID
 * @param {any} type 类型
 * @return {*}
 * @author: mzc
 */

export const useInfo = (
  id: Ref<number> | number,
  type: Ref<"r" | "f" | "file"> | "r" | "f" | "file"
) => {
  const data = ref<any>(null);
  const error = ref<any>(null);
  const getData = async () => {
    data.value = null;
    error.value = null;
    if (unref(type) === "r") {
      try {
        const result = await getResourceInfo(unref(id));
        data.value = result.data.data;
      } catch (err) {
        error.value = err;
      }
    } else if (unref(type) === "f") {
      try {
        const result = await getFolderInfo(unref(id));
        data.value = result.data.data;
      } catch (err) {
        error.value = err;
      }
    } else if (unref(type) === "file") {
      try {
        const result = await getFileInfo(unref(id));
        data.value = result.data.data;
      } catch (err) {
        error.value = err;
      }
    }
  };

  if (isRef(id) || isRef(type)) {
    watchEffect(getData);
  } else {
    getData();
  }
  return {
    data,
    error,
  };
};
