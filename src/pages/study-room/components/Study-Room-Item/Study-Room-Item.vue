<script setup lang="ts">
const props = defineProps<{
  roomId: number;
  lookCount: number;
  cover_pricture: string;
  title: string;
  creator: {
    pId: number;
    username: string;
  };
}>();

const emits = defineEmits(["go-to-room"]);
</script>
<template>
  <div class="room-item" @click="$emit('go-to-room')">
    <div class="image">
      <n-image
        width="240"
        height="135"
        :src="cover_pricture"
        preview-disabled
      />
      <div class="person">{{ `${lookCount}观看` }}</div>
    </div>
    <p class="title">{{ title }}</p>
    <p class="username">{{ creator.username }}</p>
  </div>
</template>
<style scoped lang="scss">
.room-item {
  // margin: 20px rem(30);
  overflow: hidden;
  cursor: pointer;
  .image {
    position: relative;
    transition: all 0.3s;

    .person {
      position: absolute;
      bottom: 1em;
      left: 1em;
      color: #fff;
      font-size: 12px;
    }
    &:hover {
      transform: scale(1.05);
    }
  }
  .title {
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
  }
  .username {
    font-size: 12px;
    color: #666;
    line-height: 2;
  }
}
</style>
