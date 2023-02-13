<!--
 * @Description: 章节 组件
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-12-24 14:59:53
 * @LastEditors: mzc
 * @LastEditTime: 2023-01-06 21:24:13
-->
<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { computed, ref, onMounted, reactive } from "vue";
import Button from "../Button/index.vue";

interface SectionItem {
  secId: number;
  secName: string;
  tasksNum: number;
  finishNum: number;
}
interface ChapterItem {
  chId: number;
  chName: string;
  sections: Array<SectionItem>;
}

const props = defineProps<{
  data: ChapterItem;
  onChapterEdit: (text: string) => any;
  onChapterDelete: () => void;
  onAddSection: (text: string) => Promise<any>;
  onSectionEdit: (secId: number, name: string, index2: number) => Promise<any>;
  onSectionDelete: (secId: number, index2: number) => void;
}>();

const emits = defineEmits(["addTask", "lookTasks"]);

const allComplish = computed(() =>
  props.data.sections.every((item) => item.tasksNum == item.finishNum)
); // 任务点是否全部完成
const expand = ref<boolean>(false); // 是否展开
const chapterEdit = reactive({
  flag: false,
  editText: props.data.chName,
}); // 编辑 章
const sectionEdit = reactive({
  flag: false,
  text: "",
  index: -1,
}); // 编辑 节

const addSection = reactive({
  flag: false,
  text: "",
}); // 新增 节

const handleSectionEdit = () => {
  props
    .onSectionEdit(
      props.data.sections[sectionEdit.index].secId,
      sectionEdit.text,
      sectionEdit.index
    )
    .finally(SectionEditCancel);
};

/**
 * @description: 章重命名 回调
 * @return {*}
 * @author: mzc
 */
const onHandleEdit = () => {
  props.onChapterEdit(chapterEdit.editText).finally(() => {
    chapterEdit.flag = false;
    chapterEdit.editText = props.data.chName;
  });
};

/**
 * @description: 新增 节 回调函数
 * @return {*}
 * @author: mzc
 */
const onSectionAdd = () => {
  props.onAddSection(addSection.text).finally(() => {
    addSection.flag = false;
    addSection.text = "";
  });
};

/**
 * @description: 打开 节 编辑状态
 * @param { number } index 索引
 * @return {*}
 * @author: mzc
 */
const openEditStatus = (index: number) => {
  sectionEdit.flag = true;
  sectionEdit.index = index;
  sectionEdit.text = props.data.sections[index].secName;
};

/**
 * 取消章的编辑 函数
 */
const onCancelEdit = () => {
  chapterEdit.flag = false;
  chapterEdit.editText = props.data.chName;
};

// 取消节的编辑
const SectionEditCancel = () => {
  sectionEdit.flag = false;
  sectionEdit.text = "";
  sectionEdit.index = -1;
};
</script>
<template>
  <div class="contents">
    <!-- 头部标题 -->
    <div
      class="chapter-title"
      v-bind="$attrs"
      @click="chapterEdit.flag == false ? (expand = !expand) : ''"
    >
      <div class="left-content">
        <div v-if="!chapterEdit.flag">
          <n-switch v-model:value="allComplish" disabled @click.stop="" />
          <span>{{ data.chName }}</span>
        </div>
        <div v-else>
          <n-input
            type="text"
            v-select
            v-model:value="chapterEdit.editText"
            @click.stop=""
          />
        </div>
      </div>
      <div class="right-content">
        <!-- icons group -->
        <div class="right-icons" v-if="!chapterEdit.flag">
          <n-tooltip trigger="hover">
            <template #trigger>
              <svg-icon
                className="icon-jiahao"
                class="icons"
                @click.stop="
                  () => {
                    addSection.flag = true;
                    expand = true;
                  }
                "
              ></svg-icon>
            </template>
            添加章节
          </n-tooltip>
          <n-tooltip trigger="hover">
            <template #trigger>
              <svg-icon
                className="icon-guanbi"
                class="icons"
                @click.stop="onChapterDelete"
              ></svg-icon>
            </template>
            删除章节
          </n-tooltip>
          <n-tooltip trigger="hover">
            <template #trigger>
              <svg-icon
                className="icon-bianji"
                class="icons"
                @click.stop="chapterEdit.flag = true"
              ></svg-icon>
            </template>
            编辑
          </n-tooltip>
          <n-tooltip trigger="hover">
            <template #trigger
              ><svg-icon
                className="icon-xiangxia"
                class="icons"
                v-if="!expand"
              ></svg-icon
              ><svg-icon
                className="icon-xiangshang2"
                class="icons"
                v-else
              ></svg-icon
            ></template>
            {{ expand ? "关闭" : "展开" }}
          </n-tooltip>
        </div>
        <!-- 编辑按钮组 -->
        <div class="edit-button-group" v-else>
          <Button :style="{ padding: '6px 12px' }" @click.stop="onHandleEdit"
            ><span>确定</span></Button
          >
          <Button
            class="cancel-button"
            :style="{ padding: '6px 12px' }"
            @click.stop="onCancelEdit"
            ><span>取消</span></Button
          >
        </div>
      </div>
    </div>
    <!-- 添加 节 -->
    <div class="add-chapter" v-if="addSection.flag">
      <div class="left-input">
        <n-input
          type="text"
          placeholder="输入小节名称"
          v-model:value="addSection.text"
        />
      </div>
      <div class="button-groups">
        <Button class="button" @click="onSectionAdd"><span>确定</span></Button>
        <Button
          class="button"
          @click="(addSection.flag = false) && (addSection.text = '')"
          ><span>取消</span></Button
        >
      </div>
    </div>
    <!-- 节 显示 -->
    <div
      class="sub-sections"
      :style="{ display: expand ? 'block' : 'none', height: 'auto' }"
    >
      <div v-for="(item, sonIndex) in data.sections" :key="item.secId">
        <!-- 节 显示 -->
        <div
          class="sub-section"
          @click="$emit('lookTasks', data.chId, item.secId)"
        >
          <div class="left" v-if="sectionEdit.index !== sonIndex">
            <div class="circle-task-count">
              {{ item.tasksNum - item.finishNum }}
            </div>
            <span>{{ item.secName }}</span>
          </div>

          <div v-if="sectionEdit.flag && sonIndex == sectionEdit.index">
            <n-input type="text" v-model:value="sectionEdit.text" v-select />
          </div>

          <div class="right-btns" v-if="sectionEdit.index !== sonIndex">
            <n-tooltip trigger="hover">
              <template #trigger>
                <svg-icon
                  className="icon-jiahao"
                  class="icons"
                  @click.stop="$emit('addTask', item.secId, sonIndex)"
                ></svg-icon>
              </template>
              添加任务点
            </n-tooltip>
            <n-tooltip trigger="hover">
              <template #trigger>
                <svg-icon
                  className="icon-guanbi"
                  class="icons"
                  @click.stop="
                    onSectionDelete(data.sections[sonIndex].secId, sonIndex)
                  "
                ></svg-icon>
              </template>
              删除小节
            </n-tooltip>
            <n-tooltip trigger="hover">
              <template #trigger>
                <svg-icon
                  className="icon-bianji"
                  class="icons"
                  @click.stop="openEditStatus(sonIndex)"
                ></svg-icon>
              </template>
              编辑
            </n-tooltip>
          </div>

          <div
            class="edit-button-group"
            v-if="sectionEdit.flag && sectionEdit.index === sonIndex"
          >
            <Button
              :style="{ padding: '6px 12px' }"
              @click.stop="handleSectionEdit"
              ><span>确定</span></Button
            >
            <Button
              class="cancel-button"
              :style="{ padding: '6px 12px' }"
              @click.stop="SectionEditCancel"
              ><span>取消</span></Button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.contents {
  display: flex;
  flex-direction: column;
  .chapter-title {
    padding: 13px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: map-get($map: $gray-colors, $key: 100);
    border-radius: 4px;
    .left-content {
      span {
        margin-left: 20px;
      }
    }
    .right-content {
      .right-icons {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        font-size: 20px;
        .icons {
          margin-right: 20px;
        }
        .icons:last-child {
          margin-right: 0;
        }
      }
      .edit-button-group {
        .cancel-button {
          background-color: map-get($map: $gray-colors, $key: 400);
          margin-left: 20px;
        }
        span {
          color: #fff;
        }
      }
    }
    &:hover .right-icons {
      opacity: 1;
    }
  }
  .sub-sections {
    transition: all 0.3s ease-in-out;
    .sub-section {
      display: flex;
      padding: 12px 20px;
      justify-content: space-between;
      cursor: pointer;
      &:hover {
        background-color: map-get($map: $gray-colors, $key: 100);
      }
      .left {
        display: flex;
        .circle-task-count {
          width: 24px;
          height: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          font-size: 12px;
          color: #fff;
          background-color: map-get($map: $green-colors, $key: 600);
          // text-align: center;
        }
        span {
          margin-left: 20px;
        }
      }
      .right-btns {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        .icons {
          margin-right: 20px;
        }
        .icons:last-child {
          margin-right: 0;
        }
      }
      .edit-button-group {
        .cancel-button {
          background-color: map-get($map: $gray-colors, $key: 400);
          margin-left: 20px;
        }
        span {
          color: #fff;
        }
      }
      &:hover .right-btns {
        opacity: 1;
      }
    }
  }
}
.add-chapter {
  padding: 8px 20px;
  display: flex;
  justify-content: space-between;
  background-color: map-get($map: $gray-colors, $key: 100);
  .button-groups {
    display: flex;
    .button {
      padding: 6px 12px;
    }
    .button:last-child {
      background-color: map-get($map: $gray-colors, $key: 400);
      margin-left: 20px;
    }
    span {
      white-space: nowrap;
      color: #fff;
      font-size: 14px;
    }
  }
}
</style>
