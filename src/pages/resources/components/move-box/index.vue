<!--
 * @Description:  资源移动组件
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-09-02 16:59:12
 * @LastEditors: mzc
 * @LastEditTime: 2022-12-16 23:25:30
-->
<script setup lang="ts">
import MoveBox from "@components/Modal/index.vue";
import {
  getUserTopResources,
  getResourceContent,
  getFolderContent,
} from "@apis/modules/resources";
import { ref, watchEffect } from "vue";
const props = withDefaults(
  defineProps<{
    type: Types;
  }>(),
  {}
);

const emit = defineEmits(["resourceMove", "folderMove", "fileMove"]);

//  记录
const records = new Map();

const curId = ref(1);
const curType = ref<Types>("resource");
const curTitle = ref<String>("");
const curDataList = ref<any>([]);
const curHeadList = ref<any>([]);
watchEffect(async () => {
  const key = `${curType.value}${curId.value}`;
  if (records.has(key)) {
    curDataList.value = records.get(key).dataList;
    curHeadList.value = records.get(key).headList;
    console.log("info from stored");
  } else if (curId.value == 1) {
    const result = await getUserTopResources();
    console.log("info from getUserTopResources");
    records.set(key, {
      dataList: {
        resources: result.data.data,
      },
      headList: [{ text: "我的资源", type: curType.value, id: curId.value }],
    });
    curDataList.value = records.get(key).dataList;
    curHeadList.value = records.get(key).headList;
  } else {
    const result =
      curType.value == "resource"
        ? await getResourceContent(curId.value)
        : await getFolderContent(curId.value);
    records.set(key, {
      dataList: result.data.data,
      headList: curHeadList.value.concat([
        { text: curTitle.value, type: curType.value, id: curId.value },
      ]),
    });
    curDataList.value = records.get(key).dataList;
    curHeadList.value = records.get(key).headList;
  }
});

/**
 * @description: 资源子项点击事件处理函数
 * @return {*}
 * @author: mzc
 */
const handleResourceClick = (id: number, text: string) => {
  curId.value = id;
  curTitle.value = text;
  curType.value = "resource";
};

/**
 * @description: 文件夹子项点击事件处理函数
 * @param { number } id id值
 * @param { string } text text值
 * @return {*}
 * @author: mzc
 */
const handleFolderClick = (id: number, text: string) => {
  curId.value = id;
  curTitle.value = text;
  curType.value = "folder";
};

const handleHeadItemClick = (item: any) => {
  curId.value = item.id;
  curType.value = item.type;
  curTitle.value = item.text;
  console.log(item);
};

const emitEvent = () => {
  switch (props.type) {
    case "resource":
      emit("resourceMove");
      break;
    case "folder":
      emit("folderMove");
      break;
    case "file":
      emit("fileMove");
      break;
  }
};
</script>
<template>
  <MoveBox show :class="$style.content" @active-btn-click="emitEvent">
    <template #header>移动到 </template>
    <template #body>
      <div class="header-list">
        <n-breadcrumb separator=">">
          <n-breadcrumb-item
            v-for="item in curHeadList"
            :key="item.id"
            @click="handleHeadItemClick(item)"
          >
            {{ item.text }}</n-breadcrumb-item
          >
        </n-breadcrumb>
      </div>
      <div class="data-list">
        <ul>
          <li
            v-for="item in curDataList.resources"
            :key="item.sId"
            @click="handleResourceClick(item.sId, item.sName)"
          >
            <svg-icon className="icon-icon-test" class="icon"></svg-icon>
            <span>{{ item.sName }}</span>
          </li>
        </ul>
        <ul v-if="type != 'resource'">
          <li
            v-for="item in curDataList.folders"
            :key="item.foId"
            @click="handleFolderClick(item.foId, item.foName)"
          >
            <svg-icon className="icon-wenjianjia" class="icon"></svg-icon>
            <span>{{ item.foName }}</span>
          </li>
        </ul>
      </div>
    </template>
  </MoveBox>
</template>
<style scoped lang="scss">
div.header-list {
  margin: 8px 0;
}
div.data-list {
  max-height: 40px * 8;
  overflow: scroll;
  li {
    padding: 6px 0;
    display: flex;
    align-items: center;
    .icon {
      font-size: 28px;
    }
    span {
      margin-left: 12px;
    }
  }
}
</style>
<style module>
.content {
  max-width: 500px;
  width: 100%;
}
</style>

<!-- 文件夹移动 (next) -->
