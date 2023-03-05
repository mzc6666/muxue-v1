<!--
 * @Description: 特定的资源页面
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-20 13:53:20
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-05 14:09:26
-->
<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import ResourceBox from "../components/resource-box/index.vue";
import FolderBox from "../components/folder-box/index.vue";
import FileBox from "../components/file-box/index.vue";
import CreateDropdown from "../components/create-dropdown/index.vue";
import CreateModal from "../components/create-modal/index.vue";
import SelectControl from "../components/select-control/index.vue";
import ViewDetails from "../components/view-details/index.vue";
import RenameModal from "../components/rename-modal/index.vue";
import SerachModal from "../components/search-modal/index.vue";
import router from "@/route";
import { useResourcesStore } from "@/store";
import { getResourceContent } from "@/api/modules/resources";
import {
  MAIN_RESOURCE_FOLDERITEM,
  MAIN_RESOURCE_RESOURCEITEM,
} from "@constants/route";
import {
  resourceLock,
  createResource,
  createFolder,
  uploadFiles,
} from "@apis/modules/resources";
import { Message, Dialog } from "@/utils/public";
import { buildFileTreeStruct, createFullFolder } from "@/utils/resources";
import { downLoad } from "@/utils/resources/download";
import {
  handleResourceDelete,
  handleFolderDelete,
  handleFileDelete,
  deleteEffect,
} from "@/utils/resources/delete";
import { handleCollect, collectEffect } from "@/utils/resources/collect";
import {
  handleResourceRename,
  handleFolderRename,
  handleFileRename,
  resourceRenameEffect,
  folderRenameEffect,
  fileRenameEffect,
} from "@/utils/resources/rename";

const resourceStore = useResourcesStore();

const props = defineProps<{
  sId: number;
}>();

const rLists = reactive<any>([]);
const fLists = reactive<any>([]);
const files = reactive<any>([]);
const rSelects = reactive<boolean[]>([]);
const fSelects = reactive<boolean[]>([]);
const fileSelects = reactive<boolean[]>([]);

// 新建
const createOptions = reactive<{
  show: boolean;
  type: "r" | "f";
}>({
  show: false,
  type: "r",
});

// 所选中的数量
const selectCount = computed(() => {
  return (
    rSelects.reduce((pre, cur) => {
      return pre + Number(cur);
    }, 0) +
    fSelects.reduce((pre, cur) => {
      return pre + Number(cur);
    }, 0) +
    fileSelects.reduce((pre, cur) => {
      return pre + Number(cur);
    }, 0)
  );
});

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

// 重命名 options
const rename = reactive<{
  show: boolean;
  id: number;
  type: "r" | "f" | "file";
  initName: string;
  order: number;
}>({
  show: false,
  id: 0,
  type: "r",
  initName: "",
  order: 0,
});

// 搜搜框显示
const searchShow = ref(false);

/**
 * @description: 获取数据函数
 * @return {*}
 * @author: mzc
 */

const getContent = async () => {
  rLists.splice(0, rLists.length);
  fLists.splice(0, fLists.length);
  files.splice(0, files.length);
  rSelects.splice(0, rSelects.length);
  fSelects.splice(0, fSelects.length);
  fileSelects.splice(0, fileSelects.length);
  try {
    const result = await getResourceContent(props.sId);
    console.log("getContent resources-item result", result);
    rLists.push(...result.data.data.resources);
    fLists.push(...result.data.data.folders);
    files.push(...result.data.data.files);
    rSelects.push(...new Array(result.data.data.resources.length).fill(false));
    fSelects.push(...new Array(result.data.data.folders.length).fill(false));
    fileSelects.push(...new Array(result.data.data.files.length).fill(false));
  } catch (err) {
    console.log("getResourceContent error", err);
  }
};
getContent();

const records: any = resourceStore.getRecordFromMap({
  sId: props.sId,
});

/**
 * @description: 进入下一级资源的处理函数
 * @param { number} sId 资源ID
 * @param {string} text 进入的资源的文字
 * @return {*}
 * @author: mzc
 */

const handleResourceEnter = (sId: number, text: string) => {
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

/**
 * @description: 进入文件夹处理函数
 * @param {*} foId 文件夹id
 * @param {*} text 文件名
 * @return {*}
 * @author: mzc
 */

const handleFolderEnter = (foId: number, text: string) => {
  const path = {
    name: MAIN_RESOURCE_FOLDERITEM,
    params: {
      foId,
      sId: props.sId,
    },
  };
  resourceStore.addRecordToMap(
    {
      foId,
      sId: props.sId,
    },
    [
      ...records,
      {
        path,
        text,
      },
    ]
  );
  router.push(path);
};

/**
 * @description: 全选checkbox按钮的callback
 * @return {*}
 * @author: mzc
 */

const handleAllSelect = () => {
  if (
    selectCount.value !==
    rSelects.length + fSelects.length + fileSelects.length
  ) {
    rSelects.forEach((item, index) => {
      rSelects[index] = true;
    });
    fSelects.forEach((item, index) => {
      fSelects[index] = true;
    });
    fileSelects.forEach((item, index) => {
      fileSelects[index] = true;
    });
  } else {
    rSelects.forEach((item, index) => {
      rSelects[index] = false;
    });
    fSelects.forEach((item, index) => {
      fSelects[index] = false;
    });
    fileSelects.forEach((item, index) => {
      fileSelects[index] = false;
    });
  }
};

/**
 * @description: 选择资源callback
 * @param {number } index 索引
 * @return {*}
 * @author: mzc
 */

const selectResource = (index: number) => () => {
  rSelects[index] = !rSelects[index];
};

/**
 * @description: 将选中的设置为取消选中
 * @return {*}
 * @author: mzc
 */

const cancelAllSelect = () => {
  rSelects.forEach((item, index) => {
    rSelects[index] = false;
  });
  fSelects.forEach((item, index) => {
    fSelects[index] = false;
  });
  fileSelects.forEach((item, index) => {
    fileSelects[index] = false;
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
      ? (rLists[index].isPublic = 2)
      : (rLists[index].isPublic = 1);
    Message("success", result.data.msg);
  } catch (err) {
    console.log("resourceLock error", err);
  }
};

/**
 * @description: 新增资源回调函数
 * @return {*}
 * @author: mzc
 */

const createNewResource = (name: string, image: File) => {
  createResource(props.sId, name, image)
    .then((res) => {
      if (res.data.code == "200") {
        Message("info", res.data.msg);
        getContent();
      }
    })
    .catch((err) => {
      console.log("createResource error", err);
    })
    .finally(() => {
      createOptions.show = false;
    });
};

/**
 * @description: 新建文件夹
 * @param { number } name 文件夹名
 * @return {*}
 * @author: mzc
 */

const createNewFolder = (name: string) => {
  createFolder(props.sId, 1, name)
    .then((res) => {
      if (res.data.code == "200") {
        Message("info", res.data.msg);
        getContent();
      }
    })
    .catch((err) => {
      console.log("createFolder error", err);
    })
    .finally(() => {
      createOptions.show = false;
    });
};

/**
 * @description: 上传文件
 * @param { FileList } files 文件
 * @return {*}
 * @author: mzc
 */

const submitFiles = (files: FileList) => {
  Dialog("warning", {
    title: "上传提醒",
    content: "确定上传?",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: () => {
      const arr = [];
      for (let i = 0; i < files.length; i++) {
        arr.push(uploadFiles(files[i], 1, props.sId));
      }
      Promise.all(arr)
        .then((res) => {
          Message("success", res[0].data.msg);
          getContent();
        })
        .catch((err) => {
          console.log("Promise.all uploadFiles error", err);
        });
    },
  });
};

/**
 * @description: 上传文件夹
 * @param { FileList } files 文件列表
 * @return {*}
 * @author: mzc
 */
const handleFolderUpload = (files: FileList) => {
  const [topDireName, treeObj] = buildFileTreeStruct(files);
  createFullFolder(props.sId, 1, topDireName, treeObj).then(getContent);
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
      >
      </svg-icon>
      <CreateDropdown
        type="resource"
        @on-new-folder="
          () => {
            createOptions.type = 'f';
            createOptions.show = true;
          }
        "
        @on-new-resource="
          () => {
            createOptions.type = 'r';
            createOptions.show = true;
          }
        "
        @on-upload-file="submitFiles"
        @on-upload-folder="handleFolderUpload"
      />
    </div>
  </header>
  <main>
    <div class="top-options">
      <div class="select-suitations">
        <SelectControl
          :show="rLists.length + fLists.length + files.length !== 0"
          :all-count="rLists.length + fLists.length + files.length"
          :select-count="selectCount"
          :handle-select="handleAllSelect"
        />
      </div>
    </div>
    <div class="resource-content">
      <div class="absolute" @click.stop="cancelAllSelect">
        <div class="outer-container">
          <div class="content">
            <ResourceBox
              v-for="(item, index) in rLists"
              :key="item.sId"
              v-bind="item"
              :hasSelect="rSelects[index]"
              :handleSelect="selectResource(index)"
              @click="handleResourceEnter(item.sId, item.sName)"
              @on-download="downLoad"
              @on-delete="
                handleResourceDelete(item.sId)(deleteEffect(rLists, index))
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
              @on-collect="
                handleCollect(item.sId)(collectEffect(rLists[index]))
              "
            />
            <FolderBox
              v-for="(item, index) in fLists"
              :key="item.foId"
              v-bind="item"
              :change-able="sId !== 0"
              :has-select="fSelects[index]"
              :handle-select="
                () => {
                  fSelects[index] = !fSelects[index];
                }
              "
              @click="handleFolderEnter(item.foId, item.foName)"
              @on-download="downLoad"
              @on-delete="
                handleFolderDelete(item.foId)(deleteEffect(fLists, index))
              "
              @on-rename="
                () => {
                  rename.show = true;
                  rename.type = 'f';
                  rename.id = item.foId;
                  rename.initName = item.foName;
                  rename.order = index;
                }
              "
              @on-details="
                () => {
                  detail.show = true;
                  detail.id = item.foId;
                  detail.type = 'f';
                  detail.title = item.foName;
                }
              "
            />
            <FileBox
              v-for="(item, index) in files"
              :key="item.fId"
              v-bind="item"
              :change-able="sId !== 0"
              :has-select="fileSelects[index]"
              :handle-select="
                () => {
                  fileSelects[index] = !fileSelects[index];
                }
              "
              @on-download="downLoad"
              @on-delete="
                handleFileDelete(item.fId)(deleteEffect(files, index))
              "
              @on-rename="
                () => {
                  rename.show = true;
                  rename.type = 'file';
                  rename.id = item.fId;
                  rename.initName = item.fileName;
                  rename.order = index;
                }
              "
              @on-details="
                () => {
                  detail.show = true;
                  detail.id = item.fId;
                  detail.type = 'file';
                  detail.title = item.fileName;
                }
              "
            />
          </div>
        </div>
      </div>
    </div>
  </main>
  <!-- 创建(资源、文件夹) 模态框 -->
  <CreateModal
    v-if="createOptions.show"
    :type="createOptions.type"
    @update:show="createOptions.show = false"
    @create-resource="createNewResource"
    @create-folder="createNewFolder"
  />
  <!-- 查看详情(资源、文件夹) 模态框 -->
  <ViewDetails
    v-if="detail.show"
    :id="detail.id"
    :type="detail.type"
    :title="detail.title"
    @update:show="detail.show = false"
  />
  <!-- 资源重命名 模态框 -->
  <RenameModal
    v-if="rename.show"
    :init-name="rename.initName"
    :type="rename.type"
    @update:show="rename.show = false"
    @resource-rename="
      (name) => {
        handleResourceRename(
          rename.id,
          name
        )(resourceRenameEffect(rLists[rename.order], name));
        rename.show = false;
      }
    "
    @folder-rename="
      (name) => {
        handleFolderRename(
          rename.id,
          name
        )(folderRenameEffect(fLists[rename.order], name));
        rename.show = false;
      }
    "
    @file-rename="
      (name) => {
        handleFileRename(
          rename.id,
          name
        )(fileRenameEffect(files[rename.order], name));
        rename.show = false;
      }
    "
  />
  <!-- 搜索框 -->
  <SerachModal v-if="searchShow" @update:show="searchShow = false" />
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
</style>
