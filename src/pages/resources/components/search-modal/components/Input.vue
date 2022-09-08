<!--
 * @Description: search-modal / input
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-09-06 17:48:46
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-06 22:50:44
-->
<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { useEvent } from "@/hooks";
import { onUpdated, ref } from "vue";

const props = withDefaults(
  defineProps<{
    value: string;
    tag: "r" | "f" | "file" | "";
  }>(),
  {}
);

const inputRef = ref("input");

const emits = defineEmits(["update:value", "clearValue", "clearTag"]);

/**
 * @description: input 输入 handler
 * @param { any } event 输入事件对象
 * @return {*}
 * @author: mzc
 */

const handleInput = (event: any) => {
  emits("update:value", event.target.value);
};

/**
 * @description: delete / backSpace 输入 handler
 * @param { any } ev 键盘事件对象
 * @return {*}
 * @author: mzc
 */

const handleKeyDown = (ev: any) => {
  if (!props.value) {
    emits("clearTag");
  }
};
</script>
<template>
  <div class="input-container">
    <slot name="tag">
      <div class="tag-outer-box" v-if="tag">
        <span v-if="tag === 'r'">资源</span>
        <span v-if="tag === 'f'">文件夹</span>
        <span v-if="tag === 'file'">文件</span>
      </div>
    </slot>
    <input
      type="text"
      :value="value"
      ref="inputRef"
      v-bind="$attrs"
      @input="handleInput"
      @keyup.delete="handleKeyDown"
    />
    <span v-show="value" class="clear" @click="$emit('clearValue')">清除</span>
  </div>
</template>
<style scoped lang="scss">
.input-container {
  display: flex;
  align-items: center;
  .tag-outer-box {
    padding: 3px;
    @include miniFont(18px);
    border-radius: 3px;
    color: white;
    background-color: $green-02;
  }
  input {
    flex: 1;
    font-size: 18px;
    line-height: 40px;
    padding-left: 16px;
    color: map-get($map: $gray-colors, $key: 500);
    &::placeholder {
      color: map-get($map: $gray-colors, $key: 300);
    }
  }
  .clear {
    @include middleFont(12px);
    padding: 0 3px;
    margin-right: 20px;
    border-radius: 3px;
    color: map-get($map: $gray-colors, $key: 300);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
      background-color: map-get($map: $gray-colors, $key: 100);
    }
  }
}
</style>
