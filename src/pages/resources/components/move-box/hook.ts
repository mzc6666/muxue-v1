import { ref, Ref } from "vue";

/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2022-11-14 20:27:56
 * @LastEditors: mzc
 * @LastEditTime: 2022-12-15 19:58:04
 */

/**
 * @description: 根据type、rid、fid字段返回指定的数据列表和记录列表
 * @param {Types} needType 所指定的类型
 * @param {Ref<Types> | Types} 当前获取数据的类型
 * @param {Ref<number> | number} 资源ID
 * @param {Ref<number> | number} 文件夹ID
 * @return {*}
 * @author: mzc
 */
export const useDataList = (
  needType: Types,
  type: Ref<Types> | Types,
  rid: Ref<number> | number,
  fid: Ref<number> | number
) => {};
