/*
 * @Description: login相关请求
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-07 20:47:47
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-21 16:09:55
 */

import { get, post } from "../request";

/**
 * @description: 获取登录验证码
 * @param {string} telephone 电话号码
 * @param {Events} events 事件集合
 * @return {*}
 * @author: mzc
 */

export const getAuthCode = (telephone: string, events: Events = {}) => {
  return get(
    {
      url: "/user/login/getCheckCode",
      params: {
        telephone,
      },
    },
    events
  );
};

/**
 * @description:提交登录验证码
 * @param {string} telephone 电话号码
 * @param {string} code 验证码
 * @param {Events} events 事件集合
 * @return {*}
 * @author: mzc
 */

export const loginByAuthCode = (
  telephone: string,
  code: string,
  events: Events = {}
) => {
  return post(
    {
      url: "/user/login/submitCode",
      data: {
        telephone,
        code,
      },
    },
    events
  );
};

/**
 * @description: 通过密码登录
 * @param {string} telephone 手机号码
 * @param {string} password 密码
 * @param {Events} events 事件集合
 * @return {*}
 * @author: mzc
 */

export const LoginByPassword = (
  telephone: string,
  password: string,
  events: Events = {}
) => {
  return post(
    {
      url: "/user/login",
      data: {
        telephone,
        password,
      },
    },
    events
  );
};
