<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css";
import { Toolbar, Editor } from "@wangeditor/editor-for-vue";
import { shallowRef, onBeforeUnmount } from "vue";

withDefaults(
  defineProps<{
    value: string;
    toolbarConfig: Object;
    editorConfig: Object;
    mode?: "default" | "simple";
  }>(),
  {
    mode: "default",
  }
);
const emits = defineEmits(["update:value"]);

const editorRef = shallowRef();

onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor) {
    editor.destroy();
  }
});

const handleCreated = (editor: any) => {
  editorRef.value = editor;
};

const handleInput = (event: any) => {
  // emits("update:value", event.target.value);
  console.log("value: ", event.target.value);
};
</script>
<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      :value="value"
      @input="handleInput"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>
<style scoped lang="scss"></style>
