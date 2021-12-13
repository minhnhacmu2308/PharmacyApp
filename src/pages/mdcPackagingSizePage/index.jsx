import React, { Component } from "react";
import { Route, withRouter, Redirect, Link } from "react-router-dom";
import {
  getAll,
  deleteMdc,
  updatePrice,
  updateQuantity,
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
    };
  }

  componentDidMount = async () => {
    const token = await localStorage.getItem("token");
    const result = await getAll();
    console.log(result);
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
                        <td>{index + 1}</td>
                        <td style={{ width: 50 }}>{value.packageSize.name}</td>

                        <td>{value.medicine.name}</td>
                        <td>
                          <p> {value.quantity}</p>
                        </td>
                        <td>
                          <p> {value.price}</p>
                        </td>
                        {/* <td>{value.idCard}</td> */}

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
