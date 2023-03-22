<!--
 * @Description: 
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-03-08 18:08:40
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-08 21:03:37
-->
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    collect_id: number;
    user: {
      userId: number;
      avatar: string;
      username: string;
    };
    collect_time: string;
    title: string;
    article_id: number;
  }>(),
  {}
);

const emits = defineEmits(["onLike", "onCollect"]);
</script>
<template>
  <div class="resoruce-item">
    <div class="left">
      <n-avatar round :size="56" :src="user.avatar" />
      <div class="left-right">
        <p>{{ user.username }}</p>
        <p>{{ title }}</p>
      </div>
    </div>
    <div class="right">
      <p>{{ collect_time }}</p>
    </div>
  </div>
</template>
<style scoped lang="scss">
.resoruce-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  padding: 12px;
  border-bottom: 1px solid #f4f4f4;
  &:hover {
    background: #f4f4f4;
  }
  .left {
    display: flex;
    align-items: center;

    .left-right {
      margin-left: 1em;
    }
  }
  .right {
    color: #888;
    font-size: 14px;
  }
}
</style>
