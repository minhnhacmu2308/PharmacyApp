import axios from "axios";

const URL = "https://pharmacy-server-app.herokuapp.com";

export const postLogin = async (payload) => {
  const response = await axios.post(`${URL}/admin/login`, payload);
  return response.data;
};

export const unLock = async (payload) => {
  const response = await axios.post(`${URL}/admin/un-lock-account`, payload);
  return response.data;
};

export const lock = async (payload) => {
  const response = await axios.post(`${URL}/admin/lock-account`, payload);
  return response.data;
};
