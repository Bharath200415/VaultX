import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000/api" });

export const uploadFile = (formData, onProgress) =>
  API.post("/files/upload", formData, {
    onUploadProgress: (e) => {
      const percent = Math.round((e.loaded * 100) / e.total);
      onProgress(percent);
    },
  });

export const listFiles = () => API.get("/files");
export const downloadFile = (key) => API.get(`/files/download/${key}`);
export const shareFile = (key) => API.get(`/files/share/${key}`);
export const deleteFile = (key) => API.delete(`/files/${key}`);