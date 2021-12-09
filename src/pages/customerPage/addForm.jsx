import React, { Component } from "react";
import {
  createAccount,
  updateAccount,
  createCustomer,
} from "../../services/employee/employee.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class addForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fullName: "",
      phonenumber: "",
      address: "",
      gender: "",
      role: "customer",
      id: "",
      token: "",
    };
  }
  notify = (text) => toast.success(text);
  notifyErr = (text) => toast.error(text);
  componentWillReceiveProps = async (nextProps) => {
    console.log(nextProps.employee._id);
    if (nextProps && nextProps.employee._id != undefined) {
      const token = await localStorage.getItem("token");
      this.setState({ token: token });
      this.setState({
        email: nextProps.employee.email,
        fullName: nextProps.employee.fullName,
        phonenumber: nextProps.employee.phonenumber,
        address: nextProps.employee.address,
        id: nextProps.employee._id,
        gender: nextProps.employee.gender,
      });
    }
  };
  onClear = () => {
    this.setState({
      email: "",
      fullName: "",
      phonenumber: "",
      address: "",
      gender: "",
      id: "",
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    var { email, fullName, phonenumber, address, gender, role } = this.state;
    if (
      email === "" ||
      fullName === "" ||
      phonenumber === "" ||
      address === "" ||
      gender === ""
    ) {
      this.notifyErr("You need fill out information");
    } else {
      const result = await createCustomer(this.state);
      console.log(result);
      if (result.success == true) {
        this.props.onSubmit(result);
        this.onClear();
      } else if (result.success == false) {
        this.notifyErr("Email is existed");
      } else if (result.errors !== null) {
        this.notifyErr("Invalid");
      }
    }
  };
  onUpdate = async (e) => {
    e.preventDefault();
    var { email, fullName, phonenumber, address, gender, role } = this.state;
    if (
      email === "" ||
      fullName === "" ||
      phonenumber === "" ||
      address === "" ||
      gender === "" ||
      role === ""
    ) {
      this.notifyErr("You need fill out information");
    } else {
      const data = {
        secret_key: this.state.token,
        idAccount: this.state.id,
        fullName: this.state.fullName,
        phoneNumber: this.state.phonenumber,
        gender: this.state.gender,
        address: this.state.address,
      };
      const result = await updateAccount(data);
      console.log(result);
      if (result.status == true) {
        this.onClear();
        this.props.onSubmit(result);
      } else if (result.success == false) {
        this.notifyErr(result.messages);
      } else if (result.errors !== null) {
        this.notifyErr("Invalid");
      }
    }
  };
  render() {
    return (
      <div>
        <div className="card-header">
          <form
            onSubmit={(e) =>
              this.state.id === "" ? this.onSubmit(e) : this.onUpdate(e)
            }
          >
            <div className="row">
              <div className="col-md-6">
                {this.state.id === "" ? (
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Email address: <span style={{ color: "red" }}>*</span>
                    </label>
                    <p>(must has '@')</p>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="name@example.com"
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </div>
                ) : null}

                <div className="form-group">
                  <label for="exampleFormControlInput1">
                    Full name: <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="full name"
                    value={this.state.fullName}
                    onChange={(e) =>
                      this.setState({ fullName: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label for="exampleFormControlInput1">
                    Address: <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="address"
                    value={this.state.address}
                    onChange={(e) => this.setState({ address: e.target.value })}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label for="exampleFormControlInput1">
                    Phone number: <span style={{ color: "red" }}>*</span>
                  </label>
                  <p>(at least 9 characters)</p>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="phone number"
                    value={this.state.phonenumber}
                    onChange={(e) =>
                      this.setState({ phonenumber: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label for="exampleFormControlInput1">
                    Gender: <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    class="form-control"
                    aria-label="Default select example"
                    value={this.state.gender}
                    onChange={(e) => this.setState({ gender: e.target.value })}
                  >
                    <option selected>Open this select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
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
      </div>
    );
  }
}

export default addForm;
