declare interface ArticleItemInterface {
  article_id: number;
  title: string;
  content: string;
  publishTime: string;
  avatar: string;
  username: string;
  cover_image: string;
  likes: number;
}

declare interface ArticleDetailInterface {
  article_id: number;
  title: string;
  content: string;
  cover_image: string;
  publishTime: string;
  likesCount: number;
  collectionCount: number;
  user: {
    avatar: string;
    username: string;
    userId: string;
  };
  isLike: boolean;
  isCollect: boolean;
}

declare interface ArticleLikeItemInterface {
  like_time: string;
  title: string;
  likeId: number;
  article_id: number;
  user: {
    userId: number;
    username: string;
    avatar: string;
  }
}

declare interface ArticleCollectItemInterface {
  collect_id: number;
  user: {
    userId: number;
    avatar: string;
    username: string;
  },
  collect_time: string;
  title: string;
  article_id: number;
}