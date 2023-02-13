import { Message } from "@/utils/public";
import {
  fileRename,
  folderRename,
  resourceRename,
} from "@apis/modules/resources";

const strategy: resourceStrategist = {
  resource: (...rest: any[]) => resourceRename.apply(null, rest as any),
  folder: (...rest: any[]) => folderRename.apply(null, rest as any),
  file: (...rest: any[]) => fileRename.apply(null, rest as any),
};

/**
 * @description: 重命名回调函数模板
 * @param {Types} type  进行重命名操作的type
 * @param {resourceStrategist} rules 处理对象
 * @return {*}
 * @author: mzc
 */

export const handleRename =
  (type: Types, rules: resourceStrategist = strategy) =>
  (...rest: any[]) =>
  async (
    activeEffect: Function = () => {},
    errorEffect: Function = (error: Error) => {
      console.log(`[Error] ${type} rename error: ${error}`);
    }
  ) => {
    try {
      const result = await rules[type].apply(null, rest);
      activeEffect(result);
    } catch (err) {
      errorEffect(err);
    }
  };

export const handleResourceRename = handleRename("resource");
export const handleFolderRename = handleRename("folder");
export const handleFileRename = handleRename("file");

// 重命名规则
const nameRules: resourceStrategist = {
  resource: (item: any, text: string) => {
    item.sName = text;
  },
  folder: (item: any, text: string) => {
    item.foName = text;
  },
  file: (item: any, text: string) => {
    item.fileName = text;
  },
};

/**
 * @description: 重命名 副作用模板
 * @param {Types} type 进行重命名操作的type
 * @param {resourceStrategist} rules 对每一种type进行对应操作的规则对象
 * @return {*}
 * @author: mzc
 */

export const renameEffect =
  (type: Types, rules: resourceStrategist = nameRules) =>
  (item: any, text: string) =>
  (result: any) => {
    if (result.data.code === "200") {
      rules[type](item, text);
      Message("success", result.data.msg);
    }
  };

export const resourceRenameEffect = renameEffect("resource");
export const folderRenameEffect = renameEffect("folder");
export const fileRenameEffect = renameEffect("file");
