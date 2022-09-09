/*
 * @Description: 资源相关api
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-21 16:05:55
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-08 18:03:43
 */
import { Delete, get, post } from "@apis/request";
import { Ref } from "vue";

/**
 * @description: 我的资源-获取顶级资源
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */
export const getUserTopResources = (events: Events = {}) => {
  return get(
    {
      url: "/resource/list",
    },
    events
  );
};

/**
 * @description: 获取资源内容
 * @param {number} rId 资源的id
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */

export const getResourceContent = (id: number, events: Events = {}) => {
  return get(
    {
      url: "/resource/content",
      params: {
        id,
      },
    },
    events
  );
};

/**
 * @description: 资源的 收藏 与 取消收藏
 * @param {number} rId 资源ID
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */

export const resourceCollect = (rId: number, events: Events = {}) => {
  return get(
    {
      url: "/resource/collection",
      params: {
        rId,
      },
    },
    events
  );
};

/**
 * @description: 资源的 公有化 / 私有化
 * @param {number} rId 资源ID
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */
export const resourceLock = (rId: number, events: Events = {}) => {
  return post(
    {
      url: "/resource/lock",
      data: {
        rId,
      },
    },
    events
  );
};

/**
 * @description: 获取资源详细信息
 * @param {number} id 资源ID
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */

export const getResourceInfo = (id: number, events: Events = {}) => {
  return get(
    {
      url: "/resource",
      params: {
        id,
      },
    },
    events
  );
};

/**
 * @description: 新建资源
 * @param {number} rId 资源ID
 * @param {string} name 资源名称
 * @return {*}
 * @author: mzc
 */
export const createResource = (
  rId: number,
  name: string,
  events: Events = {}
) => {
  return post(
    {
      url: "/resource",
      data: {
        rId,
        name,
      },
    },
    events
  );
};

/**
 * @description: 删除资源
 * @param {number} rId 资源ID
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */

export const deleteResource = (rId: number, events: Events = {}) => {
  return Delete(
    {
      url: "/resource",
      params: {
        rId,
      },
    },
    events
  );
};

/**
 * @description: 资源的 点赞 与 取消点赞
 * @param {number} rid 资源ID
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */

export const giveLikeToResource = (rid: number, events: Events = {}) => {
  return get(
    {
      url: "/resource/up",
      params: {
        rid,
      },
    },
    events
  );
};

/**
 * @description: 资源重命名
 * @param {number} id 资源ID
 * @param {string} name 资源名称
 * @return {*}
 * @author: mzc
 */

export const resourceRename = (
  id: number,
  name: string,
  events: Events = {}
) => {
  return post(
    {
      url: "/resource/rename",
      data: {
        id,
        name,
      },
    },
    events
  );
};

/**
 * @description: 获取文件夹的内容
 * @param {number} id 文件夹id
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */

export const getFolderContent = (id: number, events: Events = {}) => {
  return get(
    {
      url: "/resource/folder/content",
      params: {
        id,
      },
    },
    events
  );
};

/**
 * @description: 创建文件夹
 * @param { number } rId 资源ID
 * @param { number } folderId 文件夹ID 为1则表示在rId下创建文件夹
 * @param { string } name 文件夹名称
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */

export const createFolder = (
  rId: number,
  folderId: number,
  name: string,
  events: Events = {}
) => {
  return post(
    {
      url: "/resource/folder",
      data: {
        rId,
        folderId,
        name,
      },
    },
    events
  );
};

/**
 * @description: 删除文件夹
 * @param {number} id 文件夹ID
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */

export const deleteFolder = (id: number, events: Events = {}) => {
  return Delete(
    {
      url: "/resource/folder",
      params: {
        id,
      },
    },
    events
  );
};

/**
 * @description: 获取文件夹的详细信息
 * @param {number} id 文件夹ID
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */

export const getFolderInfo = (id: number, events: Events = {}) => {
  return get(
    {
      url: "/resource/folder",
      params: {
        id,
      },
    },
    events
  );
};

/**
 * @description: 文件夹重命名
 * @param {number} id 文件夹ID
 * @param {string} name 新的文件夹名称
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */

export const folderRename = (id: number, name: string, events: Events = {}) => {
  return post(
    {
      url: "/resource/folder/rename",
      data: {
        id,
        name,
      },
    },
    events
  );
};

/**
 * @description: 文件重命名
 * @param {number} id 文件ID
 * @param {string} name 文件名
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */

export const fileRename = (id: number, name: string, events: Events = {}) => {
  return post(
    {
      url: "/resource/file/rename",
      data: {
        id,
        name,
      },
    },
    events
  );
};

/**
 * @description: 文件删除接口
 * @param {number} id 文件ID
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */

export const fileDelete = (id: number, events: Events = {}) => {
  return Delete(
    {
      url: "/resource/file",
      params: {
        id,
      },
    },
    events
  );
};

/**
 * @description: 获取文件详细信息
 * @param {number} id 文件ID
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */

export const getFileInfo = (id: number, events: Events = {}) => {
  return get(
    {
      url: "/resource/file",
      params: {
        id,
      },
    },
    events
  );
};

/**
 * @description: 上传文件
 * @param {File} file 上传的文件
 * @param {1 | 2} type 1表示在资源下上传文件，2表示在文件夹下上传文件
 * @param {number} id 资源/文件夹 ID
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */

export const uploadFiles = (
  file: File,
  type: 1 | 2,
  id: number,
  events: Events = {}
) => {
  return post(
    {
      url: "/resource/file",
      data: {
        file,
        type,
        id,
      },
    },
    events
  );
};

/**
 * @description: 搜索
 * @param {string} text 搜索内容
 * @param {"r" | "f" | "file" | "" | Ref<"r" | "f" | "file" | "">} type 类型
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */

export const searchThing = (
  text: string,
  type:  0 | 1 | 2 | 3,
  events: Events = {}
) => {
  return get(
    {
      url: "/resource/search",
      params: {
        text,
        type,
      },
    },
    events
  );
};

/**
 * @description: 获取指定id的(文件、文件夹、资源)的路由
 * @param {'r' | 'f' | 'file' | ''} type 所查找的类型
 * @param {number} id ID值
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */

export const getRoute = (
  type: "r" | "f" | "file" | "",
  id: number,
  events: Events = {}
) => {
  return get(
    {
      url: "/resource/route",
      params: {
        type,
        id,
      },
    },
    events
  );
};

/**
 * @description: 获取评论
 * @param {number} id 资源ID
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */

export const getResourceComment = (id: number, events: Events = {}) => {
  return get(
    {
      url: "/resource/comment",
      params: {
        id,
      },
    },
    events
  );
};

/**
 * @description: 获取子评论
 * @param {number} id 顶级评论的ID
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */

export const getSonCommentList = (id: number, events: Events = {}) => {
  return get(
    {
      url: "/resource/comment/sons",
      params: {
        id,
      },
    },
    events
  );
};

/**
 * @description: 给评论点赞
 * @param {number} id 评论的ID
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */
export const giveLikeToComment = (id: number, events: Events = {}) => {
  return post(
    {
      url: "/resource/comment/giveLike",
      data: {
        id,
      },
    },
    events
  );
};
