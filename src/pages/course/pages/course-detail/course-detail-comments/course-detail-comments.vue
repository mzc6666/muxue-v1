<script setup lang="ts">
import { useClassStore } from "@/store";
import {
  getCourseComment,
  makeCommentToCouse,
  handleGiveLike,
} from "@/api/modules/course";
import { reactive, ref, computed } from "vue";
import router from "@/route";
import { MAIN_COURSE_ITEM_TITLE_DETAIL } from "@/constant/route";

const classStore = useClassStore();

const classId = classStore.classId; // 课程ID

const search_value = ref(""); // 搜索内容

const comments: CourseCommenInterface[] = reactive([]);

const renderList = computed(() => {
  return comments.filter(
    (item) =>
      search_value.value === "" ||
      item.content.indexOf(search_value.value) != -1
  );
});

// 获取评论列表
getCourseComment(classId)
  .then((res) => {
    // console.log("data: ", res.data.data.data);
    comments.push(...res.data.data.data);
    console.log;
  })
  .catch((error) => {
    console.log("getCourseComment error: ", error);
  });

// 查看具体详情
const handleLookDetailTitle = (id: number) => {
  classStore.setTopLevelCommentId(id);
  router.push({
    name: MAIN_COURSE_ITEM_TITLE_DETAIL,
  });
};

const comment_content = ref("");
// 发表评论
const handleComment = async () => {
  try {
    const result = await makeCommentToCouse(classId, comment_content.value);
    comments.unshift(result.data.data);
  } catch (error) {
    console.log(`makeCommentToCouse error: `, error);
  }
  comment_content.value = "";
};

let timer: any = false;
const giveLike = async (index: number) => {
  if (timer) {
    return;
  }
  try {
    const result = await handleGiveLike(renderList.value[index].commentId);
    if (result.data.code === "200") {
      renderList.value[index].isLike = !renderList.value[index].isLike;
      timer = setTimeout(() => {
        timer = null;
        clearTimeout(timer);
      }, 300);
    }
  } catch (error) {
    console.log("handleGiveLike error: ", error);
  }
};
</script>
<template>
  <div class="comment-container">
    <!-- 顶部输入搜索框 -->
    <div class="header">
      <n-input-group>
        <n-input
          :style="{ width: '50%' }"
          placeholder="搜索内容"
          v-model:value="search_value"
        />
      </n-input-group>
    </div>
    <!-- 评论内容 -->
    <div
      class="comment-item"
      v-for="(item, index) in renderList"
      :key="item.commentId"
      @click="handleLookDetailTitle(item.commentId)"
    >
      <div class="left">
        <div class="avatar">
          <n-avatar :size="48" :src="item.user.avatar" />
        </div>
        <div class="comment-text">
          <div class="top-text">
            <div class="username">{{ item.user.username }}</div>
            <div class="tag" v-if="item.isOwn">
              <n-tag type="success" size="small" round>我</n-tag>
            </div>
            <div class="time">{{ item.time }}</div>
          </div>
          <div class="bottom-text">
            {{ item.content }}
          </div>
        </div>
      </div>
      <div class="right" @click.stop="giveLike(index)">
        <svg-icon
          className="icon-dianzan1"
          :class="item.isLike ? 'like' : 'unlike'"
        ></svg-icon>
      </div>
    </div>
    <!-- 底部评论框 -->
    <div class="comment-section">
      <n-input
        show-count
        v-model:value="comment_content"
        type="textarea"
        placeholder="对当前课程评论,CTRL + ENTER 键即可发送"
        @keydown.ctrl.enter="handleComment"
        :autosize="{
          minRows: 3,
        }"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
.comment-container {
  height: 100%;
  overflow: auto;
  .header {
    padding: 2em 0.45rem;
  }
  .comment-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    transition: all 0.3s ease-in-out;
    padding: 1.5em 0.45rem;
    border-bottom: 1px solid #f4f4f4;
    cursor: pointer;
    .left {
      display: flex;
      .avatar {
        padding-right: 0.2rem;
      }
      .top-text {
        display: flex;
        align-items: center;
        .username {
          margin-right: 1em;
          color: #444;
        }
        .time {
          font-size: 13px;
          margin-left: 1em;
        }
      }
      .bottom-text {
        line-height: 2;
      }
    }

    .right {
      .like {
        color: red;
      }
      .unlike {
        color: #666;
      }
    }
    &:hover {
      background: #f4f4f4;
    }
  }
  .comment-section {
    padding: 1em 0.45rem 1em;
  }
}
</style>
