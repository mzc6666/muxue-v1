<!--
 * @Description: 自定义router-link
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-20 12:38:11
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-25 09:30:54
-->
<template>
  <router-link v-bind="$props" custom v-slot="{ isActive, href, navigate }">
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="[isActive ? 'active' : 'no-active']"
    >
      <slot name="icon"></slot>
      <slot name="text"></slot>
    </a>
  </router-link>
</template>
<script lang="ts">
import { defineComponent, watch } from "vue";
import { RouterLink, useLink } from "vue-router";

export default defineComponent({
  inheritAttrs: false,
  props: {
    // @ts-ignore
    ...RouterLink.props,
  },
  setup(props) {
    return {};
  },
});
</script>
<style scoped lang="scss">
.active {
  background-color: $green-03;
}
.no-active {
  background-color: transparent;
}
a {
  display: block;
  margin: 0 10px;
  padding: 6px 0;
  text-align: left;
  display: flex;
  align-items: center;
  border-radius: 5px;
  transition: background 0.3s ease-in-out;
}
</style>
