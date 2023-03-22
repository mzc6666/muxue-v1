<!--
 * @Description: 
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-03-06 22:14:01
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-09 16:27:48
-->
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    taskId: number;
    title: string;
    hasFinish: boolean;
    isFile: boolean;
    fileType: "other" | "video" | null;
    fileUrl?: string | null;
    content: string | null;
  }>(),
  {}
);

const emits = defineEmits(["onComplete", "onDelete"]);
</script>
<template>
  <div class="task-item">
    <h2>{{ title }}</h2>
    <div class="tags">
      <n-tag :bordered="false" :type="hasFinish ? 'success' : 'error'">
        {{ hasFinish ? "已完成" : "待完成" }}
      </n-tag>
      <n-tag
        v-if="!hasFinish"
        :bordered="false"
        type="success"
        @click="$emit('onComplete')"
      >
        立即完成
      </n-tag>
      <n-tag :bordered="false" type="error" @click="$emit('onDelete')">
        删除任务点
      </n-tag>
    </div>
    <div class="content">
      <div class="media-type" v-if="fileType">
        <!-- 视频类型 -->
        <div class="video-type" v-if="fileType === 'video'">
          <video :src="fileUrl || ''" controls></video>
        </div>
      </div>
      <div v-else class="text-type" v-html="content"></div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.task-item {
  padding: 20px rem(50);
  h2 {
    font-size: 20px;
    line-height: 2.5;
    text-align: center;
    font-weight: 400;
  }
  .tags {
    display: flex;
    > * {
      margin: 1em 1em 1em 0;
      cursor: pointer;
    }
  }
  .content {
    .media-type {
      .video-type {
        video {
          width: 100%;
        }
      }
    }
  }
}
</style>
