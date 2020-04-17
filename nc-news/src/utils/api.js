import axios from "axios";

const request = axios.create({
  baseURL: "https://nc-news-sam-rowland.herokuapp.com/api",
});

export const fetchTopics = async () => {
  const { data } = await request.get("/topics");
  return data.topics;
};
export const fetchArticles = async (slug, sort_by, order) => {
  const { data } = await request.get("/articles", {
    params: { topic: slug, sort_by, order },
  });

  return data.articles;
};

export const fetchSingleArticle = async (article_id) => {
  const { data } = await request.get(`/articles/${article_id}`);
  return data.article;
};

export const fetchCommentsFromArticle = async (article_id) => {
  const { data } = await request.get(`/articles/${article_id}/comments`);
  return data.comments;
};

export const fetchHomeScreenArticle = async () => {
  const { data } = await request.get("/articles/34");
  return data.article;
};

export const patchArticle = async (article_id, votes) => {
  const { data } = await request.patch(`/articles/${article_id}`, {
    inc_votes: votes,
  });
  return data;
};
export const patchComment = async (comment_id, votes) => {
  const { data } = await request.patch(`/comments/${comment_id}`, {
    inc_votes: votes,
  });
  return data;
};

export const postComment = async (comment_id, username, body) => {
  const { data } = await request.post(`/articles/${comment_id}/comments`, {
    username,
    body,
  });

  return data;
};

export const deleteComment = async (comment_id) => {
  const { data } = await request.delete(`/comments/${comment_id}`);
  console.log(data);
};
