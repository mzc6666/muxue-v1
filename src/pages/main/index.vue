<!--
 * @Description: 主要功能页面
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-08 15:10:16
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-25 15:04:06
-->
<script setup lang="ts">
import {
  MAIN_RESOURCE,
  MAIN_BACKLOG,
  LOGIN,
  MAIN_CHATTING,
  MAIN_COURSE,
  MAIN_STUDYROOM,
  MAIN_RESOURCESQUARE,
  MAIN_COMMUNITY,
  MAIN_RESOURCE_MYRESOURCE,
} from "@constants/route";
import RouteLink from "./component/route-link/index.vue";
import { useRoute } from "vue-router";
import { computed } from "@vue/reactivity";
const route = useRoute();
const fullPath = computed(() => {
  return route.fullPath;
});
</script>
<template>
  <main>
    <nav>
      <article class="left-top">
        <section class="logo">
          <img src="" alt="" />
        </section>
        <ul>
          <li>
            <route-link :to="{ name: MAIN_RESOURCE_MYRESOURCE }">
              <template #icon>
                <svg-icon
                  className="icon-icon-test"
                  class="item-icon"
                ></svg-icon>
              </template>
              <template #text>
                <span class="item-text">我的资源</span>
              </template>
            </route-link>
          </li>
          <li>
            <route-link :to="{ name: MAIN_BACKLOG }">
              <template #icon>
                <svg-icon
                  className="icon-renwujihua"
                  class="item-icon"
                ></svg-icon>
              </template>
              <template #text>
                <span class="item-text">待办计划</span>
              </template>
            </route-link>
          </li>
          <li>
            <route-link :to="{ name: MAIN_CHATTING }">
              <template #icon>
                <svg-icon className="icon-xueyuan" class="item-icon"></svg-icon>
              </template>
              <template #text>
                <span class="item-text">聊天</span>
              </template>
            </route-link>
          </li>
          <li>
            <route-link :to="{ name: MAIN_COURSE }">
              <template #icon>
                <svg-icon
                  className="icon-wodekecheng"
                  class="item-icon"
                ></svg-icon>
              </template>
              <template #text>
                <span class="item-text">课程</span>
              </template>
            </route-link>
          </li>
          <li>
            <route-link :to="{ name: MAIN_STUDYROOM }">
              <template #icon>
                <svg-icon
                  className="icon-xueyuan-xuexizhong"
                  class="item-icon"
                ></svg-icon>
              </template>
              <template #text>
                <span class="item-text">自习室</span>
              </template>
            </route-link>
          </li>
          <li>
            <route-link :to="{ name: MAIN_RESOURCESQUARE }">
              <template #icon>
                <svg-icon className="icon-ziyuan" class="item-icon"></svg-icon>
              </template>
              <template #text>
                <span class="item-text">资源广场</span>
              </template>
            </route-link>
          </li>
          <li>
            <route-link :to="{ name: MAIN_COMMUNITY }">
              <template #icon>
                <svg-icon className="icon-shequ" class="item-icon"></svg-icon>
              </template>
              <template #text>
                <span class="item-text">社区</span>
              </template>
            </route-link>
          </li>
        </ul>
      </article>
      <section class="left-bottom">sdfsdf</section>
    </nav>
    <router-view class="router-view" v-slot="{ Component }">
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
</style>
