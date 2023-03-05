<!--
 * @Description: 新建(资源、文件集)组件
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-30 16:20:35
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-05 12:20:06
-->

<script setup lang="ts">
import Modal from "@components/Modal/index.vue";
import Input from "@/components/Input/index.vue";
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
import { Ref, ref, watch, watchEffect } from "vue";
import { Message } from "@/utils/public";

const props = withDefaults(
  defineProps<{
    type: "r" | "f"; // r --> 新建资源;  f --> 新建文件夹
  }>(),
  {}
);

const emits = defineEmits(["createResource", "createFolder", "update:show"]);

const title = ref(props.type === "f" ? "新建文件夹" : "新建资源");

const name = ref("");

watch(
  props,
  () => {
    name.value = props.type === "f" ? "新建文件夹" : "新建资源";
  },
  {
    immediate: true,
  }
);

/**
 * @description: 确定按钮回调
 * @return {*}
 * @author: mzc
 */

const handleActiveClick = () => {
  // props.type === "r"
  //   ? emits("createResource", name.value, image.value)
  //   : emits("createFolder", name.value);
  if (props.type === "r") {
    if (image.value) {
      emits("createResource", name.value, image.value);
    } else {
      Message("warning", "请选择封面图片!!!");
    }
  } else if (props.type === "f") {
    emits("createFolder", name.value);
  }
};

/**
 * @description: 取消按钮回调
 * @return {*}
 * @author: mzc
 */

const handleNegativeClick = () => {
  emits("update:show", false);
};

const image = ref<File>();

const handleFileSelect = (args: any) => {
  // console.log("args: ", args)
  image.value = args.file.file;
};
</script>
<template>
  <Modal
    :title="title"
    show
    v-bind="$attrs"
    @update:show="$emit('update:show', false)"
    @active-btn-click="handleActiveClick"
    @negative-btn-click="$emit('update:show', false)"
  >
    <template #body>
      <section class="modal-body">
        <svg-icon
          :className="type === 'r' ? 'icon-icon-test' : 'icon-wenjianjia'"
          class="resource-item"
        ></svg-icon>
        <Input type="text" v-model:value="name" v-select />
        <n-upload :default-upload="false" :max="1" @change="handleFileSelect">
          <n-upload-dragger>
            <div style="margin-bottom: 12px">
              <n-icon size="48" :depth="3">
                <archive-icon />
              </n-icon>
            </div>
            <n-text style="font-size: 16px">
              点击或者拖动文件到该区域来上传
            </n-text>
            <n-p depth="3" style="margin: 8px 0 0 0"
              >上传封面图以供广场检索
            </n-p>
          </n-upload-dragger>
        </n-upload>
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
