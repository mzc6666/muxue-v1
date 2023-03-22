declare interface StudyRoomItem {
  roomId: number;
  lookCount: number;
  cover_pricture: string;
  title: string;
  creator: {
    pId: number;
    username: string;
  };
}
