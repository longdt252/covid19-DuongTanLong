import axiosClient from "./axiosClient";

const summaryApi = {
  getAll(params) {
    const url = "/summary";
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/summary/${id}`;
    return axiosClient.get(url);
  },
};

export default summaryApi;
