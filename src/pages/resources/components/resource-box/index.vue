<!--
 * @Description: 资源组件
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-21 15:20:57
 * @LastEditors: mzc
 * @LastEditTime: 2023-04-12 10:28:56
-->
<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { useEvent } from "@/hooks";
import { getTimeString, Message } from "@/utils/public";
import { nextTick, reactive, ref, watchEffect, computed } from "vue";
import Checkbox from "../checkbox/index.vue";
import SvgIcon from "@components/svg-icon/svg-icon.vue";
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";

// props
const props = withDefaults(
  defineProps<{
    sId: number;
    sName: string;
    updateTime: string;
    isPublic: 0 | 1 | 2;
    size: number;
    isCollection: boolean;
    image: string;
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
  // "click",
  "onChangeImage",
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
  permissions.changeImage = {
    label: "修改封面图",
    key: "change-image",
    props: {
      onclick: fnWithClose(() => {
        // emits("onChangeImage", props.sId);
        change_visible.value = true;
      }),
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
      permissions.changeImage,
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
      permissions.changeImage,
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

const change_visible = ref(false); // 修改封面图显示
const image = ref(null);
// 封面图选择
const handleFileSelect = (args: any) => {
  // console.log("args: ", args)
  image.value = args.file.file;
};

// 触发修改图片事件
const handleChange = () => {
  if (image.value) {
    emits("onChangeImage", image.value);
    change_visible.value = false;
  } else {
    Message("warning", "请选择图片");
  }
};

const isSelected = computed(() => {
  return isHover.value || props.hasSelect;
});
</script>
<template>
  <div
    class="resource-box"
    :class="[hasSelect ? 'has-select' : '']"
    ref="myRef"
    v-bind="$attrs"
    @contextmenu.prevent="handleContextMenu"
  >
    <!-- @click="$emit('click')" -->
    <div class="content">
      <ul class="float-fns" v-show="isSelected">
        <li>
          <Checkbox
            style="width: 18px; height: 18px"
            :hasSelect="hasSelect"
            :handleSelect="handleSelect"
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
  <!-- 修改封面图 -->
  <n-modal v-model:show="change_visible">
    <n-card
      style="width: 600px"
      title="修改封面图"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-upload :default-upload="false" :max="1" @change="handleFileSelect">
        <n-upload-dragger>
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
              <archive-icon />
            </n-icon>
          </div>
          <n-text style="font-size: 16px">
            点击或者拖动文件到该区域来上传
          </n-text>
          <n-p depth="3" style="margin: 8px 0 0 0">修改封面图以供广场检索 </n-p>
        </n-upload-dragger>
      </n-upload>
      <template #footer>
        <div class="button-groups">
          <n-button type="primary" @click="handleChange"> 确定 </n-button
          ><n-button type="error" @click="change_visible = false">
            取消
          </n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
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
.button-groups {
  display: flex;
  flex-direction: row-reverse;
}
.button-groups > * {
  margin-left: 2em;
}
</style>
