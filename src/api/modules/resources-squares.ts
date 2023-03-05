/*
 * @Description: 资源广场API
 * @Version:
 * @Autor: mzc
 * @Date: 2023-03-05 16:43:28
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-06 00:05:23
 */
import { get } from "@apis/request";

/**
 * @description: 资源广场首页数据
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */
export const getHomeResourcesList = (events: Events = {}) => {
  return get(
    {
      url: "/resource-square",
    },
    events
  );
};

/**
 * @description:  通过关键字
 * @param {string} keyword 关键字
 * @param {Events} events
 * @return {*}
 * @author: mzc
 */
export const getResourcesBySearch = (keyword: string, events: Events = {}) => {
  return get(
    {
      url: "/resource-square/search",
      params: {
        keyword,
      },
    },
    events
  );
};

/**
 * @description: 获取排行榜
 * @param {Events} events
 * @return {*}
 * @author: mzc
 */
export const getRankResourcesList = (events: Events = {}) => {
  return get(
    {
      url: "/resource-square/search",
    },
    events
  );
};
