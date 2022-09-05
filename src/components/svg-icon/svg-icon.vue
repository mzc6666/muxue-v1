<!--
 * @Description:  iconfotn 图标组件
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-04 20:47:46
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-20 15:32:45
-->
<script setup lang="ts">
const props = defineProps<{
  className: string;
}>();
</script>
<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="'#' + className"></use>
  </svg>
</template>
<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
