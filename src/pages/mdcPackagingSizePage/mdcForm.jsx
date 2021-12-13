import React, { Component } from "react";
import CKEditor from "react-ckeditor-component";
import { getAll } from "../../services/packageMdc/package.service.js";
import { getAllMedicine } from "../../services/medicine/medicine.service.js";
import {
  add,
  updatePrice,
  updateQuantity,
} from "../../services/mdcPackagingSize/mdcPackagingSize.service.js";
import { ToastContainer, toast } from "react-toastify";

class mdcForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idPackage: "",
      idMedicine: "",
      quantity: "",
      price: "",
      nameMedicine: "",
      namePackage: "",
      id: "",
      token: "",
      listPackage: [],
      listMedicine: [],
    };
  }
  componentDidMount = async () => {
    const listPackage = await getAll();
    const listMedicine = await getAllMedicine();
    const token = await localStorage.getItem("token");
    this.setState({
      listPackage: listPackage,
      listMedicine: listMedicine,
      token: token,
    });
  };
  notify = (text) => toast.success(text);
  notifyErr = (text) => toast.error(text);
  componentWillReceiveProps = async (nextProps) => {
    if (nextProps && nextProps.mdc._id != undefined) {
      const token = await localStorage.getItem("token");
      this.setState({ token: token });
      this.setState({
        quantity: nextProps.mdc.quantity,
        price: nextProps.mdc.price,
        namePackage: nextProps.mdc.packageSize.name,
        nameMedicine: nextProps.mdc.medicine.name,
        id: nextProps.mdc._id,
      });
    }
  };
  onSubmit = async (e) => {
    e.preventDefault();
    var { idPackage, idMedicine, quantity, price } = this.state;
    if (
      idPackage === "" ||
      idMedicine === "" ||
      quantity === "" ||
      price === ""
    ) {
      this.notifyErr("You need fill out information");
    } else {
      const data = {
        idPackage: this.state.idPackage,
        idMedicine: this.state.idMedicine,
        quantity: this.state.quantity,
        price: this.state.price,
      };
      const result = await add(data);
      console.log(result);
      if (result.success == true) {
        this.props.onSubmit(result);
      } else if (result.success == false) {
        this.notifyErr("Name is existed");
      } else if (result.errors !== null) {
        this.notifyErr("Invalid");
      }
    }
  };
  onClear = () => {
    this.setState({
      idPackage: "",
      idMedicine: "",
      id: "",
      quantity: "",
      price: "",
    });
  };
  onUpdateQuantity = async (e) => {
    e.preventDefault();
    const data = {
      secret_key: this.state.token,
      idMdc: this.state.id,
      quantity: this.state.quantity,
    };
    const result = await updateQuantity(data);
    console.log(result);
    this.onClear();
    this.props.onUpdate(result);
  };

  onUpdatePrice = async (e) => {
    e.preventDefault();
    const data = {
      secret_key: this.state.token,
      idMdc: this.state.id,
      price: this.state.price,
    };
    const result = await updatePrice(data);
    console.log(result);
    this.onClear();
    this.props.onUpdate(result);
  };
  render() {
    return (
      <div>
        {this.state.id == "" ? (
          <div className="card-header">
            <form onSubmit={(e) => this.onSubmit(e)}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Quantity: <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="quantity"
                      value={this.state.quantity}
                      onChange={(e) =>
                        this.setState({ quantity: e.target.value })
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
                      placeholder="price"
                      value={this.state.price}
                      onChange={(e) => this.setState({ price: e.target.value })}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Name medicine: <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="id card"
                      value={this.state.idMedicine}
                      onChange={(e) =>
                        this.setState({ idMedicine: e.target.value })
                      }
                    >
                      <option value="" default selected>
                        Choose medicine
                      </option>
                      {this.state.listMedicine.map((value, index) => {
                        return (
                          <option key={index} value={value._id}>
                            {value.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Name package: <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="id card"
                      value={this.state.idPackage}
                      onChange={(e) =>
                        this.setState({ idPackage: e.target.value })
                      }
                    >
                      <option value="" default selected>
                        Choose package
                      </option>
                      {this.state.listPackage.map((value, index) => {
                        return (
                          <option key={index} value={value._id}>
                            {value.name}
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
                      Add
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
          </div>
        ) : (
          <div className="card-header">
            <div className="row">
              <div className="col-md-6">
                <form onSubmit={(e) => this.onUpdateQuantity(e)}>
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Medidcine Name:<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      readonly="readonly"
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="price"
                      value={this.state.nameMedicine}
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Quantity: <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="quantity"
                      value={this.state.quantity}
                      onChange={(e) =>
                        this.setState({ quantity: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <button
                      style={{ width: "90px" }}
                      type="submit"
                      class="btn btn-success"
                      //   onClick={() => this.onSubmit()}
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>

              <div className="col-md-6">
                <form onSubmit={(e) => this.onUpdatePrice(e)}>
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Package Name:<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      readonly="readonly"
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="price"
                      value={this.state.namePackage}
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
                      placeholder="price"
                      value={this.state.price}
                      onChange={(e) => this.setState({ price: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      style={{ width: "90px" }}
                      type="submit"
                      class="btn btn-success"
                      //   onClick={() => this.onSubmit()}
                    >
                      Update
                    </button>
                  </div>
                </form>
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
                    Add
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default mdcForm;
