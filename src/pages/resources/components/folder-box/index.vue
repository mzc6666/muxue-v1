<!--
 * @Description: 文件夹组件
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-22 16:00:08
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-03 11:49:39
-->
<script setup lang="ts">
import { getTimeString } from "@/utils/public";
import { nextTick, reactive, ref, watchEffect } from "vue";
import Checkbox from "../checkbox/index.vue";
import { useEvent } from "@/hooks";

const props = withDefaults(
  defineProps<{
    foId: number;
    foName: string;
    updateTime: string;
    changeAble?: boolean;
    size: number;
    hasSelect: boolean;
    handleSelect?: (event?: Event) => void;
  }>(),
  {
    hasSelect: false,
    changeAble: true,
    handleSelect: () => {},
  }
);

const emits = defineEmits([
  "click",
  "onDownload",
  "onMove",
  "onRename",
  "onDetails",
  "onDelete",
]);

const dropDown = reactive({
  show: false,
  x: 0,
  y: 0,
});

const fnWithClose = (fn: Function) => {
  return function (...rest: any[]) {
    fn(...rest);
    dropDown.show = false;
  };
};

// 所有权限
const permissions = reactive<any>({});
watchEffect(() => {
  for (let key in permissions) {
    delete permissions[key];
  }
  permissions.download = {
    label: "下载",
    key: "download",
    props: {
      onclick: fnWithClose(() => {
        emits("onDownload");
      }),
    },
  };
  permissions.move = {
    label: "移动",
    key: "move",
    props: {
      onclick: fnWithClose(() => {
        emits("onMove");
      }),
    },
  };
  permissions.reName = {
    label: "重命名",
    key: "reName",
    props: {
      onclick: fnWithClose(() => {
        emits("onRename");
      }),
    },
  };
  permissions.details = {
    label: "查看详细信息",
    key: "details",
    props: {
      onclick: fnWithClose(() => {
        emits("onDetails");
      }),
    },
  };
  permissions.delete = {
    label: "删除",
    key: "delete",
    props: {
      onclick: fnWithClose(() => {
        emits("onDelete");
      }),
      style: {
        color: "red",
      },
    },
  };
});

// 所具有的权限
const rights = reactive<Array<any>>([]);
watchEffect(() => {
  rights.splice(0, rights.length);
  rights.push(permissions.download);
  if (props.changeAble) {
    rights.push(
      permissions.move,
      permissions.reName,
      permissions.details,
      permissions.delete
    );
  } else {
    rights.push(permissions.details);
  }
});

/* 添加划入划入监听器 */

const myRef = ref<any>(null);
const isHover = ref<boolean>(false);

useEvent("mouseenter", myRef, () => {
  isHover.value = true;
});
useEvent("mouseleave", myRef, () => {
  isHover.value = false;
});

/**
 * @description: 右键点击处理函数
 * @param {*} e 事件对象
 * @return {*}
 * @author: mzc
 */

const handleContextMenu = (e: any) => {
  dropDown.show = false;
  nextTick().then(() => {
    dropDown.show = true;
    dropDown.x = e.clientX;
    dropDown.y = e.clientY;
  });
};
</script>
<template>
  <div
    class="folder-box"
    ref="myRef"
    :class="props.hasSelect ? 'has-select' : ''"
    @contextmenu.prevent="handleContextMenu"
    @click="$emit('click')"
  >
    <div class="content">
      <ul class="float-fns" v-show="isHover || props.hasSelect">
        <li>
          <Checkbox
            style="width: 18px; height: 18px"
            :hasSelect="props.hasSelect"
            :handleSelect="props.handleSelect"
          >
            <template #icon>
              <svg-icon
                className="icon-dui"
                v-show="props.hasSelect"
              ></svg-icon>
            </template>
          </Checkbox>
        </li>
        <li v-show="!props.hasSelect" @click.stop="handleContextMenu">
          <svg-icon className="icon-gengduo2"></svg-icon>
        </li>
      </ul>
      <div class="imgs">
        <svg-icon className="icon-wenjianjia" class="folder-icon"></svg-icon>
      </div>
      <p>{{ props.foName }}</p>
      <p>{{ getTimeString(props.updateTime) }}</p>
    </div>
  </div>
  <!-- 下拉菜单 -->
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    style="text-align: left"
    :x="dropDown.x"
    :y="dropDown.y"
    :options="rights"
    :show="dropDown.show"
    :on-clickoutside="
      () => {
        dropDown.show = false;
      }
    "
  />
</template>
<style scoped lang="scss">
.folder-box {
  display: inline-block;
  padding: 10px;
  border-radius: 12px;
  transition: all 0.35s;
  background: transparent;
  &:hover {
    background-color: $gray-10;
    cursor: pointer;
  }
  &.has-select {
    background-color: $green-04;
  }
  .content {
    display: inline-block;
    width: 120px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    .imgs {
      position: relative;
      .folder-icon {
        font-size: 120px;
        color: $green-02;
      }
    }

    > p:nth-of-type(1) {
      @include middleFont(16px);
      color: map-get($map: $gray-colors, $key: 600);
    }
    > p:nth-of-type(2) {
      @include BigFont(12px);
      color: map-get($map: $gray-colors, $key: 400);
    }
    ul {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      z-index: 1;
      transition: all 0.35s;
      li {
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 9px;
        background-color: white;
        > * {
          font-size: 20px;
          color: $green-03;
        }
      }
    }
  }
}
</style>
