/*
 * @Description: 
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-03-07 21:20:54
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-08 11:17:12
 */
import { CascaderOption } from "naive-ui";
import { onMounted, reactive, ref } from "vue";
import {
  getCourseList,
  getCourseContent,
  getTasks,
} from "@/api/modules/course";
const useOptions = () => {
  const multipleOptions = ref<CascaderOption[]>([]);

  const setOptionChildren = async (option: CascaderOption) => {
    if ((option.depth as number) == 1) {
      try {
        const result = await getCourseContent(option.value as number);
        if (result.data.code === "200") {
          option.children = result.data.data.chapters.map(
            (chaptItem: ChapterItem) => {
              return {
                label: chaptItem.chName,
                value: chaptItem.chId,
                depth: 2,
                isLeaf: false,
                children: chaptItem.sections.map(
                  (sectionItem: SectionItem) => ({
                    label: sectionItem.secName,
                    value: sectionItem.secId,
                    depth: 3,
                    isLeaf: false,
                  })
                ),
              };
            }
          );
        }
      } catch (error) {}
    } else if (option.depth === 3) {
      try {
        const result = await getTasks(option.value as number);
        if (result.data.code === "200") {
          option.children = result.data.data.map(
            (taskItem: CourseTaskInterface) => ({
              label: taskItem.title,
              value: taskItem.taskId,
              depth: 4,
              isLeaf: true,
            })
          );
        }
      } catch (error) {}
    }
  };

  const handleLoad = (option: CascaderOption) => {
    return new Promise<void>((resolve) => {
      setOptionChildren(option);
      resolve();
    });
  };

  onMounted(() => {
    async function getCourse() {
      try {
        const result = await getCourseList();
        if (result.data.code === "200") {
          result.data.data.forEach((courseItem: ClassItem) => {
            multipleOptions.value.push({
              label: courseItem.cName,
              value: courseItem.cId,
              depth: 1,
              isLeaf: false,
            });
          });
        }
      } catch (error) {}
    }
    getCourse();
  });

  return {
    multipleOptions,
    handleLoad,
  };
};

export default useOptions;
