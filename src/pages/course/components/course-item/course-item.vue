<!--
 * @Description: 课程列表组件(item)
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-12-23 19:40:40
 * @LastEditors: Austral
 * @LastEditTime: 2023-05-15 10:54:10
-->
<script setup lang="ts">
import { getTimeString } from "@/utils/public/index";
interface ClassItem {
  cId: number;
  cName: string;
  coverPic: string;
  createTime: string;
  creator: string;
}
const props = defineProps<ClassItem>();
</script>
<template>
  <div class="outer-box">
    <div class="content">
      <img
        :src="coverPic"
        alt="图片加载中"
      />
      <p>{{ cName }}</p>
      <div class="create-info">
        <span>{{ creator }}</span>
        <span>{{ getTimeString(createTime) }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.outer-box {
  padding: 10px;
  border-radius: 10px;
  .content {
    width: 240px;
    img {
      width: 240px;
      height: 120px;
      border-radius: 6px;
      margin-bottom: 10px;
    }
    p {
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 18px;
      color: map-get($map: $gray-colors, $key: 600);
    }
    .create-info {
      display: flex;
      > span:nth-child(1) {
        margin-right: 20px;
      }
      span {
        color: map-get($map: $gray-colors, $key: 400);
        font-size: 12px;
      }
    }
  }
}
</style>
