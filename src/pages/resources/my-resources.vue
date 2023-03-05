<!--
 * @Description: 我的资源 列表
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-20 13:52:24
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-05 15:31:45
-->
<script setup lang="ts">
import { reactive, ref } from "vue";
import {
  getUserTopResources,
  resourceLock,
  createResource,
} from "@apis/modules/resources";
import { useResourcesStore } from "@/store";
import router from "@/route";
import ResourceBox from "./components/resource-box/index.vue";
import SelectControl from "./components/select-control/index.vue";
import { MAIN_RESOURCE_RESOURCEITEM } from "@constants/route";
import { computed } from "@vue/reactivity";
import CreateDropdown from "./components/create-dropdown/index.vue";
import CreateModal from "./components/create-modal/index.vue";
import ViewDetails from "./components/view-details/index.vue";
import RenameModal from "./components/rename-modal/index.vue";
import SearchModal from "./components/search-modal/index.vue";
import MoveBox from "./components/move-box/index.vue";
import { Message } from "@/utils/public";
import { handleResourceDelete, deleteEffect } from "@/utils/resources/delete";
import { downLoad } from "@/utils/resources/download";
import { handleCollect, collectEffect } from "@/utils/resources/collect";
import {
  handleResourceRename,
  resourceRenameEffect,
} from "@/utils/resources/rename";

const resourceStore = useResourcesStore();

let records: any = resourceStore.getRecordFromMap({});
const resources = reactive<Array<any>>([]);
const selectList = reactive<Array<boolean>>([]);

// 查看详情
const detail = reactive<{
  show: boolean;
  id: number;
  type: "r" | "f" | "file";
  title: string;
}>({
  show: false,
  id: 0,
  type: "r",
  title: "",
});

// 搜索
const searchShow = ref(false);

// 重命名
const rename = reactive<{
  show: boolean;
  id: number;
  type: "r" | "f";
  initName: string;
  order: number;
}>({
  show: false,
  id: 0,
  type: "r",
  initName: "",
  order: 0,
});

// 资源移动
const move = reactive<{
  show: boolean;
}>({
  show: false,
});

/**
 * @description: 获取数据函数
 * @return {*}
 * @author: mzc
 */

const getResourceSync = async () => {
  resources.splice(0, resources.length);
  selectList.splice(0, selectList.length);
  try {
    const result = await getUserTopResources();
    console.log("getUserTopResources result", result);
    resources.push(...result.data.data);
    selectList.push(...Array(resources.length).fill(false));
  } catch (err) {
    console.log("err", err);
  }
};
getResourceSync();

// 选中的数量
const selectCount = computed(() => {
  return selectList.reduce((pre, cur) => {
    return cur ? pre + 1 : pre;
  }, 0);
});

/**
 * @description: 选择资源callback
 * @param {number } index 索引
 * @return {*}
 * @author: mzc
 */
const selectResource = (index: number) => () => {
  selectList[index] = !selectList[index];
};

/**
 * @description: 全选checkbox按钮的callback
 * @return {*}
 * @author: mzc
 */
const handleAllSelect = () => {
  if (selectCount.value !== selectList.length) {
    selectList.forEach((item, index) => {
      selectList[index] = true;
    });
  } else {
    selectList.forEach((item, index) => {
      selectList[index] = false;
    });
  }
};

/**
 * @description: 取消选中callback
 * @return {*}
 * @author: mzc
 */
const cancelSelect = () => {
  selectList.forEach((item, index) => {
    if (item === true) {
      selectList[index] = false;
    }
  });
};

/**
 * @description: 进入下一级的处理函数
 * @param { number} sId 资源ID
 * @param {string} text 进入的资源的文字
 * @return {*}
 * @author: mzc
 */
const handleEnter = (sId: number, text: string) => {
  const path = {
    name: MAIN_RESOURCE_RESOURCEITEM,
    params: {
      sId,
    },
  };
  resourceStore.addRecordToMap({ sId }, [
    ...records,
    {
      path,
      text,
    },
  ]);
  router.push(path);
};

// 新建资源modal 信息
const modal1 = reactive({
  show: false,
});

/**
 * @description: 新增资源回调函数
 * @return {*}
 * @author: mzc
 */

const createNewResource = (name: string, image: File) => {
  createResource(0, name, image)
    .then((res) => {
      if (res.data.code == "200") {
        Message("info", res.data.msg);
        getResourceSync();
      }
    })
    .catch((err) => {
      console.log("createResource error", err);
    })
    .finally(() => {
      modal1.show = false;
    });
};

/**
 * @description: 资源公开 handler
 * @param { number } id
 * @param { number } index
 * @return {*}
 * @author: mzc
 */

const onPublic = async (id: number, index: number) => {
  try {
    const result = await resourceLock(id);
    if (result.data.code === "200") {
      resources[index].isPublic === 1
        ? (resources[index].isPublic = 2)
        : (resources[index].isPublic = 1);
    }
    Message("success", result.data.msg);
  } catch (err) {
    console.log("resourceLock error", err);
  }
};
</script>
<template>
  <header>
    <div class="records">
      <n-breadcrumb separator=">">
        <n-breadcrumb-item v-for="(item, index) in records" :key="index">
          <router-link
            :to="(item.path as any)"
            class="breadcrumb-route"
            :class="[index === records.length - 1 ? 'active' : 'no-active']"
          >
            <span>{{ item.text }}</span>
          </router-link>
        </n-breadcrumb-item>
      </n-breadcrumb>
    </div>
    <div class="fns">
      <svg-icon
        className="icon-sousuo"
        class="search-icon"
        @click="searchShow = true"
      ></svg-icon>
      <CreateDropdown
        type="resource"
        @on-new-resource="modal1.show = true"
        topest
      />
    </div>
  </header>
  <main>
    <div class="top-options">
      <div class="select-suitations">
        <SelectControl
          :all-count="resources.length"
          :select-count="selectCount"
          :handle-select="handleAllSelect"
          :show="resources.length !== 0"
        />
      </div>
    </div>
    <div class="resource-content">
      <div class="absolute" @click.stop="cancelSelect">
        <div class="outer-container">
          <div class="content">
            <ResourceBox
              v-for="(item, index) in resources"
              :key="item.sId"
              v-bind="item"
              :hasSelect="selectList[index]"
              :handleSelect="selectResource(index)"
              @click="handleEnter(item.sId, item.sName)"
              @on-download="downLoad"
              @on-collect="
                handleCollect(item.sId)(collectEffect(resources[index]))
              "
              @on-details="
                () => {
                  detail.show = true;
                  detail.id = item.sId;
                  detail.type = 'r';
                  detail.title = item.sName;
                }
              "
              @on-rename="
                () => {
                  rename.show = true;
                  rename.type = 'r';
                  rename.id = item.sId;
                  rename.initName = item.sName;
                  rename.order = index;
                }
              "
              @on-public="onPublic(item.sId, index)"
              @on-move="move.show = true"
              @on-delete="
                handleResourceDelete(item.sId)(deleteEffect(resources, index))
              "
            >
              <template #icon>
                <svg-icon
                  className="icon-dui"
                  v-show="selectList[index]"
                ></svg-icon>
              </template>
            </ResourceBox>
          </div>
        </div>
      </div>
    </div>
  </main>
  <!-- 创建资源 -->
  <CreateModal
    v-if="modal1.show"
    @update:show="modal1.show = false"
    type="r"
    @create-resource="createNewResource"
  />
  <!-- 查看详情 -->
  <ViewDetails
    v-if="detail.show"
    :id="detail.id"
    :type="detail.type"
    :title="detail.title"
    @update:show="detail.show = false"
  />
  <!-- 移动资源 -->
  <MoveBox type="resource" v-if="move.show" />
  <!-- 资源重命名 -->
  <RenameModal
    v-if="rename.show"
    :init-name="rename.initName"
    :type="rename.type"
    @resource-rename="
      (name) => {
        handleResourceRename(
          rename.id,
          name
        )(resourceRenameEffect(resources[rename.order], name));
        rename.show = false;
      }
    "
    @update:show="rename.show = false"
  />
  <!-- 搜索框 -->
  <SearchModal v-if="searchShow" @update:show="searchShow = false" />
</template>
<style scoped lang="scss">
header {
  display: flex;
  height: 125px;
  justify-content: space-between;
  align-items: center;
  padding: 0 rem(50);
  .records {
    display: flex;
    .breadcrumb-route {
      color: map-get($map: $gray-colors, $key: 500);
      @include BigFont(20px);
      &.active {
        color: black;
        font-weight: bold;
      }
      &:hover {
        color: map-get($map: $error-colors, $key: 600);
      }
    }
  }
  .fns {
    @include flex-justify-align;
    .search-icon {
      margin-right: 20px;
      font-size: 20px;
      color: $green-02;
      cursor: pointer;
    }
    .icon-add {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: $green-02;
      @include flex-justify-align;
      cursor: pointer;
      .add-icon {
        font-size: 20px;
        color: #fff;
      }
    }
  }
}
main {
  padding: 0 rem(50);
  flex: 1;
  display: flex;
  flex-direction: column;
  .top-options {
    display: flex;
    justify-content: space-between;
  }
  .resource-content {
    flex: 1;
    position: relative;
    div.absolute {
      @include absolute-fullSize;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      div.outer-container {
        overflow: auto;
        div.content {
          flex-wrap: wrap;
          @include flex-justify-align(space-between, stretch);
        }
      }
    }
  }
}
/* 新建资源modal */
.modal-body {
  display: flex;
  flex-direction: column;
  padding-bottom: 18px;
  .resource-item {
    font-size: 125px;
    color: $green-02;
    align-self: center;
  }
}
</style>

<!-- 460 -->
