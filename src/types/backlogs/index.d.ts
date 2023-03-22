/*
 * @Description: 
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-03-07 14:41:27
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-07 14:47:14
 */
declare interface SimpleBacklogItem {
  pId: number;
  name: string;
  isFinished: boolean;
}

declare interface TimesBackLogItem {
  pId: number;
  name: string;
  finishCount: number;
  totalCount: number;
}