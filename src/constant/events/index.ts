/*
 * @Description: websocket事件类型
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-03-02 15:54:56
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-02 15:55:22
 */

export const SEND_MESSAGE_EVENT = 'sendMsg';

export const RECEIVE_MESSAGE_EVENT = 'receiveMsg';


const EVENTS = [SEND_MESSAGE_EVENT, RECEIVE_MESSAGE_EVENT]


export default EVENTS;