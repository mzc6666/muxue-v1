<!--
 * @Description:  资源控制组件
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-25 09:49:08
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-03 16:02:14
-->
<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { watchEffect, ref, onUpdated } from "vue";
import CheckBox from "../checkbox/index.vue";
const props = withDefaults(
  defineProps<{
    show: boolean;
    allCount: number;
    selectCount: number;
    handleSelect?: (event?: Event) => void;
  }>(),
  {
    selectCount: 0,
    handleSelect: () => {},
  }
);
// 是否有选中
const hasSelect = computed(() => {
  return props.selectCount !== 0;
});

// 是否全选中
const allSelect = computed(() => {
  return props.allCount === props.selectCount;
});

const text = computed(() => {
  return props.selectCount
    ? `已选${props.selectCount}项`
    : `共${props.allCount}项`;
});
</script>
<template>
  <div class="select-control" v-if="props.show">
    <CheckBox :has-select="hasSelect" :handleSelect="props.handleSelect">
      <template #icon>
        <svg-icon
          className="icon-jianhao-"
          v-if="hasSelect && !allSelect"
        ></svg-icon>
        <svg-icon className="icon-dui" v-if="allSelect"></svg-icon>
      </template>
    </CheckBox>
    <span>{{ text }}</span>
  </div>
</template>
<style scoped lang="scss">
.select-control {
  display: flex;
  align-items: center;
  span {
    color: map-get($map: $gray-colors, $key: 500);
    @include middleFont(12px);
    margin-left: 10px;
  }
}
</style>
