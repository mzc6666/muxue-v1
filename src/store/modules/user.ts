/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-22 21:15:42
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-22 21:36:54
 */
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

const useUserStore = defineStore(
  "user",
  () => {
    const age = ref(20);
    const changeAge = (newAge: number) => {
      age.value = newAge;
    };
    return {
      age,
      changeAge,
    };
  },
  {
    persist: {
      key: "userInfo-stata",
      storage: window.sessionStorage,
      paths: ["age"],
    },
  }
);

export default useUserStore;
