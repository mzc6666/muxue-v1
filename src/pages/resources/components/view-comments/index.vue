<!--
 * @Description: 
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-09-07 16:11:38
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-08 20:54:04
-->
<script setup lang="ts">
import singleComment from "./components/single-comment.vue";
import Modal from "@components/Modal/index.vue";
import Input from "@components/Input/index.vue";
import {
  getResourceComment,
  getSonCommentList,
  giveLikeToComment,
} from "@apis/modules/resources";
import { Throttle } from "@/utils/public";
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    id: number;
  }>(),
  {}
);

const emits = defineEmits(["update:show"]);

const data = ref<any>(null);
const wait = ref<boolean>(false); // 是否在获取数据
const getDataTag = ref(0); // 正在获取数据的 index

/**
 * @description: 获取最顶级评论
 * @return {*}
 * @author: mzc
 */

const getData = async () => {
  wait.value = true;
  getResourceComment(props.id)
    .then((res) => {
      data.value = res.data.data;
    })
    .catch((err) => {
      console.log("getResourceComment error", err);
    })
    .finally(() => {
      wait.value = false;
    });
};
getData();

/**
 * @description: 获取子评论处理函数
 * @param { number } id 顶级评论ID
 * @param { number } index 索引
 * @return {*}
 * @author: mzc
 */

const getSonComment = (id: number, index: number) => {
  wait.value = true;
  getDataTag.value = index;
  getSonCommentList(id)
    .then((res) => {
      data.value.comments[index].sonComments.push(...res.data.data);
    })
    .catch((err) => {
      console.log("getSonCommentList error", err);
    })
    .finally(() => {
      wait.value = false;
    });
};

/**
 * @description: 顶级评论点赞
 * @param { number } id 顶级评论ID
 * @param { number } topIndex 顶级评论索引
 * @return {*}
 * @author: mzc
 */

const hangleGiveLikeToTopComment = Throttle((id: number, topIndex: number) => {
  giveLikeToComment(id)
    .then(() => {
      data.value.comments[topIndex].isLike =
        !data.value.comments[topIndex].isLike;
      data.value.comments[topIndex].isLike
        ? data.value.comments[topIndex].likes++
        : data.value.comments[topIndex].likes--;
    })
    .catch((err) => {
      console.log("giveLikeToComment error", err);
    });
}, 500);

/**
 * @description: 第二级评论点赞
 * @param { number } 评论的ID
 * @param { number } topIndex 第一级评论的索引
 * @param { number } secondIndex 第二级评论的索引
 * @return {*}
 * @author: mzc
 */

const handleGiveLikeToSecondComment = Throttle(
  (id: number, topIndex: number, secondIndex: number) => {
    giveLikeToComment(id).then(() => {
      data.value.comments[topIndex].sonComments[secondIndex].isLike =
        !data.value.comments[topIndex].sonComments[secondIndex].isLike;
      data.value.comments[topIndex].sonComments[secondIndex].isLike
        ? data.value.comments[topIndex].sonComments[secondIndex].likes++
        : data.value.comments[topIndex].sonComments[secondIndex].likes--;
    });
  },
  500
);

// 输入内容
const text = ref("");
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
            ></singleComment>
          </section>
          <!-- 展开更多 -->
          <div
            v-show="item.count - item.sonComments.length && !wait"
            class="more"
          >
            <div class="look-more" @click="getSonComment(item.id, index)">
              <p>展开更多</p>
              <svg-icon className="icon-gengduo2" class="icon" />
            </div>
          </div>
          <!-- 加载中 -->
          <div class="loading">
            <n-spin size="small" v-if="wait && index === getDataTag"> </n-spin>
          </div>
        </singleComment>
      </section>
    </template>
    <template #footer>
      <div class="footer">
        <input type="text" />
        <div class="fns">
          <svg-icon className="icon-biaoqingbao" class="icon" />
          <button>发送</button>
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
