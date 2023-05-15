<template>
  <div class="study">
    <div class="tab">
      <!-- <div class="btn">
        我的资源
      </div>
      <div class="btn">
        资源广场
      </div> -->
      <!-- 我的资源 -->
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

            <span class="item-text">我的资源</span>
          </a>
        </router-link>
      </li>
      <!-- 资源广场  -->
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

            <span class="item-text">资源广场</span>
          </a>
        </router-link>
      </li>
    </div>
    <div class="contentBox">
      <router-view
        class="router-view"
        v-slot="{ Component }"
      >
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  MAIN_RESOURCE_MYRESOURCE,
  MAIN_RESOURCESQUARE,
} from "@constants/route/index";
</script>


<style lang="scss" scoped>
.study {
  display: flex;
  flex-direction: column;
  .tab {
    display: flex;
    width: 550px;
    margin-top: 20px;
    justify-content: space-around;
    li {
      margin: 6px 0;
      border-radius: 10px;
      border: #4ade80 solid 1px;
      border: 1px soild #4ade80;
      padding: 0 30px;
      .route-a {
        display: block;
        margin: 0 10px;
        padding: 6px 0;
        text-align: left;
        display: flex;
        align-items: center;
        border-radius: 5px;
        transition: background 0.3s ease-in-out;
        // &.active {
        //   background-color: $green-03;
        // }
        &.no-active {
          background-color: transparent;
        }
      }
      
      .item-text {
        color: #000;
        @include BigFont(20px);
        font-weight: 500;
      }
    }
  }

  .contentBox {
    flex: 1;
  }
}
</style>