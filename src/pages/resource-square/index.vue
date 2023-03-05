<!--
 * @Description: 资源广场
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-20 15:17:41
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-05 23:39:49
-->
<script setup lang="ts">
import router from "@/route";
import { ref } from "vue";
import { MAIN_RESOUCESQUARE_SEARCH } from '@/constant/route'

const searchValue = ref("");

const handleSearch = () => {
  router.push({
    name: MAIN_RESOUCESQUARE_SEARCH,
    params: {
      searchValue: searchValue.value
    }
  })
}
</script>
<template>
  <div class="container">
    <!-- 头部搜索 -->
    <div class="header">
      <n-input-group>
        <n-input
          :style="{ width: '50%' }"
          placeholder="请搜索资源"
          v-model:value="searchValue"
        />
        <n-button type="primary" ghost @click="handleSearch"> 搜索资源 </n-button>
      </n-input-group>
    </div>
    <!-- 底部数据 -->
    <router-view class="router-view"></router-view>
  </div>
</template>
<style scoped lang="scss">
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    padding: 25px rem(30);
  }
  .router-view {
    flex: 1;
  }
}
</style>
