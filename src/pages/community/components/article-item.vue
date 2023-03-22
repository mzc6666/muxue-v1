<!--
 * @Description: 
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-03-08 18:08:40
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-09 14:53:44
-->
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    article_id: number;
    title: string;
    content: string;
    publishTime: string;
    avatar: string;
    username: string;
    cover_image: string;
    likes: number;
    rankNum?: number;
  }>(),
  {
    rankNum: 0,
  }
);

const emits = defineEmits(["onLike", "onCollect"]);
</script>
<template>
  <div class="resoruce-item">
    <div class="left">
      <img :src="cover_image" alt="" />
    </div>
    <div class="right">
      <div class="text-content">
        <div class="name">
          <p>{{ title }}</p>
          <p class="content" v-html="content"></p>
        </div>
        <div class="suitcation">
          <p class="like">{{ likes }} 点赞</p>
        </div>
        <div class="publish-time">
          <p>{{ publishTime }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.resoruce-item {
  display: flex;
  justify-content: space-between;
  // align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  padding: 12px;
  border-bottom: 1px solid #f4f4f4;
  &:hover {
    background: #f4f4f4;
  }
  .left {
    min-height: 100px;
    display: flex;
    align-items: center;
    img {
      width: 100px;
      margin-right: 1em;
    }
  }
  .right {
    position: relative;
    flex: 1;
    .text-content {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      p.content {
        text-overflow: ellipsis;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
      }
      .suitcation {
        font-size: 14px;
        font-weight: 400;
        color: #555666;
        display: flex;
        line-height: 2;
        .comment {
          margin: 0 0.8em;
        }
      }
      .publish-time {
        font-size: 14px;
        font-weight: 400;
        color: #555666;
      }
    }
  }
}
</style>
