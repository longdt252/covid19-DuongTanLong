import axiosClient from "./axiosClient";

const countryApi = {
  getAllCountry(params) {
    const url = "/countries";
    return axiosClient.get(url, { params });
  },

  getByCountryAllStatus(params) {
    const url = `/country/${params.country}?from=${params.from}&to=${params.to}`;
    return axiosClient.get(url);
  },
};

export default countryApi;
