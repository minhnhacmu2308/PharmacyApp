import React, { Component } from "react";
import { Route, withRouter, Redirect, Link } from "react-router-dom";
import {
  getAllInvoicesBuy,
  deleteInvoicesBuy,
} from "../../services/invoicesBuy/invoicesbuy.service.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";
import InvoicesForm from "./invoicesForm";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datatable: [],
      token: "",
      isLoading: true,
      editing: {},
      show: false,
    };
  }
  componentDidMount = async () => {
    const token = await localStorage.getItem("token");
    const result = await getAllInvoicesBuy();
    console.log(result);
    if (result != null) {
      this.setState({ datatable: result, isLoading: false });
    }
    this.setState({ token: token });
  };
  notify = (text) => toast.success(text);
  notifyErr = (text) => toast.error(text);
  onDelete = async (id) => {
    const data = {
      secret_key: this.state.token,
      idInvoicesBuy: id,
    };
    const result = await deleteInvoicesBuy(data);
    console.log(result);

    if (result.status) {
      this.setState({
        datatable: this.state.datatable.filter((p) => p._id !== id),
      });
      this.notify("Delete invoices buy successfully");
    }
  };
  onSubmit = async (data) => {
    var datatable = this.state.datatable;
    console.log(data);
    if (data.success == true) {
      this.notify("Create invoices buy successfully");
      this.setState({ datatable: [...datatable, data.data] });
    }
  };
  onAdd = async (data) => {
    var datatable = this.state.datatable;
    console.log(data);
    if (data.status == true) {
      var index = await this.findIndex(data.data._id);
      console.log(index);
      datatable[index] = data.data;
      this.setState({ datatable: datatable });
    }
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
          <h1 className="mt-4">Management Invoices Buy</h1>
          <ToastContainer />
          <div className="card mb-4">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th class="text-center">STT</th>
                  <th class="text-center" width="100px">
                    Name Employee
                  </th>
                  <th class="text-center" width="400px" style={{ width: 200 }}>
                    Date payment
                  </th>
                  {/* <th class="text-center">IdCard</th> */}
                  <th class="text-center">Discount</th>
                  <th width="400px" class="text-center">
                    Total payment
                  </th>
                  <th width="400px" class="text-center">
                    Detail
                  </th>
                  <th width="500px" class="text-center">
                    Status Action
                  </th>
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
                        <td style={{ width: 50 }}>{value.employee?.name}</td>
                        <td>
                          <td style={{ width: 50 }}>
                            {new Date(value.datePayment).toLocaleDateString()}
                          </td>
                        </td>

                        <td>{value.discount}</td>
                        <td>{value.totalPayment} VNĐ</td>
                        <td>
                          <Link to={`/detail-invoices/${value._id}`}>
                            Detail
                          </Link>
                        </td>
                        {/* <td>{value.idCard}</td> */}

                        <td class="text-center">
                          <button
                            type="button"
                            style={{ width: 100 }}
                            class="btn btn-success"
                            onClick={() => this.onUpdate(value._id)}
                          >
                            Add
                          </button>
                          &nbsp;
                          <button
                            type="button"
                            class="btn btn-danger"
                            style={{ width: 100 }}
                            onClick={() => this.onDelete(value._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            <InvoicesForm
              editing={this.state.editing}
              onSubmit={this.onSubmit}
              onEdit={this.onEdit}
              onAdd={this.onAdd}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default index;
