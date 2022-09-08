/*
 * @Description: resources相关 global state
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-20 12:01:25
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-07 11:03:49
 */
import { MAIN_RESOURCE_MYRESOURCE } from "@constants/route";
import { defineStore, StateTree } from "pinia";
import { RouteLocationRaw } from "vue-router";
import { computed, reactive, ref } from "vue";

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

const useResourcesStore = defineStore("resources", {
  state() {
    return {
      recordArr: [
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
      ] as [string, singlePath[]][],
    };
  },
  getters: {
    recordMap(): Map<string, singlePath[]> {
      return new Map(this.recordArr);
    },
  },
  actions: {
    getRecordFromMap({ sId = null, foId = null }: groupId = {}) {
      let attr = `sId=${sId}&foId=${foId}`;
      return this.recordMap.get(attr) ?? [];
    },
    addRecordToMap(
      { foId = null, sId = null }: groupId = {},
      value: singlePath[]
    ) {
      let attr = `sId=${sId}&foId=${foId}`;
      if (this.recordMap.get(attr)) {
        return;
      } else {
        this.recordArr.push([attr, value]);
      }
    },
  },
  persist: {
    key: "resource-store",
    storage: sessionStorage,
  },
});

export default useResourcesStore;
