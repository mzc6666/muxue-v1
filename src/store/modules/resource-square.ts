import { defineStore } from "pinia";
import { Ref, ref } from "vue";

const useResourceSquareStore = defineStore("resource-square", () => {
  const lookId = ref(-1); // 当前查看的ID

  const setLookId = (id: number) => void (lookId.value = id);

  return {
    lookId,
    setLookId,
  };
});

export default useResourceSquareStore;
