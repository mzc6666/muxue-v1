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
import { onMounted, reactive, ref, watch, h } from "vue";
import { Message, Dialog } from "@/utils/public";
import Button from "@/components/Button/index.vue";
import ChapterItem from "../../../components/chapter-item/chapter-item.vue";
import Modal from "@/components/Modal/index.vue";
import FileSelect from "@/pages/resources/components/file-select/file-select.vue";
import Router from "@/route";
import { MAIN_COURSE_TASKS } from "@/constant/route/index";
import { useClassStore } from "@/store";

const classStore = useClassStore();

const cId = classStore.classId;

const taskCount = ref<number>(0); // 总任务点数
const accomplishCount = ref<number>(-1); // 总任务点完成数
const courseContent = reactive<Array<ChapterItem>>([]); // 课程内容
const addChapter = reactive({
  flag: false,
  text: "",
}); // 新增 章

// 获取数据
onMounted(() => {
  getCourseContent(cId)
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
    return ChapterRename(cId, chId, text)
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
      ChapterDelete(cId, chId)
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
  createNewChapter(cId, addChapter.text)
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
  return createNewSection(cId, chId, text)
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
    return SectionRename(cId, chId, secId, name)
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
        SectionDelete(cId, chId, secId)
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
      cId,
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

/**
 * @description: 查看任务点
 * @param { number } chId 章 ID
 * @param { number } secId 节 ID
 * @return {*}
 * @author: mzc
 */
const handleLookTasks = (chId: number, secId: number) => {
  Router.push({
    name: MAIN_COURSE_TASKS,
    params: { cId: cId, chId, secId },
  });
};
</script>
<template>
  <div class="container">
    <header>
      <!-- <Button @click="addChapter.flag = true"><span>新增章节</span></Button> -->
      <n-tag :bordered="false" type="success" @click="addChapter.flag = true">
        新增章节
      </n-tag>
    </header>
    <main>
      <div class="item-container">
        <div class="item-group">
          <!-- 新增 章节 -->
          <div class="add-chapter" v-if="addChapter.flag">
            <div class="left-input">
              <n-input
                v-model:value="addChapter.text"
                type="text"
                placeholder="输入章节名称"
              />
            </div>
            <div class="button-groups">
              <Button class="button" @click="handleChapterAdd"
                ><span>确定</span></Button
              >
              <!-- <n-tag
                :bordered="false"
                class="button"
                @click="handleChapterAdd"
                type="success"
              >
                确定
              </n-tag> -->
              <Button
                class="button"
                @click="
                  () => {
                    addChapter.flag = false;
                    addChapter.text = '';
                  }
                "
                ><span>取消</span></Button
              >
              <!-- <n-tag
                :bordered="false"
                class="button"
                @click="
                  () => {
                    addChapter.flag = false;
                    addChapter.text = '';
                  }
                "
                type="success"
              >
                取消
              </n-tag> -->
            </div>
          </div>
          <ChapterItem
            :style="{ margin: '8px 0', cursor: 'pointer' }"
            v-for="(item, index) in courseContent"
            :key="item.chId"
            v-bind:data="item"
            :onChapterEdit="onChapterEdit(item.chId, index)"
            :onChapterDelete="handleChapterDelete(item.chId, index)"
            :onAddSection="handleSectionAdd(item.chId, index)"
            :onSectionEdit="handleSectionEdit(item.chId, index)"
            :onSectionDelete="handleSectionDelete(item.chId, index)"
            @addTask="
              (secId, secondIndex) => {
                addTask = true;
                addTaskChIndex = index;
                addTaskChid = item.chId;
                addTaskSecid = secId;
                addTaskSecIndex = secondIndex;
              }
            "
            @look-tasks="handleLookTasks"
          >
          </ChapterItem>
        </div>
      </div>
    </main>
    <!-- 添加任务点 -->
    <Modal
      show
      hasNegative
      v-if="addTask"
      @update:show="addTask = false"
      @active-btn-click="hanleTaskAdd"
    >
      <template #header>
        <span>新增任务点</span>
      </template>
      <template #body>
        <div class="task-name-input">
          <n-input
            v-model:value="addTaskInfo.name"
            type="text"
            placeholder="输入任务名"
          />
        </div>
        <div class="task-file-select">
          <div class="select-options">
            <n-radio
              :checked="addTaskInfo.selectType === otherType"
              name="select-type"
              @change="addTaskInfo.selectType = 'other'"
            >
              其他文件
            </n-radio>
            <n-radio
              :checked="addTaskInfo.selectType === resourceType"
              name="select-type"
              @change="addTaskInfo.selectType = 'resource'"
            >
              我的资源内文件
            </n-radio>
          </div>
          <div class="select-file">
            <n-upload
              :default-upload="false"
              :max="1"
              v-show="addTaskInfo.selectType === otherType"
              @change="selectFile"
            >
              <n-upload-dragger>
                <n-text style="font-size: 16px">
                  点击或者拖动文件到该区域来上传
                </n-text>
                <n-p depth="3" style="margin: 8px 0 0 0">
                  请上传任务点指定的文件
                </n-p>
              </n-upload-dragger>
            </n-upload>
            <div
              class="button-upload"
              v-show="addTaskInfo.selectType === resourceType"
            >
              <FileSelect v-model:file="addTaskInfo.resourceFile"></FileSelect>
            </div>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>
<style scoped lang="scss">
.container {
  // display: flex;
  // flex-direction: column;
  overflow-y: auto;
  header {
    height: 125px;
    padding: 0 rem(50);
    // border-bottom: 1px solid red;
    display: flex;
    align-items: center;
    span {
      color: #fff;
      white-space: nowrap;
    }
  }
  main {
    // flex: 1;
    // overflow-y: auto;
    .item-container {
      padding: 0 rem(25);
      .item-group {
        padding: 0 rem(25);
        .add-chapter {
          padding: 8px 20px;
          display: flex;
          justify-content: space-between;
          background-color: map-get($map: $gray-colors, $key: 100);
          .button-groups {
            display: flex;
            .button {
              padding: 6px 12px;
            }
            .button:last-child {
              background-color: map-get($map: $gray-colors, $key: 400);
              margin-left: 20px;
            }
            span {
              white-space: nowrap;
              color: #fff;
              font-size: 14px;
            }
          }
        }
        .sub-section {
          display: flex;
          padding: 12px 20px;
          justify-content: space-between;
          .left {
            display: flex;
            .circle-task-count {
              width: 24px;
              height: 24px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 50%;
              font-size: 12px;
              color: #fff;
              background-color: map-get($map: $green-colors, $key: 600);
              // text-align: center;
            }
            span {
              margin-left: 20px;
            }
          }
          .right-btns {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            .icons {
              margin-right: 20px;
            }
            .icons:last-child {
              margin-right: 0;
            }
          }
          &:hover .right-btns {
            opacity: 1;
          }
        }
      }
    }
  }
}
.task-name-input {
  padding: 10px 0;
}
.task-file-select {
  .select-file {
    .button-upload {
      padding: 10px 0;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
