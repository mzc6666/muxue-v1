/*
 * @Description: 
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-03-01 22:07:45
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-01 22:22:42
 */
const socket : WebSocket = new WebSocket("ws://localhost:8888");

socket.onopen = () => {
  console.log("websocket connect established!!!");
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
  const jobLists = eventGroup.get(eventName) ?? [];
  jobLists.push(callBack);
  eventGroup.set(eventName, jobLists);
}


export default socket;
