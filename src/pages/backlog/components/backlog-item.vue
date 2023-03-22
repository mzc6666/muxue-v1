<!--
 * @Description: 
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-03-07 22:30:21
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-08 12:05:23
-->
<script setup lang="ts">
import { Dialog } from "@/utils/public";
import { ref, reactive, nextTick } from "vue";

const props = defineProps<{
  type: "primary" | "times";
  pId: number;
  name: string;
  isFinished: boolean;
}>();

const emits = defineEmits(["onFinish", "onDelete"]);

const xRef = ref<number>(0); // y坐标
const yRef = ref<number>(0); // x坐标
const showDropdown = ref<boolean>(false); // contextmenu显示
const dropdownOptions = reactive([
  { label: "删除", key: "delete" },
  { label: "修改", key: "change" },
]);
const handleContextMenu = (event: MouseEvent) => {
  showDropdown.value = false;
  nextTick().then(() => {
    // showDropdown.value = true;
    xRef.value = event.clientX;
    yRef.value = event.clientY;
  });
};

// 删除
const handleDelete = () => {
  Dialog("warning", {
    title: "警告",
    content: "确定删除该代办？",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: () => emits("onDelete"),
  });
};
</script>
<template>
  <!-- @contextmenu.prevent="handleContextMenu" -->
  <div class="backlog-item">
    <n-checkbox
      :checked="isFinished"
      :disabled="isFinished"
      @click="isFinished ? '' : $emit('onFinish')"
    >
      <p>{{ name }}</p>
    </n-checkbox>
    <div class="right">
      <slot></slot>
      <span>{{ isFinished ? "已完成" : "未完成" }}</span>
    </div>
    <!-- 删除DropDown -->
    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :x="xRef"
      :y="yRef"
      :options="dropdownOptions"
      :show="showDropdown"
      :on-clickoutside="() => void (showDropdown = false)"
      @select="handleDelete"
    />
  </div>
</template>
<style scoped lang="scss">
.backlog-item {
  padding: 10px;
  border-bottom: 1px solid #e4e4e4;
  display: flex;
  margin-right: 1em;
  justify-content: space-between;
  transition: all 0.3s;
  cursor: pointer;
}
</style>
