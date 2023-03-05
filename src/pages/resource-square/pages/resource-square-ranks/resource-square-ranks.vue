<script setup lang="ts">
import ResourceItem from "../components/resource-item/resource-item.vue";
import { getRankResourcesList } from "@/api/modules/resources-squares";
import { giveLikeToResource, resourceCollect } from "@/api/modules/resources";
import { Message } from "@/utils/public";
import { useResourceSquareStore } from "@/store";
import router from "@/route";
import { MAIN_RESOURCESQUARE_ITEM_DETAIL } from "@/constant/route";
import { reactive } from "vue";

const resourceSquareStore = useResourceSquareStore();

const resources = reactive<SquareResourcesItem[]>([]);
async function getDataAsync() {
  try {
    const result = await getRankResourcesList();
    if ((result.data.code = "200")) {
      console.log("result: ", result.data);
      resources.push(...result.data.data);
    }
  } catch (error) {
    console.log("GET DATA ERROR: ", error);
  }
}
getDataAsync();

// 点赞
const handleGiveLike = async (id: number, index: number) => {
  try {
    const result = await giveLikeToResource(id);
    if ((result.data.code = "200")) {
      const record = resources[index];
      record.isLike ? (record.likes -= 1) : (record.likes += 1);
      record.isLike = !record.isLike;
      Message("success", result.data.msg);
    }
  } catch (error) {
    console.log("handleGiveLike error: ", error);
  }
};

// 资源收藏
const handleCollect = async (id: number, index: number) => {
  try {
    const result = await resourceCollect(id);
    if (result.data.code === "200") {
      const record = resources[index];
      record.isCollection
        ? (record.collectionCount -= 1)
        : (record.collectionCount += 1);
      record.isCollection = !record.isCollection;
      Message("success", result.data.msg);
    }
  } catch (error) {
    console.log("handleCollect error: ", error);
  }
};

const handleLookDetail = (id: number) => {
  resourceSquareStore.setLookId(id);
  router.push({ name: MAIN_RESOURCESQUARE_ITEM_DETAIL });
};
</script>
<template>
  <div class="search-container">
    <div class="show-container">
      <section>
        <h2 class="hot-h2">搜索资源:</h2>
        <ResourceItem
          v-for="(item, index) in resources"
          :key="item.sId"
          v-bind="item"
          @on-like="handleGiveLike(item.sId, index)"
          @on-collect="handleCollect(item.sId, index)"
          @click="handleLookDetail(item.sId)"
        >
          <span class="rank-inddex">第{{ index + 1 }}名</span>
        </ResourceItem>
      </section>
    </div>
  </div>
</template>
<style scoped lang="scss">
.search-container {
  position: relative;
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
    }
  }
}
span.rank-inddex {
  font-size: 18px;
  margin: 0 1em;
  color: red;
}
</style>
