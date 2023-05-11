<!--
 * @Description: 课程列表页面
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-12-23 19:34:44
 * @LastEditors: Austral
 * @LastEditTime: 2023-05-11 14:24:50
-->
<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
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

// 添加课程
const addCourse = reactive({
  show: false,
  text: "",
  image: null,
});

const changeTab = reactive({
  show: 0,
});

const { courses, error, waiting, addCourseItem, coursesPublish, coursesOpen } =
  useCourseList();

const searchValue = ref<string>(""); // 输入框内容

const renderList = computed(() => {
  return courses.value?.reduce(
    (
      total: { data: ClassItem; index: number }[],
      current: ClassItem,
      index: number
    ) => {
      return searchValue.value === "" ||
        current.cName.indexOf(searchValue.value) !== -1
        ? total.concat({ data: current, index })
        : total;
    },
    [] as { data: ClassItem; index: number }[]
  );
});

const renderListPublish = computed(() => {
  return coursesPublish.value?.reduce(
    (
      total: { data: ClassItem; index: number }[],
      current: ClassItem,
      index: number
    ) => {
      return searchValue.value === "" ||
        current.cName.indexOf(searchValue.value) !== -1
        ? total.concat({ data: current, index })
        : total;
    },
    [] as { data: ClassItem; index: number }[]
  );
});

const renderListOpen = computed(() => {
  return coursesOpen.value?.reduce(
    (
      total: { data: ClassItem; index: number }[],
      current: ClassItem,
      index: number
    ) => {
      return searchValue.value === "" ||
        current.cName.indexOf(searchValue.value) !== -1
        ? total.concat({ data: current, index })
        : total;
    },
    [] as { data: ClassItem; index: number }[]
  );
});

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
    <div>
      <div class="tab">
        <n-button
          class="btn"
          strong
          secondary
          type="primary"
          @click="changeTab.show = 0"
        >我发布的</n-button>
        <n-button
          strong
          secondary
          type="primary"
          @click="changeTab.show = 1"
        >我加入的</n-button>
        <n-button
          strong
          secondary
          type="primary"
          @click="changeTab.show = 2"
        >公开课</n-button>
      </div>
    </div>
    <div
      class="container"
      v-if="courses"
    >

      <header>
        <n-input
          class="text"
          type="text"
          :style="{ width: '50%' }"
          placeholder="搜索课程"
          v-model:value="searchValue"
        />
        <!-- <Button :style="{ color: '#FFF' }" @click="addCourse.show = true"
          ><span>添加课程</span></Button
        > -->
        <n-button
          strong
          secondary
          type="primary"
          @click="addCourse.show = true"
        >
          添加课程
        </n-button>
      </header>
      <!-- 发布 -->
      <div
        class="course-lists"
        v-if="changeTab.show === 0"
      >
        <div class="lists-content">
          <div
            class="class-item"
            v-for="item in renderListPublish"
            :key="item.data.cId"
          >
            <!-- <span>删除</span> -->
            <course-item
              v-bind="item.data"
              @click="navigateToDetailPage(item.data.cId)"
            />
          </div>
        </div>
      </div>
      <!-- 加入 -->
      <div
        class="course-lists"
        v-if="changeTab.show === 1"
      >
        <div class="lists-content">
          <div
            class="class-item"
            v-for="item in renderList"
            :key="item.data.cId"
          >
            <!-- <span>删除</span> -->
            <course-item
              v-bind="item.data"
              @click="navigateToDetailPage(item.data.cId)"
            />
          </div>
        </div>
      </div>
      <!-- 公开课 -->
      <div
        class="course-lists"
        v-if="changeTab.show === 2"
      >
        <div class="lists-content">
          <div
            class="class-item"
            v-for="item in renderListOpen"
            :key="item.data.cId"
          >
            <!-- <span>删除</span> -->
            <course-item
              v-bind="item.data"
              @click="navigateToDetailPage(item.data.cId)"
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
            <n-p
              depth="3"
              style="margin: 8px 0 0 0"
            >
              请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
            </n-p>
          </n-upload-dragger>
        </n-upload>
        <div
          class="input"
          :style="{ marginBottom: '20px' }"
        >
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
.tab {
  width: 360px;
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
}
.container {
  // display: flex;
  // flex-direction: column;
  height: 100%;
  overflow-y: auto;
  header {
    height: 105px;
    padding: 0 rem(25);
    padding-right: rem(50);
    // border-bottom: 1px solid red;
    display: flex;
    align-items: center;
    .text {
      margin-right: rem(40);
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
