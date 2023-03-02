<!--
 * @Description: 聊天页面
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-20 15:07:16
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-03 01:15:35
-->
<script setup lang="ts">
import { useMessageStore, useUserStore } from "@/store";
import socket from "@apis/websocket";
import { computed, onMounted, watchEffect, ref } from "vue";
import { storeToRefs } from "pinia";
import { sendMessageToFriend } from "@apis/modules/message";

const messageStore = useMessageStore();
const userStore = useUserStore();

const { currentChatPersonId } = storeToRefs(messageStore);
const { userInfo } = storeToRefs(userStore);

const messages = computed(() => {
  const map = new Map();
  for (let key in messageStore.friendChattingRecord) {
    map.set(Number(key), messageStore.friendChattingRecord[key]);
  }
  return map;
});

// 当前聊天对象的姓名
const chatting_name = computed(() => {
  const record = messages.value.get(currentChatPersonId.value)[0];
  return record.sender.userId === userInfo.value.id
    ? record.receiver.username
    : record.sender.username;
});

const text = ref(""); // 发送消息内容
const handleSendMessage = () => {
  sendMessageToFriend(currentChatPersonId.value, text.value);
  text.value = "";
};
</script>
<template>
  <div class="chatting-container">
    <div class="person-list">
      <!-- 添加好友/ 群组 -->
      <div class="add-friend-group">
        <div class="add-friend"></div>
      </div>
      <div
        v-for="([key, value], index) in messages.entries()"
        :key="key"
        class="person-item"
        @click.stop="messageStore.setCurrentChaptPersonId(key)"
      >
        <div class="avatar">
          <n-avatar
            round
            :size="48"
            :src="
              value[0].sender.userId == userInfo.id
                ? value[0].receiver.cover
                : value[0].sender.cover
            "
          />
        </div>
        <div class="text-content">
          <div class="username">
            <div>
              {{
                value[0].sender.userId == userInfo.id
                  ? value[0].receiver.username
                  : value[0].sender.username
              }}
            </div>
            <div class="time">{{ value[0].time }}</div>
          </div>
          <div class="latest-info">{{ value[value.length - 1].content }}</div>
        </div>
      </div>
    </div>
    <div class="chatting-list">
      <!-- 无内容，占位置 -->
      <div v-if="messageStore.currentChatPersonId === 0">无内容</div>
      <!-- 内容 -->
      <div v-else class="chatting-content">
        <div class="header">
          <div class="chat-person-name">{{ chatting_name }}</div>
        </div>
        <div class="message-list-container">
          <div class="message-list">
            <div
              class="message-item"
              :style="{
                flexDirection:
                  item.sender.userId === userInfo.id ? 'row-reverse' : 'row',
              }"
              v-for="(item, key) in messages.get(currentChatPersonId)"
              :key="JSON.stringify(item)"
            >
              <div class="avatar">
                <n-avatar round :size="40" :src="item.sender.cover" />
              </div>
              <div class="message-detail">
                <p class="username">{{ item.sender.username }}</p>
                <p class="send-content">{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="input-area">
          <n-input
            v-model:value="text"
            type="textarea"
            placeholder="按下Enter键发送消息"
            autofocus
            :autosize="{ minRows: 3, maxRows: 3 }"
            @keydown.ctrl.enter="handleSendMessage"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
div.chatting-container {
  display: flex;
  .person-list {
    width: 340px;
    height: 100%;
    overflow: auto;
    .person-item {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e4e4e4;
      margin: 0 4px;
      cursor: pointer;
      background-color: #fff;
      transition: all 0.5s;
      .avatar {
        padding: 10px;
        padding-left: 20px;
      }
      .text-content {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 10px 30px 10px 10px;
        .username {
          display: flex;
          justify-content: space-between;
          :first-child {
            color: map-get($map: $gray-colors, $key: 600);
          }
          .time {
            font-size: 14px;
            color: map-get($map: $gray-colors, $key: 400);
          }
        }
      }
      &:hover {
        background-color: #e9e4f0;
      }
    }
  }
  .chatting-list {
    flex: 1;
    border-left: 1px solid #e4e4e4;
    .chatting-content {
      display: flex;
      flex-direction: column;
      height: 100%;
      .header {
        padding: 20px 28px;
        font-size: 20px;
        font-weight: 600;
        border-bottom: 1px solid #e4e4e4;
      }
      .message-list-container {
        flex: 1;
        position: relative;
        .message-list {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          .message-item {
            display: flex;
            align-items: center;
            padding: 10px 20px;
            margin: 20px;
            .message-detail {
              padding-left: 1em;
              /* padding-top: 2em; */
              .username {
                margin-bottom: 0.5em;
              }
              .send-content {
                background: #f4f4f4;
                padding: 6px 12px;
                border-radius: 3px;
              }
            }
          }
        }
      }
      .input-area {
        padding: 0 12px 12px;
      }
    }
  }
}
</style>
