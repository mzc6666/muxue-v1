<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    sId: number;
    sName: string;
    updateTime: string;
    size: number;
    isCollection: boolean;
    isLike: boolean;
    image: string;
    commentCount: number;
    likes: number;
    collectionCount: number;
    user: {
      uId: number;
      username: string;
      avatar: string;
    };
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
      <img :src="image" alt="" />
      <div class="left-right">
        <div class="name">
          <p>{{ sName }}</p>
          <slot></slot>
        </div>
        <div class="suitcation">
          <p class="like">{{ likes }} 点赞</p>
          <p class="comment">{{ commentCount }} 评论</p>
          <p class="collect">{{ collectionCount }} 收藏</p>
        </div>
        <div class="publish-time">
          <p>{{ updateTime }}</p>
        </div>
      </div>
    </div>
    <div class="right">
      <div
        class="give-like"
        :class="[isLike ? 'like' : '']"
        @click.stop="$emit('onLike')"
      >
        <svg-icon className="icon-dianzan1"></svg-icon>
      </div>
      <div
        class="collection"
        :class="[isCollection ? 'has-collection' : '']"
        @click.stop="$emit('onCollect')"
      >
        <svg-icon className="icon-shoucang1"></svg-icon>
      </div>
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
    img {
      width: 100px;
      margin-right: 1em;
    }
    .left-right {
      .name {
        display: flex;
        align-items: center;
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
  .right {
    display: flex;
    .give-like,
    .collection {
      margin: 0 0.6em;
      font-size: 1.3em;
      color: #888;
    }
    .like,
    .has-collection {
      color: #c31432;
    }
  }
}
</style>
