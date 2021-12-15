import axios from "axios";

const URL = "https://pharmacy-server-app.herokuapp.com";

export const getAll = async () => {
  const response = await axios.get(`${URL}/admin/invoices-buy/list`);
  return response.data;
};
export const add = async (payload) => {
  const response = await axios.post(`${URL}/admin/invoices-buy/add`, payload);
  return response.data;
};

export const addDetail = async (payload) => {
  const response = await axios.post(
    `${URL}/admin/invoices-buy/add-detail`,
    payload
  );
  return response.data;
};

export const deleteInvoicesBuy = async (payload) => {
  const response = await axios.post(
    `${URL}/admin/invoices-buy/delete`,
    payload
  );
  return response.data;
};

//detail
export const getInvoicesBuy = async (id) => {
  const response = await axios.get(
    `${URL}/admin/invoices-buy/get-invoices?id=${id}`
  );
  return response.data;
};
