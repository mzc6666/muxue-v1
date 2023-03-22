<!--
 * @Description: 课程任务点
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-01-06 20:41:26
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-07 14:22:26
-->
<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import TaskItem from "./components/task-item.vue";
import ModalResource from "@components/ModalResource/ModalResource.vue";
import useTaskList from "./hooks/useTaskList";
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
import { accomplishTask, addTask, deleteTask } from "@/api/modules/course";
import { Dialog, Message } from "@/utils/public";

const props = withDefaults(
  defineProps<{
    secId: number;
  }>(),
  {}
);

const id = ref<number>(props.secId);

const { lists, loading } = useTaskList(id);

// 完成任务点
const handleComplete = async (taskId: number, index: number) => {
  try {
    const result = await accomplishTask(taskId);
    if (result.data.code === "200") {
      lists.value[index].hasFinish = true;
    }
  } catch (error) {}
};

// 添加任务点
const options = reactive([
  {
    label: "资源内选择",
    value: "resources",
  },
  {
    label: "文件选择",
    value: "other-file",
  },
  {
    label: "文字内容",
    value: "other-text",
  },
]);
const visible_add = ref<boolean>(false);

const type = ref<"resources" | "other-file" | "other-text">("other-file"); // 选择类型

const isSelectResource = computed(() => type.value === "resources");

const fileId: any = ref(null); // 选中的文件ID
const fileName = ref<string>(""); // 选中的文件名称

const title = ref<string>(""); // 标题
const content = ref<string>(""); // 内容

const file = ref(null); // 文件
const handleFileSelect = (args: any) => {
  file.value = args.file.file;
};

// 新增任务点
const handleTaskAdd = async () => {
  try {
    const result = await addTask({
      title: title.value,
      type: type.value,
      secId: props.secId,
      content: type.value === "other-text" ? content.value : null,
      fileId: type.value === "resources" ? fileId.value : null,
      file: type.value === "other-file" ? file.value : null,
    });
    if (result.data.code === "200") {
      lists.value.push(result.data.data);
    }
  } catch (error) {
    console.log("handleTaskAdd error: ", error);
  }
  visible_add.value = false;
};

// 删除任务点
const handleDelete = (taskId: number, index: number) => {
  Dialog("warning", {
    title: "警告",
    content: "确定删除该任务点？",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      try {
        const result = await deleteTask(taskId);
        if (result.data.code === "200") {
          lists.value.splice(index, 1);
          Message("success", result.data.msg);
        }
      } catch (error) {}
    },
  });
};
</script>
<template>
  <div class="tasks-container">
    <header>
      <n-tag
        :bordered="false"
        type="success"
        class="add-tag"
        @click="visible_add = true"
      >
        添加任务点
      </n-tag>
    </header>
    <div class="task-lists">
      <TaskItem
        v-for="(item, index) in lists"
        :key="item.taskId"
        v-bind="item"
        @on-complete="handleComplete(item.taskId, index)"
        @on-delete="handleDelete(item.taskId, index)"
      ></TaskItem>
    </div>
    <!-- 添加任务点 -->
    <n-modal v-model:show="visible_add">
      <n-card
        style="width: 600px"
        title="创建任务点"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <template #header>
          <div>
            <div style="line-height: 2">标题</div>
            <n-select v-model:value="type" :options="options" />
          </div>
        </template>
        <!-- 选择文件上传 -->
        <n-upload
          :default-upload="false"
          :max="1"
          @change="handleFileSelect"
          v-show="type === 'other-file'"
        >
          <n-upload-dragger>
            <div style="margin-bottom: 12px">
              <n-icon size="48" :depth="3">
                <archive-icon />
              </n-icon>
            </div>
            <n-text style="font-size: 16px">
              点击或者拖动文件到该区域来上传
            </n-text>
            <n-p depth="3" style="margin: 8px 0 0 0">选择资源 </n-p>
          </n-upload-dragger>
        </n-upload>
        <!-- 选择资源内选择 -->
        <div class="resource-file-select" v-show="type === 'resources'">
          <ModalResource
            v-model:visible="isSelectResource"
            accept="file"
            @on-select-file="(id, name) => (fileId = id) && (fileName = name)"
          />
          <p>{{ fileName }}</p>
        </div>
        <!-- 选择文字内容 -->
        <div class="text-container" v-show="type === 'other-text'">
          <n-input
            type="textarea"
            show-count
            :autosize="{
              minRows: 4,
              maxRows: 6,
            }"
            placeholder="请输入任务点内容"
            v-model:value="content"
          >
          </n-input>
        </div>
        <template #footer>
          <div class="button-groups">
            <n-button type="primary" @click="handleTaskAdd"> 确定 </n-button
            ><n-button type="error" @click="visible_add = false">
              取消
            </n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>
<style scoped lang="scss">
.tasks-container {
  height: 100%;
  overflow: auto;
  header {
    padding: 20px rem(50);
    .add-tag {
      cursor: pointer;
    }
  }
}

// .task-lists {
//   height: 100%;
//   overflow: auto;
// }
.button-groups {
  display: flex;
  flex-direction: row-reverse;
}
.button-groups > * {
  margin-left: 2em;
}
</style>
