import api from "./api";

export const uploadResume = (file: File) => {
  const form = new FormData();
  form.append("file", file);
  return api.post("/resume/upload", form);
};

export const getScore = () => api.get("/resume/score");
