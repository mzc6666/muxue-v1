<!--
 * @Description: 控制 资源/文件夹/文件 排列规则 , (按修改时间、创建时间等排序)
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-09-27 20:31:53
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-27 21:01:15
-->
<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { ref } from "vue";

const messageMap = new Map();
messageMap.set("create", "创建时间");
messageMap.set("modify", "修改时间");
messageMap.set("size", "文件大小");

const rule = ref<"create" | "modify" | "size">("create");
const order = ref<"up" | "down">("down");

const message = computed(() => `按${messageMap.get(rule.value)}排序`);
</script>
<template>
  <section class="sort-control">
    <svg-icon className="icon-mobile_application" class="svg-icon"></svg-icon>
    <svg-icon className="icon-xiangxiajiantou"></svg-icon>
    <p>{{ message }}</p>
  </section>
</template>
<style lang="scss" scoped></style>
