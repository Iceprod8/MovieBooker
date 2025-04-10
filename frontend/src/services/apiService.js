import axios from "axios";
console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

const domain = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export async function backend(endpoint, config = {}) {
  try {
    const { method = "GET", data, access_token, ...rest } = config;

    const finalConfig = {
      url: `${domain}${endpoint}`,
      method,
      data,
      ...rest,
      headers: {
        Accept: "application/json",
        ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
        ...(rest.headers || {}),
      },
    };

    const response = await axios(finalConfig);
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
