/*
 * @Description: 消息Reposity
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-03-02 14:42:29
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-02 16:46:49
 */
import { defineStore } from "pinia";
import { computed, Ref, ref } from "vue";
import useUserStore from "./user";


const useMessageStore = defineStore("message", () => {

  const userStore = useUserStore();
  
  const currentChatPersonId = ref(-1); // 当前正在聊天得好友得ID
  // 设置标志位表示当前聊天得好友得ID
  const setCurrentChaptPersonId = (id: number) => void (currentChatPersonId.value = id);
  
  // 当前群聊的ID
  const currentChatGroupId = ref(-1);

  const setCurrentChaptGroupId = (id: number) => void (currentChatGroupId.value = id);

  // 好友消息记录列表
  const friendChattingRecord : Ref<any> = ref({});

  // 消息记录转换为Map,方便遍历
  const friendChattingRecordMap : Ref<Map<number,ChattingPersonItem[]>>  = computed(() => {
    const map : Map<number, ChattingPersonItem[]> = new Map();
    for(let key in friendChattingRecord.value) {
      map.set(Number(key),friendChattingRecord.value[key]);
    }
    return map;
  })

  // 添加好友消息
  const addMessageToReposity = (data: ChattingPersonItem) => {
    const id = data.user.userId == userStore.userInfo.id ? currentChatPersonId.value : data.user.userId;
    if (id == -1) {
      return;
    }
    // friendChattingRecord.set(id, friendChattingRecord.has(id) ? (friendChattingRecord.get(id) as ChattingPersonItem[]).concat(data) : [data]);
    friendChattingRecord.value[id] = friendChattingRecord.value[id]?.concat(data) ?? [data];
  }

  return {
    currentChatPersonId,
    setCurrentChaptPersonId,
    currentChatGroupId,
    setCurrentChaptGroupId,
    friendChattingRecord,
    friendChattingRecordMap,
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