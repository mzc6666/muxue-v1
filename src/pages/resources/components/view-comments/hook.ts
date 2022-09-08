/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2022-09-07 16:30:43
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-07 20:10:56
 */
import { isRef, Ref, ref, unref, watchEffect } from "vue";
import { getResourceComment } from "@apis/modules/resources";

/**
 * @description: 获取资源评论Hook
 * @param {number} id 资源ID
 * @return {*}
 * @author: mzc
 */

export const useComment = (id: number | Ref<number>) => {
  const result = ref<any>(null);
  const error = ref<any>(null);
  const getComments = () => {
    getResourceComment(unref(id))
      .then((res) => {
        result.value = res.data.data;
      })
      .catch((err) => {
        error.value = err;
      });
  };
  if (isRef(id)) {
    watchEffect(getComments);
  } else {
    getComments();
  }
  return { result, error };
};
