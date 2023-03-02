/*
 * @Description: resources相关 global state
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-20 12:01:25
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-01 21:47:01
 */
import { MAIN_RESOURCE_MYRESOURCE } from "@constants/route";
import { defineStore, StateTree } from "pinia";
import { RouteLocationRaw } from "vue-router";
import { computed, reactive, Ref, ref } from "vue";

// interface Options {
//   sId?: number | null;
//   fId?: number | null;
// }

// interface Value {
//   path: {
//     name: string;
//     params?: Object;
//   };
//   text: string;
// }

const useResourcesStore = defineStore("resources",() => {
  const recordArr : [string, singlePath[]][]  = reactive([
    [
      "sId=null&foId=null",

      [
        {
          path: {
            name: MAIN_RESOURCE_MYRESOURCE,
          },
          text: "我的资源",
        },
      ],
    ],
  ]);

 const recordMap :Ref< Map<string,singlePath[]>>=   computed(() => {
  return  new Map(recordArr);
  });

  function getRecordFromMap({ sId = null, foId = null }: groupId = {}) {
    let attr = `sId=${sId}&foId=${foId}`;
    return recordMap.value.get(attr) ?? [];
  };

 function addRecordToMap(
    { foId = null, sId = null }: groupId = {},
    value: singlePath[]
  ) {
    let attr = `sId=${sId}&foId=${foId}`;
    if (recordMap.value.get(attr)) {
      return;
    } else {
      recordArr.push([attr, value]);
    }
  }

  return {
    recordMap,
    recordArr,
    getRecordFromMap,
    addRecordToMap
  }

},{
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'resources-store',
        storage: sessionStorage
      }
    ]
  }
});

export default useResourcesStore;