<!--
 * @Description: 重命名
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-31 21:54:54
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-03 14:22:11
-->
<script setup lang="ts">
import Modal from "@components/Modal/index.vue";
import Input from "@/components/Input/index.vue";
import { ref, watch, watchEffect } from "vue";

const props = withDefaults(
  defineProps<{
    show: boolean;
    type: "r" | "f" | "file"; // r --> 新建资源;  f --> 新建文件夹
    initName: string;
  }>(),
  {}
);

const emits = defineEmits([
  "resourceRename",
  "folderRename",
  "fileRename",
  "update:show",
]);

const initTitle = ref("");
watch(
  props,
  () => {
    initTitle.value = props.initName;
  },
  {
    immediate: true,
  }
);

/**
 * @description: 确定按钮
 * @return {*}
 * @author: mzc
 */
const handleActiveClick = () => {
  if (props.type === "r") {
    emits("resourceRename", initTitle.value);
  } else if (props.type === "f") {
    emits("folderRename", initTitle.value);
  } else {
    emits("fileRename", initTitle.value);
  }
};
</script>
<template>
  <Modal
    :show="show"
    title="重命名"
    v-bind="$attrs"
    @active-btn-click="handleActiveClick"
    @negative-btn-click="$emit('update:show', false)"
    @update:show="$emit('update:show', false)"
  >
    <template #body>
      <section class="modal-body">
        <svg-icon
          :className="
            type === 'r'
              ? 'icon-icon-test'
              : type === 'f'
              ? 'icon-wenjianjia'
              : 'icon-wendangicon'
          "
          class="resource-item"
        ></svg-icon>
        <Input type="text" v-model:value="initTitle" v-select />
      </section>
    </template>
  </Modal>
</template>
<style scoped lang="scss">
.modal-body {
  display: flex;
  flex-direction: column;
  padding-bottom: 18px;
  .resource-item {
    font-size: 125px;
    color: $green-02;
    align-self: center;
  }
}
</style>
