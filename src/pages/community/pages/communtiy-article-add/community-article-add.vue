<!--
 * @Description: 
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-03-08 17:27:48
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-09 14:24:11
-->
<script setup lang="ts">
import Editor from "@/components/Editor/Editor.vue";
import router from "@/route";
import { publishArticle } from "@/api/modules/community";
import { ref, reactive } from "vue";
import { Message } from "@/utils/public";

// 标题
const title = ref("");

const valueHtml = ref("");
const toolbarConfig = reactive({});
const editorConfig = reactive({ placeholder: "输入内容" });

// 图片
const image = ref<any>(null);
const selectFile = (options: any) => {
  image.file = options.file.file;
};

// 返回路由
const handelBack = () => void router.back();

// 发布文章
const handlePublish = async () => {
  console.log("valueHtml: ", valueHtml.value);
  try {
    const result = await publishArticle(
      image.value,
      title.value,
      valueHtml.value
    );
    if (result.data.code === "200") {
      router.back();
      Message("success", result.data.msg);
    }
  } catch (error) {}
};
</script>
<template>
  <div class="communtiy-article-add-container">
    <div class="content">
      <n-input
        type="text"
        placeholder="输入文章标题"
        clearable
        style="margin-bottom: 1em"
      />
      <Editor
        :editor-config="editorConfig"
        :toolbar-config="toolbarConfig"
        v-model:value="valueHtml"
      />
      <!-- 选择图片 -->
      <div class="file-select">
        <n-upload :default-upload="false" :max="1" @change="selectFile">
          <n-upload-dragger>
            <n-text style="font-size: 16px">
              点击或者拖动文件到该区域来上传
            </n-text>
            <n-p depth="3" style="margin: 8px 0 0 0">
              请上传该文章的封面图
            </n-p>
          </n-upload-dragger>
        </n-upload>
      </div>
      <!-- 按钮组 -->
      <div class="button-group">
        <n-button type="warning" @click="handelBack"> 取消</n-button>
        <n-button type="primary" @click="handlePublish">确定发布</n-button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.communtiy-article-add-container {
  position: relative;
  overflow: auto;
  .content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 10px rem(20);
    .file-select {
      display: flex;
      justify-content: center;
      padding: 2em 0;
    }
    .button-group {
      padding: 2em 0;
      display: flex;
      justify-content: space-evenly;
    }
  }
}
</style>
