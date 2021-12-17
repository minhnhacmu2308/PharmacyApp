import React, { Component } from "react";
import jwt from "jwt-decode";
import {
  addDetail,
  add,
} from "../../services/invoicesBuy/invoicesbuy.service.js";
import { getAllMdc } from "../../services/mdcPackagingSize/mdcPackagingSize.service.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class invoicesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datePayment: "",
      discount: "",
      totalPayment: "",
      idEmployee: "",
      idPackageSize: "",
      quantity: "",
      price: "",
      id: "",
      token: "",
      listMdcPackage: [],
      information: {},
    };
  }
  componentDidMount = async () => {
    const listMdcPackage = await getAllMdc();
    this.setState({
      listMdcPackage: listMdcPackage,
    });
    const token = await localStorage.getItem("token");
    const user = jwt(token);
    this.setState({ information: user, token: token });
  };
  componentWillReceiveProps = async (nextProps) => {
    console.log(nextProps.editing._id);
    if (nextProps && nextProps.editing._id != undefined) {
      const token = await localStorage.getItem("token");
      this.setState({ token: token });
      this.setState({
        id: nextProps.editing._id,
        datePayment: nextProps.editing.datePayment,
        discount: nextProps.editing.discount,
      });
    }
  };
  notify = (text) => toast.success(text);
  notifyErr = (text) => toast.error(text);
  onClear = () => {
    this.setState({
      datePayment: "",
      discount: "",
      id: "",
      totalPayment: "",
      idPackageSize: "",
      quantity: "",
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    var { datePayment, discount } = this.state;
    if (datePayment == "" || discount == "") {
      this.notifyErr("You need fill out information");
    } else {
      const data = {
        idEmployee: this.state.information._id,
        datePayment: this.state.datePayment,
        discount: this.state.discount,
      };
      const result = await add(data);
      console.log(result);
      this.props.onSubmit(result);
    }
  };
  onAdđetail = async (e) => {
    e.preventDefault();
    var { datePayment, discount, idPackageSize, quantity } = this.state;
    if (idPackageSize == "" || idPackageSize == "" || quantity == "") {
      this.notifyErr("You need fill out information");
    } else {
      const data = {
        idInvoicesBuy: this.state.id,
        idPackageSize: this.state.idPackageSize,
        quantity: this.state.quantity,
        price: this.state.price,
      };
      const result = await addDetail(data);
      if (result.status === true) {
        this.notify("Add detail invoices buy successfully");
        this.props.onAdd(result);
      }
      console.log(result);
    }
  };
  render() {
    return (
      <div>
        <div className="card-header">
          {this.state.id === "" ? (
            <form
              onSubmit={(e) =>
                this.state.id === "" ? this.onSubmit(e) : this.onUpdate(e)
              }
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Date Payment: <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="name"
                      value={this.state.datePayment}
                      disable
                      onChange={(e) =>
                        this.setState({ datePayment: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Discount:<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Discount"
                      value={this.state.discount}
                      onChange={(e) =>
                        this.setState({ discount: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div class="modal-footer">
                  {this.state.id !== "" ? (
                    <button
                      style={{ width: "90px" }}
                      type="button"
                      class="btn btn-danger"
                      onClick={() => this.onClear()}
                    >
                      Cancel
                    </button>
                  ) : null}
                  {this.state.id === "" ? (
                    <button
                      style={{ width: "90px" }}
                      type="submit"
                      class="btn btn-success"
                      //   onClick={() => this.onSubmit()}
                    >
                      Create
                    </button>
                  ) : (
                    <button
                      style={{ width: "90px" }}
                      type="submit"
                      class="btn btn-success"
                      //   onClick={() => this.onSubmit()}
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </form>
          ) : (
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Date Payment: <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="name"
                      readonly="readonly"
                      value={this.state.datePayment}
                      onChange={(e) =>
                        this.setState({ datePayment: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Choose package size:
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="id card"
                      value={this.state.idPackageSize}
                      onChange={(e) =>
                        this.setState({ idPackageSize: e.target.value })
                      }
                    >
                      <option value="" default selected>
                        Choose package size
                      </option>
                      {this.state.listMdcPackage.map((value, index) => {
                        return (
                          <option value={value._id}>
                            {value.packageSize?.name} - {value.medicine?.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Quantity:<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Quantity"
                      value={this.state.quantity}
                      onChange={(e) =>
                        this.setState({ quantity: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Discount:<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Discount"
                      value={this.state.discount}
                      readonly="readonly"
                      onChange={(e) =>
                        this.setState({ discount: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Price:<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Price"
                      value={this.state.price}
                      onChange={(e) => this.setState({ price: e.target.value })}
                    />
                  </div>
                </div>

                <div class="modal-footer">
                  {this.state.id !== "" ? (
                    <button
                      style={{ width: "90px" }}
                      type="button"
                      class="btn btn-danger"
                      onClick={() => this.onClear()}
                    >
                      Cancel
                    </button>
                  ) : null}
                  {this.state.id === "" ? (
                    <button
                      style={{ width: "90px" }}
                      type="submit"
                      class="btn btn-success"
                      //   onClick={() => this.onSubmit()}
                    >
                      Create
                    </button>
                  ) : (
                    <button
                      style={{ width: "90px" }}
                      type="submit"
                      class="btn btn-success"
                      onClick={(e) => this.onAdđetail(e)}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default invoicesForm;
