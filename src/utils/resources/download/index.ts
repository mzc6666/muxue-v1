/*
 * @Description:  下载  资源 / 文件夹 / 文件  通用调用模板
 * @Version:
 * @Autor: mzc
 * @Date: 2022-09-28 21:29:48
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-28 21:29:55
 */
/**
 * @description: 下载 资源 / 文件夹 / 文件
 * @return {*}
 * @author: mzc
 */

import { Message } from "@/utils/public";

export const downLoad = () => {
  // Message("error", "Web端暂不支持下载");
  const a = document.createElement("a");
  a.href = "http://localhost:8000/简历";
  a.click();
};
