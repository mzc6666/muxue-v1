<!--
 * @Description: single-comment-item
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-09-07 19:19:18
 * @LastEditors: mzc
 * @LastEditTime: 2022-10-14 20:34:05
-->
<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { getTimeString } from "@/utils/public";

const props = withDefaults(
  defineProps<{
    count?: number;
    user: {
      uid: number;
      name: number;
      avater: number;
      isOwn: boolean;
    };
    content: string;
    time: string;
    likes: number;
    isLike: boolean;
  }>(),
  {}
);

const emits = defineEmits(["giveLike", "readyToReply"]);
</script>
<template>
  <section class="single-comment" v-bind="$attrs">
    <n-avatar round :size="48" :src="user.avater" />
    <div class="right-content">
      <div class="user-info">
        <p>{{ user.name }}</p>
        <p>{{ getTimeString(time) }}</p>
        <p class="tag-writer" v-if="user.isOwn">作者</p>
      </div>
      <div class="content">
        <slot name="reply"></slot>
        <p>{{ content }}</p>
      </div>
      <div class="like-and-comment">
        <div class="like" @click="$emit('giveLike')">
          <svg-icon
            className="icon-dianzan1"
            :class="[isLike ? 'active' : '', 'icon']"
          />
          <span>{{ likes }}</span>
        </div>
        <div class="comment" @click="$emit('readyToReply')">
          <svg-icon className="icon-31pinglun" class="icon" />
          <span>回复</span>
        </div>
      </div>
      <slot></slot>
    </div>
  </section>
</template>
<style scoped lang="scss">
.single-comment {
  display: flex;
  padding: 10px 0;
  .right-content {
    flex: 1;
    padding-left: 10px;
    > * {
      padding-top: 4px;
      display: flex;
      align-items: center;
    }
    .user-info {
      :nth-child(1) {
        @include middleFont(14px);
        color: map-get($map: $gray-colors, $key: 600);
      }
      :nth-child(2) {
        margin-left: 8px;
        @include middleFont(12px);
        color: map-get($map: $gray-colors, $key: 500);
      }
      .tag-writer {
        padding: 0 4px;
        margin-left: 8px;
        color: #fff;
        border-radius: 3px;
        background-color: $green-02;
        @include middleFont(12px);
      }
    }
    .like-and-comment {
      span {
        @include miniFont(14px);
        color: map-get($map: $gray-colors, $key: 500);
      }
      .icon {
        color: map-get($map: $gray-colors, $key: 500);
      }
      .icon.active {
        color: $green-02;
      }
      .like,
      .comment {
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
      }
      .comment {
        margin-left: 8px;
      }
    }
  }
}
</style>
