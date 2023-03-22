<script setup lang="ts">
import { ref } from "vue";
import {
  getArticleContent,
  giveLikeToArticle,
  collectArticle,
} from "@/api/modules/community";
import { Message } from "@/utils/public";

const props = defineProps<{
  id: number;
}>();

const data = ref<ArticleDetailInterface>({} as ArticleDetailInterface);

const getDataAsync = async () => {
  try {
    const result = await getArticleContent(props.id);
    if (result.data.code === "200") {
      data.value = result.data.data;
    }
  } catch (error) {}
};

getDataAsync();

// 点赞
const handleGiveLike = async () => {
  try {
    const result = await giveLikeToArticle(data.value.article_id);
    if (result.data.code === "200") {
      data.value.isLike ? data.value.likesCount-- : data.value.likesCount++;
      data.value.isLike = !data.value.isLike;
    }
  } catch (error) {}
};

// 收藏
const handleCollect = async () => {
  try {
    const result = await collectArticle(data.value.article_id);
    if (result.data.code === "200") {
      data.value.isCollect
        ? data.value.collectionCount--
        : data.value.collectionCount++;
      data.value.isCollect = !data.value.isCollect;
      Message("success", result.data.msg);
    }
  } catch (error) {}
};
</script>
<template>
  <div class="article-content-container" v-if="data.user">
    <!-- content -->
    <div class="article-content">
      <div class="content">
        <h2 class="title">{{ data.title }}</h2>
        <div v-html="data.content"></div>
      </div>
    </div>
    <!-- bottom -->
    <div class="writer-box">
      <div class="write-info">
        <n-avatar round :size="36" :src="data.user.avatar" />
        <span class="username">{{ data.user.username }}</span>
      </div>
      <div class="blog-info">
        <div class="give-like" @click.stop="handleGiveLike">
          <svg-icon
            className="icon-dianzan1"
            class="icon"
            :class="data.isLike ? 'has-like' : ''"
          ></svg-icon>
          <p>{{ data.likesCount }}</p>
        </div>
        <div class="collect" @click="handleCollect">
          <svg-icon
            className="icon-shoucang1"
            class="icon"
            :class="data.isCollect ? 'has-collect' : ''"
          ></svg-icon>
          <p>{{ data.collectionCount }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.article-content-container {
  display: flex;
  flex-direction: column;

  .article-content {
    flex: 1;
    position: relative;
    .content {
      padding: 10px rem(20);
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      .title {
        line-height: 2.5;
        font-size: 24px;
        font-weight: 400;
      }
    }
  }
  .writer-box {
    border-top: 1px solid #e4e4e4;
    display: flex;
    justify-content: space-between;
    padding: 6px rem(40) 6px rem(20);
    background-color: #fff;
    .write-info {
      display: flex;
      align-items: center;
      .username {
        margin-left: 1em;
      }
    }
    .blog-info {
      display: flex;
      .give-like,
      .collect {
        margin-right: 1em;
        cursor: pointer;
        font-size: 18px;
        text-align: center;
      }
      .icon {
        color: #888;
        transition: all 0.3s;
      }
      .has-like,
      .has-collect {
        color: red;
      }
    }
  }
}
</style>
