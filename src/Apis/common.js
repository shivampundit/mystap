import { CommonAPIs, AxiosInstance } from "./client";

export const uploadImage = (payload) => {
  return AxiosInstance()
    .post(CommonAPIs.UPLOAD_IMAGE, payload)
    .then((response) => response.data);
};

export const deleteImage = (payload) => {
  return AxiosInstance()
    .post(CommonAPIs.DELETE_IMAGE, payload)
    .then((response) => response.data);
};

export const submitQuery = (payload) => {
  return AxiosInstance()
    .post(CommonAPIs.SUBMIT_QUERY, payload)
    .then((response) => response.data);
};

export const contact = (payload) => {
  return AxiosInstance()
    .post(CommonAPIs.CONTACT, payload)
    .then((response) => response.data);
};
