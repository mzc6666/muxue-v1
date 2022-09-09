<!--
 * @Description: 新建(资源、文件集)组件
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-30 16:20:35
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-07 21:30:12
-->
<script setup lang="ts">
import Modal from "@components/Modal/index.vue";
import Input from "@/components/Input/index.vue";
import { Ref, ref, watch, watchEffect } from "vue";

const props = withDefaults(
  defineProps<{
    type: "r" | "f"; // r --> 新建资源;  f --> 新建文件夹
  }>(),
  {}
);


const emits = defineEmits(["createResource", "createFolder", "update:show"]);

const title = ref(props.type === 'f' ? '新建文件夹' : '新建资源')

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
  props.type === "r"
    ? emits("createResource", name.value)
    : emits("createFolder", name.value);
};

/**
 * @description: 取消按钮回调
 * @return {*}
 * @author: mzc
 */

const handleNegativeClick = () => {
  emits("update:show", false);
};
</script>
<template>
  <Modal
    show
    v-bind="$attrs"
    @active-btn-click="handleActiveClick"
    @negative-btn-click="handleNegativeClick"
    @update:show="$emit('update:show', false)
    :title="title"
  >
    <template #body>
      <section class="modal-body">
        <svg-icon
          :className="type === 'r' ? 'icon-icon-test' : 'icon-wenjianjia'"
          class="resource-item"
        ></svg-icon>
        <Input type="text" v-model:value="name" v-select />
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
