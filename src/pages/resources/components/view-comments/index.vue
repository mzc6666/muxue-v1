<!--
 * @Description: 资源的评论
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-09-07 16:11:38
 * @LastEditors: mzc
 * @LastEditTime: 2022-10-14 20:47:36
-->
<script setup lang="ts">
import singleComment from "./components/single-comment.vue";
import Modal from "@components/Modal/index.vue";
import Input from "@components/Input/index.vue";
import {
  getResourceCommentInit,
  getResourceComment,
  getSonCommentList,
  getSonCommentInit,
  giveLikeToComment,
} from "@apis/modules/resources";
import { Message, Throttle } from "@/utils/public";
import { ref } from "vue";
import { useComment } from "./hook";

const props = withDefaults(
  defineProps<{
    id: number;
  }>(),
  {}
);

const emits = defineEmits(["update:show"]);

const data = ref<any>(null);
const wait = ref<boolean>(false); // 是否在获取数据
const getDataTag = ref(-1); // 正在获取数据的 index
const map = new Map(); // 记录timeStamp
let globalTimeStamp = ref(""); // 获取父评论的时间戳

/**
 * @description: 初次获取最顶级评论
 * @return {*}
 * @author: mzc
 */

const getData = async () => {
  wait.value = true;
  try {
    const result = await getResourceCommentInit(props.id);
    data.value = result.data.data;
    globalTimeStamp.value = result.data.data.timeStamp;
  } catch (err) {
    console.log("getResourceComment error", err);
  }
  wait.value = false;
};
getData();

/**
 * @description: 获取顶层评论 (非初次获取)
 * @return {*}
 * @author: mzc
 */
const getTopComments = async () => {
  wait.value = true;
  getDataTag.value = -1;
  try {
    const result = await getResourceComment(props.id, globalTimeStamp.value);
    data.value.comments.push(...result.data.data.comments);
    globalTimeStamp.value = result.data.data.timeStamp;
  } catch (err) {
    console.log(`getTopComments error: ${err}`);
  }
  wait.value = false;
};

/**
 * @description: 首次获取父评论的子评论
 * @param { number } id 父评论ID
 * @param { number } index 索引
 * @return {*}
 * @author: mzc
 */

const getSonCommentFirstTime = async (id: number, index: number) => {
  wait.value = true;
  getDataTag.value = id;
  try {
    const result = await getSonCommentInit(id);
    data.value.comments[index].sonComments.push(...result.data.data.comments);
    map.set(id, result.data.data.timeStamp);
  } catch (err) {
    console.log(`getSonCommentFirstTime error: ${err}`);
  }
  wait.value = false;
};

/**
 * @description: 获取子评论处理函数(非首次获取)
 * @param { number } id 顶级评论ID
 * @param { number } index 索引
 * @return {*}
 * @author: mzc
 */

const getSonComment = async (id: number, index: number) => {
  wait.value = true;
  getDataTag.value = id;
  try {
    const result = await getSonCommentList(id, map.get(id));
    data.value.comments[index].sonComments.push(...result.data.data.comments);
  } catch (err) {
    console.log(`getSonCommentList error: ${err}`);
  }
  wait.value = false;
};

/**
 * @description: 顶级评论点赞
 * @param { number } id 顶级评论ID
 * @param { number } topIndex 顶级评论索引
 * @return {*}
 * @author: mzc
 */

const hangleGiveLikeToTopComment = Throttle(
  async (id: number, topIndex: number) => {
    try {
      await giveLikeToComment(id);
      data.value.comments[topIndex].isLike =
        !data.value.comments[topIndex].isLike;
      data.value.comments[topIndex].isLike
        ? data.value.comments[topIndex].likes++
        : data.value.comments[topIndex].likes--;
    } catch (err) {
      console.log(`giveLikeToComment errror :${err}`);
    }
  },
  500
);

/**
 * @description: 第二级评论点赞
 * @param { number } 评论的ID
 * @param { number } topIndex 第一级评论的索引
 * @param { number } secondIndex 第二级评论的索引
 * @return {*}
 * @author: mzc
 */

const handleGiveLikeToSecondComment = Throttle(
  async (id: number, topIndex: number, secondIndex: number) => {
    try {
      await giveLikeToComment(id);
      data.value.comments[topIndex].sonComments[secondIndex].isLike =
        !data.value.comments[topIndex].sonComments[secondIndex].isLike;
      data.value.comments[topIndex].sonComments[secondIndex].isLike
        ? data.value.comments[topIndex].sonComments[secondIndex].likes++
        : data.value.comments[topIndex].sonComments[secondIndex].likes--;
    } catch (err) {
      console.log(`getLikeToSonComment error: ${err}`);
    }
  },
  500
);

const { type, placeholder, switchState, handleComment } = useComment(
  data,
  props.id
);
const inputText = ref("");
/* 评论后的副作用 */
const activeEffectGroup = {
  resource: (result: any) => {
    data.value.comments.unshift(result.data.data);
    data.value.commentCount++;
    inputText.value = "";
  },
  firstLevel: (index: number, result: any) => {
    data.value.comments[index].sonComments.unshift(result.data.data);
    data.value.comments[index].count++;
    switchState(-1, -1, -1);
    inputText.value = "";
  },
  secondLevel: (index1: number, index2: number, result: any) => {
    data.value.comments[index1].sonComments.unshift(result.data.data);
    data.value.comments[index1].count++;
    switchState(-1, -1, -1);
    inputText.value = "";
  },
};

const findOpIdUserName = (topIndex: number, opId: number) => {
  let val = data.value.comments[topIndex].sonComments.find(
    (item: any) => item.id === opId
  )?.user?.name;
  return val;
};
</script>
<template>
  <Modal
    :show="data !== null"
    :class="$style.modal"
    @update:show="$emit('update:show', false)"
  >
    <template #header>
      <p class="comments-all">全部评论{{ data.commentCount }}</p>
    </template>
    <template #body>
      <section class="body-container">
        <singleComment
          v-for="(item, index) in data.comments"
          :key="item.id"
          v-bind="item"
          @give-like="hangleGiveLikeToTopComment(item.id, index)"
          @ready-to-reply="switchState(item.id, index)"
        >
          <!-- 子评论 -->
          <section v-if="item.sonComments.length">
            <singleComment
              v-for="(item1, index1) in item.sonComments"
              :key="item1.id"
              v-bind="item1"
              @give-like="
                handleGiveLikeToSecondComment(item1.id, index, index1)
              "
              @ready-to-reply="switchState(item1.id, index, index1)"
            >
              <template #reply>
                <p v-if="item1.opId">
                  回复
                  {{ findOpIdUserName(index, item1.opId) }}
                </p>
              </template>
            </singleComment>
          </section>
          <!-- 展开更多 -->
          <div
            v-show="item.count - item.sonComments.length && !wait"
            class="more"
          >
            <div
              class="look-more"
              @click="getSonCommentFirstTime(item.id, index)"
              v-if="!map.has(item.id)"
            >
              <p>展开更多</p>
              <svg-icon className="icon-gengduo2" class="icon" />
            </div>
            <div
              class="look-more"
              @click="getSonComment(item.id, index)"
              v-if="map.has(item.id)"
            >
              <p>展开更多</p>
              <svg-icon className="icon-gengduo2" class="icon" />
            </div>
          </div>
          <!-- 加载中 -->
          <div class="loading" v-if="wait && item.id === getDataTag">
            <n-spin size="small"> </n-spin>
          </div>
        </singleComment>
        <!-- 展开更多 -->
        <div
          v-show="data.commentCount > data.comments.length && !wait"
          class="more top"
        >
          <div class="look-more" @click="getTopComments">
            <p>展开更多</p>
            <svg-icon className="icon-gengduo2" class="icon" />
          </div>
        </div>
        <!-- 加载中 -->
        <div class="loading top" v-if="wait && getDataTag === -1">
          <n-spin size="small"></n-spin>
        </div>
      </section>
    </template>
    <template #footer>
      <div class="footer">
        <input type="text" v-model="inputText" :placeholder="placeholder" />
        <div class="fns">
          <svg-icon className="icon-biaoqingbao" class="icon" />
          <button @click="handleComment(inputText)(activeEffectGroup[type])">
            发送
          </button>
        </div>
      </div>
    </template>
  </Modal>
</template>
<style scoped lang="scss">
.comments-all {
  @include miniFont(18px);
  padding-bottom: 10px;
}

.body-container {
  max-height: 500px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
  .more {
    margin-top: 8px;
    display: flex;
    align-items: center;
    font-weight: 500;
    @include middleFont(12px);
    cursor: pointer;
    .look-more {
      display: flex;
      align-items: center;
      .icon {
        font-size: 16px;
      }
    }
  }
  .loading {
    display: flex;
    justify-content: center;
  }
  .top {
    display: flex;
    justify-content: center;
    margin: 10px 0;
  }
}
.footer {
  padding: 8px 16px;
  background: map-get($map: $gray-colors, $key: 100);
  display: flex;
  align-items: center;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  input {
    flex: 1;
    @include middleFont(16px);
    color: map-get($map: $gray-colors, $key: 600);
    background-color: transparent;
  }
  .fns {
    display: flex;
    align-items: center;
    .icon {
      font-size: 24px;
      cursor: pointer;
    }
    button {
      @include middleFont(16px);
      padding: 3px 6px;
      margin-left: 8px;
      border-radius: 3px;
      color: #fff;
      font-weight: 500;
      background: $green-02;
      cursor: pointer;
    }
  }
}
</style>

<style module>
.modal {
  width: 100%;
  max-width: 600px;
}
</style>
