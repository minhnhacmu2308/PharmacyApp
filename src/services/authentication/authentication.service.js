import axios from "axios";

const URL = "https://pharmacy-server-app.herokuapp.com";

export const postLogin = async (payload) => {
  const response = await axios.post(`${URL}/admin/login`, payload);
  return response.data;
};
