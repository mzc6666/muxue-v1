/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2023-03-06 21:45:24
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-06 22:39:07
 */
import { ref, Ref, watchEffect } from "vue";
import { getTasks } from "@/api/modules/course";

const useTaskList = (id: Ref<number>) => {
  const lists = ref<CourseTaskInterface[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<boolean>(false);

  watchEffect(() => {
    loading.value = true;
    getTasks(id.value)
      .then((res) => {
        // console.log("res: ", res.data.data);
        lists.value = res.data.data;
      })
      .catch((error) => {
        // console.log("error: ", error);
        error.value = true;
      })
      .finally(() => {
        loading.value = false;
      });
  });
  return {
    lists,
    loading,
    error,
  };
};

export default useTaskList;
