<!--
 * @Description: 
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-04-27 16:48:09
 * @LastEditors: mzc
 * @LastEditTime: 2023-04-28 17:53:52
-->
<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<!-- 
  三种资源情况：
  
 -->
<script setup lang="ts">
import { useEvent } from "@/hooks";
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    open: boolean; // 是否公开
    select: boolean; // 是否选中
    collect: boolean; // 是否收藏
    isMyCollection?: boolean; // 是否为我的收藏
    name: string; // 资源名称
    latest_time: string; // 最新时间
  }>(),
  {
    isMyCollection: false,
  }
);

const emits = defineEmits<{
  (e: "select"): void;
  (e: "open-toggle"): void;
}>();

const hover = ref<boolean>(false);

const myRef = ref(null);
useEvent("mouseenter", myRef, () => {
  hover.value = true;
});
useEvent("mouseleave", myRef, () => {
  hover.value = false;
});
</script>
<template>
  <div
    class="resource-box"
    :class="[props.select ? 'has-select' : '']"
    ref="myRef"
    v-bind="$attrs"
  >
    <div class="content">
      <ul class="functions">
        <li class="select-fn" v-show="hover || select" @click="$emit('select')">
          <div
            class="radio-select"
            :style="{
              background: select ? '#7db875' : '',
              borderColor: hover ? '#7db875' : '#e4e4e4',
            }"
          ></div>
        </li>
        <li class="open-fn" v-show="hover && !select && !isMyCollection">
          <svg-icon :className="'icon-suoding'" v-if="open"></svg-icon>
          <svg-icon :className="'icon-suoding'" v-else></svg-icon>
        </li>
        <li class="more-fn" v-show="hover && !select">
          <svg-icon :className="'icon-gengduo2'"></svg-icon>
        </li>
      </ul>
      <div class="imgs">
        <svg-icon className="icon-icon-test" class="resource-icon"></svg-icon>
        <svg-icon
          className="icon-tongbushoucang"
          class="my-collection"
          v-if="isMyCollection"
        ></svg-icon>
      </div>
      <p class="name">{{ name }}</p>
      <p class="time">{{ latest_time }}</p>
    </div>
  </div>
</template>
<style scoped lang="scss">
.resource-box {
  display: inline-block;
  padding: 10px;
  transition: all 0.3s ease-in-out;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: $gray-10;
  }
  &.has-select {
    background-color: $green-04;
  }
  .content {
    text-align: center;
    width: 108px;
    position: relative;
    .functions {
      position: absolute;
      width: 100%;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      li {
        padding: 4px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
      }
      .select-fn {
        width: 24px;
        height: 24px;
        .radio-select {
          width: 16px;
          height: 16px;
          box-sizing: border-box;
          border: 2px solid #e4e4e4;
          border-radius: 8px;
          transition: all 0.15s ease-in-out;
        }
        // &:hover .radio-select {
        //   border-color: $green-02;
        // }
      }
    }
    .imgs {
      position: relative;

      .resource-icon {
        width: 108px;
        height: 108px;
        color: $green-02;
      }
      .my-collection {
        position: absolute;
        left: 50%;
        top: 60%;
        font-size: 25px;
        color: $yellow-01;
        @include standroid-translate;
      }
    }
    .name {
      @include wrap-ellipse;
    }
    .time {
      @include wrap-ellipse;
    }
  }
}
</style>
