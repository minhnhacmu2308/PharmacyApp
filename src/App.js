import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router-dom";
import HomePage from "../src/pages/homePage/index";
import Login from "../src/pages/login/index";
import EmployeePage from "./pages/employeePage/index";
import CustomerPage from "./pages/customerPage/index";
import PackagePage from "./pages/packagePage/index";
import GroupPage from "./pages/groupPage/index";
import MedicinePage from "./pages/medicinePage/index";
import DetailMedicinePage from "./pages/medicinePage/detail";
import MdcPackagingPage from "./pages/mdcPackagingSizePage/index";
import InvoicesBuyPage from "./pages/invoicesBuyPage/index";
import InvoicesSellPage from "./pages/invoicesSellPage/index";
import DetailInvoicesBuyPabe from "./pages/invoicesBuyPage/detail";
import DetailInvoicesSellPage from "./pages/invoicesSellPage/detail";
import PrescriptionPage from "./pages/prescriptionPage/index";
import DefaultLayout from "../src/layouts/DefaultLayout";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
    };
  }
  render() {
    return (
      <Router history={createBrowserHistory()}>
        <Switch>
          <Login exact path="/" />
          {/* <FullLayout exact path="/login" component={LoginPage} />
        <FullLayout exact path="/register" component={RegisterPage} /> */}
          <DefaultLayout exact path="/home" component={HomePage} />
          <DefaultLayout exact path="/package" component={PackagePage} />
          <DefaultLayout exact path="/employee" component={EmployeePage} />
          <DefaultLayout exact path="/medicine" component={MedicinePage} />
          <DefaultLayout exact path="/customer" component={CustomerPage} />
          <DefaultLayout
            exact
            path="/prescription"
            component={PrescriptionPage}
          />
          <DefaultLayout
            exact
            path="/invoices-buy"
            component={InvoicesBuyPage}
          />
          <DefaultLayout
            exact
            path="/invoices-sell"
            component={InvoicesSellPage}
          />
          <DefaultLayout
            exact
            path="/detail-invoices-sell/:id"
            component={DetailInvoicesSellPage}
          />
          <DefaultLayout
            exact
            path="/detail-invoices/:id"
            component={DetailInvoicesBuyPabe}
          />
          <DefaultLayout
            exact
            path="/detail-medicine/:id"
            component={DetailMedicinePage}
          />
          <DefaultLayout
            exact
            path="/mdc-packaging-size"
            component={MdcPackagingPage}
          />
          <DefaultLayout exact path="/group" component={GroupPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
