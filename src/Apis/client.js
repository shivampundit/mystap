import Axios from "axios";
import { dispatchAction, store } from "../Redux/store";
import { handleLogout } from "../Redux/Actions/auth";
import { BASE_URL } from "../Config";
import { toast } from "react-toastify";

export const AuthAPIs = {
  LOGIN: "/user/login",
  SOCIAL_LOGIN: "/user/socialLogin",
  REGISTER: "/user/register",
  LOGOUT: "/user/logout",
  USER_PROFILE: "/user/profile",
  UPDATE_PROFILE: "/user/updateProfile",
  FORGOT_PASSWORD: "/api/forgotPassword",
  UPDATE_PASSWORD: "/api/updatePassword",
};

export const LeadAPIs = {
  LEADS: "/user/leads",
  ADD_EDIT_LEAD: "/user/addEditLead",
  LEAD_DETAIL: "/user/leadsExtraData",
  ADD_EDIT_LEAD_DETAIL: "/user/addLeadExtraData",
  DELETE_LEAD_DETAIL: "/user/deleteLeadExtraData",
  LEAD_ACTIONS: "/user/leadActions",
};

export const ProjectAPIs = {
  PROJECTS: "/user/projects",
  ADD_EDIT_PROJECT: "/user/addEditProject",

};

export const PlansAPIs = {
  PLANS: "user/plans",
  CHANGE_PLAN: "/user/changePlan",
  CREATE_ORDER: "/user/createOrder",
};

export const CommonAPIs = {
  UPLOAD_IMAGE: "api/uploadImage",
  DELETE_IMAGE: "user/deleteImage",
  SUBMIT_QUERY: "user/newsletterQuery",
  CONTACT: "user/contact",
};

const defaultOptions = () => ({
  headers: {
    authorization: store.getState().auth.accessToken
      ? `Bearer ${store.getState().auth.accessToken}`
      : "",
  },
  transformResponse: Axios.defaults.transformResponse.concat((response) => {
    if (response?.statusCode === 401) {
      dispatchAction(handleLogout(true));
      console.log("unauth");
    }
    return response;
  }),
});

export const AxiosInstance = () => {
  const instance = Axios.create({
    baseURL: `${BASE_URL}`,
    ...defaultOptions(),
  });
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      toast.error(error?.response?.data?.message || error?.message);
      throw error;
    }
  );
  return instance;
};
