import { AxiosInstance, PlansAPIs } from "./client";

export const getPlans = (params) => {
  return AxiosInstance()
    .get(PlansAPIs.PLANS, { params })
    .then((response) => response.data);
};

export const createOrder = (payload) => {
  return AxiosInstance()
    .post(PlansAPIs.CREATE_ORDER, payload)
    .then((response) => response.data);
};

export const changePlan = (payload) => {
  return AxiosInstance()
    .post(PlansAPIs.CHANGE_PLAN, payload)
    .then((response) => response.data);
};
