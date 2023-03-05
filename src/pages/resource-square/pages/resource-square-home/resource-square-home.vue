<!--
 * @Description: 
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-03-05 16:29:33
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-06 00:02:36
-->
<script setup lang="ts">
import { getHomeResourcesList } from "@/api/modules/resources-squares";
import { giveLikeToResource, resourceCollect } from "@/api/modules/resources";
import { reactive } from "vue";
import ResourceItem from "../components/resource-item/resource-item.vue";
import { Message } from "@/utils/public";
import { useResourceSquareStore } from "@/store";
import {
  MAIN_RESOURCESQUARE_ITEM_DETAIL,
  MAIN_RESOURCESQUARE_RANKS,
} from "@/constant/route";
import router from "@/route";

const resourceSquareStore = useResourceSquareStore();

const rankResource = reactive<SquareResourcesItem[]>([]); // 排行榜资源列表
const publicResource = reactive<SquareResourcesItem[]>([]); // 普通资源列表

async function getDataAsync() {
  try {
    const result = await getHomeResourcesList();
    if ((result.data.code = "200")) {
      console.log("result: ", result.data.data);
      rankResource.push(...result.data.data.ranks);
      publicResource.push(...result.data.data.recommend);
    }
  } catch (error) {
    console.log("GET DATA ERROR: ", error);
  }
}
getDataAsync();

// 点赞
const handleGiveLike = async (
  id: number,
  index: number,
  kind: "normal" | "rank"
) => {
  try {
    const result = await giveLikeToResource(id);
    if ((result.data.code = "200")) {
      const record =
        kind === "normal" ? publicResource[index] : rankResource[index];
      record.isLike ? (record.likes -= 1) : (record.likes += 1);
      record.isLike = !record.isLike;
      Message("success", result.data.msg);
    }
  } catch (error) {
    console.log("handleGiveLike error: ", error);
  }
};

// 资源收藏
const handleCollect = async (
  id: number,
  index: number,
  kind: "normal" | "rank"
) => {
  try {
    const result = await resourceCollect(id);
    if (result.data.code === "200") {
      const record =
        kind == "normal" ? publicResource[index] : rankResource[index];
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

// 查看详情
const handleLookDetail = (id: number) => {
  resourceSquareStore.setLookId(id);
  router.push({ name: MAIN_RESOURCESQUARE_ITEM_DETAIL });
};

// 查看排行榜
const gotoLookRankList = () => {
  router.push({ name: MAIN_RESOURCESQUARE_RANKS });
};
</script>
<template>
  <div class="square-home-container">
    <div class="show-container">
      <section>
        <h2 class="hot-h2">热门资源:</h2>
        <ResourceItem
          v-for="(item, index) in rankResource"
          :key="item.sId"
          v-bind="item"
          @on-like="handleGiveLike(item.sId, index, 'rank')"
          @on-collect="handleCollect(item.sId, index, 'rank')"
          @click="handleLookDetail(item.sId)"
        ></ResourceItem>
        <p class="look-more" @click="gotoLookRankList">查看更多</p>
      </section>
      <section>
        <h2 class="hot-h2">推荐:</h2>
        <ResourceItem
          v-for="(item, index) in publicResource"
          :key="item.sId"
          v-bind="item"
          @on-like="handleGiveLike(item.sId, index, 'normal')"
          @on-collect="handleCollect(item.sId, index, 'normal')"
        ></ResourceItem>
      </section>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.square-home-container {
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
      p.look-more {
        margin: 20px 30px;
        color: #555666;
        cursor: pointer;
      }
    }
  }
}
</style>
