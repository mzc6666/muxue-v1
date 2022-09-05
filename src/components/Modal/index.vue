<!--
 * @Description: 模态框组件
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-25 17:11:51
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-31 22:51:10
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
    title: string;
    activeText?: string;
    negativeText?: string;
    hasNegative?: boolean;
  }>(),
  {
    maskClose: true,
    activeText: "确定",
    negativeText: "取消",
    hasNegative: false,
  }
);

const emits = defineEmits([
  "update:show",
  "active-btn-click",
  "negative-btn-click",
]);
</script>
<template>
  <Transition name="toggle">
    <Teleport to="body">
      <div class="modal" v-if="show">
        <div
          class="mask"
          @click="
            () => {
              if (maskClose) {
                emits('update:show', false);
              }
            }
          "
        ></div>
        <section v-bind="$attrs">
          <header>
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
          <footer>
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
    background-color: rgba(0, 0, 0, 0.35);
  }
}
</style>
