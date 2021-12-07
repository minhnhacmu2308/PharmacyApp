import axios from "axios";

const URL = "https://pharmacy-server-app.herokuapp.com";

export const getAll = async () => {
  const response = await axios.get(`${URL}/admin/list`);
  return response.data;
};
