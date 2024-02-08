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
export const getData = async (url) => {
  try {
    const resp = await main_uri.get(url);
    // console.log(resp);
    return resp.data;
  } catch (error) {
    toast.error(error.response.data?.message);
  }
};

export const deleteData = async (url) => {
  try {
    const resp = await main_uri.delete(url);
    return resp.data;
  } catch (error) {
    toast.error(error.response.data?.message);
  }
};

export const updateUser = async (url, data) => {
  try {
    const resp = await main_uri.patch(url, data);
    return resp.data;
  } catch (error) {
    console.log(error);
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
