<script setup lang="ts">
import { reactive, ref, Ref, computed } from "vue";
import { useResourceSquareStore } from "@/store";
import {
  getResourceContent,
  getResourceInfo,
  giveLikeToResource,
  resourceCollect,
} from "@/api/modules/resources";
import useList from "./hooks/useList";
import { Message } from "@/utils/public";

import ViewComments from "../../../resources/components/view-comments/index.vue";

interface VisitItem {
  id: number;
  type: "resource" | "folder";
}

const resourceSquareStore = useResourceSquareStore();

const visitHistory = reactive<VisitItem[]>([
  { id: resourceSquareStore.lookId, type: "resource" },
]); // 历史

const id = computed(() => {
  return visitHistory[visitHistory.length - 1].id;
});

const curType: Ref<"resource" | "folder"> = computed(() => {
  return visitHistory[visitHistory.length - 1].type;
});

const { rlists, folderList, fileList, loading } = useList(id, curType);

// 资源信息
const resourceInfo: any = ref({});
async function getDetailInfo() {
  try {
    const result = await getResourceInfo(resourceSquareStore.lookId);
    if (result.data.code === "200") {
      resourceInfo.value = result.data.data;
    }
  } catch (error) {
    console.log("getDetailInfo error: ", error);
  }
}

getDetailInfo();

// 评论
const handleGiveLike = async () => {
  try {
    const result = await giveLikeToResource(resourceSquareStore.lookId);
    if ((result.data.code = "200")) {
      resourceInfo.value.isLike
        ? (resourceInfo.value.likes -= 1)
        : (resourceInfo.value.likes += 1);
      resourceInfo.value.isLike = !resourceInfo.value.isLike;
      Message("success", result.data.msg);
    }
  } catch (error) {
    console.log("handleGiveLike error: ", error);
  }
};

// 收藏
const handleCollect = async () => {
  try {
    const result = await resourceCollect(resourceSquareStore.lookId);
    if (result.data.code === "200") {
      resourceInfo.value.isCollection
        ? (resourceInfo.value.collectionCount -= 1)
        : (resourceInfo.value.collectionCount += 1);
      resourceInfo.value.isCollection = !resourceInfo.value.isCollection;
      Message("success", result.data.msg);
    }
  } catch (error) {
    console.log("handleCollect error: ", error);
  }
};

const visible_comment = ref(false);
</script>
<template>
  <div class="detail-container">
    <!-- 资源内容 -->
    <div class="back-top-level">
      <p
        class="record-item"
        v-show="visitHistory.length != 1"
        @click="visitHistory.pop()"
      >
        ...(返回上一级)
      </p>
      <p
        v-for="(item, index) in rlists"
        :key="item.sId"
        class="record-item"
        @click="visitHistory.push({ id: item.sId, type: 'resource' })"
      >
        {{ item.sName }}
      </p>
      <p
        v-for="(item, index) in folderList"
        :key="item.foId"
        class="record-item"
        @click="visitHistory.push({ id: item.foId, type: 'folder' })"
      >
        {{ item.foName }}
      </p>
      <p v-for="(item, index) in fileList" :key="item.fId" class="record-item">
        {{ item.fileName }}
      </p>
    </div>
    <!-- 点赞、评论、收藏 -->
    <div class="operation-group">
      <ul>
        <li
          class="give-like"
          :class="resourceInfo.isLike ? 'liked' : ''"
          @click.stop="handleGiveLike"
        >
          <svg-icon className="icon-dianzan1"></svg-icon>
        </li>
        <li
          class="collect"
          :class="resourceInfo.isCollection ? 'collected' : ''"
          @click.stop="handleCollect"
        >
          <svg-icon className="icon-shoucang1"></svg-icon>
        </li>
        <li class="comment" @click="visible_comment = true">
          <svg-icon className="icon-31pinglun"></svg-icon>
        </li>
      </ul>
    </div>
    <!-- 查看评论 -->
    <ViewComments
      :id="resourceSquareStore.lookId"
      v-if="visible_comment"
      @update:show="visible_comment = false"
    />
  </div>
</template>
<style scoped lang="scss">
.detail-container {
  padding: 25px rem(30);
  position: relative;
  .back-top-level {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 0 rem(60) 0 rem(30);
    overflow: auto;
    .record-item {
      line-height: 3;
      border: 1px solid #e4e4e4;
      border-bottom: 0;
      padding: 0 1em;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background: #f4f4f4;
      }
    }
  }
  .operation-group {
    z-index: 2;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    li {
      width: 50px;
      height: 50px;
      margin: 20px rem(20);
      border: 1px solid #e4e4e4;
      color: #777;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s;
      background-color: #fff;
      &:hover {
        background: #1d976c;
      }
    }
    .liked,
    .collected {
      color: red;
    }
  }
}
</style>
