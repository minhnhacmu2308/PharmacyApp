import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router-dom";
import HomePage from "../src/pages/homePage/index";
import Login from "../src/pages/login/index";
import EmployeePage from "./pages/employeePage/index";
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
          <Login exact path="/login" />
          {/* <FullLayout exact path="/login" component={LoginPage} />
        <FullLayout exact path="/register" component={RegisterPage} /> */}
          <DefaultLayout exact path="/" component={HomePage} />
          <DefaultLayout exact path="/employee" component={EmployeePage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
