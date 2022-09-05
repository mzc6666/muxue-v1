<!--
 * @Description: 输入框组件
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-29 16:48:14
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-30 17:31:46
-->
<script setup lang="ts">
import { useEvent } from "@/hooks/";
import { onMounted, onUnmounted, ref, toRef, watch } from "vue";

const props = withDefaults(
  defineProps<{
    type: "text" | "password" | "textarea";
    value: string;
    clear?: boolean;
    look?: boolean;
    vertifyFn?: Function;
  }>(),
  {
    clear: false,
    look: false,
    vertifyFn: (value: string) => true,
  }
);

const inputRef: any = ref(null);
const containerRef: any = ref(null);
const focus = ref(false);

const customType = ref(props.type); // 自定义type

useEvent("click", document, (event: any) => {
  if (!containerRef.value.contains(event.target)) {
    focus.value = false;
  }
});

// 判断 value 是否符合要求
const satisfy = ref(true);
watch(props, () => {
  satisfy.value = props.vertifyFn(props.value);
});

const emits = defineEmits(["update:value"]);

/* 更新value */
const updateValue = (event: any) => {
  emits("update:value", event.target.value);
};

// 清空value
const clearValue = () => {
  emits("update:value", "");
};
</script>
<template>
  <div class="input-item" ref="containerRef">
    <input
      :type="customType || type"
      v-bind="$attrs"
      :value="value"
      @input="updateValue"
      @focus.stop="focus = true"
      ref="inputRef"
    />
    <slot name="clear" :onClear="clearValue">
      <svg-icon
        className="icon-guanbi"
        class="icons"
        v-show="$attrs.type === 'text' && clear && value && focus"
        @click.stop="clearValue"
      ></svg-icon>
    </slot>
    <slot name="show-pass">
      <svg-icon
        class="icons"
        className="icon-xianshi_huaban"
        v-show="
          look &&
          type === 'password' &&
          customType === 'password' &&
          value &&
          focus
        "
        @click="customType = 'text'"
      />
      <svg-icon
        class="icons"
        className="icon-yincang"
        v-show="
          look &&
          type === 'password' &&
          customType !== 'password' &&
          value &&
          focus
        "
        @click="customType = 'password'"
      />
    </slot>
    <div
      class="line"
      :class="[focus ? 'focus' : '', satisfy ? '' : 'no-satisfy']"
    ></div>
  </div>
</template>
<style scoped lang="scss">
.input-item {
  position: relative;
  display: flex;
  align-items: center;
  input {
    flex: 1;
    padding: 10px 0 10px 0;
    font-size: 16px;
    line-height: 28px;
    text-indent: 0.6em;
    &::placeholder {
      font-size: 16px;
      line-height: 28px;
    }
  }
  .line {
    position: absolute;
    width: 0;
    height: 2px;
    left: 50%;
    bottom: -1px;
    transition: all 0.35s ease-in;
  }

  .line.no-satisfy {
    width: 100%;
    left: 0;
    background-color: map-get($map: $error-colors, $key: 500);
  }
  .line.focus {
    width: 100%;
    left: 0;
    background: map-get($map: $green-colors, $key: 600);
  }
}
/* icon样式 */
.icons {
  margin-right: 0.6em;
}
</style>
