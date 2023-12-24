import { toast } from "react-toastify";
import { main_uri, photo_url } from ".";

export const postData = async (url, data) => {
  try {
    const resp = await main_uri.post(url, data);
    return resp.data;
  } catch (error) {
    toast.error(error.response.data?.message);
  }
};

export const postImageData = async (url, data) => {
  try {
    const resp = await photo_url.post(url, data);
    console.log(resp);
    return resp.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data?.message);
  }
};
