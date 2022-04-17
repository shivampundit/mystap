import { ProjectAPIs, AxiosInstance } from "./client";

export const getProjects = (params) => {
  return AxiosInstance()
    .get(ProjectAPIs.PROJECTS, { params })
    .then((response) => response.data);
};

export const addEditProject = (payload) => {
  return AxiosInstance()
    .post(ProjectAPIs.ADD_EDIT_PROJECT, payload)
    .then((response) => response.data);
};
