<!--
 * @Description: 课程详细信息
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-12-23 23:33:59
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-04 17:04:58
-->
<script setup lang="ts">
import {
  getCourseContent,
  createNewChapter,
  ChapterRename,
  ChapterDelete,
  createNewSection,
  SectionRename,
  SectionDelete,
  AddNewTask,
} from "@/api/modules/course";
import { onMounted, reactive, ref, watchEffect, watch, h } from "vue";
import { Message, Dialog } from "@/utils/public";
import Button from "../../components/Button/index.vue";
import ChapterItem from "../../components/chapter-item/chapter-item.vue";
import Modal from "@/components/Modal/index.vue";
import FileSelect from "@/pages/resources/components/file-select/file-select.vue";
import Router from "@/route";
import {
  MAIN_COURSE_ITEM_COMMENTS,
  MAIN_COURSE_ITEM_CONTENT,
  MAIN_COURSE_TASKS,
} from "@/constant/route/index";
import { RouterLink } from "vue-router";

const props = defineProps<{
  cId: number;
}>();

const taskCount = ref<number>(0); // 总任务点数
const accomplishCount = ref<number>(-1); // 总任务点完成数
const courseContent = reactive<Array<ChapterItem>>([]); // 课程内容
const addChapter = reactive({
  flag: false,
  text: "",
}); // 新增 章

// 获取数据
onMounted(() => {
  getCourseContent(props.cId)
    .then((res) => {
      taskCount.value = res.data.data.taskCount;
      accomplishCount.value = res.data.data.accomplishCount;
      courseContent.push(...res.data.data.chapters);
    })
    .catch((err) => void console.log(`getCourseContent err : ${err}`));
});

/**
 * @description: 章节重命名
 * @param { number } chId 章 ID
 * @param { number } index 索引
 * @author: mzc
 */
const onChapterEdit = (chId: number, index: number) => {
  return (text: string) => {
    return ChapterRename(props.cId, chId, text)
      .then((res) => {
        courseContent[index].chName = text;
        Message("success", res.data.msg);
      })
      .catch((err) => {
        console.log(`ChapterRename ${err}`);
      });
  };
};

const handleChapterDelete = (chId: number, index: number) => () => {
  Dialog("warning", {
    title: "警告",
    content: "确定删除该章节？",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: () => {
      ChapterDelete(props.cId, chId)
        .then((res) => {
          Message("success", res.data.msg);
          courseContent.splice(index, 1);
        })
        .catch((err) => void console.log(`ChapterDelete ${err}`));
    },
  });
};

/**
 * @description: 新增章节 回调
 * @return {*}
 * @author: mzc
 */
const handleChapterAdd = () => {
  createNewChapter(props.cId, addChapter.text)
    .then((res) => {
      Message("success", res.data.msg);
      courseContent.push(res.data.data);
    })
    .catch((err) => {
      console.log(`createNewChapter error ${err}`);
    })
    .finally(() => {
      addChapter.flag = false;
      addChapter.text = "";
    });
};
/**
 * @description: 新增 节
 * @param { nubmer } chId 章 ID
 * @param { number } index 索引
 * @return {*}
 * @author: mzc
 */
const handleSectionAdd = (chId: number, index: number) => (text: string) => {
  return createNewSection(props.cId, chId, text)
    .then((res) => {
      console.log(res);
      Message("success", res.data.msg);
      courseContent[index].sections.push(res.data.data);
    })
    .catch((err) => {
      console.log(`createNewSection error ${err}`);
    });
};

/**
 * @description: 节 重命名
 * @param {number} chId 章ID
 * @param {number} index1 一级索引
 * @return {*}
 * @author: mzc
 */
const handleSectionEdit =
  (chId: number, index1: number) =>
  (secId: number, name: string, index2: number) => {
    return SectionRename(props.cId, chId, secId, name)
      .then((res) => {
        courseContent[index1].sections[index2].secName = name;
        Message("success", res.data.msg);
      })
      .catch((err) => void console.log(`handleSectionEdit error ${err}`));
  };

/**
 * @description: 节 删除
 * @return {*}
 * @author: mzc
 */
const handleSectionDelete =
  (chId: number, index1: number) => (secId: number, index2: number) => {
    Dialog("warning", {
      title: "警告",
      content: "确定删除该小节？",
      positiveText: "确定",
      negativeText: "取消",
      onPositiveClick: () => {
        SectionDelete(props.cId, chId, secId)
          .then(() => {
            courseContent[index1].sections.splice(index2, 1);
          })
          .catch((err) => void console.log(`SectionDelete error ${err}`));
      },
    });
  };

const addTask = ref<boolean>(false); // 添加任务点 flag
const addTaskChid = ref<number>(-1); // 添加任务点  章 ID
const addTaskChIndex = ref<number>(-1); // 新增任务点 章 索引
const addTaskSecid = ref<number>(-1); // 添加任务点  节 ID
const addTaskSecIndex = ref<number>(-1); // 添加任务点 节 索引
const otherType = "other";
const resourceType = "resource";
const addTaskInfo = reactive<{
  name: string;
  file: File;
  selectType: "other" | "resource";
  resourceFile: string;
  fileId: number;
}>({
  name: "",
  file: null as any,
  selectType: otherType, // 选择文件 ( 非 我的资源 文件 / 我的资源的文件 )
  resourceFile: "",
  fileId: -1, // 我的资源选择 的 文件ID
});

watch(
  () => addTaskInfo.resourceFile,
  (current) => {
    const selectObj = JSON.parse(current);
    addTaskInfo.fileId = selectObj.id;
    addTaskInfo.name = selectObj.name;
  }
);

/* 选择文件 */
const selectFile = (options: any) => {
  addTaskInfo.file = options.file.file;
  const index = options.file.file.name.lastIndexOf(".");
  addTaskInfo.name = options.file.file.name.slice(0, index);
};
/**
 * 新增任务点处理函数
 */
const hanleTaskAdd = async () => {
  try {
    const result = await AddNewTask(
      props.cId,
      addTaskChid.value,
      addTaskSecid.value,
      addTaskInfo.selectType === otherType
        ? {
            type: addTaskInfo.selectType,
            name: addTaskInfo.name,
            file: addTaskInfo.file,
          }
        : {
            type: addTaskInfo.selectType,
            name: addTaskInfo.name,
            fileId: addTaskInfo.fileId,
          }
    );
    // 添加任务点显示数量
    courseContent[addTaskChIndex.value].sections[addTaskSecIndex.value]
      .tasksNum++;
    Message("success", result.data.msg);
  } catch (err) {
    console.log(`AddNewTask error ${err}`);
  }
  // 回归初始值
  /*  */
  addTask.value = false;
};


const menuOptions = reactive([
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: MAIN_COURSE_ITEM_CONTENT,
          },
        },
        { default: () => "课程内容" }
      ),
    key: MAIN_COURSE_ITEM_CONTENT,
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: MAIN_COURSE_ITEM_COMMENTS,
          },
        },
        { default: () => "课程讨论" }
      ),
    key: MAIN_COURSE_ITEM_COMMENTS,
  },
]);
</script>
<template>
  <div class="container1">
    <aside>
      <n-menu
        :options="menuOptions"
        :default-expanded-keys="[MAIN_COURSE_ITEM_CONTENT]"
      />
    </aside>
    <router-view class="route-content"></router-view>
  </div>
</template>
<style scoped lang="scss">
/* 上传任务点css */
.container1 {
  display: flex;
  aside {
    width: 160px;
    padding-top: 1em;
  }
  .route-content {
    flex: 1;
  }
}
</style>
