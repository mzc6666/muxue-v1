<!--
 * @Description: 圆形-单选框
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-12-23 22:34:19
 * @LastEditors: mzc
 * @LastEditTime: 2022-12-23 23:25:58
-->
<script setup lang="ts">
import { ref, watchEffect, watch } from "vue";

const props = defineProps<{
  select: boolean; // 选中状态
}>();
</script>
<template>
  <div class="circle" v-bind="$attrs.container" :style="{}">
    <input type="checkbox" v-model="select" />
    <svg-icon className="icon-wancheng" class="temp"></svg-icon>
  </div>
</template>
<style scoped lang="scss">
.circle {
  width: 24px;
  height: 24px;
  position: relative;
  background-color: $green-02;
  border-radius: 50%;
  input {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    opacity: 1;
    z-index: 0;
  }
}
.temp {
  font-size: 20px;
  color: $green-02;
}
</style>
