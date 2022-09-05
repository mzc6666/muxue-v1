<!--
 * @Description: 新建资源组件
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-28 20:24:01
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-02 19:03:49
-->
<script setup lang="ts">
import { useEvent } from "@/hooks";
import { reactive, ref } from "vue";

const props = withDefaults(
  defineProps<{
    type: "resource" | "folder";
    topest?: boolean;
    onNewResource?: Function;
    onNewFolder?: Function;
    onUploadFolder?: Function;
    onUploadFile?: Function;
  }>(),
  {
    topest: false,
    onNewResource: () => {},
    onNewFolder: () => {},
    onUploadFolder: () => {},
    onUploadFile: () => {},
  }
);

const rights = reactive<Array<number>>([]);
if (props.topest === true && props.type === "resource") {
  rights.push(1);
} else if (props.topest === false && props.type === "resource") {
  rights.push(1, 2, 3, 4);
} else if (props.type === "folder") {
  rights.push(2, 3, 4);
}

const allPermissions = reactive([
  {
    id: 1,
    text: "新建资源",
    icon: "icon-icon-test",
    onclick: props.onNewResource,
  },
  {
    id: 2,
    text: "新建文件夹",
    icon: "icon-24gl-folderOpen",
    onclick: props.onNewFolder,
  },
  {
    id: 3,
    text: "上传文件夹",
    icon: "icon-wenjianjia",
    onclick: props.onUploadFolder,
  },
  {
    id: 4,
    text: "上传文件",
    icon: "icon-wendangicon",
    onclick: props.onUploadFile,
  },
]);

const myRef: any = ref(null);

const isExpand = ref(false);

useEvent("click", document, (event: any) => {
  if (!myRef.value.contains(event.target)) {
    isExpand.value = false;
  }
});
</script>
<template>
  <div class="container" @click="isExpand = !isExpand" ref="myRef">
    <svg-icon className="icon-jiahao" class="add-icon"></svg-icon>
    <ul v-show="isExpand">
      <li
        v-for="item in rights"
        :key="item"
        @click="allPermissions[item - 1].onclick"
      >
        <svg-icon :class-name="allPermissions[item - 1].icon" class="icon" />
        <span>{{ allPermissions[item - 1].text }}</span>
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
$hover-color: map-get(
  $map: $gray-colors,
  $key: 200,
);
.container {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $green-02;
  cursor: pointer;
  .add-icon {
    font-size: 18px;
    color: #fff;
  }
  ul {
    position: absolute;
    width: 132px;
    top: calc(100% + 5px);
    right: 0;
    padding: 5px 3px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 0 2px 2px $hover-color;
    transition: all 0.35s ease-in-out;
    z-index: 999;
    li {
      display: flex;
      align-items: center;
      padding: 5px 0;
      border-radius: 3px;
      cursor: pointer;
      transition: all 0.35s ease-out;
      &:hover {
        background: $hover-color;
      }
      .icon {
        font-size: 20px;
        margin-left: 10px;
      }
      span {
        @include middleFont(16px);
        margin-left: 10px;
      }
    }
  }
}
</style>
