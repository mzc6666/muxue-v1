<!--
 * @Description: 查看详细信息(资源、文件夹、文件通用)
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-30 16:07:57
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-08 09:44:25
-->
<script setup lang="ts">
import Modal from "@components/Modal/index.vue";
import ViewComments from "../view-comments/index.vue";
import { useInfo } from "@/hooks/modules/resource";
import { ref, watch, watchEffect } from "vue";
import { computed } from "@vue/reactivity";
import { getTimeString, Message,transformSize } from "@/utils/public";
import {
  giveLikeToResource,
  resourceCollect,
  getResourceComment,
} from "@apis/modules/resources";
import { Throttle } from "@/utils/public";

const props = withDefaults(
  defineProps<{
    type: "r" | "f" | "file"; // r --> 资源; f --> 文件夹; file --> 文件
    id: number;
    title: string;
  }>(),
  {}
);

const emits = defineEmits(["update:show"]);

const reqId = ref(0);
const reqType = ref<any>(null);
watchEffect(() => {
  reqId.value = props.id;
  reqType.value = props.type;
});

const { data, error } = useInfo(reqId, reqType);
// icon 的 className
const className = computed(() => {
  return props.type === "r"
    ? "icon-icon-test"
    : props.type === "f"
    ? "icon-wenjianjia"
    : "icon-wendangicon";
});

// 资源的介绍内容
const text = ref("");
watch(data, () => {
  if (!data.value) {
    text.value = "";
  } else {
    console.log("data",data.value)
    if (props.type === "r") {
      text.value = `包含${data.value.sonResource.count}个子资源(大小${transformSize(data.value.sonResource.size)}); 包含${data.value.sonFolder.count}个子文件夹(大小${transformSize(data.value.sonFolder.size)}); 包含${data.value.sonFile.count}个子文件(大小${transformSize(data.value.sonFile.size)});`;
    } else if (props.type === "f") {
      text.value = `包含${data.value.sonFolder.count}个子文件夹(大小${transformSize(data.value.sonFolder.size)}); 包含${data.value.sonFile.count}个子文件(大小${transformSize(data.value.sonFile.size)});`;
    } else if (props.type === "file") {
      text.value = `${transformSize(data.value.size)}`;
    }
  }
});

/**
 * @description: 点赞 handler
 * @return {*}
 * @author: mzc
 */

const handleGiveLike = Throttle(async () => {
  try {
    const result = await giveLikeToResource(props.id);
    data.value.isLike = !data.value.isLike;
    if (result.data.msg === "点赞成功") {
      data.value.isLike = true;
      data.value.likes += 1;
    } else {
      data.value.isLike = false;
      data.value.likes -= 1;
    }
    Message("success", result.data.msg);
  } catch (err) {
    console.log("giveLikeToResource error", err);
  }
}, 1000);

/**
 * @description: 收藏 handler
 * @return {*}
 * @author: mzc
 */

const handleResourceCollect = Throttle(async () => {
  try {
    const result = await resourceCollect(props.id);
    if (result.data.msg === "收藏成功") {
      data.value.isCollection = true;
      data.value.collectionCount += 1;
    } else {
      data.value.isCollection = false;
      data.value.collectionCount -= 1;
    }
    Message("success", result.data.msg);
  } catch (err) {
    console.log("resourceCollect error", err);
  }
}, 1000);

// 是否展示评论
const commentShow = ref(false);
</script>
<template>
  <Modal
    :show="data !== null"
    :title="title"
    @update:show="$emit('update:show', false)"
    :style="{ 'max-width': '340px' }"
  >
    <template #body>
      <section>
        <!-- logo -->
        <header>
          <svg-icon :className="className"></svg-icon>
        </header>
        <!-- 点赞、评论、收藏 -->
        <main v-if="type === 'r' && data" class="icons-container">
          <ul>
            <li>
              <svg-icon
                className="icon-dianzan1"
                class="icon"
                :class="data.isLike ? 'like' : ''"
                @click="handleGiveLike"
              ></svg-icon>
              <p>{{ data?.likes }}</p>
            </li>
            <li>
              <svg-icon
                className="icon-31pinglun"
                class="icon"
                @click="commentShow = true"
              ></svg-icon>
              <p>{{ data?.commentCount }}</p>
            </li>
            <li>
              <svg-icon
                className="icon-shoucang1"
                class="icon"
                :class="data.isCollection ? 'collect' : ''"
                @click="handleResourceCollect"
              ></svg-icon>
              <p>{{ data?.collectionCount }}</p>
            </li>
          </ul>
        </main>
        <!-- 底部具体详细信息 -->
        <footer v-show="data">
          <p class="title">详细信息</p>
          <ul>
            <li>
              <p class="name">{{ title }}</p>
              <p class="descript">
                {{ text }}
              </p>
            </li>
            <li>
              <p class="name">创建时间</p>
              <p class="descript">
                {{ data ? getTimeString(data.createTime) : "" }}
              </p>
            </li>
            <li>
              <p class="name">修改时间</p>
              <p class="descript">
                {{ data ? getTimeString(data.updateTime) : "" }}
              </p>
            </li>
          </ul>
        </footer>
      </section>
    </template>
    <template #footer>
      <span></span>
    </template>
  </Modal>
  <!-- 评论 -->
  <ViewComments
    v-if="commentShow"
    :id="id"
    @update:show="commentShow = false"
  />
</template>
<style scoped lang="scss">
section {
  display: flex;
  flex-direction: column;
  text-align: left;
  > * {
    padding-top: 10px;
  }
  header {
    display: flex;
    justify-content: center;
    font-size: 125px;
    color: $green-02;
  }
  main.icons-container {
    ul {
      display: flex;
      justify-content: space-around;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
          font-size: 28px;
          transition: all 0.35s ease-in;
          color: map-get($map: $gray-colors, $key: 400);
          cursor: pointer;
        }
        .icon.like,
        .icon.collect {
          color: map-get($map: $green-colors, $key: 400);
        }

        p {
          @include middleFont(14px);
          margin-top: 4px;
          word-wrap: break-word;
        }
      }
    }
  }
  footer {
    p.title {
      @include middleFont(14px);
    }
    ul {
      li {
        display: flex;
        flex-direction: column;
        padding-top: 8px;
        @include middleFont(12px);
        p.name {
          color: map-get($map: $gray-colors, $key: 400);
          margin-bottom: 5px;
        }
        p.descript {
          display: flex;
          flex-wrap: wrap;
          word-break: break-all;
        }
      }
    }
  }
}
</style>
