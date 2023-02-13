<!--
 * @Description: 资源组件
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-21 15:20:57
 * @LastEditors: mzc
 * @LastEditTime: 2022-10-04 15:29:57
-->
<script setup lang="ts">
import { useEvent } from "@/hooks";
import { getTimeString } from "@/utils/public";
import { nextTick, reactive, ref, watchEffect } from "vue";
import Checkbox from "../checkbox/index.vue";
import SvgIcon from "@components/svg-icon/svg-icon.vue";

// props
const props = withDefaults(
  defineProps<{
    sId: number;
    sName: string;
    updateTime: string;
    isPublic: 0 | 1 | 2;
    size: number;
    isCollection: boolean;
    showWay?: "horizontal" | "vertical";
    hasSelect: boolean;
    handleSelect?: (event?: Event) => void;
  }>(),
  {
    showWay: "horizontal",
    hasSelect: false,
    handleSelect: () => {},
  }
);

// emits
const emits = defineEmits([
  "onDownload",
  "onShare",
  "onPublic",
  "onCollect",
  "onMove",
  "onRename",
  "onDetails",
  "onDelete",
  "click",
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
        emits("onDownload", props.sId);
      }),
    },
  };
  permissions.share = {
    label: "分享",
    key: "share",
    props: {
      onclick: fnWithClose(() => {
        emits("onShare");
      }),
    },
  };
  permissions.public = {
    label: props.isPublic === 1 ? "公开资源" : "私密资源",
    key: "public",
    props: {
      onclick: fnWithClose(() => {
        emits("onPublic");
      }),
    },
  };
  permissions.collect = {
    label: props.isCollection ? "取消收藏" : "收藏",
    key: "collect",
    props: {
      onclick: fnWithClose(() => {
        emits("onCollect");
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
        emits("onDelete", props.sId);
      }),
      style: {
        color: "red",
      },
    },
  };
});

const rights = reactive<any>([]);
watchEffect(() => {
  rights.splice(0, rights.length);
  if (props.sId === 0) {
    rights.push(permissions.download, permissions.reName, permissions.details);
  } else if (props.isPublic === 0) {
    rights.push(
      permissions.download,
      permissions.share,
      permissions.collect,
      permissions.details
    );
  } else {
    rights.push(
      permissions.download,
      permissions.share,
      permissions.collect,
      permissions.public,
      permissions.move,
      permissions.reName,
      permissions.details,
      permissions.delete
    );
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
    class="resource-box"
    :class="props.hasSelect ? 'has-select' : ''"
    ref="myRef"
    @click="$emit('click')"
    @contextmenu.prevent="handleContextMenu"
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
        <li
          v-if="props.isPublic !== 0 && !props.hasSelect"
          @click.stop="$emit('onPublic')"
        >
          <svg-icon
            className="icon-jiesuo"
            v-show="props.isPublic === 2"
          ></svg-icon>
          <svg-icon
            v-show="props.isPublic === 1"
            className="icon-suoding"
          ></svg-icon>
        </li>
        <li v-show="!props.hasSelect" @click.stop="handleContextMenu">
          <svg-icon className="icon-gengduo2"></svg-icon>
        </li>
      </ul>
      <div class="imgs">
        <svg-icon className="icon-icon-test" class="resource-icon"></svg-icon>
        <svg-icon
          className="icon-tongbushoucang"
          class="collect"
          v-if="props.sId === 0"
        ></svg-icon>
      </div>

      <p>{{ props.sName }}</p>
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
.resource-box {
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
    width: 125px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    .imgs {
      position: relative;
      .resource-icon {
        font-size: 125px;
        color: $green-02;
      }
      .collect {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -18px;
        font-size: 36px;
        color: $yellow-01;
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
