import { get } from "@apis/request";
import { AxiosResponse } from "axios";

/**
 * @description: 获取用户信息接口
 * @param {Events} events 事件名称
 * @return {Promise<AxiosResponse>}
 * @author: mzc
 */
export const getUserInfo = (events: Events = {}) => {
  return get({
    url: '/user/info'
  },events)
}