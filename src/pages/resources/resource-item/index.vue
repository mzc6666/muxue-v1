<!--
 * @Description: 特定的资源页面
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-20 13:53:20
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-03 16:21:34
-->
<script setup lang="ts">
import { computed, reactive } from "vue";
import ResourceBox from "../components/resource-box/index.vue";
import FolderBox from "../components/folder-box/index.vue";
import FileBox from "../components/file-box/index.vue";
import CreateDropdown from "../components/create-dropdown/index.vue";
import CreateModal from "../components/create-modal/index.vue";
import SelectControl from "../components/select-control/index.vue";
import ViewDetails from "../components/view-details/index.vue";
import RenameModal from "../components/rename-modal/index.vue";
import router from "@/route";
import { useResourcesStore } from "@/store";
import { getResourceContent } from "@/api/modules/resources";
import {
  MAIN_RESOURCE_FOLDERITEM,
  MAIN_RESOURCE_RESOURCEITEM,
} from "@constants/route";
import {
  deleteResource,
  resourceRename,
  resourceLock,
  resourceCollect,
  createResource,
  createFolder,
  folderRename,
  deleteFolder,
  fileRename,
  fileDelete,
} from "@apis/modules/resources";
import { Message, Dialog } from "@/utils/public";

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
 * @param {*} fId 文件夹id
 * @param {*} text 文件名
 * @return {*}
 * @author: mzc
 */

const handleFolderEnter = (fId: number, text: string) => {
  const path = {
    name: MAIN_RESOURCE_FOLDERITEM,
    params: {
      fId,
      sId: props.sId,
    },
  };
  resourceStore.addRecordToMap(
    {
      fId,
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
          rLists.splice(index, 1);
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
      rLists[rename.order].sName = name;
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
      ? (rLists[index].isPublic = 2)
      : (rLists[index].isPublic = 1);
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
      ? (rLists[index].isCollection = true)
      : (rLists[index].isCollection = false);
    Message("success", result.data.msg);
  } catch (err) {
    console.log("resourceCollect error", err);
  }
};

/**
 * @description: 新增资源回调函数
 * @return {*}
 * @author: mzc
 */

const createNewResource = (name: string) => {
  createResource(props.sId, name)
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
  console.log(name);
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
 * @description: 文件夹下载
 * @return {*}
 * @author: mzc
 */

const handlerFolderDownload = () => {
  Message("error", "web端暂时不支持下载功能");
};

/**
 * @description: 删除文件夹
 * @param { number } id 文件夹ID
 * @param { number } index 索引
 * @return {*}
 * @author: mzc
 */

const handlerFolderDelete = (id: number, index: number) => {
  Dialog("warning", {
    title: "确定删除吗",
    content: "10天内可以从回收站撤销",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: () => {
      deleteFolder(id)
        .then((res) => {
          fLists.splice(index, 1);
          Message("success", res.data.msg);
        })
        .catch((err) => {
          console.log("delete err", err);
        });
    },
  });
};

/**
 * @description: 文件夹重命名
 * @param { string } name 新的文件名
 * @return {*}
 * @author: mzc
 */

const handleFolderRename = (name: string) => {
  folderRename(rename.id, name)
    .then((res) => {
      fLists[rename.order].foName = name;
      Message("success", res.data.msg);
    })
    .catch((err) => {
      console.log("folderRename error", err);
    })
    .finally(() => {
      rename.show = false;
    });
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
 * @description: 文件 重命名
 * @param { string } name 新的文件名
 * @return {*}
 * @author: mzc
 */

const handleFileRename = (name: string) => {
  fileRename(rename.id, name)
    .then((res) => {
      files[rename.order].fileName = name;
      Message("success", res.data.msg);
    })
    .catch((err) => {
      console.log("fileRename error", err);
    })
    .finally(() => {
      rename.show = false;
    });
};

/**
 * @description: 删除文件
 * @param { number } id 文件ID
 * @param { number } index 索引
 * @return {*}
 * @author: mzc
 */

const handleFileDelete = (id: number, index: number) => {
  Dialog("warning", {
    title: "确定删除吗",
    content: "10天内可以从回收站撤销",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: () => {
      fileDelete(id)
        .then((res) => {
          files.splice(index, 1);
          Message("success", res.data.msg);
        })
        .catch((err) => {
          console.log("fileDelete err", err);
        });
    },
  });
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
      <CreateDropdown
        type="resource"
        :on-new-folder="
          () => {
            createOptions.type = 'f';
            createOptions.show = true;
          }
        "
        :on-new-resource="
          () => {
            createOptions.type = 'r';
            createOptions.show = true;
          }
        "
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
              @on-download="handlerFolderDownload"
              @on-delete="handlerFolderDelete(item.foId, index)"
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
              @on-delete="handleFileDelete(item.fId, index)"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
  <!-- 创建(资源、文件夹) 模态框 -->
  <CreateModal
    v-model:show="createOptions.show"
    :type="createOptions.type"
    @create-resource="createNewResource"
    @create-folder="createNewFolder"
  />
  <!-- 查看详情(资源、文件夹) 模态框 -->
  <ViewDetails
    v-model:show="detail.show"
    :id="detail.id"
    :type="detail.type"
    :title="detail.title"
  />
  <!-- 资源重命名 模态框 -->
  <RenameModal
    v-model:show="rename.show"
    :init-name="rename.initName"
    :type="rename.type"
    @resource-rename="handleResourceRename"
    @folder-rename="handleFolderRename"
    @file-rename="handleFileRename"
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
</style>
