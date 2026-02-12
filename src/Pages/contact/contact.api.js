import axios from "axios";

const API = "https://atla-knots-solution-admin.onrender.com/api/contact";

// GET All Contacts
export const getContactsApi = () => {
  return axios.get(API);
};

// DELETE Contact
export const deleteContactApi = (id) => {
  return axios.delete(`${API}/${id}`);
};
