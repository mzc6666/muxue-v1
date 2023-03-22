<!--
 * @Description: 
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-03-19 20:15:46
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-19 21:48:45
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useInterval } from "@/hooks";
import { getCameraPermission } from "@/utils/public";

const emits = defineEmits(["expose-image-stream"]);

const videoRef = ref<any>(null);
const permissionEd = ref<boolean>(false);

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const media = ref<any>(null);

onMounted(() => {
  // console.log(videoRef.value.getComputedStyle);
  // console.log(getComputedStyle(videoRef.value).width);

  getCameraPermission({
    video: { width: 1000, height: 520 },
    audio: false,
  }).then((mediaStream) => {
    media.value = mediaStream;
    permissionEd.value = true;
    videoRef.value.srcObject = mediaStream;
    videoRef.value.play();
  });
});
onUnmounted(() => {
});

useInterval(() => {
  if (permissionEd.value) {
    ctx?.drawImage(videoRef.value, 0, 0, 500, 500);
    // emits("expose-image-stream", canvas.toDataURL("image/jpeg", 0.5));
  }
}, 60);
</script>
<template>
  <video autoplay ref="videoRef"></video>
</template>
<style scoped lang="scss">
video {
  width: 100%;
  height: 520px;
}
</style>
