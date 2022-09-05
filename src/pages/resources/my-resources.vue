<!--
 * @Description: 我的资源 列表
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-20 13:52:24
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-03 16:04:54
-->
<script setup lang="ts">
import { reactive } from "vue";
import {
  getUserTopResources,
  resourceLock,
  createResource,
  deleteResource,
  resourceRename,
  resourceCollect,
} from "@apis/modules/resources";
import { useResourcesStore } from "@/store";
import router from "@/route";
import ResourceBox from "./components/resource-box/index.vue";
import SelectControl from "./components/select-control/index.vue";
import { MAIN_RESOURCE_RESOURCEITEM } from "@constants/route";
import { computed } from "@vue/reactivity";
import CreateDropdown from "./components/create-dropdown/index.vue";
import CreateModal from "./components/create-modal/index.vue";
import ViewDetails from "../resources/components/view-details/index.vue";
import RenameModal from "../resources/components/rename-modal/index.vue";
import { Dialog, Message } from "@/utils/public";

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

const createNewResource = (name: string) => {
  createResource(0, name)
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

const modalShow = () => {
  modal1.show = true;
};

/**
 * @description: 下载资源
 * @param {number} sId 资源ID
 * @return {*}
 * @author: mzc
 */

const downLoadResource = (sId: number) => {
  Message("error", "web端暂不支持下载资源功能");
};

/**
 * @description: 删除资源
 * @param {number} id 资源ID
 * @param {number} index 索引
 * @return {*}
 * @author: mzc
 */

const onDelete = (id: number, index: number) => {
  Dialog("warning", {
    title: "确定删除吗",
    content: "10天内可以从回收站撤销",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: () => {
      deleteResource(id)
        .then((res) => {
          resources.splice(index, 1);
          Message("success", res.data.msg);
        })
        .catch((err) => {
          console.log("delete err", err);
        });
    },
  });
};

/**
 * @description: 资源重命名 handler
 * @param { string} name 资源名
 * @return {*}
 * @author: mzc
 */
const handleResourceRename = (name: string) => {
  resourceRename(rename.id, name)
    .then((res) => {
      resources[rename.order].sName = name;
      Message("success", res.data.msg);
    })
    .catch((err) => {})
    .finally(() => {
      rename.show = false;
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
    result.data.msg === "公开成功"
      ? (resources[index].isPublic = 2)
      : (resources[index].isPublic = 1);
    Message("success", result.data.msg);
  } catch (err) {
    console.log("resourceLock error", err);
  }
};

/**
 * @description: 资源 搜藏/取消收藏 handler
 * @param { number } id 资源ID
 * @param { number } index 索引
 * @return {*}
 * @author: mzc
 */
const onCollect = async (id: number, index: number) => {
  try {
    const result = await resourceCollect(id);
    result.data.msg === "收藏成功"
      ? (resources[index].isCollection = true)
      : (resources[index].isCollection = false);
    Message("success", result.data.msg);
  } catch (err) {
    console.log("resourceCollect error", err);
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
      <svg-icon className="icon-sousuo" class="search-icon"></svg-icon>
      <CreateDropdown type="resource" :on-new-resource="modalShow" topest />
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
              @on-download="downLoadResource"
              @on-details="
                () => {
                  detail.show = true;
                  detail.id = item.sId;
                  detail.type = 'r';
                  detail.title = item.sName;
                }
              "
              @on-delete="onDelete(item.sId, index)"
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
              @on-collect="onCollect(item.sId, index)"
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
    v-model:show="modal1.show"
    type="r"
    @create-resource="createNewResource"
  />
  <!-- 查看详情 -->
  <ViewDetails
    v-model:show="detail.show"
    :id="detail.id"
    :type="detail.type"
    :title="detail.title"
  />
  <!-- 资源重命名 -->
  <RenameModal
    v-model:show="rename.show"
    :init-name="rename.initName"
    :type="rename.type"
    @resource-rename="handleResourceRename"
  />
</template>
<style scoped lang="scss">
@mixin horizonalFlex {
  display: flex;
  justify-content: center;
  align-items: center;
}
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
    @include horizonalFlex;
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
      @include horizonalFlex;
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
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      div.outer-container {
        overflow: auto;
        div.content {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
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
