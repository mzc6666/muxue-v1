<!--
 * @Description: 多选框组件
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-24 09:57:57
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-25 09:53:28
-->
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    hasSelect: boolean;
    handleSelect?: (event?: Event) => void;
  }>(),
  {
    hasSelect: false,
    handleSelect: () => {},
  }
);
</script>
<template>
  <div class="container" :class="hasSelect ? 'active' : ''">
    <input type="checkbox" @click.stop="props.handleSelect" />
    <slot name="icon"></slot>
  </div>
</template>
<style lang="scss" scoped>
div.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid map-get($map: $gray-colors, $key: 200);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    border: 2px solid $green-02;
  }
  &.active {
    background-color: $green-02;
    border: 2px solid $green-02;
  }
  input {
    position: absolute;
    left: -2px;
    top: -2px;
    // width: 100%;
    width: 18px;
    // height: 100%;
    height: 18px;
    opacity: 0;
  }
}
</style>
