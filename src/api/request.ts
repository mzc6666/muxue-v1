/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-04 21:11:37
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-05 17:36:50
 */
import axios, { Axios, AxiosRequestConfig } from "axios";
import {
  SUCCESS,
  LOGIN_ERROR,
  LOGIN_SERVER_ERROR,
  SERVER_EXCEPTION,
  PROVIDE_INFO_ERROR,
  INFO_REPEAT,
  TOKEN_ERROR,
} from "@constants/network/status";
import { Message } from "@/utils/public";

/**
 * @description: 基础的封装请求
 * @param {AxiosRequestConfig} config axios配置对象
 * @param {Events} events 拦截器事件对象
 * @return {Promise}
 * @author: mzc
 */
export const request = function (config: AxiosRequestConfig, events: Events) {
  // 配置请求拦截器
  const instances = axios.create(config);
  instances.interceptors.request.use(
    function (config: any) {
      // 添加token
      config.headers.token = window.localStorage.getItem("token");
      return config;
    },
    function (err) {
      return Promise.reject(err);
    }
  );
  // 配置响应拦截器
  instances.interceptors.response.use(
    function (response) {
      // 对自定义状态码进行分析
      switch (response.data.code) {
        /* 成功登录 */
        case SUCCESS.code:
          break;
        /* 登录失败 */
        case LOGIN_ERROR.code:
          window.localStorage.removeItem("token");
          return Promise.reject(LOGIN_ERROR.msg);
        /* 服务端异常，登录失败 */
        case LOGIN_SERVER_ERROR.code:
          window.localStorage.removeItem("token");
          return Promise.reject(LOGIN_SERVER_ERROR.msg);
        /* token验证失败 */
        case TOKEN_ERROR.code:
          window.localStorage.removeItem("token");
          return Promise.reject(TOKEN_ERROR.msg);
        /* 服务端异常 */
        case SERVER_EXCEPTION.code:
          return Promise.reject(SERVER_EXCEPTION.msg);
        /* 提供信息错误导致相应失败 */
        case PROVIDE_INFO_ERROR.code:
          Message("error", response.data.msg);
          return Promise.reject(PROVIDE_INFO_ERROR.msg);
        /* 提交信息重复，如服务端某个号码已经注册 */
        case INFO_REPEAT.code:
          Message("error", response.data.msg);
          return Promise.reject(INFO_REPEAT.msg);
        default:
          break;
      }
      return response;
    },
    function (err) {
      return Promise.reject(err);
    }
  );
  return instances({
    ...config,
  });
};

/**
 * @description: get请求
 * @param {AxiosRequestConfig} config 配置对象
 * @param {Events} events 拦截器事件对象
 * @return {*}
 * @author: mzc
 */
export const get = (config: AxiosRequestConfig, events: Events) => {
  return request(
    {
      ...config,
      method: "GET",
    },
    events
  );
};

/**
 * @description: post请求
 * @param {AxiosRequestConfig} config 配置对象
 * @param {Events} events 拦截器事件对象
 * @return {*}
 * @author: mzc
 */
export const post = (config: AxiosRequestConfig, events: Events) => {
  return request(
    {
      ...config,
      method: "POST",
    },
    events
  );
};

/**
 * @description: put请求
 * @param {AxiosRequestConfig} config 配置对象
 * @param {Events} events 拦截器事件对象
 * @return {*}
 * @author: mzc
 */
export const put = (config: AxiosRequestConfig, events: Events) => {
  return request(
    {
      ...config,
      method: "PUT",
    },
    events
  );
};

/**
 * @description: delete请求
 * @param {AxiosRequestConfig} config 配置对象
 * @param {Events} events 拦截器事件对象
 * @return {*}
 * @author: mzc
 */
export const Delete = (config: AxiosRequestConfig, events: Events) => {
  return request(
    {
      ...config,
      method: "DELETE",
    },
    events
  );
};
