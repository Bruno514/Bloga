export const getUser = async () => {
  const url = `${import.meta.env.VITE_API_URL}/user`

  try {
    const token = localStorage.getItem("token")
    const response = await fetch(url,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error.message);
    return undefined;
  }
}
