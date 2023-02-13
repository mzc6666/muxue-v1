<!--
 * @Description: 课程任务点
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-01-06 20:41:26
 * @LastEditors: mzc
 * @LastEditTime: 2023-01-06 21:31:46
-->
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    cId: number;
    chId: number;
    secId: number;
  }>(),
  {}
);
</script>
<template>
  <div>课程任务点</div>
</template>
<style scoped lang="scss"></style>
