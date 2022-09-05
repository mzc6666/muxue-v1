<!--
 * @Description: 按钮组件
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-29 16:20:47
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-29 16:35:29
-->
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: "success" | "error";
  }>(),
  {
    type: "success",
  }
);

const colors = {
  success: "#16a34a",
  error: "#dc2626",
};
</script>
<template>
  <div class="btn" :style="{ background: colors[props.type] }">
    <slot></slot>
  </div>
</template>
<style scoped lang="scss">
.btn {
  display: inline-block;
  padding: 3px 12px;
  @include middleFont(16px);
  border-radius: 4px;
  cursor: pointer;
  color: white;
}
</style>
