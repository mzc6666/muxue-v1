<!--
 * @Description: 聊天页面
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-20 15:07:16
 * @LastEditors: mzc
 * @LastEditTime: 2023-04-12 12:26:46
-->
<script setup lang="ts">
import { useMessageStore, useUserStore } from "@/store";
import { ref } from "vue";
import { sendMessageToFriend } from "@/api/modules/message";

const messageStore = useMessageStore();
const userStore = useUserStore();

// 格式化时间
const formatTime = (timeStr: string) => {
  const time = new Date(timeStr);
  const now = new Date();
  if (
    time.getMonth() === now.getMonth() &&
    time.getFullYear() === now.getFullYear() &&
    time.getDate() === now.getDate()
  ) {
    return `${time.getHours() < 10 ? "0" + time.getHours() : time.getHours()}:${
      time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
    }`;
  } else {
    return `${time.getMonth()}月 ${time.getDate()} 日`;
  }
};

// 输入值
const value = ref("");

// 发送内容
const sendMessage = async () => {
  if (value.value) {
    sendMessageToFriend(userStore.userInfo.id, value.value);
    value.value = "";
  }
};
</script>
<template>
  <div class="chatting-container">
    <div class="left-section">
      <div
        class="friend-item"
        v-for="(item, index) in Object.keys(messageStore.records)"
        :key="item"
        @click="messageStore.setLookId(Number(item))"
      >
        <n-avatar
          round
          :size="40"
          :src="messageStore.records[item].info.cover"
        />
        <div class="right-info">
          <div class="info-top">
            <div class="username">
              {{ messageStore.records[item].info.username }}
            </div>
            <div class="time">
              {{ formatTime(messageStore.records[item].messages.at(-1).time) }}
            </div>
          </div>
          <div class="bottom-info">
            <div class="message">
              {{ messageStore.records[item].messages.at(-1).content }}
            </div>
            <div class="not-look-num" v-if="messageStore.records[item].unRead">
              {{ messageStore.records[item].unRead }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-section" v-if="messageStore.lookId !== -1">
      <div class="top-userinfo">
        <p>{{ messageStore.records[messageStore.lookId].info.username }}</p>
      </div>
      <div class="message-container">
        <div class="message-content">
          <div
            class="message-item"
            v-for="(item, index) in messageStore.records[messageStore.lookId]
              .messages"
            :key="item.time"
            :style="{
              flexDirection:
                item.sender.userId === userStore.userInfo.id
                  ? 'row-reverse'
                  : 'row',
            }"
          >
            <div class="avatar">
              <n-avatar round :size="40" :src="item.sender.cover" />
            </div>
            <div class="info">
              <div class="username">{{ item.sender.username }}</div>
              <div class="message">{{ item.content }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-send">
        <n-input
          type="textarea"
          show-count
          v-model:value="value"
          placeholder="Enter键发送内容"
          @keydown.ctrl.enter="sendMessage"
        >
        </n-input>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
div.chatting-container {
  display: flex;
  .left-section {
    width: 300px;
    border-right: 1px solid #e4e4e4;

    .friend-item {
      display: flex;
      align-items: center;
      // border-right: 1px solid #e4e4e4;
      padding: 0.5em;
      border-bottom: 1px solid #e4e4e4;
      .right-info {
        flex: 1;
        padding-left: 1em;
        font-size: 14px;
        .info-top {
          display: flex;
          justify-content: space-between;
          .time {
            color: #666;
          }
        }
        .bottom-info {
          display: flex;
          justify-content: space-between;
          .not-look-num {
            width: 20px;
            height: 20px;
            border-radius: 10px;
            background-color: red;
            text-align: center;
            font-weight: bold;
            color: #fff;
            font-size: 12px;
            line-height: 20px;
          }
        }
      }
    }
  }
  .right-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    .top-userinfo {
      padding: 1em;
      border-bottom: 1px solid #e4e4e4;
    }
    .message-container {
      flex: 1;
      position: relative;
      overflow: auto;
      .message-content {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        .message-item {
          display: flex;
          padding: 1em 0;
          .avatar {
            padding: 0 0.6em;
          }
          .username {
            font-size: 14px;
          }
          .message {
            border: 1px solid #e4e4e4;
            padding: 4px 0.5em;
            border-radius: 4px;
          }
        }
      }
    }
  }
}
</style>
