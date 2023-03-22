<!--
 * @Description: 
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-03-08 17:26:12
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-09 15:20:51
-->
<script setup lang="ts">
import { reactive } from "vue";
import { getCommunityHome } from "@/api/modules/community";
import ArticleItem from "../../components/article-item.vue";
import router from "@/route";
import { MAIN_COMMUNITY_ARTICLE_DETAIL } from "@constants/route";

const recommend = reactive<ArticleItemInterface[]>([]); // 推荐
const hotArticles = reactive<ArticleItemInterface[]>([]); // 热榜

const getDataAsync = async () => {
  try {
    const result = await getCommunityHome();
    if (result.data.code === "200") {
      console.log("result: ", result.data);
      recommend.push(...result.data.data.recommend);
      hotArticles.push(...result.data.data.hotData);
    }
  } catch (error) {}
};
getDataAsync();

// 查看文章详情
const handleLookDetail = (id: number) => {
  router.push({ name: MAIN_COMMUNITY_ARTICLE_DETAIL, params: { id } });
};
</script>
<template>
  <div class="community-home-container">
    <div class="show-container">
      <section>
        <h2 class="hot-h2">热门文章:</h2>
        <ArticleItem
          v-for="(item, index) in hotArticles"
          :key="item.article_id"
          v-bind="item"
          @click="handleLookDetail(item.article_id)"
        ></ArticleItem>
        <!-- <p class="look-more" @click="gotoLookRankList">查看更多</p> -->
      </section>
      <section>
        <h2 class="hot-h2">推荐:</h2>
        <ArticleItem
          v-for="(item, index) in recommend"
          :key="item.article_id"
          v-bind="item"
          @click="handleLookDetail(item.article_id)"
        ></ArticleItem>
      </section>
    </div>
  </div>
</template>
<style scoped lang="scss">
.community-home-container {
  position: relative;
  flex: 1;
  .show-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    section {
      margin: 20px rem(30);
      .hot-h2 {
        line-height: 2;
        font-size: 22px;
        font-weight: 400;
      }
      p.look-more {
        margin: 20px 30px;
        color: #555666;
        cursor: pointer;
      }
    }
  }
}
</style>
