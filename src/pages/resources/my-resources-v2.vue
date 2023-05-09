<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, watchEffect } from "vue";
import ResourceBox from "./TempComponents/ResourceElement/index.vue";
import { getUserTopResources } from "@apis/modules/resources";
import { useRectHook } from "./hooks/index";

const lists = reactive<ResourceOptions[]>([]);

interface SelectRecord {
  type: "r" | "folder" | "file";
  id: number;
}

const selects = reactive<SelectRecord[]>([]);

const getResourceSync = async () => {
  try {
    const result = await getUserTopResources();
    console.log("getUserTopResources result", result);
    lists.push(...result.data.data);
  } catch (err) {
    console.log("err", err);
  }
};
getResourceSync();

const handleSelect = (type: "r" | "folder" | "file", id: number) => {
  let index = selects.findIndex((item) => item.type == type && item.id == id);
  if (index !== -1) {
    selects.splice(index, 1);
  } else {
    selects.push({ type, id });
  }
};

const containerRef = ref<HTMLElement | null>(null);

const { left, top, width, height } = useRectHook(containerRef);

const maskStyle = computed(() => ({
  left: left.value + "px",
  top: top.value + "px",
  width: width.value + "px",
  height: height.value + "px",
}));

const rsList = ref([]);

watchEffect(() => {});

onMounted(() => {
  setTimeout(() => {
    console.log(rsList.value.length);
  }, 1000);
});
</script>
<template>
  <div class="container" ref="containerRef">
    <ResourceBox
      v-for="item in lists"
      :key="item.sId"
      ref="rsList"
      :open="item.isPublic == 1"
      :select="selects.some((i) => i.type == 'r' && i.id == item.sId)"
      :collect="item.isCollection"
      :is-my-collection="item.sId == 0"
      :name="item.sName"
      :latest_time="item.updateTime"
      @select="handleSelect('r', item.sId)"
    ></ResourceBox>
    <div class="mask" :style="maskStyle"></div>
  </div>
</template>
<style scoped lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  user-select: none;
  height: 100vh;
  .mask {
    position: fixed;
    background: red;
    opacity: 0.7;
  }
}
</style>
