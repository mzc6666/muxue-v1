<!--
 * @Description: 
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-20 13:46:42
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-25 15:06:22
-->
<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { onUnmounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const fullPath = computed(() => {
  return route.fullPath;
});

onUnmounted(() => {
  console.log("unmounted");
});
</script>
<template>
  <div class="router-view">
    <router-view :key="fullPath"></router-view>
  </div>
</template>
<style scoped lang="scss">
.router-view {
  display: flex;
  flex-direction: column;
}
</style>
