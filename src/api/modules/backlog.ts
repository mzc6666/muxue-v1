/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2023-03-07 14:49:06
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-08 11:32:22
 */
import { Delete, get, post, put } from "@apis/request";

/**
 * @description: 获取代办列表
 * @param {Events} events 事件对象
 * @returns
 */
export const getBackLogList = (events: Events = {}) => {
  return get(
    {
      url: "/plan/list",
    },
    events
  );
};

/**
 * @description: 完成普通代办
 * @param {number} planId 代办ID
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */
export const accomplishPrimaryTask = (planId: number, events: Events = {}) => {
  return post(
    {
      url: "/plan/simple/finish",
      data: {
        planId,
      },
    },
    events
  );
};

/**
 * @description: 完成次数代办
 * @param {number} planId ID
 * @param {Events} events 事件对象
 * @returns
 */
export const accomplishTimesTask = (planId: number, events: Events = {}) => {
  return post(
    {
      url: "/plan/hobCount/finish",
      data: {
        planId,
      },
    },
    events
  );
};

/**
 * @description: 删除普通代办
 * @param {number} planId ID
 * @param {Events} events 事件对象
 * @returns
 */
export const deletePrimaryBacklog = (planId: number, events: Events = {}) => {
  return Delete(
    {
      url: "/plan/simple",
      params: {
        planId,
      },
    },
    events
  );
};

/**
 * @description: 删除次数代办
 * @param {number} planId ID
 * @param {Events} events 事件对象
 * @returns
 */
export const deleteTimesBacklog = (planId: number, events: Events = {}) => {
  return Delete(
    {
      url: "/plan/hobCount",
      params: {
        planId,
      },
    },
    events
  );
};

/**
 * @description: 新建普通代办
 * @param {string} planName 代办名称
 * @param {number[] | null} taskIds 任务点ID
 * @return {*}
 * @author: mzc
 */
export const addPrimaryTask = (
  planName: string,
  taskIds: number[] | null,
  events: Events = {}
) => {
  return post(
    {
      url: "/plan/simple",
      data: {
        planName,
        taskIds,
      },
    },
    events
  );
};

/**
 * @description: 新建次数代办
 * @param {string} planName 代办名称
 * @param {number} planDate 日期
 * @param {number} tarCount 完成次数
 * @return {*}
 * @author: mzc
 */
export const addTimesTask = (
  planName: string,
  planDate: number,
  tarCount: number,
  events: Events = {}
) => {
  return post(
    {
      url: "/plan/hobCount",
      data: {
        planName,
        planDate,
        tarCount,
      },
    },
    events
  );
};

/**
 * @description: 修改普通代办
 * @param {number} planId 代办ID
 * @param {string} planName 代办名称
 * @param {number[] | null} taskIds 任务点ID
 * @return {*}
 * @author: mzc
 */
export const changePrimaryBacklog = (
  planId: number,
  planName: number,
  taskIds: number[],
  events: Events = {}
) => {
  return put(
    {
      url: "/plan/simple",
      data: {
        planId,
        planName,
        taskIds,
      },
    },
    events
  );
};

/**
 * @description: 修改次数代办
 * @param {number} planId 代办ID
 * @param {string} planName 代办名称
 * @param {number} planDate 时间
 * @param {number} tarCount 次数
 * @return {*}
 * @author: mzc
 */
export const changeTimesBacklog = (
  planId: number,
  planName: number,
  planDate: number,
  tarCount: number,
  events: Events = {}
) => {
  return put(
    {
      url: "/plan/hobCount",
      data: {
        planId,
        planName,
        planDate,
        tarCount,
      },
    },
    events
  );
};

/**
 * @description: 获取普通代办详情
 * @param {number} pId 代办ID
 * @param {Events} events
 * @return {*}
 * @author: mzc
 */
export const getPrimaryBacklogDetail = (pId: number, events: Events = {}) => {
  return get(
    {
      url: "/plan/simple",
      params: {
        pId,
      },
    },
    events
  );
};

/**
 * @description: 获取次数代办详情
 * @param {number} pId 代办ID
 * @param {Events} events
 * @return {*}
 * @author: mzc
 */
export const getTImesBacklogDetail = (pId: number, events: Events = {}) => {
  return get(
    {
      url: "/plan/hobCount",
      params: {
        pId,
      },
    },
    events
  );
};
