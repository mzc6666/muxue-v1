/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2023-03-02 14:42:29
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-16 21:00:15
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
import { computed, reactive, Ref, ref } from "vue";
import useUserStore from "./user";
import { sendMessageToFriend } from "@/api/modules/message";

const useMessageStore = defineStore(
  "message",
  () => {
    const userStore = useUserStore();
    const userId = userStore.userInfo.id;
    // 消息内容
    const records = reactive<any>({});
    // 接收消息
    const handleMessageArrived = (data: ChattingPersonItem) => {
      const friendInfo =
        data.sender.userId === userId ? data.receiver : data.sender;
      if (records[friendInfo.userId]) {
        if (lookId.value === friendInfo.userId) {
          records[friendInfo.userId].unRead = 0;
        } else {
          records[friendInfo.userId].unRead += 1;
        }
        records[friendInfo.userId].messages.push(data);
      } else {
        records[friendInfo.userId] = {
          unRead: 1,
          messages: [data],
          info: friendInfo,
        };
      }
    };

    // 当前查看的好友ID
    const lookId = ref(-1);
    const setLookId = (id: number) => {
      lookId.value = id;
      records[lookId.value].unRead = 0;
    };

    return {
      sendMessageToFriend,
      handleMessageArrived,
      records,
      lookId,
      setLookId,
    };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          paths: ["friendChattingRecord"],
          storage: localStorage,
        },
      ],
    },
  }
);

export default useMessageStore;
