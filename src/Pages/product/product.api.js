import axios from "axios";

const API_URL = "https://atla-knots-solution-admin.onrender.com/api/product";

export const createProductApi = (formData) => {
  return axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateHomeApi = (id, data) => {
  return axios.put(
    `https://atla-knots-solution-admin.onrender.com/api/updatehome/${id}`,
    data,
  );
};
export const deleteHomeApi = (id) => axios.delete(`${API_URL}/${id}`);

export const getProductsApi = () => {
  return axios.get(API_URL);
};
