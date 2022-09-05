<!--
 * @Description: input输入框
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-07 15:54:18
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-08 14:38:59
-->
<script setup lang="ts">
import { reactive, Ref, ref, toRef } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
/* props */
const props = withDefaults(
  defineProps<{
    value: string;
    placeholder?: string;
    authCode?: boolean;
    type?: "text" | "password";
    maxLen?: number;
    verifyFn?: Function;
    clearable?: boolean;
    switchable?: boolean;
  }>(),
  {
    authCode: false,
    type: "text",
    maxLen: 25,
    verifyFn: () => true,
  }
);
const emit = defineEmits(["update:value"]); // emit
const inputRef: Ref<any> = ref(null); // input 实例
/* input的状态 */
const inputStatus = reactive({
  len: 0,
  isFocus: false,
  secondType: "",
  isText: false, // 密码框中内容是否是可见的文本
  switchType: (isText: boolean) => {
    inputStatus.isText = isText;
    inputStatus.secondType = isText ? "text" : "password";
  },
});

/**
 * @description: 输入事件处理函数
 * @param {*} event 事件对象
 * @return {*}
 * @author: mzc
 */

const handleInput = (event: any) => {
  emit("update:value", event.target.value);
  inputStatus.len = event.target.value.length;
};

/**
 * @description: 清除内容处理函数
 * @return {*}
 * @author: mzc
 */

const handleClean = () => {
  emit("update:value", "");
  inputStatus.len = 0;
  inputRef.value.focus();
};

/*  监听输入内容变化来判断输入内容是否符合verifyFn */
const isSuit = ref(true);
watch(props, () => {
  isSuit.value = props.verifyFn(props.value);
});
</script>
<template>
  <div class="input-item" :class="[isSuit ? '' : 'error']">
    <input
      :type="inputStatus.secondType || type"
      :placeholder="placeholder"
      :maxlength="maxLen"
      ref="inputRef"
      :value="value"
      @input="handleInput"
      @focus="inputStatus.isFocus = true"
      @blur="inputStatus.isFocus = false"
    />
    <!-- 是否验证码 -->
    <div class="authCode" v-if="authCode">
      <slot name="authCode">
        <button>验证码</button>
      </slot>
    </div>
    <!-- 底部的绿色 -->
    <div class="bottom-bar"></div>
    <!-- 是否可以清楚 -->
    <div class="clear-text" v-if="clearable">
      <slot name="clear-text">
        <svg-icon
          className="icon-qiangzhiqingchu"
          class="svg-icon"
          v-show="inputStatus.len"
          @click="handleClean"
          aria-hidden="true"
        ></svg-icon>
      </slot>
    </div>
    <!-- 切换显示(密码框切换) -->
    <div class="switch-type" v-if="switchable">
      <slot name="show-icon">
        <svg-icon
          className="icon-xianshi_huaban"
          class="svg-icon"
          v-show="!inputStatus.isText && inputStatus.len"
          @click="inputStatus.switchType(true)"
        ></svg-icon>
      </slot>
      <slot name="hide-icon">
        <svg-icon
          className="icon-yincang"
          class="svg-icon"
          v-show="inputStatus.isText && inputStatus.len"
          @click="inputStatus.switchType(false)"
        ></svg-icon
      ></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.input-item {
  width: 100%;
  position: relative;
  display: flex;
  border-bottom: 2px solid map-get($map: $gray-colors, $key: 200);
  &.error {
    border-bottom: 2px solid map-get($map: $error-colors, $key: 500);
  }
  input {
    flex: 1;
    font-size: 16px;
    line-height: 28px;
    padding: 10px 0 10px 0;
    box-sizing: border-box;
    text-indent: 0.6em;
    &::placeholder {
      font-size: 16px;
      line-height: 28px;
    }
    &:focus ~ div.bottom-bar {
      width: 100%;
      left: 0;
    }
  }
  div.authCode {
    padding-right: 6px;
    display: flex;
    align-items: center;
    button {
      background: none;
      @include BigFont(14px);
      color: map-get($map: $green-colors, $key: 500);
      cursor: pointer;
    }
  }
  div.bottom-bar {
    display: block;
    position: absolute;
    width: 0;
    height: 2px;
    left: 50%;
    bottom: -2px;
    background: map-get($map: $green-colors, $key: 600);
    transition: all 0.2s ease-in 0.05s;
  }
  div.clear-text,
  div.switch-type {
    display: flex;
    padding-right: 1em;
    align-items: center;
    overflow: hidden;
    .svg-icon {
      font-size: 24px;
      cursor: pointer;
      color: map-get($map: $green-colors, $key: 300);
    }
  }
}
</style>
