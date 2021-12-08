import React, { Component } from "react";
import { Route, withRouter, Redirect, Link } from "react-router-dom";
import { getAll } from "../../services/employee/employee.service";
import { MDBDataTableV5 } from "mdbreact";
import { data } from "./titleTable.js";
import AddForm from "./addForm";
import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  unLock,
  lock,
} from "../../services/authentication/authentication.service";
import ReactLoading from "react-loading";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datatable: [],
      token: "",
      isLoading: true,
      editing: {},
    };
  }
  componentDidMount = async () => {
    const token = await localStorage.getItem("token");
    const result = await getAll();
    if (result != null) {
      this.setState({ datatable: result, isLoading: false });
    }
    this.setState({ token: token });
  };
  notify = (text) => toast.success(text);
  notifyErr = (text) => toast.error(text);
  onSubmit = async (data) => {
    var datatable = this.state.datatable;
    console.log(data);
    if (data.success == true) {
      this.notify("Create account employee successfully");
      this.setState({ datatable: [...datatable, data.data] });
    }
    if (data.status == true) {
      this.notify("Update account employee successfully");
      var index = await this.findIndex(data.data._id);
      console.log(index);
      datatable[index] = data.data;
      this.setState({ datatable: datatable });
    }
  };
  onUnLock = async (id) => {
    var { datatable } = this.state;
    const data = {
      secret_key: this.state.token,
      idAccount: id,
    };
    const result = await unLock(data);
    var index = await this.findIndex(id);
    if (index !== -1) {
      datatable[index].status = 1;
      this.setState({ datatable: datatable });
    }
    this.notify("Unlock successfully");
  };
  onLock = async (id) => {
    var { datatable } = this.state;
    const data = {
      secret_key: this.state.token,
      idAccount: id,
    };
    const result = await lock(data);
    var index = await this.findIndex(id);
    if (index !== -1) {
      datatable[index].status = 0;
      this.setState({ datatable: datatable });
    }
    this.notify("Lock successfully");
  };
  findIndex = (id) => {
    var { datatable } = this.state;
    var result = -1;
    datatable.forEach((value, index) => {
      if (value._id === id) {
        result = index;
      }
    });
    return result;
  };
  onUpdate = async (id) => {
    const index = await this.findIndex(id);
    console.log(this.state.datatable[index]);
    this.setState({ editing: this.state.datatable[index] });
  };
 
  render() {
    return (
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Management Employee</h1>
          <ToastContainer />
          <div className="card mb-4">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th class="text-center">STT</th>
                  <th class="text-center" width="100px">
                    UserName
                  </th>
                  <th class="text-center">FullName</th>
                  <th class="text-center">Email</th>
                  <th class="text-center">Phone Number</th>
                  <th class="text-center" style={{ width: 100 }}>
                    Address
                  </th>
                  {/* <th class="text-center">IdCard</th> */}
                  <th class="text-center">Gender</th>
                  <th width="400px" class="text-center">
                    Status
                  </th>
                  <th class="text-center">Status Action</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <td></td>
                  <td>
                    <input type="text" class="form-control" />
                  </td>
                  <td>
                    <select class="form-control">
                      <option value="-1">Tất Cả</option>
                      <option value="0">Ẩn</option>
                      <option value="1">Kích Hoạt</option>
                    </select>
                  </td>
                  <td></td>
                </tr> */}
                {this.state.isLoading ? (
                  <tr>
                    <div>
                      <ReactLoading
                        color="primary"
                        height={"70%"}
                        width={"70%"}
                      />
                    </div>
                  </tr>
                ) : (
                  this.state.datatable.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td style={{ width: 50 }}>{value.userName}</td>
                        <td>{value.fullName}</td>
                        <td>{value.email}</td>
                        <td>{value.phonenumber}</td>
                        <td>{value.address}</td>
                        {/* <td>{value.idCard}</td> */}
                        <td>{value.gender}</td>
                        <td class="text-center">
                          {value.status == 1 ? (
                            <span class="label label-success">active</span>
                          ) : (
                            <span class="label label-danger">unactive</span>
                          )}
                        </td>
                        <td class="text-center">
                          <button
                            type="button"
                            style={{ width: 100 }}
                            class="btn btn-warning"
                            onClick={() => this.onUpdate(value._id)}
                          >
                            Edit
                          </button>
                          &nbsp;
                          {value.status == 1 ? (
                            <button
                              onClick={() => this.onLock(value._id)}
                              type="button"
                              class="btn btn-danger"
                              style={{ width: 100 }}
                            >
                              Lock
                            </button>
                          ) : (
                            <button
                              onClick={() => this.onUnLock(value._id)}
                              type="button"
                              class="btn btn-success"
                              style={{ width: 100 }}
                            >
                              UnLock
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            <AddForm employee={this.state.editing} onSubmit={this.onSubmit} />
          </div>
        </div>
      </main>
    );
  }
}

export default withRouter(index);
