/*
 * @Description: 将naiveUi中导入的组件进行全局设置
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-04 17:40:26
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-04 17:46:45
 */
import * as componentArr from "./import";
import { create } from "naive-ui";

const naive = create({
  components: Object.values(componentArr),
});
export default naive;
