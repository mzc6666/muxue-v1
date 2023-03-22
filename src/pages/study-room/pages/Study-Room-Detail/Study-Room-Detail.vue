<!--
 * @Description: 
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-03-19 16:56:58
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-19 21:21:18
-->
<script setup lang="ts">
import { useStudyRoomStore } from "@/store";
import { addListener, removeListener } from "@/api/websocket";
import { onBeforeUnmount, onMounted } from "vue";
import {
  STUDYROOM_NEW_USER_JOIN,
  STUDYROOM_USER_EXIT,
  STUDYROOM_NEW_MESSAGE_ARRIVED,
  STUDYROOM_NEW_IMAGE_STREAM,
  STUDYROOM_DISSOLVE,
} from "@/constant/events";
import router from "@/route";
import RealTimeVideoBox from "../../components/RealTimeVideoBox/RealTimeVideoBox.vue";
import { sendImageFrameStream } from "@/api/modules/study-room";

const props = defineProps<{
  id: number;
}>();

const studyRoomStore = useStudyRoomStore();

studyRoomStore.getDetailInfo(props.id);

onMounted(() => {
  // 新用户加入
  addListener(
    STUDYROOM_NEW_USER_JOIN,
    (data: {
      eventName: string;
      userInfo: {
        id: number;
        avatar: string;
        username: string;
      };
    }) => studyRoomStore.handleNewUserArrived(data.userInfo)
  );
  // 用户退出
  addListener(STUDYROOM_USER_EXIT, (data: { eventName: string; id: number }) =>
    studyRoomStore.handleUserExit(data.id)
  );
  // 用户自习室发送消息
  addListener(
    STUDYROOM_NEW_MESSAGE_ARRIVED,
    (data: {
      eventName: string;
      messageId: number;
      content: string;
      time: string;
    }) => {
      const { eventName, ...data1 } = data;
      studyRoomStore.handleNewMessageArrived(data1);
    }
  );
  // 用户图片数据流传输
  addListener(
    STUDYROOM_NEW_IMAGE_STREAM,
    (data: { eventName: string; id: number; data: string }) =>
      studyRoomStore.handleImageStreamDataArrived(data.id, data.data)
  );
  // 自习室解散
  addListener(STUDYROOM_DISSOLVE, () => router.back());
});
onBeforeUnmount(() => {
  removeListener(STUDYROOM_NEW_USER_JOIN);
  removeListener(STUDYROOM_USER_EXIT);
  removeListener(STUDYROOM_NEW_MESSAGE_ARRIVED);
  removeListener(STUDYROOM_NEW_IMAGE_STREAM);
  removeListener(STUDYROOM_DISSOLVE);
});

// 发送图片帧
const sendImageFrameData = (data: string) =>
  sendImageFrameStream(props.id, data);
</script>
<template>
  <div class="detail-container">
    <div class="left-section">
      <RealTimeVideoBox
        @expose-image-stream="sendImageFrameData"
      ></RealTimeVideoBox>
      <div class="comment-container">
        <div class="comment-content">
          <div
            v-for="(item, index) in studyRoomStore.messages"
            :key="item.messageId"
            class="comment-item"
          >
            <p>{{ item.content }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="person-lists">
      <div class="person-content">
        <div
          v-for="(item, index) in studyRoomStore.personList"
          :key="item.pId"
          class="person-item"
        >
          <img :src="item.data" alt="" />
          <span>{{ item.username }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.detail-container {
  display: flex;
  justify-content: space-between;
  padding: 10px rem(30);
  .left-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    .comment-container {
      flex: 1;
      position: relative;
      overflow: auto;
      .comment-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        .comment-item {
          border-top: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          line-height: 2;
        }
      }
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
  .person-lists {
    width: 200px;
    position: relative;
    margin-left: 1em;
    overflow: auto;
    .person-content {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
    .person-item {
      width: 200px;
      height: 100px;

      margin-bottom: 1em;
      border-radius: 4px;
      position: relative;
      // background: red;
      img {
        width: 200px;
        height: 100px;
      }
      span {
        position: absolute;
        bottom: 0.5em;
        left: 0.5em;
        font-size: 12px;
        color: #fff;
      }
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
