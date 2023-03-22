/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2023-03-08 18:04:39
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-09 14:38:31
 */
import { get, post } from "@apis/request";

export const getCommunityHome = (events: Events = {}) => {
  return get(
    {
      url: "/community/home",
    },
    events
  );
};

export const getArticleContent = (id: number, events: Events = {}) => {
  return get(
    {
      url: "/community/article/detail",
      params: {
        id,
      },
    },
    events
  );
};

export const giveLikeToArticle = (article_id: number, events: Events = {}) => {
  return post(
    {
      url: "/community/article/likes",
      data: {
        article_id,
      },
    },
    events
  );
};

export const collectArticle = (article_id: number, events: Events = {}) => {
  return post(
    {
      url: "/community/article/collect",
      data: {
        article_id,
      },
    },
    events
  );
};

export const getLikesList = (event: Events = {}) => {
  return get(
    {
      url: "/community/likes",
    },
    event
  );
};

export const getCollectLists = (events: Events = {}) => {
  return get(
    {
      url: "/community/collections",
    },
    events
  );
};

export const publishArticle = (
  cover_image: File,
  title: string,
  content: string,
  events: Events = {}
) => {
  return post(
    {
      url: "/community/article",
      data: {
        cover_image,
        title,
        content,
      },
      headers: {
        "Content-type": "multipart/form-data",
      },
    },
    events
  );
};
