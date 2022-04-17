import { AxiosInstance, AuthAPIs } from "./client";
import { store } from "../Redux/store";

export const login = (payload) => {
  return AxiosInstance()
    .post(AuthAPIs.LOGIN, payload)
    .then((response) => response.data);
};

export const socialLogin = (payload) => {
  return AxiosInstance()
    .post(AuthAPIs.SOCIAL_LOGIN, payload)
    .then((response) => response.data);
};

export const register = (payload) => {
  return AxiosInstance()
    .post(AuthAPIs.REGISTER, payload)
    .then((response) => response.data);
};

export const logout = () => {
  return AxiosInstance()
    .post(AuthAPIs.LOGOUT, {
      deviceId: store?.getState()?.auth?.deviceId || "",
    })
    .then((response) => response.data);
};

export const getUserProfile = (params) => {
  return AxiosInstance()
    .get(AuthAPIs.USER_PROFILE, { params })
    .then((response) => response.data);
};

export const updateUserProfile = (payload) => {
  return AxiosInstance()
    .post(AuthAPIs.UPDATE_PROFILE, payload)
    .then((response) => response.data);
};

export const resetPassword = (payload) => {
  return AxiosInstance()
    .post(AuthAPIs.FORGOT_PASSWORD, payload)
    .then((response) => response.data);
};

export const updatePassword = (payload) => {
  return AxiosInstance()
    .post(AuthAPIs.UPDATE_PASSWORD, payload)
    .then((response) => response.data);
};
