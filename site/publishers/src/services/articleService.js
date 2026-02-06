import { ServerGenericError } from "@/errors/ServerGenericError.js";
import { ServerValidationError } from "@/errors/ServerValidationError.js";

export const getArticles = async (title, author) => {
  const params = new URLSearchParams();
  params.append("title", title || "");
  params.append("author", author || "");

  const url = `${import.meta.env.VITE_API_URL}/article?${params}`;

  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (response.ok) return result;

  switch (response.status) {
    case 400:
      if (result?.errors) {
        throw new ServerValidationError(result.statusText, result.errors);
      } else {
        throw new ServerGenericError(result?.error, response.status);
      }

    default:
      throw new ServerGenericError(result?.error, response.status);
  }
};

export const getArticleById = async (articleId) => {
  const url = `${import.meta.env.VITE_API_URL}/article/${articleId}/`;

  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (response.ok) return result;

  switch (response.status) {
    case 400:
      if (result?.errors) {
        throw new ServerValidationError(result.statusText, result.errors);
      } else {
        throw new ServerGenericError(result?.error, response.status);
      }

    default:
      throw new ServerGenericError(result?.error, response.status);
  }
};

export const updateArticle = async (
  articleId,
  title,
  content,
  published = false,
) => {
  const url = `${import.meta.env.VITE_API_URL}/article/${articleId}`;

  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content, published }),
  });

  const result = await response.json();

  if (response.ok) return result;

  switch (response.status) {
    case 400:
      if (result?.errors) {
        console.log(result.errors);
        throw new ServerValidationError(result.statusText, result.errors);
      } else {
        throw new ServerGenericError(result?.error, response.status);
      }

    default:
      throw new ServerGenericError(result?.error, response.status);
  }
};

export const postArticle = async (title, content, published = false) => {
  const url = `${import.meta.env.VITE_API_URL}/article`;

  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content, published }),
  });

  const result = await response.json();

  if (response.ok) return result;

  switch (response.status) {
    case 400:
      if (result?.errors) {
        console.log(result.errors);
        throw new ServerValidationError(result.statusText, result.errors);
      } else {
        throw new ServerGenericError(result?.error, response.status);
      }

    default:
      throw new ServerGenericError(result?.error, response.status);
  }
};
