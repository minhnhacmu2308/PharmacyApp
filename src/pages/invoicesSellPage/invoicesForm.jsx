import React, { Component } from "react";
import jwt from "jwt-decode";
import {
  getAllInvoices,
  deleteInvoicesSell,
  add,
  add1,
  addDetail,
  addPrescription,
} from "../../services/invoicesSell/invoicessell.service.js";
import { getAllMdc } from "../../services/mdcPackagingSize/mdcPackagingSize.service.js";
import { getCustomer } from "../../services/employee/employee.service.js";
import { getAll } from "../../services/prescription/prescription.service.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CKEditor from "react-ckeditor-component";
import ReactLoading from "react-loading";

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
      nameCustomer: "",
      symptom: "",
      dosageMethod: "",
      numberSold: 0,
      disease: "",
      datatable1: [],
      filterName: "",
      nameMedicine: "",
      arr1: [],
      note: "",
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
      datatable1: listPre,
    });
    const token = await localStorage.getItem("token");
    const user = jwt(token);
    this.setState({ information: user, token: token });
  };
  componentWillReceiveProps = async (nextProps) => {
    console.log(nextProps.editing);
    if (nextProps && nextProps.editing._id != undefined) {
      const token = await localStorage.getItem("token");
      this.setState({ token: token });
      this.setState({
        id: nextProps.editing._id,
        datePayment: nextProps.editing.datePayment,
        voucherCode: nextProps.editing.voucherCode,
        nameCustomer: nextProps.editing.customer?.name,
        price: nextProps.editing.price,
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
    var { datePayment, voucherCode, arr1, note } = this.state;
    if (datePayment == "" || note == "" || arr1.length == 0) {
      this.notifyErr("You need fill out information");
    } else {
      const data = {
        idEmployee: this.state.information._id,
        idCustomer: this.state.idCustomer,
        datePayment: this.state.datePayment,
        voucherCode: this.state.voucherCode,
        arrPackages: this.state.arr1,
        note: this.state.note,
      };
      console.log(data);
      const result = await add1(data);
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
      } else if (result.status === false) {
        this.notifyErr(result.mes);
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

  onAdd1 = async (e, value) => {
    e.preventDefault();
    let obj = true;
    for (let i = 0; i < this.state.arr1.length; i++) {
      if (this.state.arr1[i]._id === value._id) {
        obj = false;
        this.state.arr1[i].quantity = this.state.arr1[i].quantity + 1;
      }
    }
    console.log(obj);
    if (obj) {
      console.log(value);
      value.quantity = 1;
      await this.state.arr1.push(value);
    }
    this.setState({ arr1: this.state.arr1 });
    console.log(this.state.arr1);
  };
  onChange = (evt) => {
    var newContent = evt.editor.getData();
    this.setState({
      note: newContent,
    });
  };
  onBlur(evt) {
    console.log("onBlur event called with event info: ", evt);
  }

  afterPaste(evt) {
    console.log("afterPaste event called with event info: ", evt);
  }
  updateContent = (newContent) => {
    this.setState({
      description: newContent,
    });
  };
  onDelete1 = async (e, id) => {
    e.preventDefault();
    this.setState({
      arr1: this.state.arr1.filter((p) => p._id !== id),
    });
  };

  onAdd2 = async (e, value) => {
    e.preventDefault();

    let obj = true;

    for (let i = 0; i < value.medicines.length; i++) {
      for (let j = 0; j < this.state.arr1.length; j++) {
        if (this.state.arr1[j]._id === value.medicines[i]?.mdcPackageSize._id) {
          obj = false;
          this.state.arr1[j].quantity = this.state.arr1[j]?.quantity + 1;
        }
      }
      if (obj) {
        var noteString = this.state.note + value.dosageMethod + ",";
        this.setState({ note: noteString });
        value.medicines[i].mdcPackageSize.quantity = 1;
        await this.state.arr1.push(value.medicines[i]?.mdcPackageSize);
      }
    }
    this.setState({ arr1: this.state.arr1 });
    console.log(this.state.arr1);
  };

  render() {
    var { datatable1 } = this.state;
    var { datatable, disease, symptom, dosageMethod } = this.state;
    if (disease) {
      datatable1 = datatable1.filter((x) => {
        return x.disease.toLowerCase().indexOf(disease) !== -1;
      });
    }
    if (symptom) {
      datatable1 = datatable1.filter((x) => {
        return x.symptom.toLowerCase().indexOf(symptom) !== -1;
      });
    }
    if (dosageMethod) {
      datatable1 = datatable1.filter((x) => {
        return x.dosageMethod.toLowerCase().indexOf(dosageMethod) !== -1;
      });
    }
    var { listMdcPackage, filterName, nameMedicine } = this.state;
    if (filterName) {
      listMdcPackage = listMdcPackage.filter((x) => {
        return x.packageSize.name.toLowerCase().indexOf(filterName) !== -1;
      });
    }
    if (nameMedicine) {
      listMdcPackage = listMdcPackage.filter((x) => {
        return x.medicine.name.toLowerCase().indexOf(nameMedicine) !== -1;
      });
    }
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
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Note:<span style={{ color: "red" }}>*</span>
                    </label>
                    <CKEditor
                      activeClass="editor"
                      content={this.state.note}
                      events={{
                        blur: this.onBlur,
                        afterPaste: this.afterPaste,
                        change: this.onChange,
                      }}
                    />
                  </div>
                </div>
                <div className="card mb-4">
                  <h5>List package size choosed</h5>
                  {this.state.arr1.length == 0 ? (
                    <p style={{ color: "red" }}>List is blank</p>
                  ) : (
                    <table class="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th class="text-center">STT</th>
                          <th style={{ width: 350 }} class="text-center">
                            PackageSize Name
                          </th>
                          <th style={{ width: 350 }} class="text-center">
                            Medicine Name
                          </th>
                          {/* <th class="text-center">IdCard</th> */}
                          <th style={{ width: 100 }} class="text-center">
                            Quantity
                          </th>
                          <th style={{ width: 100 }} class="text-center">
                            Price
                          </th>
                          <th style={{ width: 100 }} class="text-center">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.arr1.map((value, index) => {
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
                                <button
                                  type="button"
                                  style={{ width: 100 }}
                                  class="btn btn-danger"
                                  onClick={(e) => this.onDelete1(e, value._id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
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
                      // onClick={() => this.onSubmit()}
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
                <div className="card mb-4">
                  <h5>List package size</h5>
                  <table class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th class="text-center">STT</th>
                        <th style={{ width: 350 }} class="text-center">
                          PackageSize Name
                        </th>
                        <th style={{ width: 350 }} class="text-center">
                          Medicine Name
                        </th>
                        {/* <th class="text-center">IdCard</th> */}
                        <th style={{ width: 100 }} class="text-center">
                          Price
                        </th>
                        <th style={{ width: 100 }} class="text-center">
                          Action
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
                      {listMdcPackage.map((value, index) => {
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
                              <p> {value.price} VNĐ</p>
                            </td>
                            {/* <td>{value.idCard}</td> */}

                            <td class="text-right">
                              <button
                                type="button"
                                style={{ width: 100 }}
                                class="btn btn-success"
                                onClick={(e) => this.onAdd1(e, value)}
                              >
                                Add
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="card mb-4">
                  <h4 style={{ marginLeft: 10 }}>List prescription</h4>
                  <table class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th style={{ width: 50 }} class="text-center">
                          STT
                        </th>
                        <th class="text-center" width="100px">
                          Disease
                        </th>
                        <th class="text-center" width="100px">
                          Symptom
                        </th>
                        <th class="text-center" width="100px">
                          DosageMethod
                        </th>
                        <th class="text-center" width="300px">
                          List Medicines Package Size
                        </th>
                        <th class="text-center" style={{ width: 100 }}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>
                          <input
                            type="text"
                            value={this.state.disease}
                            onChange={(e) =>
                              this.setState({ disease: e.target.value })
                            }
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={this.state.symptom}
                            onChange={(e) =>
                              this.setState({ symptom: e.target.value })
                            }
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={this.state.dosageMethod}
                            onChange={(e) =>
                              this.setState({ dosageMethod: e.target.value })
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
                              height={"10%"}
                              width={"10%"}
                            />
                          </div>
                        </tr>
                      ) : (
                        datatable1.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td style={{ width: 10 }}>{index + 1}</td>
                              <td style={{ width: 50 }}>{value.disease}</td>
                              <td style={{ width: 50 }}>{value.symptom}</td>
                              <td style={{ width: 150 }}>
                                {value.dosageMethod}
                              </td>
                              <td>
                                {value.medicines?.map((item) => {
                                  return (
                                    <p>
                                      {item.mdcPackageSize?.medicine?.name} -
                                      {item.mdcPackageSize?.packageSize?.name}{" "}
                                      {/* (SL:
                                      {item.quantity}) */}
                                    </p>
                                  );
                                })}
                              </td>
                              <td class="text-right">
                                <button
                                  type="button"
                                  style={{ width: 100 }}
                                  class="btn btn-success"
                                  onClick={(e) => this.onAdd2(e, value)}
                                >
                                  Add
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
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
                      Customer <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text    "
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="name"
                      readonly="readonly"
                      value={this.state.nameCustomer}
                      onChange={(e) =>
                        this.setState({ nameCustomer: e.target.value })
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
          <div className="card mb-4">
            <h4 style={{ marginLeft: 10 }}>Add prescription</h4>
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th style={{ width: 50 }} class="text-center">
                    STT
                  </th>
                  <th class="text-center" width="100px">
                    Disease
                  </th>
                  <th class="text-center" width="100px">
                    Symptom
                  </th>
                  <th class="text-center" width="100px">
                    DosageMethod
                  </th>
                  <th class="text-center" width="300px">
                    List Medicines Package Size
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>
                    <input
                      type="text"
                      value={this.state.disease}
                      onChange={(e) =>
                        this.setState({ disease: e.target.value })
                      }
                      class="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={this.state.symptom}
                      onChange={(e) =>
                        this.setState({ symptom: e.target.value })
                      }
                      class="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={this.state.dosageMethod}
                      onChange={(e) =>
                        this.setState({ dosageMethod: e.target.value })
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
                        height={"10%"}
                        width={"10%"}
                      />
                    </div>
                  </tr>
                ) : (
                  datatable1.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ width: 10 }}>{index + 1}</td>
                        <td style={{ width: 50 }}>{value.disease}</td>
                        <td style={{ width: 50 }}>{value.symptom}</td>
                        <td style={{ width: 150 }}>{value.dosageMethod}</td>
                        <td>
                          {value.medicines?.map((item) => {
                            return (
                              <p>
                                {item.mdcPackageSize?.medicine?.name} -
                                {item.mdcPackageSize?.packageSize?.name} (SL:
                                {item.quantity})
                              </p>
                            );
                          })}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
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
                      placeholder="Prescription"
                      value={this.state.idPrescription}
                      onChange={(e) =>
                        this.setState({ idPrescription: e.target.value })
                      }
                    >
                      <option value="" default selected>
                        Choose prescription
                      </option>
                      {this.state.listPre.map((value, index) => {
                        return (
                          <option key={index} value={value._id}>
                            {value.disease} - {value.symptom} -
                            {value.dosageMethod}
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
