import axios from "axios";

const URL = "https://pharmacy-server-app.herokuapp.com";

export const getAll = async () => {
  const response = await axios.get(`${URL}/admin/list`);
  return response.data;
};

export const getEmployee = async () => {
  const response = await axios.get(`${URL}/admin/get-list-employee`);
  return response.data;
};

export const getCustomer = async () => {
  const response = await axios.get(`${URL}/admin/get-list-customer`);
  return response.data;
};

export const createAccount = async (payload) => {
  const response = await axios.post(`${URL}/admin/create-account`, payload);
  return response.data;
};

export const createCustomer = async (payload) => {
  const response = await axios.post(`${URL}/admin/create-customer`, payload);
  return response.data;
};

export const updateAccount = async (payload) => {
  const response = await axios.post(`${URL}/admin/update-account`, payload);
  return response.data;
};
