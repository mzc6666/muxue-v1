/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2023-03-02 14:53:53
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-09 14:38:18
 */
import { get, post } from "@apis/request";
import { AxiosResponse } from "axios";

/**
 * @description: 获取用户信息接口
 * @param {Events} events 事件名称
 * @return {Promise<AxiosResponse>}
 * @author: mzc
 */
export const getUserInfo = (events: Events = {}) => {
  return get(
    {
      url: "/user/info",
    },
    events
  );
};

/**
 * @description: 修改用户信息
 * @param {{avatar: string, username: string, password: string,confirmPassword: string }} config 配置对象
 * @param {Events} 事件对象
 * @return {*}
 * @author: mzc
 */
export const changeUserInfo = (
  {
    avatar = null,
    username = null,
    password = null,
    confirmPassword = null,
  } = {},
  events: Events = {}
) => {
  return post(
    {
      url: "/user/changeInfo",
      data: {
        avatar,
        username,
        password,
        confirmPassword,
      },
    },
    events
  );
};
