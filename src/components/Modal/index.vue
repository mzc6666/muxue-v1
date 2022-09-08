<!--
 * @Description: 模态框组件
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-25 17:11:51
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-08 10:07:53
-->
<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import Button from "@components/Button/index.vue";

const props = withDefaults(
  defineProps<{
    show: boolean;
    maskClose?: boolean;
    title?: string;
    activeText?: string;
    negativeText?: string;
    hasNegative?: boolean;
    maskBackground?: string;
    hasHeader?: boolean;
    hasFooter?: boolean;
  }>(),
  {
    maskClose: true,
    activeText: "确定",
    negativeText: "取消",
    hasNegative: false,
    maskBackground: "rgba(0, 0, 0, 0.35)",
    hasHeader: true,
    hasFooter: true,
  }
);

const emits = defineEmits([
  "update:show",
  "active-btn-click",
  "negative-btn-click",
]);
</script>
<template>
  <Transition name="toggle" v-if="show">
    <Teleport to="body">
      <div class="modal">
        <div
          class="mask"
          @click="
            () => {
              if (maskClose) {
                emits('update:show', false);
              }
            }
          "
          :style="{ backgroundColor: maskBackground }"
        ></div>
        <section v-bind="$attrs">
          <header v-if="hasHeader">
            <slot name="header">{{ title }}</slot>
            <svg-icon
              className="icon-guanbi"
              class="close-class"
              @click.stop="$emit('update:show', false)"
            ></svg-icon>
          </header>
          <main>
            <slot name="body"></slot>
          </main>
          <footer v-if="hasFooter">
            <slot name="footer">
              <div class="btns">
                <Button
                  class="active-button"
                  @click="$emit('active-btn-click')"
                  >{{ activeText }}</Button
                >
                <Button
                  class="negative-button"
                  v-if="hasNegative"
                  @click="$emit('negative-btn-click')"
                  >{{ negativeText }}</Button
                >
              </div>
            </slot>
          </footer>
        </section>
      </div>
    </Teleport>
  </Transition>
</template>
<style scoped lang="scss">
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  section {
    min-width: 340px;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    z-index: 2;
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .close-class {
        cursor: pointer;
      }
    }
    footer {
      .btns {
        display: flex;
        flex-direction: row-reverse;
        .active-button {
          margin-left: 20px;
        }
      }
    }
  }
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
