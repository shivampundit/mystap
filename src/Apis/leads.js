import { AxiosInstance, LeadAPIs } from "./client";

export const getLeads = (params) => {
  return AxiosInstance()
    .get(LeadAPIs.LEADS, { params })
    .then((response) => response.data);
};

export const addEditLead = (payload) => {
  return AxiosInstance()
    .post(LeadAPIs.ADD_EDIT_LEAD, payload)
    .then((response) => response.data);
};

export const getLeadDetail = (params) => {
  return AxiosInstance()
    .get(LeadAPIs.LEAD_DETAIL, { params })
    .then((response) => response.data);
};

export const addEditLeadDetail = (payload) => {
  return AxiosInstance()
    .post(LeadAPIs.ADD_EDIT_LEAD_DETAIL, payload, {
      headers: { "content-type": "multipart/form-data" },
    })
    .then((response) => response.data);
};

export const deleteLeadDetail = (payload) => {
  return AxiosInstance()
    .post(LeadAPIs.DELETE_LEAD_DETAIL, payload)
    .then((response) => response.data);
};

export const leadActions = (payload) => {
  return AxiosInstance()
    .post(LeadAPIs.LEAD_ACTIONS, payload)
    .then((response) => response.data);
};
