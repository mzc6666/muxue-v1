<!--
 * @Description: 
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-22 09:38:40
 * @LastEditors: mzc
 * @LastEditTime: 2022-10-04 15:21:36
-->
<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import FolderBox from "../components/folder-box/index.vue";
import FileBox from "../components/file-box/index.vue";
import CreateDropdown from "../components/create-dropdown/index.vue";
import CreateModal from "../components/create-modal/index.vue";
import SelectControl from "../components/select-control/index.vue";
import ViewDetails from "../components/view-details/index.vue";
import RenameModal from "../components/rename-modal/index.vue";
import SearchModal from "../components/search-modal/index.vue";
import router from "@/route";
import { useResourcesStore } from "@/store";
import { MAIN_RESOURCE_FOLDERITEM } from "@constants/route";
import {
  createFolder,
  deleteFolder,
  fileDelete,
  getFolderContent,
  uploadFiles,
} from "@apis/modules/resources";
import { Message, Dialog } from "@/utils/public";
import { buildFileTreeStruct, createFullFolder } from "@/utils/resources";
import {
  handleFolderRename,
  handleFileRename,
  folderRenameEffect,
  fileRenameEffect,
} from "@/utils/resources/rename";
import {
  handleFolderDelete,
  handleFileDelete,
  deleteEffect,
} from "@/utils/resources/delete";

const resourceStore = useResourcesStore();

const props = defineProps<{
  sId: number;
  foId: number;
}>();

const fLists = reactive<any>([]);
const files = reactive<any>([]);
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

// 搜索数据
const searchShow = ref(false);

/**
 * @description: 获取数据函数
 * @return {*}
 * @author: mzc
 */

const getContent = async () => {
  fLists.splice(0, fLists.length);
  files.splice(0, files.length);
  fSelects.splice(0, fSelects.length);
  fileSelects.splice(0, fileSelects.length);
  try {
    const result = await getFolderContent(props.foId);
    console.log("getContent folder-item result", result);
    fLists.push(...result.data.data.folders);
    files.push(...result.data.data.files);
    fSelects.push(...new Array(result.data.data.folders.length).fill(false));
    fileSelects.push(...new Array(result.data.data.files.length).fill(false));
  } catch (err) {
    console.log("getResourceContent error", err);
  }
};
getContent();

const records: any = resourceStore.getRecordFromMap({
  sId: props.sId,
  foId: props.foId,
});

/**
 * @description: 进入文件夹处理函数
 * @param {*} fId 文件夹id
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
  if (selectCount.value !== fSelects.length + fileSelects.length) {
    fSelects.forEach((item, index) => {
      fSelects[index] = true;
    });
    fileSelects.forEach((item, index) => {
      fileSelects[index] = true;
    });
  } else {
    fSelects.forEach((item, index) => {
      fSelects[index] = false;
    });
    fileSelects.forEach((item, index) => {
      fileSelects[index] = false;
    });
  }
};

/**
 * @description: 将选中的设置为取消选中
 * @return {*}
 * @author: mzc
 */

const cancelAllSelect = () => {
  fSelects.forEach((item, index) => {
    fSelects[index] = false;
  });
  fileSelects.forEach((item, index) => {
    fileSelects[index] = false;
  });
};

/**
 * @description: 新建文件夹
 * @param { number } name 文件夹名
 * @return {*}
 * @author: mzc
 */

const createNewFolder = (name: string) => {
  console.log(name);
  createFolder(props.sId, props.foId, name)
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
 * @description: 文件夹下载
 * @return {*}
 * @author: mzc
 */

const handlerFolderDownload = () => {
  Message("error", "web端暂时不支持下载功能");
};

/**
 * @description: 文件下载 handler
 * @return {*}
 * @author: mzc
 */

const handleFileDownload = () => {
  Message("error", "web端暂时不支持下载");
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
        arr.push(uploadFiles(files[i], 2, props.foId));
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
  createFullFolder(props.sId, 2, topDireName, treeObj).then(getContent);
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
        type="folder"
        @on-new-folder="
          () => {
            createOptions.type = 'f';
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
          :show="fSelects.length + fileSelects.length !== 0"
          :all-count="fLists.length + files.length"
          :select-count="selectCount"
          :handle-select="handleAllSelect"
        />
      </div>
    </div>
    <div class="resource-content">
      <div class="absolute" @click="cancelAllSelect">
        <div class="outer-container">
          <div class="content">
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
              @on-download="handlerFolderDownload"
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
              @on-download="handleFileDownload"
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
              @on-delete="
                handleFileDelete(item.fId)(deleteEffect(files, index))
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
  <!-- 搜索 modal -->
  <SearchModal v-if="searchShow" @update:show="searchShow = false" />
</template>
<style lang="scss" scoped>
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
