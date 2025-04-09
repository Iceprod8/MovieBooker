import axios from "axios";

export async function backend(url, config = {}) {
  try {
    const { access_token, ...rest } = config;
    const finalConfig = {
      ...rest,
      headers: {
        Accept: "application/json",
        ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
        ...(rest.headers || {}),
      },
    };
    const response = await axios.get(url, finalConfig);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("username");
    }
    console.error("Erreur backend:", error?.response?.data || error);
    throw error;
  }
}
