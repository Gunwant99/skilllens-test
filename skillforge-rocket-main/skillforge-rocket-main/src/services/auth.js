import api from "./api";

export const signup = (data) => api.post("/auth/signup", data);

export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  localStorage.setItem("token", res.data.access_token);
  return res;
};

export const logout = async () => {
  await api.post("/auth/logout");
  localStorage.removeItem("token");
};

export const getMe = () => api.get("/auth/me");
