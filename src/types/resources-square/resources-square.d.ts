declare interface SquareResourcesItem {
  sId: number;
  sName: string;
  updateTime: string;
  size: number;
  isCollection: boolean;
  isLike: boolean;
  image: string;
  commentCount: number;
  likes: number;
  collectionCount: number;
  user: {
    uId: number;
    username: string;
    avatar: string;
  };
}
