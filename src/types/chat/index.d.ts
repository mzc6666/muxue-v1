declare interface ChattingPersonItem {
  sender: {
    userId: number;
    username: string;
    cover: string;
  },
  receiver: {
    userId: number;
    username: string;
    cover: string;
  }
  content: string;
  time: string;
}