import axios from "axios";

const URL = "https://pharmacy-server-app.herokuapp.com";

export const getAllMdc = async () => {
  const response = await axios.get(`${URL}/admin/mdc/list`);
  return response.data;
};
export const add = async (payload) => {
  const response = await axios.post(`${URL}/admin/mdc/add`, payload);
  return response.data;
};

export const deleteMdc = async (payload) => {
  const response = await axios.post(`${URL}/admin/mdc/deleteMdc`, payload);
  return response.data;
};
export const updateQuantity = async (payload) => {
  const response = await axios.post(`${URL}/admin/mdc/updateQuantity`, payload);
  return response.data;
};

export const updatePrice = async (payload) => {
  const response = await axios.post(`${URL}/admin/mdc/updatePrice`, payload);
  return response.data;
};
export const convertPackage = async (payload) => {
  const response = await axios.post(`${URL}/admin/mdc/convert`, payload);
  return response.data;
};
