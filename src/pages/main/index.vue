<!--
 * @Description: 主要功能页面
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-08 15:10:16
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-16 16:57:42
-->
<script setup lang="ts">
import {
  MAIN_BACKLOG,
  MAIN_CHATTING,
  MAIN_COURSE,
  MAIN_STUDYROOM,
  MAIN_RESOURCESQUARE,
  MAIN_COMMUNITY,
  MAIN_RESOURCE_MYRESOURCE,
  LOGIN,
  MAIN_MY_CENTER,
} from "@constants/route";
import { useMessageStore, useUserStore } from "@/store";
import { onMounted } from "vue";
import router from "@/route";
import { addListener } from "@/api/websocket";
import { RECEIVE_MESSAGE_EVENT } from "@constants/events";

const messageStore = useMessageStore();
const userStore = useUserStore();

// 注册事件
addListener(RECEIVE_MESSAGE_EVENT, messageStore.handleMessageArrived);

onMounted(() => {
  userStore.getInfoOfUser();
});

// 退出
const handleExit = () => {
  router.replace({ name: LOGIN });
};
</script>
<template>
  <main>
    <nav>
      <article class="left-top">
        <section class="logo">
          <img
            src="/logo.png"
            alt=""
          />
        </section>
        <ul>
          <!-- 学习资源 -->
          <li>
            <router-link
              :to="{ name: 'studyResource' }"
              custom
              v-slot="{ isActive, navigate, href }"
            >
              <a
                :href="href"
                @click="navigate"
                :class="[isActive ? 'active' : 'no-active', 'route-a']"
              >
                <svg-icon
                  className="icon-icon-test"
                  class="item-icon"
                ></svg-icon>
                <span class="item-text">学习资源</span>
              </a>
            </router-link>
          </li>
          <!-- 我的资源
          <li>
            <router-link
              :to="{ name: MAIN_RESOURCE_MYRESOURCE }"
              custom
              v-slot="{ isActive, navigate, href }"
            >
              <a
                :href="href"
                @click="navigate"
                :class="[isActive ? 'active' : 'no-active', 'route-a']"
              >
                <svg-icon
                  className="icon-icon-test"
                  class="item-icon"
                ></svg-icon>
                <span class="item-text">我的资源</span>
              </a>
            </router-link>
          </li>
           资源广场 -->
          <!-- <li>
            <router-link
              :to="{ name: MAIN_RESOURCESQUARE }"
              custom
              v-slot="{ isActive, navigate, href }"
            >
              <a
                :href="href"
                @click="navigate"
                :class="[isActive ? 'active' : 'no-active', 'route-a']"
              >
                <svg-icon
                  className="icon-ziyuan"
                  class="item-icon"
                ></svg-icon>
                <span class="item-text">资源广场</span>
              </a>
            </router-link>
          </li>  -->
          <!-- 课程资源 -->
          <li>
            <router-link
              :to="{ name: MAIN_COURSE }"
              custom
              v-slot="{ isActive, navigate, href }"
            >
              <a
                :href="href"
                @click="navigate"
                :class="[isActive ? 'active' : 'no-active', 'route-a']"
              >
                <svg-icon
                  className="icon-wodekecheng"
                  class="item-icon"
                ></svg-icon>
                <span class="item-text">课程资源</span>
              </a>
            </router-link>
          </li>
          <!-- 待办计划 -->
          <li>
            <router-link
              :to="{ name: MAIN_BACKLOG }"
              custom
              v-slot="{ isActive, navigate, href }"
            >
              <a
                :href="href"
                @click="navigate"
                :class="[isActive ? 'active' : 'no-active', 'route-a']"
              >
                <svg-icon
                  className="icon-renwujihua"
                  class="item-icon"
                ></svg-icon>
                <span class="item-text">待办计划</span>
              </a>
            </router-link>
          </li>
          <!-- 自习室 -->
          <li>
            <router-link
              :to="{ name: MAIN_STUDYROOM }"
              custom
              v-slot="{ isActive, navigate, href }"
            >
              <a
                :href="href"
                @click="navigate"
                :class="[isActive ? 'active' : 'no-active', 'route-a']"
              >
                <svg-icon
                  className="icon-xueyuan-xuexizhong"
                  class="item-icon"
                ></svg-icon>
                <span class="item-text">自 习 室</span>
              </a>
            </router-link>
          </li>
          <!-- 互动聊天 -->
          <li>
            <router-link
              :to="{ name: MAIN_CHATTING }"
              custom
              v-slot="{ isActive, navigate, href }"
            >
              <a
                :href="href"
                @click="navigate"
                :class="[isActive ? 'active' : 'no-active', 'route-a']"
              >
                <svg-icon
                  className="icon-xueyuan"
                  class="item-icon"
                ></svg-icon>
                <span class="item-text">互动聊天</span>
              </a>
            </router-link>
          </li>
          <!-- 学习社区 -->
          <li>
            <router-link
              :to="{ name: MAIN_COMMUNITY }"
              custom
              v-slot="{ isActive, navigate, href }"
            >
              <a
                :href="href"
                @click="navigate"
                :class="[isActive ? 'active' : 'no-active', 'route-a']"
              >
                <svg-icon
                  className="icon-shequ"
                  class="item-icon"
                ></svg-icon>
                <span class="item-text">学习社区</span>
              </a>
            </router-link>
          </li>
          <!-- 我的中心 -->
          <li>
            <router-link
              :to="{ name: MAIN_MY_CENTER }"
              custom
              v-slot="{ isActive, navigate, href }"
            >
              <a
                :href="href"
                @click="navigate"
                :class="[isActive ? 'active' : 'no-active', 'route-a']"
              >
                <svg-icon
                  className="icon-shequ"
                  class="item-icon"
                ></svg-icon>
                <span class="item-text">我的中心</span>
              </a>
            </router-link>
          </li>
        </ul>
      </article>
      <section class="left-bottom">
        <n-dropdown
          trigger="hover"
          :options="[{ label: '退出登录', key: 'exit' }]"
          @select="handleExit"
        >
          <div class="tag-info">
            <n-avatar
              round
              size="medium"
              :src="userStore.userInfo.avatar"
            />
            <span class="username">{{ userStore.userInfo.username }}</span>
          </div>
        </n-dropdown>
      </section>
    </nav>
    <router-view
      class="router-view"
      v-slot="{ Component }"
    >
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </main>
</template>
<style lang="scss" scoped>
main {
  height: 100%;
  display: flex;
  > nav {
    width: 240px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: $green-02;
    article.left-top {
      > section.logo {
        padding: 25px;
        img {
          width: 150px;
          height: 75px;
          background: green;
        }
      }
      ul {
        li {
          margin: 6px 0;
          .route-a {
            display: block;
            margin: 0 10px;
            padding: 6px 0;
            text-align: left;
            display: flex;
            align-items: center;
            border-radius: 5px;
            transition: background 0.3s ease-in-out;
            &.active {
              background-color: $green-03;
            }
            &.no-active {
              background-color: transparent;
            }
          }
          .item-icon {
            color: #fff;
            font-size: 24px;
            margin-left: 32px;
            margin-right: 16px;
          }
          .item-text {
            color: #fff;
            @include BigFont(16px);
            font-weight: 200;
          }
        }
      }
    }
  }
  > .router-view {
    flex: 1;
  }
}
.tag-info {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
  /* background: red; */
  span.username {
    margin-left: 1em;
    color: #fff;
  }
}
</style>
