<!--
 * @Description: 
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-04 17:00:05
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-02 15:16:15
-->
<script setup lang="ts">
import { useUserStore } from './store';
import router from './route';
import { MAIN_RESOURCE } from '@constants/route';
const userStore = useUserStore();

if (userStore.token) {
  router.replace({name: MAIN_RESOURCE})
}

// 获取用户信息
userStore.getInfoOfUser();

</script>
<template>
  <router-view></router-view>
</template>

<style lang="scss">
@import "./assets/css/base.scss";
@import url("./assets/iconfont/iconfont.css");
</style>
