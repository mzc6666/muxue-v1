/*
 * @Description: 课程相关网络api
 * @Version:
 * @Autor: mzc
 * @Date: 2022-12-23 18:33:05
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-04 16:30:45
 */
import { get, post, Delete } from "../request";

/**
 * @description: 获取课程列表
 * @param {Events} events 事件对象
 * @return {Promise}
 * @author: mzc
 */
export const getCourseList = (events: Events = {}) => {
  return get(
    {
      url: "/courses",
    },
    events
  );
};

/**
 * @description: 新建课程
 * @param { string } name 课程名
 * @param { File } coverPic 封面图
 * @param { Events } events 事件对象
 * @return {*}
 * @author: mzc
 */
export const createNewCourse = (
  name: string,
  coverPic: File,
  events: Events = {}
) => {
  return post(
    {
      url: "/courses",
      headers: {
        "Content-type": "multipart/form-data",
      },
      data: {
        name,
        coverPic,
      },
    },
    events
  );
};

/**
 * @description:  获取课程内容
 * @param {number} cId 课程ID
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */
export const getCourseContent = (cId: number, events: Events = {}) => {
  return get(
    {
      url: "/courses/subitem",
    },
    events
  );
};

/**
 * @description: 新增 章
 * @param { number } cId 课程ID
 * @param { string } name 课程名
 * @param { Events } events 事件对象
 * @return {*}
 * @author: mzc
 */
export const createNewChapter = (
  cId: number,
  name: string,
  events: Events = {}
) => {
  return post(
    {
      url: "/courses/subitem/chapter",
      data: {
        cId,
        name,
      },
    },
    events
  );
};

/**
 * @description: 章 `重命名`
 * @param { number } cId 课程ID
 * @param { number } chId 章节ID
 * @param { string } name 新的章节名
 * @param { Events } events 事件对象
 * @return {*}
 * @author: mzc
 */
export const ChapterRename = (
  cId: number,
  chId: number,
  name: string,
  events: Events = {}
) => {
  return get(
    {
      url: "/courses/subitem/chapter/rename",
      params: {
        cId,
        chId,
        name,
      },
    },
    events
  );
};

/**
 * @description: 删除 章
 * @param { number } cId 课程ID
 * @param { number } chId 章节ID
 * @param { Events } events 事件对象
 * @return {*}
 * @author: mzc
 */
export const ChapterDelete = (
  cId: number,
  chId: number,
  events: Events = {}
) => {
  return Delete(
    {
      url: "/courses/subitem/chapter",
      data: {
        cId,
        chId,
      },
    },
    events
  );
};

/**
 * @description: 新增 节
 * @param { number } cId 课程ID
 * @param { number } chId 章 ID
 * @param { string } name 名字
 * @param { Events } events 事件对象
 * @return {*}
 * @author: mzc
 */
export const createNewSection = (
  cId: number,
  chId: number,
  name: string,
  events: Events = {}
) => {
  return post(
    {
      url: "/courses/subitem/section",
      data: {
        cId,
        chId,
        name,
      },
    },
    events
  );
};

/**
 * @description: 节 删除
 * @param { number } cId 课程ID
 * @param { number } chId 章 ID
 * @param { number } secId 节 ID
 * @param { Events } events 事件对象
 * @return {*}
 * @author: mzc
 */
export const SectionDelete = (
  cId: number,
  chId: number,
  secId: number,
  events: Events = {}
) => {
  return Delete(
    {
      url: "/courses/subitem/section",
      data: {
        cId,
        chId,
        secId,
      },
    },
    events
  );
};

/**
 * @description: 节 重命名
 * @param { number } cId  课程ID
 * @param { number } chId 章节ID
 * @param { number } secId 节ID
 * @param { string } name 名字
 * @param { Events } events 事件对象
 * @return {*}
 * @author: mzc
 */
export const SectionRename = (
  cId: number,
  chId: number,
  secId: number,
  name: string,
  events: Events = {}
) => {
  return get(
    {
      url: "/courses/subitem/section/rename",
      params: {
        cId,
        chId,
        secId,
        name,
      },
    },
    events
  );
};

/**
 * @description: 新增任务点
 * @param { number } cId 课程ID
 * @param { number } chId 章 ID
 * @param { number } secId 节 ID
 * @param { object } options 上传的数据
 * @param { Events } events 事件对象
 * @return {*}
 * @author: mzc
 */
export const AddNewTask = (
  cId: number,
  chId: number,
  secId: number,
  options: {
    type: "other" | "resource";
    name: string;
    file?: File;
    fileId?: number;
  },
  events: Events = {}
) => {
  return post(
    {
      url: "/courses/task",
      data: {
        cId,
        chId,
        secId,
        ...options,
      },
    },
    events
  );
};

/**
 * @description: 获取课程一级评论
 * @param {number} cId 课程Id
 * @param {Events} events
 * @return {*}
 * @author: mzc
 */
export const getCourseComment = (
  cId: number,
  time = new Date().toISOString(),
  events: Events = {}
) => {
  return get(
    {
      url: "courses/comment/topLevel",
      params: {
        cId,
        time,
      },
    },
    events
  );
};

/**
 * @description: 获取评论的子评论
 * @param {number} commentId 一级评论ID
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */
export const getCourseSonComments = (
  commentId: number,
  events: Events = {}
) => {
  return get(
    {
      url: "/courses/comment/sonLevel",
      params: {
        commentId,
      },
    },
    events
  );
};

/**
 * @description: 对课程评论
 * @param {number} cId 课程ID
 * @param {string} content 评论内容
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */
export const makeCommentToCouse = (
  cId: number,
  content: string,
  events: Events = {}
) => {
  return post(
    {
      url: "/courses/comment",
      data: {
        cId,
        content,
      },
    },
    events
  );
};

/**
 * @description: 评论一级评论
 * @param {number} commentId 一级评论iD
 * @param {string} content 评论内容
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */
export const makeCommentToFirstLevel = (
  commentId: number,
  content: string,
  events: Events = {}
) => {
  return post(
    {
      url: "/courses/comment/reply",
      data: {
        commentId,
        content,
      },
    },
    events
  );
};

/**
 * @description: 点赞/ 取消点赞 评论
 * @param {number} commentId
 * @param {Events} events
 * @return {*}
 * @author: mzc
 */
export const handleGiveLike = (commentId: number, events: Events = {}) => {
  return post(
    {
      url: "/courses/comment/agree",
      data: {
        commentId,
      },
    },
    events
  );
};
