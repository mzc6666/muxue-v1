/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2023-03-01 22:07:45
 * @LastEditors: mzc
 * @LastEditTime: 2023-04-12 12:25:40
 */
const socket = new WebSocket("ws://localhost:8001");

socket.onopen = () => {
  console.log(["SOCKET", "HAS OPEN"].join(" "));
};

socket.onclose = function () {
  console.log(["SOCKET", "CLOSED"].join(" "));
};

socket.onerror = function () {
  console.log(["SOCKET", "ERROR"].join(" "));
};

socket.onmessage = function (data) {
  const { eventName, ...args } = JSON.parse(data.data);
  // console.log("eventName: ", eventName);
  // console.log("callbacks: ", callbacks);
  // console.log("events: ", callbacks[eventName]);
  callbacks[eventName]?.forEach((fn: Function) => fn(args));
};

const callbacks: any = {};

// 添加监听器
const addListener = (type: string, callback: Function) => {
  callbacks[type] = callbacks[type]?.concat(callback) ?? [callback];
};

/**
 * @description: 移除监听函数
 * @param {string} type
 * @param {Function} func
 * @return {*}
 * @author: mzc
 */
const removeListener = (type: string, func?: Function) => {
  let deleteFun = func;
  let all = func ? false : true;
  callbacks[type].forEach((func: Function, index: number) => {
    if (all || func === deleteFun) {
      callbacks[type].splice(index, 1);
    }
  });
};

// 发送数据
const sendData = (data: any) => {
  socket.send(JSON.stringify(data));
};

export { addListener, sendData, removeListener };
