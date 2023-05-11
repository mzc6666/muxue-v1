<!--
 * @Description: 我的待办
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-01-05 09:27:09
 * @LastEditors: Austral
 * @LastEditTime: 2023-05-09 20:18:08
-->
<script setup lang="ts">
import { ref, reactive, nextTick, h, render } from "vue";
import useOptions from "../../hooks/useOptions";
import BacklogItem from "../../components/backlog-item.vue";
import { Dialog } from "@/utils/public";
import {
  getBackLogList,
  accomplishPrimaryTask,
  deletePrimaryBacklog,
  accomplishTimesTask,
  deleteTimesBacklog,
  addPrimaryTask,
  addTimesTask,
  getPrimaryBacklogDetail,
  getTImesBacklogDetail,
} from "@/api/modules/backlog";
import { NTag, NDatePicker } from "naive-ui";
import { RouterLink } from "vue-router";
import { MAIN_COURSE_TASKS } from "@constants/route";

const type = ref<"normal" | "times">("normal");
const options = reactive([
  {
    label: "普通待办",
    value: "normal",
  },
  {
    label: "次数待办",
    value: "times",
  },
]);

// DropDown信息
const dropdown_info = reactive({
  visible: false,
  x: 0,
  y: 0,
  operateId: {} as any,
  operateType: "normal",
  index: 0,
  options: [
    {
      label: "删除",
      key: "delete",
    },
    {
      label: "查看详情",
      key: "detail",
    },
    {
      label: "修改",
      key: "change",
    },
  ],
  handleSelect: (key: string) => {
    /* 删除 */
    if (key === "delete") {
      delete_info.id = dropdown_info.operateId;
      delete_info.deleteType = dropdown_info.operateType;
      delete_info.deleteIndex = dropdown_info.index;
      handleDeleteBacklog();
    } else if (key === "detail") {
      /* 详情 */
      detail_info.id = dropdown_info.operateId;
      detail_info.type = dropdown_info.operateType;
      const callback =
        detail_info.type === "normal"
          ? getPrimaryBacklogDetail
          : getTImesBacklogDetail;
      callback(detail_info.id)
        .then((res) => {
          detail_info.detailInfo = res.data.data;
        })
        .finally(() => {
          detail_info.visible = true;
        });
    } else if (key === "change") {
      change_info.visible = true;
      change_info.id = dropdown_info.operateId;
    }
  },
  handleContextMenu: (
    event: MouseEvent,
    id: number,
    index: number,
    type: "normal" | "times"
  ) => {
    dropdown_info.visible = false;
    dropdown_info.operateId = id;
    dropdown_info.operateType = type;
    dropdown_info.index = index;
    nextTick(() => {
      dropdown_info.visible = true;
      dropdown_info.x = event.clientX;
      dropdown_info.y = event.clientY;
    });
  },
});

// 添加待办
const add_info = reactive({
  visible: false,
  planName: "",
  taskIds: null,
  planDate: 1,
  tarCount: 1,
  range: ref<[number, number]>([1183135260000, Date.now()]),
});

// 修改待办
const change_info = reactive({
  visible: false,
  type: "normal",
  id: 0,
});

// 查看详情
const detail_info = reactive({
  visible: false,
  type: "normal",
  id: 0,
  detailInfo: {} as any,
});

// 删除信息
const delete_info = reactive({
  id: -1,
  deleteIndex: 0,
  deleteType: "normal",
});

const { multipleOptions, handleLoad } = useOptions();

const primaryBacklogs = reactive<SimpleBacklogItem[]>([]); // 普通待办
const timesBacklogs = reactive<TimesBackLogItem[]>([]); // 时间待办

async function getLists() {
  try {
    const result = await getBackLogList();
    console.log("result: ", result);
    if (result.data.code === "200") {
      primaryBacklogs.push(...result.data.data.simple_backlogs);
      timesBacklogs.push(...result.data.data.times_backlogs);
    }
  } catch (error) {
    console.log(`getLists error: `, error);
  }
}
getLists();

// 完成普通待办
const handleCompletePrimaryTask = async (id: number, index: number) => {
  // console.log({ id, index });
  try {
    const result = await accomplishPrimaryTask(id);
    if (result.data.code === "200") {
      primaryBacklogs[index].isFinished = true;
    }
  } catch (error) {}
};

// 完成次数待办
const handleCompleteTimesTask = async (id: number, index: number) => {
  try {
    const result = await accomplishTimesTask(id);
    if (result.data.code === "200") {
      timesBacklogs[index].finishCount += 1;
    }
  } catch (error) {}
};

// 删除普通待办
const handleDeletePrimaryTasks = async (id: number, index: number) => {
  try {
    const result = await deletePrimaryBacklog(id);
    if (result.data.code === "200") {
      primaryBacklogs.splice(index, 1);
    }
  } catch (error) {}
};

// 删除次数待办
const handleDeleteTimesTasks = async (id: number, index: number) => {
  try {
    const result = await deleteTimesBacklog(id);
    if (result.data.code === "200") {
      timesBacklogs.splice(index, 1);
    }
  } catch (error) {}
};

// 添加待办
const handleBacklogAdd = async () => {
  if (type.value === "normal") {
    try {
      const result = await addPrimaryTask(add_info.planName, add_info.taskIds);
      if (result.data.code === "200") {
        primaryBacklogs.unshift(result.data.data);
      }
    } catch (error) {}
    add_info.visible = false;
  } else {
    try {
      const result = await addTimesTask(
        add_info.planName,
        add_info.planDate,
        add_info.tarCount
      );
      if (result.data.code === "200") {
        console.log("result: ", result);
        timesBacklogs.unshift(result.data.data);
      }
    } catch (error) {}
    add_info.visible = false;
  }
};

/**
 * 删除待办
 */
const handleDeleteBacklog = () => {
  Dialog("warning", {
    title: "警告",
    content: "确定删除该待办？",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      if (delete_info.deleteType === "normal") {
        await handleDeletePrimaryTasks(delete_info.id, delete_info.deleteIndex);
      } else {
        await handleDeleteTimesTasks(delete_info.id, delete_info.deleteIndex);
      }
    },
  });
};
</script>
<template>
  <div class="container">
    <header>
      <div class="big-title">所有待办</div>
      <div class="tags">
        <n-tag
          :bordered="false"
          type="success"
          class="add-tag"
          @click="add_info.visible = true"
        >
          添加待办
        </n-tag>
      </div>
    </header>
    <!-- 所有待办 -->
    <div class="backlogs-list-container">
      <div class="left-primary-backlogs">
        <div class="primary-backlogs-container">
          <h2>普通待办</h2>
          <BacklogItem
            v-for="(item, index) in primaryBacklogs"
            :key="item.pId"
            type="primary"
            :is-finished="item.isFinished"
            :pId="item.pId"
            :name="item.name"
            @on-finish="handleCompletePrimaryTask(item.pId, index)"
            @contextmenu.prevent="
              dropdown_info.handleContextMenu($event, item.pId, index, 'normal')
            "
          ></BacklogItem>
          <!-- @on-delete="handleDeletePrimaryTasks(item.pId, index)" -->
        </div>
      </div>
      <div class="right-times-backlogs">
        <div class="times-backlogs-container">
          <h2>习惯待办</h2>
          <BacklogItem
            v-for="(item, index) in timesBacklogs"
            :key="item.pId"
            type="primary"
            :is-finished="item.finishCount === item.totalCount"
            :pId="item.pId"
            :name="item.name"
            @on-finish="handleCompleteTimesTask(item.pId, index)"
            @contextmenu.prevent="
              dropdown_info.handleContextMenu($event, item.pId, index, 'times')
            "
          >
            <!-- @on-delete="handleDeleteTimesTasks(item.pId, index)" -->
            <span class="statistic">{{
              `${item.finishCount} / ${item.totalCount}`
            }}</span>
          </BacklogItem>
        </div>
      </div>
    </div>
    <!-- 添加待办 -->
    <n-modal v-model:show="add_info.visible">
      <n-card
        style="width: 600px"
        title="创建任务点"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <template #header>
          <div>
            <div style="line-height: 3">添加待办</div>
            <n-select
              v-model:value="type"
              :options="options"
            />
          </div>
        </template>
        <n-form>
          <n-form-item label="待办名称">
            <n-input
              v-model:value="add_info.planName"
              placeholder="请输入待办的名称"
            />
          </n-form-item>
          <n-form-item
            label="待办任务点"
            v-show="type === 'normal'"
          >
            <n-cascader
              v-model:value="add_info.taskIds"
              multiple
              clearable
              remote
              placeholder="选择任务点"
              :max-tag-count="'responsive'"
              :expand-trigger="'click'"
              :options="multipleOptions"
              :on-load="handleLoad"
            />
          </n-form-item>
          <n-form-item
            label="待办时间段" 
            v-show="type==='times'"
          >
            <n-date-picker
              v-model:value="range"
              type="daterange"
              clearable
            />
          </n-form-item>
          <n-form-item
            label="习惯待办天数"
            v-show="type === 'times'"
          >
            <!-- <n-input
              v-model:value="backlog_info.planDate"
              placeholder="请输入待办期望完成天数"
            /> -->
            <n-input-number
              v-model:value="add_info.planDate"
              clearable
            />
          </n-form-item>
          <n-form-item
            label="习惯待办完成次数"
            v-show="type === 'times'"
          >
            <!-- <n-input
              v-model:value="backlog_info.tarCount"
              placeholder="请输入待办期望完成次数"
            /> -->
            <n-input-number
              v-model:value="add_info.tarCount"
              clearable
            />
          </n-form-item>
        </n-form>
        <template #footer>
          <div class="button-groups">
            <n-button
              type="primary"
              @click="handleBacklogAdd"
            > 确定 </n-button><n-button
              type="error"
              @click="add_info.visible = false"
            >
              取消
            </n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
    <!-- 查看待办详情 -->
    <n-modal v-model:show="detail_info.visible">
      <n-card
        style="width: 600px"
        title="待办详情"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <n-row :gutter="[12, 8]">
          <n-col :span="5">
            <div>待办名称:</div>
          </n-col>
          <n-col :span="18">{{ detail_info.detailInfo.name }} </n-col>
        </n-row>
        <n-row :gutter="[12, 8]">
          <n-col :span="5">
            <div>是否完成:</div>
          </n-col>
          <n-col :span="18">{{ detail_info.detailInfo.isFinished ? "已完成" : "未完成" }}
          </n-col>
        </n-row>
        <n-row :gutter="[12, 8]">
          <n-col :span="5">
            <div>创建时间:</div>
          </n-col>
          <n-col :span="18">{{ detail_info.detailInfo.createTime }} </n-col>
        </n-row>
        <n-row
          :gutter="[12, 8]"
          v-if="detail_info.detailInfo.finishTime"
        >
          <n-col :span="5">
            <div>完成时间:</div>
          </n-col>
          <n-col :span="18">{{ detail_info.detailInfo.finishTime }} </n-col>
        </n-row>

        <n-row
          :gutter="[12, 8]"
          v-if="detail_info.detailInfo.lastFinishTime"
        >
          <n-col :span="5">
            <div>上次完成时间:</div>
          </n-col>
          <n-col :span="18">{{ detail_info.detailInfo.lastFinishTime }} </n-col>
        </n-row>

        <n-row
          :gutter="[12, 8]"
          v-if="detail_info.detailInfo.finishCount"
        >
          <n-col :span="5">
            <div>已完成次数:</div>
          </n-col>
          <n-col :span="18">{{ detail_info.detailInfo.finishCount }} </n-col>
        </n-row>

        <n-row
          :gutter="[12, 8]"
          v-if="detail_info.detailInfo.totalCount"
        >
          <n-col :span="5">
            <div>总次数:</div>
          </n-col>
          <n-col :span="18">{{ detail_info.detailInfo.totalCount }} </n-col>
        </n-row>

        <n-row
          :gutter="[12, 8]"
          v-if="detail_info.detailInfo.tasks"
        >
          <n-col :span="5">
            <div>任务点:</div>
          </n-col>
          <n-col :span="18">
            <n-data-table
              :columns="[
                { title: '任务名称', key: 'name' },
                { title: '是否完成', key: 'isFinished', render: (row: any) => {
                  return h(NTag,{
                    bordered: false,
                    type: row.isFinished ? 'success' : 'error'
                  }, {
                    default: () => row.isFinished ? '已完成' : '未完成'
                  })
                } }
              ]"
              :data="detail_info.detailInfo.tasks"
              :bordered="true"
            />
          </n-col>
        </n-row>
      </n-card>
    </n-modal>
    <!-- 修改待办 -->
    <!-- DropDown -->
    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :x="dropdown_info.x"
      :y="dropdown_info.y"
      :options="dropdown_info.options"
      :show="dropdown_info.visible"
      :on-clickoutside="() => void (dropdown_info.visible = false)"
      @select="dropdown_info.handleSelect"
    />
  </div>
</template>
<style scoped lang="scss">
.container {
  padding: 0 rem(50);
  display: flex;
  flex-direction: column;
  header {
    padding: 1em 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .big-title {
      @include BigFont(24px);
    }
    .tags {
      .add-tag {
        cursor: pointer;
      }
    }
  }
  .backlogs-list-container {
    display: flex;
    flex: 1;
    .left-primary-backlogs {
      flex: 1;
      position: relative;
      margin: 0 rem(20);
      border-right: 1px solid #e4e4e4;
      .primary-backlogs-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        h2 {
          font-size: 20px;
          line-height: 2.5;
          font-weight: 400;
        }
      }
    }
    .right-times-backlogs {
      flex: 1;
      margin: 0 rem(20);
      position: relative;
      .times-backlogs-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        h2 {
          font-size: 20px;
          line-height: 2.5;
          font-weight: 400;
        }
        .statistic {
          margin-right: 1em;
          color: #666;
          font-size: 14px;
        }
      }
    }
  }
}

.button-groups {
  display: flex;
  flex-direction: row-reverse;
}
.button-groups > * {
  margin-left: 2em;
}
</style>
