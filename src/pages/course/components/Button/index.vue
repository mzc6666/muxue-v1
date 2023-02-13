<!--
 * @Description: 按钮组件
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-12-23 16:37:34
 * @LastEditors: mzc
 * @LastEditTime: 2022-12-24 20:22:53
-->
<script setup lang="ts"></script>
<template>
  <div class="button" v-bind="$attrs">
    <slot></slot>
  </div>
</template>
<style scoped lang="scss">
.button {
  padding: 8px 12px;
  border-radius: 4px;
  display: inline-block;
  background: $green-02;
  cursor: pointer;
}
</style>
