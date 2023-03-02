/*
 * @Description: 
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-03-01 22:07:45
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-02 17:10:16
 */

import EVENTS from "@constants/events";

const socket : WebSocket = new WebSocket("ws://localhost:8888");

socket.onopen = () => {
  console.log("websocket connect established!!!");
}

socket.onerror = (error) => {
  console.log(`websocket make error: `,error)
}

socket.onclose = () => {
  console.log("websocket connection closed");
}

socket.onmessage = (event) => {
  const { eventName, ...otherData } = event.data;
  eventGroup.get(eventName)?.forEach(action => void action(otherData));
}

const eventGroup : Map<string,Function[]> = new Map();

/**
 * @description: 注册websocket事件
 * @param {string} eventName 事件名称
 * @param {Function} callBack 回调函数
 * @return {*}
 * @author: mzc
 */
export const registerSocketEventListener = (eventName: string, callBack: Function) => {
  if (!EVENTS.includes(eventName)) {
    return;
  }
  const jobLists = eventGroup.get(eventName) ?? [];
  jobLists.push(callBack);
  eventGroup.set(eventName, jobLists);
}

/**
 * @description: 触发事件
 * @param {string} eventName 事件名称
 * @param {Object} sendData 发送得数据
 * @return {*}
 * @author: mzc
 */
export const dispatchSocketEvent = (eventName: string, sendData: Object ) => {
  let tokenObj = localStorage.getItem("user-store")
  if (!tokenObj) {
    socket.close();
    return;
  }
  socket.send(JSON.stringify({
    eventName,
    token: JSON.parse(tokenObj).token,
    ...sendData
  }))
}




export default socket;
