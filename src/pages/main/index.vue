<!--
 * @Description: 主要功能页面
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-08 15:10:16
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-09 00:14:57
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
} from "@constants/route";
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
                <svg-icon className="icon-xueyuan" class="item-icon"></svg-icon>
                <span class="item-text">聊天</span>
              </a>
            </router-link>
          </li>
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
                <span class="item-text">课程</span>
              </a>
            </router-link>
          </li>
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
                <span class="item-text">自习室</span>
              </a>
            </router-link>
          </li>
          <li>
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
                <svg-icon className="icon-ziyuan" class="item-icon"></svg-icon>
                <span class="item-text">资源广场</span>
              </a>
            </router-link>
          </li>
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
                <svg-icon className="icon-shequ" class="item-icon"></svg-icon>
                <span class="item-text">社区</span>
              </a>
            </router-link>
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
</style>
