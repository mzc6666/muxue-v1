<!--
 * @Description: 我的待办
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-01-05 09:27:09
 * @LastEditors: mzc
 * @LastEditTime: 2023-01-06 23:37:59
-->
<script setup lang="ts">
import { ref } from "vue";

const sortType = ref<"time" | "priority">("time"); // 分类方式
</script>
<template>
  <div class="container">
    <header>
      <div class="big-title">所有待办</div>
      <div class="right-icons">
        <n-tooltip trigger="hover">
          <template #trigger>
            <div
              :class="[sortType === 'time' ? 'active' : '', 'icon-outer-box']"
              @click="sortType = 'time'"
            >
              <svg-icon className="icon-shijian"></svg-icon>
            </div>
          </template>
          按时间分类
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <div
              :class="[
                sortType === 'priority' ? 'active' : '',
                'icon-outer-box',
              ]"
              @click="sortType = 'priority'"
            >
              <svg-icon className="icon-youxianji"></svg-icon>
            </div>
          </template>
          按优先级分类
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <div class="add-backlog">
              <svg-icon className="icon-jiahao"></svg-icon>
            </div>
          </template>
          添加待办
        </n-tooltip>
      </div>
    </header>
    <div class="backlogs-list-container"></div>
  </div>
</template>
<style scoped lang="scss">
.container {
  padding: 0 rem(50);
  header {
    height: 125px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .big-title {
      @include middleFont(24px);
    }
    .right-icons {
      display: flex;
      .icon-outer-box,
      .add-backlog {
        padding: 2px 4px;
        margin-left: 16px;
        border-radius: 4px;
        @include miniFont(24px);
        cursor: pointer;
        transition: all 0.15s ease-in-out;
      }
      .icon-outer-box.active {
        background-color: $green-04;
      }
      .add-backlog:hover {
        background-color: map-get($map: $gray-colors, $key: 100);
      }
    }
  }
}
</style>
