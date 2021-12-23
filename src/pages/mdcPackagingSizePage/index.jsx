import React, { Component } from "react";
import { Route, withRouter, Redirect, Link } from "react-router-dom";
import {
  getAllMdc,
  deleteMdc,
  updatePrice,
  updateQuantity,
  convertPackage,
} from "../../services/mdcPackagingSize/mdcPackagingSize.service.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MdcForm from "./mdcForm";
import ReactLoading from "react-loading";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datatable: [],
      token: "",
      isLoading: true,
      editing: {},
      show: false,
      quantity: "",
      price: "",
      filterName: "",
      nameMedicine: "",
      size: "",
      checkConvert: false,
      packageSize: "",
      idPackageSize: "",
      quantity: "",
      listMedicine: [],
    };
  }

  componentDidMount = async () => {
    const token = await localStorage.getItem("token");
    const result = await getAllMdc();

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
      this.notify("Add medicine  successfully");
      this.setState({ datatable: [...datatable, data.data] });
    }
    if (data.status == true) {
      this.notify("Update medicine successfully");
      var index = await this.findIndex(data.data._id);
      console.log(index);
      datatable[index] = data.data;
      this.setState({ datatable: datatable });
    }
  };
  onDelete = async (id) => {
    const data = {
      secret_key: this.state.token,
      idMdc: id,
    };
    const result = await deleteMdc(data);
    console.log(result);

    if (result.status) {
      this.setState({
        datatable: this.state.datatable.filter((p) => p._id !== id),
      });
      this.notify("Delete mdc packageSize successfully");
    }
  };
  onConvert = (e, value) => {
    e.preventDefault();
    console.log(value);
    this.setState({
      checkConvert: true,
      idPackageSize: value._id,
      packageSize: value,
      size: value.quantity,
    });
  };
  onHandleConvert = async (e) => {
    e.preventDefault();
    const data = {
      idPackageSize: this.state.idPackageSize,
      quantity: this.state.quantity,
    };
    const result = await convertPackage(data);
    console.log(result);
    if (result.status == true) {
      const result = await getAllMdc();
      console.log(result);
      if (result != null) {
        this.setState({ datatable: result, isLoading: false });
      }
      this.notify("Convert successfully");
    }
  };
  onSubmitProp = async (data) => {
    var datatable = this.state.datatable;
    console.log(data);
    if (data.status == true) {
      this.notify("Update successfully");
      var index = await this.findIndex(data.result._id);
      console.log(index);
      datatable[index] = data.result;
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
    var { datatable, filterName, nameMedicine } = this.state;
    if (filterName) {
      datatable = datatable.filter((x) => {
        return x.packageSize.name.toLowerCase().indexOf(filterName) !== -1;
      });
    }
    if (nameMedicine) {
      datatable = datatable.filter((x) => {
        return x.medicine.name.toLowerCase().indexOf(nameMedicine) !== -1;
      });
    }
    return (
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Management Mdc PackageSize</h1>
          <ToastContainer />
          <div className="card mb-4">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th class="text-center">STT</th>
                  <th width="400" class="text-center" width="100px">
                    PackageSize Name
                  </th>
                  <th class="text-center" style={{ width: 100 }}>
                    Medicine Name
                  </th>
                  {/* <th class="text-center">IdCard</th> */}
                  <th class="text-center">Quantity</th>
                  <th width="400px" class="text-center">
                    Price
                  </th>
                  <th width="500px" class="text-center">
                    Status Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>
                    <input
                      type="text"
                      value={this.state.filterName}
                      onChange={(e) =>
                        this.setState({ filterName: e.target.value })
                      }
                      class="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={this.state.nameMedicine}
                      onChange={(e) =>
                        this.setState({ nameMedicine: e.target.value })
                      }
                      class="form-control"
                    />
                  </td>
                </tr>
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
                  datatable.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ width: "50px" }} class="text-right">
                          {index + 1}
                        </td>
                        <td class="text-right" style={{ width: 50 }}>
                          {value.packageSize.name}
                        </td>

                        <td class="text-right">{value.medicine.name}</td>
                        <td class="text-right">
                          <p> {value.quantity}</p>
                        </td>
                        <td class="text-right">
                          <p> {value.price} VNĐ</p>
                        </td>
                        {/* <td>{value.idCard}</td> */}

                        <td class="text-right">
                          {value.packageSize.name == "Hộp" ? (
                            <button
                              type="button"
                              style={{ width: 100 }}
                              class="btn btn-success"
                              onClick={(e) => this.onConvert(e, value)}
                            >
                              Convert
                            </button>
                          ) : null}
                          &nbsp;
                          <button
                            type="button"
                            style={{ width: 100 }}
                            class="btn btn-warning"
                            onClick={() => this.onUpdate(value._id)}
                          >
                            Edit
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
            {this.state.checkConvert ? (
              <div className="col-md-6">
                <p>(1 hộp - 50 viên)</p>
                <form onSubmit={(e) => this.onHandleConvert(e)}>
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Package Size Name:<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      readonly="readonly"
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="price"
                      value={this.state.packageSize.packageSize.name}
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      PMedicine Name:<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      readonly="readonly"
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="price"
                      value={this.state.packageSize.medicine.name}
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Quantity:<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="quantity"
                      value={this.state.quantity}
                      max={this.state.size}
                      min="1"
                      onChange={(e) =>
                        this.setState({ quantity: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <button
                      style={{ width: "90px" }}
                      type="submit"
                      class="btn btn-danger"
                      onClick={() => this.setState({ checkConvert: false })}
                    >
                      Cancel
                    </button>
                    &nbsp;
                    <button
                      style={{ width: "90px" }}
                      type="submit"
                      class="btn btn-success"
                      //   onClick={() => this.onSubmit()}
                    >
                      Convert
                    </button>
                  </div>
                </form>
              </div>
            ) : null}

            <MdcForm
              mdc={this.state.editing}
              onSubmit={this.onSubmit}
              onUpdate={this.onSubmitProp}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default index;
