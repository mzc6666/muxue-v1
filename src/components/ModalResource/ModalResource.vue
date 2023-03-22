<!--
 * @Description: 模态框文件选择 
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-03-06 23:58:54
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-07 14:30:23
-->
<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import useList from "@/hooks/useList";
import { Message } from "@/utils/public";

type AcceptInterface =
  | ["file"]
  | ["folder", "file"]
  | ["resource", "folder", "file"];

const props = withDefaults(
  defineProps<{
    visible: boolean;
    accept: "file" | "resource" | "resource-folder";
  }>(),
  {}
);

const emits = defineEmits([
  "update:visible",
  "onSelectFile",
  "onSelectResource",
  "onSelectResourceOrFolder",
]);

const id = computed(() => history[history.length - 1].id); // -1代表顶层资源
const type = computed(() => history[history.length - 1].type); // id对应的类型

const history = reactive<{ id: number; type: "resource" | "folder" }[]>([
  { id: -1, type: "resource" },
]);

const { rlists, folderList, fileList, loading } = useList(id, type);

const selectFileId = ref<number>(-1); // 选中的文件ID
const selectFileName = ref<string>(""); // 选中的文件名

const handleSelect = () => {
  if (props.accept === "file") {
    selectFileId.value == -1
      ? Message("error", "未选中文件!!!")
      : emits("onSelectFile", selectFileId.value, selectFileName.value);
  } else if (props.accept === "resource") {
    type.value === "resource"
      ? emits("onSelectResource", id.value)
      : Message("error", "未选中资源!!!");
  } else {
    emits("onSelectResourceOrFolder", id.value, type.value);
  }
};
</script>
<template>
  <n-modal v-model:show="visible">
    <n-card
      style="width: 600px"
      title="修改用户信息"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header>
        <div>选择资源</div>
      </template>
      <div class="back-top-level">
        <p
          class="record-item"
          v-show="history.length != 1"
          @click="history.pop() && (selectFileId = -1) && (selectFileName = '')"
        >
          ...(返回上一级)
        </p>
        <p
          v-for="(item, index) in rlists"
          :key="item.sId"
          class="record-item"
          @click="history.push({ id: item.sId, type: 'resource' })"
        >
          {{ item.sName }}
        </p>
        <p
          v-for="(item, index) in folderList"
          :key="item.foId"
          class="record-item"
          @click="history.push({ id: item.foId, type: 'folder' })"
        >
          {{ item.foName }}
        </p>
        <p
          v-for="(item, index) in fileList"
          :key="item.fId"
          class="record-item"
          :class="selectFileId === item.fId ? 'select-file' : ''"
          @click="(selectFileId = item.fId) && (selectFileName = item.fileName)"
        >
          {{ item.fileName }}
        </p>
      </div>
      <template #footer>
        <div class="button-groups">
          <n-button type="primary" @click="handleSelect"> 确定 </n-button
          ><n-button type="error" @click="$emit('update:visible', false)">
            取消
          </n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>
<style scoped lang="scss">
.back-top-level {
  // position: absolute;
  // left: 0;
  // top: 0;
  // width: 100%;
  // height: 100%;
  // padding: 0 rem(60) 0 rem(30);
  max-height: 500px;
  overflow: auto;
  border-bottom: 1px solid #e4e4e4;
  .record-item {
    line-height: 3;
    border: 1px solid #e4e4e4;
    border-bottom: 0;
    padding: 0 1em;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background: #f4f4f4;
    }
  }
  .select-file {
    background: #e4e4e4;
  }
}

.button-groups {
  display: flex;
  flex-direction: row-reverse;
}
.button-groups > * {
  margin-left: 2em;
}
</style>
