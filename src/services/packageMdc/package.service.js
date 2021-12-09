import axios from "axios";

const URL = "https://pharmacy-server-app.herokuapp.com";

export const getAll = async () => {
  const response = await axios.get(`${URL}/admin/package/list`);
  return response.data;
};
export const add = async (payload) => {
  const response = await axios.post(`${URL}/admin/package/add`, payload);
  return response.data;
};
export const update = async (payload) => {
  const response = await axios.post(`${URL}/admin/package/update`, payload);
  return response.data;
};
export const deletePackage = async (payload) => {
  const response = await axios.post(`${URL}/admin/package/delete`, payload);
  return response.data;
};
