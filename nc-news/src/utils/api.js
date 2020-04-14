import axios from "axios";

const request = axios.create({
  baseURL: "https://nc-news-sam-rowland.herokuapp.com/api",
});

export const fetchTopics = () => {
  return request.get("/topics").then(({ data }) => {
    return data.topics;
  });
};
export const fetchArticles = (slug) => {
  return request
    .get("/articles", { params: { topic: slug } })
    .then(({ data }) => {
      return data.articles;
    });
};

export const fetchSingleArticle = (article_id) => {
  return request.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const fetchCommentsFromArticle = (article_id) => {
  return request.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const fetchHomeScreenArticle = () => {
  return request.get("/articles/34").then(({ data }) => {
    return data.article;
  });
};
