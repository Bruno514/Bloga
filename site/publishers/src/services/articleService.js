import ServerError from "@/errors/ServerError.js";
import ServerValidationError from "@/errors/ServerValidationError.js";

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
        throw new ServerError(result?.error, response.status);
      }

    default:
      throw new ServerError(result?.error, response.status);
  }
};
