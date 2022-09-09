/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2022-09-06 17:46:27
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-06 23:10:47
 */
import { isRef, ref, Ref, unref, watch, watchEffect } from "vue";
import { searchThing } from "@apis/modules/resources";
import { Debounce } from "@/utils/public";

/**
 * @description: 获取搜索结果的hook
 * @param {'r' | 'f' | 'file' | Ref<'r' | 'f' | 'file'>} type 搜索的tag
 * @param {Ref<string> | string} text 关键词
 * @return {*}
 * @author: mzc
 */

export const useSearch = (
  type: 0 | 1 | 2 | 3 | Ref<0 | 1 | 2 | 3>,
  text: Ref<string>
) => {
  const keyword = ref(unref(text));
  watch(
    text,
    Debounce(() => {
      keyword.value = unref(text);
    }, 400),
    {
      immediate: true,
    }
  );

  const result = ref<any>(null);
  const handler = () => {
    console.log("keywords ",unref(keyword),"type", unref(type))
    if (unref(keyword)) {
      searchThing(unref(keyword), unref(type))
        .then((res) => {
          console.log("searchThing res", res);
          result.value = res.data.data;
        })
        .catch((err) => {
          console.log("searchThing error",err)
          result.value = null;
        });
    } else {
      result.value = null;
    }
  };
  if (isRef(text)) {
    watchEffect(handler);
  } else {
    handler();
  }
  return { result };
};
