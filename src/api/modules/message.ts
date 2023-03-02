import socket,{dispatchSocketEvent} from "@apis/websocket";
import { SEND_MESSAGE_EVENT } from "@constants/events";


/**
 * @description: 给好友发消息
 * @param {number} id 好友ID
 * @param {string} content 发送内容
 * @return {*}
 * @author: mzc
 */
export const sendMessageToFriend = (id: number, content: string) => {
  dispatchSocketEvent(SEND_MESSAGE_EVENT, {
    resUserId: id,
    content
  })
}