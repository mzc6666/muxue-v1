<script setup lang="ts">
import { getLikesList } from "@/api/modules/community";
import { reactive } from "vue";
import ArticleLikeItem from "../../components/article-like-item.vue";

const likes = reactive<ArticleLikeItemInterface[]>([]);

const getDataAsync = async () => {
  try {
    const result = await getLikesList();
    if (result.data.code === "200") {
      likes.push(...result.data.data);
    }
  } catch (error) {}
};
getDataAsync();
</script>
<template>
  <div class="community-likes-container">
    <div class="show-container">
      <section>
        <ArticleLikeItem
          v-for="(item, index) in likes"
          :key="item.article_id"
          v-bind="item"
          @click=""
        ></ArticleLikeItem>
      </section>
    </div>
  </div>
</template>
<style scoped lang="scss">
.community-likes-container {
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
