/*
 * @Description: 评论 Hook
 * @Version:
 * @Autor: mzc
 * @Date: 2022-09-07 16:30:43
 * @LastEditors: mzc
 * @LastEditTime: 2022-10-14 19:54:11
 */
import { computed, ComputedRef, ref, Ref, unref } from "vue";
import { commentToResource, commentToComment } from "@apis/modules/resources";
import { Message } from "@/utils/public";
import { badgeDark } from "naive-ui";

/**
 * @description: hook函数
 * @param {Ref<any>} data 评论的Object数据
 * @param {Ref<number> | number} rId 资源ID
 * @return {*}
 * @author: mzc
 */

export const useComment = (data: Ref<any>, rId: Ref<number> | number) => {
  const initOptions = {
    id: -1,
    topIndex: -1,
    secondIndex: -1,
    inputText: "",
  };

  const topIndex = ref<number>(initOptions.topIndex); // 第一级 index
  const secondIndex = ref<number>(initOptions.secondIndex); // 第二级 索引
  const id = ref(initOptions.id); // 被回复评论的ID

  /* placeholder */
  const placeholder = computed(() => {
    if (id.value === initOptions.id) {
      return "请留下您的精彩评论";
    } else {
      if (secondIndex.value === initOptions.secondIndex) {
        return "@" + data.value.comments[topIndex.value].user.name;
      } else {
        return (
          "@" +
          data.value.comments[topIndex.value].sonComments[secondIndex.value]
            .user.name
        );
      }
    }
  });

  const type: ComputedRef<"resource" | "firstLevel" | "secondLevel"> = computed(
    () => {
      if (id.value === initOptions.id) {
        return "resource";
      } else if (secondIndex.value === initOptions.secondIndex) {
        return "firstLevel";
      } else {
        return "secondLevel";
      }
    }
  );

  /**
   * @description: 切换准备发送评论的状态
   * @param {number} cId 评论的ID
   * @param {number} index1 父评论索引
   * @param {number} index2 子评论索引
   * @return {*}
   * @author: mzc
   */
  const switchState = (cId: number, index1: number, index2: number = -1) => {
    if (
      id.value === cId &&
      topIndex.value === index1 &&
      secondIndex.value === index2
    ) {
      id.value = initOptions.id;
      topIndex.value = initOptions.topIndex;
      secondIndex.value = initOptions.secondIndex;
    } else {
      (id.value = cId), (topIndex.value = index1), (secondIndex.value = index2);
    }
  };

  /**
   * @description: 资源评论
   * @param {number} id 资源ID
   * @param {Events} events 事件对象
   * @param {Function} activeEffect 成功副作用
   * @param {Function} errorEffect 失败副作用
   * @return {*}
   * @author: mzc
   */
  const resouceComment = async (
    id: number,
    message: string,
    activeEffect: Function = () => {},
    errorEffect: Function = (err: Error) =>
      void console.log(`commentToResource error: ${err}`),
    events: Events = {}
  ) => {
    try {
      const result = await commentToResource(id, message, events);
      activeEffect(result);
    } catch (err) {
      errorEffect(err);
    }
  };

  /**
   * @description: 回复父评论
   * @param {number} id 父评论ID
   * @param {string} message 发送消息
   * @param {number} index 父评论索引
   * @param {Function} activeEffect 成功副作用
   * @param {Function} errorEffect 失败副作用
   * @param {Events} events 事件对象
   * @return {*}
   * @author: mzc
   */
  const firstLevelComment = async (
    id: number,
    message: string,
    index: number,
    activeEffect: Function = () => {},
    errorEffect: Function = (err: Error) =>
      void console.log(`commentToResource error: ${err}`),
    events: Events = {}
  ) => {
    try {
      const result = await commentToComment(id, message, events);
      activeEffect(index, result);
    } catch (err) {
      errorEffect(err);
    }
  };

  /**
   * @description: 回复子评论
   * @param {number} id 子评论ID
   * @param {string} message 评论内容
   * @param {number} index1 子评论对应父评论索引
   * @param {number} index2 子评论索引
   * @param {Function} activeEffect 成功副作用
   * @param {Function} errorEffect 失败副作用
   * @param {Events} events 事件对象
   * @return {*}
   * @author: mzc
   */
  const secondLevelComment = async (
    id: number,
    message: string,
    index1: number,
    index2: number,
    activeEffect: Function = () => {},
    errorEffect: Function = (err: Error) =>
      void console.log(`commentToComment error: ${err}`),
    events: Events = {}
  ) => {
    try {
      const result = await commentToComment(id, message, events);
      activeEffect(index1, index2, result);
    } catch (err) {
      errorEffect(err);
    }
  };

  /**
   * @description: 统一回调函数
   * @param {string} message 评论内容
   * @return {*}
   * @author: mzc
   */
  const handleComment =
    (message: string) =>
    (activeEffect: Function = () => {}, errorEffect: Function = () => {}) => {
      switch (type.value) {
        case "resource":
          resouceComment(unref(rId), message, activeEffect, errorEffect);
          break;
        case "firstLevel":
          firstLevelComment(
            id.value,
            message,
            topIndex.value,
            activeEffect,
            errorEffect
          );
          break;
        case "secondLevel":
          secondLevelComment(
            id.value,
            message,
            topIndex.value,
            secondIndex.value,
            activeEffect,
            errorEffect
          );
          break;
      }
    };

  return {
    type,
    placeholder,
    switchState,
    handleComment,
  };
};
