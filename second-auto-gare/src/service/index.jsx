import axios from "axios";

const MainAxiosInstance = (headers) => {
  return axios.create({
    baseURL: `${import.meta.env.VITE_MAIN_URL}`,
    timeout: 10000,
    headers, //*Here sending the headers through the MainAxiosInstance parameter
    withCredentials: true,
  });
};

const main_uri = MainAxiosInstance({
  "Content-Type": "application/json",
});

const photo_url = MainAxiosInstance({
  "Content-Type": "multipart/form-data",
});
export { main_uri, photo_url };
