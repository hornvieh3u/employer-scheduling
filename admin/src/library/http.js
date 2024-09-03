import axios from "axios";

const baseURL = process.env.REACT_APP_API;

const http = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Configure
http.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user);

  if (parsedUser) {
    const token = parsedUser?.token;

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

export default http;
