export const postSession = async (email, password) => {
  const url = `${import.meta.env.VITE_API_URL}/session`

  try {
    const response = await fetch(url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      });

    const result = await response.json();

    if (response.ok) return result;

    switch (response.status) {
      case 404:
        throw new Error("Invalid credentials");
      default:
          throw new Error(response.statusText)
    }

  } catch (error) {
    console.error(error);
    throw error
  }
}
