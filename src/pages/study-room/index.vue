<!--
 * @Description: 自习室
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-20 15:13:53
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-19 21:02:52
-->
<script setup lang="ts">
import { ref } from "vue";

const keyword = ref<string>("");
</script>
<template>
  <div class="study-room-container">
    <header>
      <n-input-group>
        <n-input
          v-model:value="keyword"
          type="text"
          style="width: 50%"
          placeholder="输入关键字"
        />
        <n-button type="primary" ghost>搜索</n-button>
      </n-input-group>
    </header>
    <router-view class="router-view"></router-view>
  </div>
</template>
<style scoped lang="scss">
.study-room-container {
  display: flex;
  flex-direction: column;
  header {
    padding: 20px rem(30);
  }
  > .router-view {
    flex: 1;
  }
}
</style>
