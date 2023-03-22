<!--
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-20 15:21:19
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-08 18:35:25
-->
<script setup lang="ts">
import {
  MAIN_COMMUNTIY_LIKES,
  MAIN_COMMUNITY_COLLECTIONS,
  MAIN_COMMUNITY_ARTICLE_ADD,
} from "@/constant/route";
</script>
<template>
  <div class="communtiy-container">
    <header>
      <n-input-group>
        <n-input :style="{ width: '50%' }" placeholder="搜索文章" />
        <n-button type="primary" ghost> 搜索 </n-button>
      </n-input-group>
      <div class="right">
        <ul class="routes">
          <li>
            <router-link :to="{ name: MAIN_COMMUNTIY_LIKES }"
              >我的点赞</router-link
            >
          </li>

          <li>
            <router-link :to="{ name: MAIN_COMMUNITY_COLLECTIONS }"
              >收藏</router-link
            >
          </li>
        </ul>
        <n-button strong secondary round type="success">
          <router-link
            :to="{ name: MAIN_COMMUNITY_ARTICLE_ADD }"
            class="add-article-router-link"
            >发布文章</router-link
          >
        </n-button>
      </div>
    </header>
    <router-view class="router-view"></router-view>
  </div>
</template>
<style scoped lang="scss">
.communtiy-container {
  display: flex;
  flex-direction: column;
  header {
    padding: 20px rem(30);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right {
      display: flex;
      align-items: center;
      ul.routes {
        display: flex;
        white-space: nowrap;
        li {
          margin: 0 1em;
          a {
            color: #444;
          }
        }
      }
      .add-article-router-link {
        color: #444;
      }
    }
  }

  .router-view {
    flex: 1;
  }
}
</style>
