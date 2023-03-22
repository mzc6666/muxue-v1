import { get } from "@apis/request";
import { sendData } from "@apis/websocket";
import { STUDYROOM_NEW_IMAGE_SENDER } from "@/constant/events";

/**
 * @description: 获取自习室列表
 * @param {Events} events 事件对象
 * @return {*}
 * @author: mzc
 */
export const getStudyRoomLists = (events: Events = {}) => {
  return get(
    {
      url: "/study-room/list",
      method: "GET",
    },
    events
  );
};

/**
 * @description: 获取自习室详情
 * @param {number} id 自习室ID
 * @param {Events} events
 * @return {*}
 * @author: mzc
 */
export const getStudyRoomDetail = (id: number, events: Events = {}) => {
  return get(
    {
      url: "/study-room/detail",
      method: "GET",
      params: {
        id,
      },
    },
    events
  );
};

/**
 * @description: 向服务器发送图片帧数据
 * @param {number} roomId 自习室ID
 * @param {string} data 图片帧数据
 * @return {*}
 * @author: mzc
 */
export const sendImageFrameStream = (roomId: number, data: string) => {
  sendData({
    type: STUDYROOM_NEW_IMAGE_SENDER,
    roomId,
    data,
  });
};
