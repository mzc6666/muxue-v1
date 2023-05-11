/*
 * @Description: 课程列表 hook
 * @Version:
 * @Autor: mzc
 * @Date: 2022-12-30 19:15:47
 * @LastEditors: Austral
 * @LastEditTime: 2023-05-11 14:06:48
 */
import { ref } from "vue";
import { getCourseList,getCourseListPublish,getCourseListOpen } from "@/api/modules/course";
export const useCourseList = () => {
  const courses = ref<ClassItem[]>();
  const coursesPublish = ref<ClassItem[]>();
  const coursesOpen = ref<ClassItem[]>();
  const error = ref<Error>();
  const waiting = ref<boolean>(true);
  // 获取我加入的课程数据
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
      getCourseListPublish()
      .then(res=>{
        console.log('publisi=h');
        console.log(res);
        coursesPublish.value=res.data.data
      })
      .catch((err) => {
        error.value = err;
      })
      .finally(() => {
        waiting.value = false;
      });
      getCourseListOpen()
      .then(res=>{
        coursesOpen.value=res.data.data
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
    coursesPublish,
    coursesOpen,
    error,
    waiting,
    addCourseItem,
  };
};
