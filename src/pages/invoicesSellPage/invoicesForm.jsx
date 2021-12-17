import React, { Component } from "react";
import jwt from "jwt-decode";
import {
  getAllInvoices,
  deleteInvoicesSell,
  add,
  addDetail,
  addPrescription,
} from "../../services/invoicesSell/invoicessell.service.js";
import { getAllMdc } from "../../services/mdcPackagingSize/mdcPackagingSize.service.js";
import { getCustomer } from "../../services/employee/employee.service.js";
import { getAll } from "../../services/prescription/prescription.service.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class invoicesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datePayment: "",
      voucherCode: "",
      totalPayment: "",
      idEmployee: "",
      idCustomer: "",
      idPackageSize: "",
      quantity: "",
      price: "",
      id: "",
      token: "",
      listMdcPackage: [],
      listCustomer: [],
      listPre: [],
      information: {},
      checkPrescription: "",
      idPrescription: "",
    };
  }
  componentDidMount = async () => {
    const listMdcPackage = await getAllMdc();
    const listCustomer = await getCustomer();
    const listPre = await getAll();
    console.log(listCustomer);
    this.setState({
      listMdcPackage: listMdcPackage,
      listCustomer: listCustomer.data,
      listPre: listPre,
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
        voucherCode: nextProps.editing.voucherCode,
      });
    }
  };
  notify = (text) => toast.success(text);
  notifyErr = (text) => toast.error(text);
  onClear = () => {
    this.setState({
      datePayment: "",
      voucherCode: "",
      id: "",
      totalPayment: "",
      idPackageSize: "",
      quantity: "",
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    var { datePayment, voucherCode } = this.state;
    if (datePayment == "" || voucherCode == "") {
      this.notifyErr("You need fill out information");
    } else {
      const data = {
        idEmployee: this.state.information._id,
        idCustomer: this.state.idCustomer,
        datePayment: this.state.datePayment,
        voucherCode: this.state.voucherCode,
      };
      const result = await add(data);
      console.log(result);
      this.props.onSubmit(result);
    }
  };
  onAdđetail = async (e) => {
    e.preventDefault();
    var { datePayment, voucherCode, idPackageSize, quantity } = this.state;
    if (idPackageSize == "" || idPackageSize == "" || quantity == "") {
      this.notifyErr("You need fill out information");
    } else {
      const data = {
        idInvoicesSell: this.state.id,
        idPackageSize: this.state.idPackageSize,
        quantity: this.state.quantity,
        price: this.state.price,
      };
      console.log(data);
      const result = await addDetail(data);
      if (result.status === true) {
        this.notify("Add detail invoices sell successfully");
        this.props.onAdd(result);
      }
      console.log(result);
    }
  };
  onAddPre = async (e) => {
    e.preventDefault();
    var { datePayment, voucherCode, idPrescription, quantity } = this.state;
    if (idPrescription == "") {
      this.notifyErr("You need fill out information");
    } else {
      const data = {
        idInvoicesSell: this.state.id,
        idPrescription: this.state.idPrescription,
      };
      console.log(data);
      const result = await addPrescription(data);
      if (result.status === true) {
        this.notify("Add Prescription successfully");
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
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Choose customer:
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Customer"
                      value={this.state.idCustomer}
                      onChange={(e) =>
                        this.setState({ idCustomer: e.target.value })
                      }
                    >
                      <option value="" default selected>
                        Choose customer
                      </option>
                      {this.state.listCustomer.map((value, index) => {
                        return (
                          <option key={index} value={value._id}>
                            {value.fullName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Voucher Code:<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Voucher Code"
                      value={this.state.voucherCode}
                      onChange={(e) =>
                        this.setState({ voucherCode: e.target.value })
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
                      Voucher Code:<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder=" Voucher Code"
                      value={this.state.voucherCode}
                      readonly="readonly"
                      onChange={(e) =>
                        this.setState({ voucherCode: e.target.value })
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
        {this.state.id !== "" ? (
          <h4 style={{ marginLeft: 10 }}>Add prescription</h4>
        ) : null}
        <div className="card-header">
          {this.state.id !== "" ? (
            <form
              onSubmit={(e) =>
                this.state.id === "" ? this.onSubmit(e) : this.onUpdate(e)
              }
            >
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Choose prescription:
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Customer"
                      value={this.state.idPrescription}
                      onChange={(e) =>
                        this.setState({ idPrescription: e.target.value })
                      }
                    >
                      <option value="" default selected>
                        Choose customer
                      </option>
                      {this.state.listPre.map((value, index) => {
                        return (
                          <option key={index} value={value._id}>
                            {value.medicines?.map((value1, index1) => {
                              return value1.name + " - ";
                            })}
                          </option>
                        );
                      })}
                    </select>
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
                      onClick={(e) => this.onAddPre(e)}
                    >
                      Add pre
                    </button>
                  )}
                </div>
              </div>
            </form>
          ) : null}
        </div>
      </div>
    );
  }
}

export default invoicesForm;
