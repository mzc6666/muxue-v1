/*
 * @Description: 课程模块的TS接口
 * @Version:
 * @Autor: mzc
 * @Date: 2022-12-23 19:43:11
 * @LastEditors: mzc
 * @LastEditTime: 2022-12-24 15:18:44
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
