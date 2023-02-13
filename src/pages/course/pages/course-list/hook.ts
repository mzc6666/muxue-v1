/*
 * @Description: 课程列表 hook
 * @Version:
 * @Autor: mzc
 * @Date: 2022-12-30 19:15:47
 * @LastEditors: mzc
 * @LastEditTime: 2022-12-30 19:33:08
 */
import { ref } from "vue";
import { getCourseList } from "@/api/modules/course";
export const useCourseList = () => {
  const courses = ref<ClassItem[]>();
  const error = ref<Error>();
  const waiting = ref<boolean>(true);
  // 获取数据
  function getData() {
    getCourseList()
      .then((res) => {
        courses.value = res.data.data;
      })
      .catch((err) => {
        error.value = err;
      })
      .finally(() => {
        waiting.value = false;
      });
  }
  // 添加课程
  function addCourseItem(course: ClassItem) {
    courses.value?.push(course);
  }

  getData();

  return {
    courses,
    error,
    waiting,
    addCourseItem,
  };
};
