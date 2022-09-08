<!--
 * @Description: 下载页面
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-05 22:57:41
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-08 09:28:32
-->
<script setup lang="ts">
import { ref } from "vue";
import SearchModal from "../resources/components/search-modal/index.vue";
import ViewComments from "../resources/components/view-comments/index.vue";

const show = ref(false);
</script>
<template>
  <div style="display: flex; flex-direction: column; align-items: center">
    <!-- <div>下载</div>
    <n-button @click="show = !show">改变show</n-button>
    <SearchModal v-model:show="show" /> -->
    <n-button @click="show = !show">修改show</n-button>
  </div>
</template>
<style lang="scss" scoped>
button {
  padding: 6px 10px;
}
</style>
