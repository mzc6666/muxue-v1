/*
 * @Description: 
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-03-02 14:42:29
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-02 23:39:18
 */
/*
 * @Description: 消息Reposity
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-03-02 14:42:29
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-02 21:03:04
 */
import { defineStore } from "pinia";
import { computed, Ref, ref } from "vue";
import useUserStore from "./user";


const useMessageStore = defineStore("message", () => {

  const userStore = useUserStore();
  
  const currentChatPersonId = ref(0); // 当前正在聊天得好友得ID
  // 设置标志位表示当前聊天得好友得ID
  const setCurrentChaptPersonId = (id: number) => void (currentChatPersonId.value = id);
  
  // 当前群聊的ID
  const currentChatGroupId = ref(0);

  const setCurrentChaptGroupId = (id: number) => void (currentChatGroupId.value = id);

  // 好友消息记录列表
  const friendChattingRecord : Ref<any> = ref({});
  



  // 添加好友消息
  const addMessageToReposity = (data: ChattingPersonItem) => {
    console.log("[WEBSOCKET MESSAGE]: ", data);
    const id = data.sender.userId;
    friendChattingRecord.value[id] = (friendChattingRecord.value[id] ?? []).concat(data);
  }

  return {
    currentChatPersonId,
    setCurrentChaptPersonId,
    currentChatGroupId,
    setCurrentChaptGroupId,
    friendChattingRecord,
    addMessageToReposity
  }
},{
  persist: {
    enabled: true,
    strategies: [
      {
        paths: ['friendChattingRecord'],
        storage: localStorage
      }
    ]
  }
})

export default useMessageStore;