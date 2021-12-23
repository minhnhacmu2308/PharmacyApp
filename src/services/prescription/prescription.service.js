import axios from "axios";

const URL = "https://pharmacy-server-app.herokuapp.com";

export const getAll = async () => {
  const response = await axios.get(`${URL}/admin/pre/list`);
  return response.data;
};
export const add = async (payload) => {
  const response = await axios.post(`${URL}/admin/pre/add`, payload);
  return response.data;
};
export const update = async (payload) => {
  const response = await axios.post(`${URL}/admin/pre/update`, payload);
  return response.data;
};
export const deletePrescription = async (payload) => {
  const response = await axios.post(`${URL}/admin/pre/delete`, payload);
  return response.data;
};

export const addDetailPrescription = async (payload) => {
  const response = await axios.post(`${URL}/admin/pre/add-detail`, payload);
  return response.data;
};
//detail
export const getPrescription = async (id) => {
  const response = await axios.get(
    `${URL}/admin/pre/get-prescription?id=${id}`
  );
  return response.data;
};
