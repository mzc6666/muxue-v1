<script setup lang="ts">
import { CascaderOption, NCascader } from "naive-ui";
import { onMounted, reactive } from "vue";
import {
  getUserTopResources,
  getResourceContent,
  getFolderContent,
} from "@/api/modules/resources";

const props = withDefaults(
  defineProps<{
    file: any;
  }>(),
  {}
);

const emits = defineEmits(["update:file"]);

// 修改格式函数
const switchFormatFromResource = (data: ResourceOptions) => {
  const returnObj: CascaderOption = {
    label: data.sName,
    value: JSON.stringify({ id: data.sId, name: data.sName }),
    isLeaf: false,
    type: "r",
  };
  return returnObj;
};

const switchFormatFromFolder = (data: FolderOptions) => {
  const returnObj: CascaderOption = {
    label: data.foName,
    value: JSON.stringify({ id: data.foId, name: data.foName }),
    isLeaf: false,
    type: "f",
  };
  return returnObj;
};

const switchFormatFromFile = (data: FileOptions) => {
  const returnObj: CascaderOption = {
    label: data.fileName,
    value: JSON.stringify({ id: data.fId, name: data.fileName }),
    isLeaf: true,
    type: "file",
  };
  return returnObj;
};

const options = reactive<any>([]);

onMounted(async () => {
  const result = await getUserTopResources();
  result.data.data.forEach((item: ResourceOptions) => {
    options.push(switchFormatFromResource(item));
  });
});

const getChildren = async (option: CascaderOption) => {
  const children: CascaderOption[] = [];
  switch (option.type) {
    case "r":
      const res = await getResourceContent(option.value as number);
      res.data.data.resources.forEach((item: ResourceOptions) => {
        children.push(switchFormatFromResource(item));
      });
      res.data.data.folders.forEach((item: FolderOptions) => {
        children.push(switchFormatFromFolder(item));
      });
      res.data.data.files.forEach((item: FileOptions) => {
        children.push(switchFormatFromFile(item));
      });
      break;
    case "f":
      const result = await getFolderContent(option.value as number);
      result.data.data.folders.forEach((item: FolderOptions) => {
        children.push(switchFormatFromFolder(item));
      });
      result.data.data.files.forEach((item: FileOptions) => {
        children.push(switchFormatFromFile(item));
      });
      break;
    default:
      break;
  }
  return children;
};

// 加载下一级函数
const handleLoad = (option: CascaderOption) => {
  return new Promise<void>(async (resolve) => {
    option.children = await getChildren(option);
    resolve();
  });
};
</script>
<template>
  <n-cascader
    :value="file"
    @update:value="(option: any) => {$emit('update:file', option)}"
    placeholder="没啥用的值"
    :options="options"
    :show-path="true"
    remote
    :on-load="handleLoad"
  ></n-cascader>
</template>
<style scoped lang="scss"></style>
