import axios from "axios";

const URL = "https://pharmacy-server-app.herokuapp.com";

export const getAll = async () => {
  const response = await axios.get(`${URL}/admin/group/list`);
  return response.data;
};
export const add = async (payload) => {
  const response = await axios.post(`${URL}/admin/group/add`, payload);
  return response.data;
};
export const update = async (payload) => {
  const response = await axios.post(`${URL}/admin/group/update`, payload);
  return response.data;
};
export const deleteGroup = async (payload) => {
  const response = await axios.post(`${URL}/admin/group/delete`, payload);
  return response.data;
};
