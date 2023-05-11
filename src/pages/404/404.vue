<script setup lang="ts">
import router from "@/route";
import { HOME } from "@constants/route";
const handleBack = () => {
  router.replace({ name: HOME });
};
</script>
<template>
  <div class="not-container">
    <n-empty size="large" description="404 Page Not Found">
      <template #extra>
        <n-button size="large" @click="handleBack">回到首页</n-button>
      </template>
    </n-empty>
  </div>
</template>
<style lang="scss" scoped>
.not-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
