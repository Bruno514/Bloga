export const postArticle = async (title, content, published = false) => {
  const url = `${import.meta.env.VITE_API_URL}/article`;
  console.log("Title: ", title);
  console.log("Content: ", content);
  console.log("Published: ", published);

  console.log(JSON.stringify({ title, content, published }));
  try {
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
        throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
