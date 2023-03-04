import { defineStore } from "pinia";
import { Ref, ref } from "vue";

const useClassStore = defineStore(
  "class",
  () => {
    const classId = ref(-1); // 课程ID

    const setClassId = (id: number) => void (classId.value = id);

    const topLevelCommentId = ref(-1); // 查看顶层评论ID

    const setTopLevelCommentId = (id: number) =>
      void (topLevelCommentId.value = id);

    const lookTopComment: Ref<CourseCommenInterface> = ref(null as any);

    const setLookTopCOmment = (comment: CourseCommenInterface) =>
      void (lookTopComment.value = comment);

    return {
      classId,
      setClassId,
      topLevelCommentId,
      setTopLevelCommentId,
      lookTopComment,
      setLookTopCOmment,
    };
  },
  {}
);

export default useClassStore;
