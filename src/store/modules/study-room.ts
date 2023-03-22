import { useEvent } from "@/hooks";
import { getStudyRoomDetail } from "@apis/modules/study-room";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

const useStudyRoomStore = defineStore("study-room", () => {
  // 默认图片
  const default_image =
    "https://img1.baidu.com/it/u=1716573682,397636585&fm=253&app=138&size=w931&n=0&f=GIF&fmt=auto?sec=1679331600&t=54d7c8f7bf0b17e1f0307690f3993373";
  // 人员情况
  const personList = reactive<any>({});
  // 消息
  interface Message {
    messageId: number;
    content: string;
    time: string;
  }
  const messages = reactive<Message[]>([]);
  // 时间
  const time = ref<string>("");

  const getDetailInfo = async (id: number) => {
    try {
      const result = await getStudyRoomDetail(id);
      if (result.data.code === "200") {
        const data = result.data.data;
        console.log("data: ", data);
        data.persons.forEach(
          (_: { pId: number; username: string }, index: number) => {
            personList[_.pId] = {
              username: _.username,
              data: default_image,
            };
          }
        );
        data.messages.forEach((_: Message, index: number) => {
          messages.push(_);
        });
        time.value = data.beginTime;
      }
    } catch (error) {}
  };

  /**
   * 新用户加入学习室
   */
  const handleNewUserArrived = (data: {
    id: number;
    avatar: string;
    username: string;
  }) => {
    personList[data.id] = {
      username: data.username,
      data: default_image,
    };
  };

  /**
   * 用户退出学习室
   */
  const handleUserExit = (id: number) => {
    if (personList[id]) {
      Reflect.deleteProperty(personList, String(id));
    }
  };

  /**
   * 新消息到达
   */
  const handleNewMessageArrived = (data: Message) => {
    messages.push(data);
  };

  /**
   * 用户图片数据流传输
   */
  const handleImageStreamDataArrived = (id: number, data: string) => {
    if (personList[id]) {
      personList[id].data = data;
    }
  };

  return {
    personList,
    messages,
    getDetailInfo,
    handleNewUserArrived,
    handleUserExit,
    handleNewMessageArrived,
    handleImageStreamDataArrived,
  };
});

export default useStudyRoomStore;
