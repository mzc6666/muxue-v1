/*
 * @Description: 课程模块的TS接口
 * @Version:
 * @Autor: mzc
 * @Date: 2022-12-23 19:43:11
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-04 13:35:32
 */

/**
 * @description: 获取课程列表使用
 * @return {*}
 * @author: mzc
 */
declare interface ClassItem {
  cId: number;
  cName: string;
  coverPic: string;
  createTime: string;
  creator: string;
}

declare interface SectionItem {
  secId: number;
  secName: string;
  tasksNum: number;
  finishNum: number;
}

declare interface ChapterItem {
  chId: number;
  chName: string;
  sections: Array<SectionItem>;
}


declare interface CourseCommenInterface {
  commentId: number,
  user: {
    username: string;
    userId: number;
    avatar: string;
  };
  likesCount: number;
  isLike: boolean;
  content: string;
  time: string;
  isOwn: boolean;
}

declare interface CourseTaskInterface {
  taskId: number;
  title: string;
  hasFinish: boolean;
  isFile: boolean;
  fileType: 'other' | "video" | null;
  fileUrl: string | null;
  content: string | null;
}