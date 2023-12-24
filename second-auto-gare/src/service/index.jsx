import axios from "axios";

const MAIN_URI = {
  baseURL: `${import.meta.env.VITE_MAIN_URL}`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const main_uri = axios.create(MAIN_URI)

const PHOTO_URL = {
  baseURL: `${import.meta.env.VITE_MAIN_URL}`,
  timeout: 5000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
};

const photo_url = axios.create(PHOTO_URL);
export {main_uri,photo_url}