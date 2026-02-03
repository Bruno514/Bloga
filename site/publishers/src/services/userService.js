import ServerError from "@/errors/ServerError.js";

export const createUser = async (
  username,
  email,
  password,
  confirmPassword,
) => {
  const url = `${import.meta.env.VITE_API_URL}/user`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, confirmPassword }),
    });

    const result = await response.json();

    if (response.ok) return result;

    switch (response.status) {
      default:
        throw new ServerError(
          result?.error || response.statusText,
          response.status,
        );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUser = async () => {
  const url = `${import.meta.env.VITE_API_URL}/user`;

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
};
