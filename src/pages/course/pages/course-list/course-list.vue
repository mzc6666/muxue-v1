<!--
 * @Description: 课程列表页面
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-12-23 19:34:44
 * @LastEditors: mzc
 * @LastEditTime: 2022-12-30 19:39:44
-->
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useCourseList } from "./hook";
import { getCourseList, createNewCourse } from "@/api/modules/course";
import router from "@/route";
import { MAIN_COURSE_ITEM } from "@/constant/route";
import { Message } from "@/utils/public";
import Button from "../../components/Button/index.vue";
import courseItem from "@pages/course/components/course-item/course-item.vue";
import CircleCheckBox from "@components/circle-checkbox/index.vue";
import Modal from "@/components/Modal/index.vue";
import Input from "@/components/Input/index.vue";

const searchValue = ref<string>(""); // 输入框内容
// 添加课程
const addCourse = reactive({
  show: false,
  text: "",
  image: null,
});

const { courses, error, waiting, addCourseItem } = useCourseList();

/**
 * @description: 路由跳转
 * @param { number } id
 * @return {*}
 * @author: mzc
 */
const navigateToDetailPage = (id: number) => {
  router.push({ name: MAIN_COURSE_ITEM, params: { id } });
};

/**
 * @description: 选择图片回调
 * @param {any } options object
 * @return {*}
 * @author: mzc
 */
const handleImageChange = (options: any) => {
  addCourse.image = options.file.file;
};

/**
 * @description: 创建课程回调
 * @return {*}
 * @author: mzc
 */
const handleCreateNewCourse = () => {
  if (addCourse.text && addCourse.image) {
    createNewCourse(addCourse.text, addCourse.image as any)
      .then((res) => {
        addCourseItem(res.data.data);
        Message("success", res.data.msg);
      })
      .catch((err) => void console.log(`createNewCourse ${err}`))
      .finally(() => {
        addCourse.show = false;
        addCourse.text = "";
        addCourse.image = null;
      });
  } else {
    Message("warning", "请填好图片与文字");
  }
};
</script>
<template>
  <div>
    <div class="container" v-if="courses">
      <header>
        <div class="button-group">
          <Button :style="{ color: '#FFF' }" @click="addCourse.show = true"
            ><span>添加课程</span></Button
          >
        </div>
        <n-input
          type="text"
          :style="{ width: '400px' }"
          placeholder="基本的 Input"
          v-model:value="searchValue"
        />
      </header>
      <div class="course-lists">
        <div class="lists-content">
          <div class="class-item" v-for="item in courses" :key="item.cId">
            <!-- <span>删除</span> -->
            <course-item
              v-bind="item"
              @click="navigateToDetailPage(item.cId)"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 新建课程 -->
    <Modal
      show
      v-if="addCourse.show"
      @update:show="addCourse.show = false"
      @active-btn-click="handleCreateNewCourse"
    >
      <template #header>
        <span>新建课程</span>
      </template>
      <template #body>
        <n-upload
          accept="image/*"
          :default-upload="false"
          :max="1"
          @change="handleImageChange"
        >
          <n-upload-dragger>
            <n-text style="font-size: 16px">
              点击或者拖动文件到该区域来上传
            </n-text>
            <n-p depth="3" style="margin: 8px 0 0 0">
              请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
            </n-p>
          </n-upload-dragger>
        </n-upload>
        <div class="input" :style="{ marginBottom: '20px' }">
          <Input
            type="text"
            placeholder="输入课程名称"
            v-model:value="addCourse.text"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>
<style scoped lang="scss">
.container {
  // display: flex;
  // flex-direction: column;
  height: 100%;
  overflow-y: auto;
  header {
    height: 125px;
    padding: 0 rem(50);
    // border-bottom: 1px solid red;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div.button-group {
      display: flex;
      > :nth-child(1) {
        margin-right: 25px;
      }
      span {
        white-space: nowrap;
      }
    }
  }
  .course-lists {
    // flex: 1;
    // overflow-y: auto;
    padding: 0 rem(25);
    &::-webkit-scrollbar {
      width: 0;
    }
    .lists-content {
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-evenly;
      .class-item {
        margin: 0 36px 36px 0;
        // border: 1px solid #e4e4e4;
        position: relative;
        cursor: pointer;
        span {
          position: absolute;
          left: 0;
          top: 0;
          margin-left: 10px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
