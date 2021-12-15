import axios from "axios";

const URL = "https://pharmacy-server-app.herokuapp.com";

export const getAllMedicine = async () => {
  const response = await axios.get(`${URL}/admin/medicines/list`);
  return response.data;
};
export const getMedicine = async (id) => {
  const response = await axios.get(
    `${URL}/admin/medicines/get-medicine?id=${id}`
  );
  return response.data;
};
export const add = async (payload) => {
  const response = await axios.post(`${URL}/admin/medicines/add`, payload);
  return response.data;
};

export const update = async (payload) => {
  const response = await axios.post(`${URL}/admin/medicines/update`, payload);
  return response.data;
};

export const deleteMedicine = async (payload) => {
  const response = await axios.post(`${URL}/admin/medicines/delete`, payload);
  return response.data;
};
