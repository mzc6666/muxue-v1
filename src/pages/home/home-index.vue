<!--
 * @Description: 首页页面
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-04 20:20:06
 * @LastEditors: mzc
 * @LastEditTime: 2023-04-27 15:34:20
-->
<script setup lang="ts">
import { DOWNLOAD, LOGIN } from "@constants/route";
console.log("home show");
</script>
<template>
  <div class="container">
    <!-- 头部 -->
    <header>
      <img src="logo.png" alt="" />
      <ul>
        <li>
          <router-link :to="{ name: LOGIN }">登录</router-link>
        </li>
      </ul>
    </header>
    <!-- 轮播图 -->
    <section class="round-imgs">
      <n-carousel show-arrow autoplay>
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
        />
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
        />
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
        />
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
        />
      </n-carousel>
    </section>
    <!-- 您的生活小助手 -->
    <section class="advantages">
      <h1>慕学-您的生活小助手</h1>
      <div class="items">
        <div class="item">
          <div class="item-header">
            <svg-icon
              className="icon-he_27ziyuanguanli"
              class="svg-icon"
            ></svg-icon>
          </div>
          <p class="item-title">资源管理</p>
          <p class="item-text">
            慕学可以对各种资源进行管理以及享，大大提高了学习效率
          </p>
        </div>
        <div class="item">
          <div class="item-header">
            <svg-icon className="icon-zixi" class="svg-icon"></svg-icon>
          </div>
          <p class="item-title">自习室</p>
          <p class="item-text">
            慕学还支持在线自习室，让你和你的亲朋好友们一起快乐学习
          </p>
        </div>
        <div class="item">
          <div class="item-header">
            <svg-icon className="icon-daiban" class="svg-icon"></svg-icon>
          </div>
          <p class="item-title">待办计划</p>
          <p class="item-text">
            慕学中的待办功能能让你制定计划，让你成为时间的主人
          </p>
        </div>
        <div class="item">
          <div class="item-header">
            <svg-icon
              className="icon-shejiaoliaotian"
              class="svg-icon"
            ></svg-icon>
          </div>
          <p class="item-title">聊天</p>
          <p class="item-text">
            慕学还支持聊天功能，让您和您的好友可以沟通学习
          </p>
        </div>
      </div>
    </section>
    <!-- 多端运行 -->
    <section class="multi-platform">
      <h1>随时随地，在各种设备上登录使用</h1>
      <div class="items">
        <div class="item">
          <div class="item-top">
            <svg-icon
              className="icon-mobile_application"
              class="svg-icon"
            ></svg-icon>
          </div>
          <p class="item-text">移动端APP下载</p>
        </div>
        <div class="item">
          <div class="item-top">
            <svg-icon
              className="icon-gwsyunzhuomian"
              class="svg-icon"
            ></svg-icon>
          </div>
          <p class="item-text">桌面端下载</p>
        </div>
        <div class="item">
          <div class="item-top">
            <svg-icon
              className="icon-wangye-web_h5"
              class="svg-icon"
            ></svg-icon>
          </div>
          <p class="item-text">使用网页端</p>
        </div>
      </div>
    </section>
    <!-- 网站备案 -->
    <!-- <footer>
      <p>备案信息</p>
    </footer> -->
  </div>
</template>
<style lang="scss" scoped>
.container {
  padding: 0 rem(40);
  height: 100%;
  header {
    height: 125px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      height: 75px;
      width: 150px;
      background-color: green;
    }
    ul {
      display: flex;
      ul > li:last-child {
        margin-right: 0;
      }
      li {
        margin-right: 25px;
        a {
          @include BigFont(18px);
          padding: 4px 8px;
          color: map-get($map: $gray-colors, $key: 700);
          border-radius: 3px;
          transition: all 0.3s;
          &:hover {
            background-color: map-get($map: $gray-colors, $key: 200);
          }
        }
      }
    }
  }
  section.round-imgs {
    img {
      width: 100%;
      height: rem(600);
    }
  }
  section.advantages {
    margin-top: rem(35);
    display: flex;
    flex-direction: column;
    > * {
      margin-bottom: rem(35);
    }
    .items {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 0;
      .item {
        box-sizing: border-box;
        width: rem(300);
        // padding: rem(20) 20px;
        padding: 20px;
        margin-bottom: rem(35);
        border: 1px solid map-get($map: $green-colors, $key: 800);
        // border-radius: rem(20);
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        > * {
          margin-bottom: rem(20);
        }
        .item-header {
          width: rem(150);
          height: rem(150);
          border-radius: 50%;
          box-sizing: border-box;
          border: 2px solid map-get($map: $green-colors, $key: 800);
          display: flex;
          justify-content: center;
          align-items: center;
          .svg-icon {
            font-size: rem(90);
          }
        }
        .item-title {
          @include middleFont(24px);
          color: map-get($map: $gray-colors, $key: 700);
        }
        .item-text {
          @include middleFont(14px);
          text-align: left;
          color: map-get($map: $gray-colors, $key: 400);
        }
      }
    }
  }
  section.multi-platform {
    margin-top: rem(50);
    > * {
      margin-bottom: rem(35);
    }
    .items {
      display: flex;
      justify-content: space-evenly;
      .item {
        width: rem(300);
        border-radius: rem(20);
        margin-bottom: rem(35);
        overflow: hidden;
        box-shadow: 1px 1px 4px 0
          transparentize(
            $color: map-get($map: $green-colors, $key: 600),
            $amount: 0.5
          );
        .item-top {
          height: rem(300);
          display: flex;
          justify-content: center;
          align-items: center;
          background: transparentize(
            $color: map-get($map: $green-colors, $key: 600),
            $amount: 0.3
          );
          .svg-icon {
            font-size: rem(200);
          }
        }
        p.item-text {
          @include BigFont(20px);
          margin: rem(10) 0;
          text-align: center;
        }
      }
    }
  }
  footer {
    p {
      @include BigFont(36px);
      text-align: center;
    }
  }
}
h1 {
  text-align: center;
}
</style>
