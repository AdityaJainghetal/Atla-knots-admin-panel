import axios from "axios";

const API_URL = "https://atla-knots-solution-admin.onrender.com/api/create";

export const createProductApi = (formData) => {
  return axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
