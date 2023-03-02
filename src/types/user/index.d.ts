/*
 * @Description: 用户信息接口
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-03-02 14:59:00
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-02 15:37:09
 */
declare interface UserInfoInterface {
  id: number;
  username: string;
  age: number;
  qq: string  | null;
  telephone: string;
  weChat: string | null;
  fansCount: number;
  attentionCount: number;
  usedSpace: number;
  totalPlanCount: number;
  finishPlanCount: number;
  allSpace: number;
  registerDay: string;
  birthday: string | null;
  sex: string;
  avatar: string;
}