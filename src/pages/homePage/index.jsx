import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getAllInvoicesBuy } from "../../services/invoicesBuy/invoicesbuy.service.js";
import {
  getAllInvoices,
  getInvoicesSellMonth,
} from "../../services/invoicesSell/invoicessell.service.js";
import { getAllMedicine } from "../../services/medicine/medicine.service";
import {
  getEmployee,
  getCustomer,
} from "../../services/employee/employee.service";
import { getAll } from "../../services/prescription/prescription.service.js";
import { Bar } from "react-chartjs-2";
import StatisSell from "./statisticalSellPage";
import StatisBuy from "./statisticalBuyPage";

import "react-toastify/dist/ReactToastify.css";

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      numberBuy: "",
      numberSell: "",
      numberMedicine: "",
      numberEmplyee: "",
      numberCustomer: "",
      numberPrescription: "",
    };
  }
  componentDidMount = async () => {
    const token = await localStorage.getItem("token");
    const listSell = await getAllInvoices();
    const listBuy = await getAllInvoicesBuy();
    const listMedicine = await getAllMedicine();
    const listEmployee = await getEmployee();
    const listCustomer = await getCustomer();
    const listScription = await getAll();
    console.log(listScription);
    this.setState({
      token: token,
      numberSell: listSell.length,
      numberBuy: listBuy.length,
      numberMedicine: listMedicine.length,
      numberEmplyee: listEmployee.data.length,
      numberCustomer: listCustomer.data.length,
      numberPrescription: listScription.length,
    });
  };
  render() {
    var loginUser = localStorage.getItem("token");
    if (loginUser === null) {
      return <Redirect to="/login" />;
    }
    return (
      <main>
        <ToastContainer />
        <ol class="breadcrumb mb-4">
          <li class="breadcrumb-item active"></li>
        </ol>
        <div class="container-fluid px-4">
          <div class="row">
            <div class="col-xl-3 col-md-6">
              <div class="card bg-primary text-white mb-4">
                <div class="card-body">Number of sales orders</div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                  <a class="small text-white stretched-link" href="#">
                    {this.state.numberSell}
                  </a>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div class="card bg-warning text-white mb-4">
                <div class="card-body">Number of purchase orders</div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                  <a class="small text-white stretched-link" href="#">
                    {this.state.numberBuy}
                  </a>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div class="card bg-success text-white mb-4">
                <div class="card-body">Number medicine</div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                  <a class="small text-white stretched-link" href="#">
                    {this.state.numberMedicine}
                  </a>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div class="card bg-danger text-white mb-4">
                <div class="card-body">Number employee</div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                  <a class="small text-white stretched-link" href="#">
                    {this.state.numberEmplyee}
                  </a>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div class="card bg-danger text-white mb-4">
                <div class="card-body">Number customer</div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                  <a class="small text-white stretched-link" href="#">
                    {this.state.numberCustomer}
                  </a>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div class="card bg-success text-white mb-4">
                <div class="card-body">Number medicine prescription</div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                  <a class="small text-white stretched-link" href="#">
                    {this.state.numberPrescription}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <StatisSell />
        <StatisBuy />
      </main>
    );
  }
}

export default withRouter(home);
