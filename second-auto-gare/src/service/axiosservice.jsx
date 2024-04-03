import { toast } from "react-toastify";
import { main_uri, photo_url } from ".";
import { ErrorToast } from "../components/common/toast";

export const postData = async (url, data) => {
  try {
    const resp = await main_uri.post(url, data);
    return resp.data;
  } catch (error) {
    ErrorToast({ message: error.response.data?.message });
  }
};
export const getData = async (url) => {
  try {
    const resp = await main_uri.get(url);
    return resp.data;
  } catch (error) {
     ErrorToast({ message: error.response.data?.message });
  }
};

export const deleteData = async (url) => {
  try {
    const resp = await main_uri.delete(url);
    return resp.data;
  } catch (error) {
     ErrorToast({ message: error.response.data?.message });
  }
};

export const updateData = async (url, data) => {
  try {
    const resp = await photo_url.patch(url, data);
    return resp.data;
  } catch (error) {
    console.log(error);
     ErrorToast({ message: error.response.data?.message });
  }
};

export const postImageData = async (url, data) => {
  try {
    const resp = await photo_url.post(url, data);
    return resp.data;
  } catch (error) {
    console.log(error);
     ErrorToast({ message: error.response.data?.message });
  }
};
