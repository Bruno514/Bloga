import ApiError from "@/errors/ApiError.js";

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
    default:
      throw new ApiError(result?.error || response.statusText, response.status);
  }
};
