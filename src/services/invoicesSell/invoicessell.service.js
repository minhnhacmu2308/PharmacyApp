import axios from "axios";

const URL = "https://pharmacy-server-app.herokuapp.com";

export const getAllInvoices = async () => {
  const response = await axios.get(`${URL}/admin/invoices-sell/list`);
  return response.data;
};
export const add = async (payload) => {
  const response = await axios.post(`${URL}/admin/invoices-sell/add`, payload);
  return response.data;
};
export const add1 = async (payload) => {
  const response = await axios.post(`${URL}/admin/invoices-sell/add1`, payload);
  return response.data;
};

export const addDetail = async (payload) => {
  const response = await axios.post(
    `${URL}/admin/invoices-sell/add-detail`,
    payload
  );
  return response.data;
};

export const addPrescription = async (payload) => {
  const response = await axios.post(
    `${URL}/admin/invoices-sell/add-prescription`,
    payload
  );
  return response.data;
};

export const confirmSell = async (payload) => {
  const response = await axios.post(
    `${URL}/admin/invoices-sell/confirm-sell`,
    payload
  );
  return response.data;
};

export const deleteInvoicesSell = async (payload) => {
  const response = await axios.post(
    `${URL}/admin/invoices-sell/delete`,
    payload
  );
  return response.data;
};

//detail
export const getInvoicesSell = async (id) => {
  const response = await axios.get(
    `${URL}/admin/invoices-sell/get-invoices?id=${id}`
  );
  return response.data;
};

//detail
export const getInvoicesSellMonth = async (month, year) => {
  const response = await axios.get(
    `${URL}/admin/invoices-sell/get-statistical-month?month=${month}&year=${year}`
  );
  return response.data;
};
