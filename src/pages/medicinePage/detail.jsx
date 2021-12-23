import React, { Component } from "react";
import {
  getAllMedicine,
  deleteMedicine,
  getMedicine,
} from "../../services/medicine/medicine.service";

import {
  getMdcByIdMedicine,
  convertPackage,
} from "../../services/mdcPackagingSize/mdcPackagingSize.service";
import { getAll } from "../../services/packageMdc/package.service";
import ReactLoading from "react-loading";
import { Route, withRouter, Redirect, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      mdc: [],
      check: false,
      listPackage: [],
      idMedicine: "",
      idPackage1: "",
      idPackage2: "",
      quantity: "",
      data1: [],
    };
  }
  componentDidMount = async () => {
    console.log(this.props.match.params.id);
    const result = await getMedicine(this.props.match.params.id);
    const data = {
      idMedicine: this.props.match.params.id,
    };
    const result1 = await getMdcByIdMedicine(data);
    console.log(result1);
    const listPackage = await getAll();
    this.setState({
      data: result,
      mdc: result1,
      listPackage: listPackage,
      idMedicine: this.props.match.params.id,
    });
    console.log(this.state.data);
    for (var i = 0; i < this.state.mdc.length; i++) {
      for (var j = 0; j < this.state.listPackage.length; j++) {
        if (
          this.state.listPackage[j]._id ==
          this.state.mdc[i].packageSize?.idPackage
        ) {
          this.state.data1.push(this.state.listPackage[j]);
        }
      }
    }
    console.log(this.state.data1);
  };
  notify = (text) => toast.success(text);
  notifyErr = (text) => toast.error(text);
  onChangeConvert = (e) => {
    e.preventDefault();
    this.setState({
      check: !this.state.check,
    });
  };

  onClear = () => {
    this.setState({
      idMedicine: "",
      idPackage1: "",
      idPackage2: "",
      quantity: "",
    });
  };

  onSubmit = async (e) => {
    const { idPackage1, idPackage2, quantity } = this.state;
    e.preventDefault();
    const data = {
      idMedicine: this.state.idMedicine,
      idPackage1: this.state.idPackage1,
      idPackage2: this.state.idPackage2,
      quantity: this.state.quantity,
    };
    console.log(data);
    if (idPackage1 == "" || idPackage2 == "" || quantity == "") {
      this.notifyErr("You need fill out information");
    } else {
      const result = await convertPackage(data);
      if (result.status === true) {
        const result1 = await getMdcByIdMedicine(data);
        this.setState({
          mdc: result1,
        });
        this.notify("Convert  successfully");
      }
      console.log(result);
    }
  };
  render() {
    var { data } = this.state;

    return (
      <div>
        <div className="" style={{ padding: 20 }}>
          <ToastContainer />
          <h1 className="mt-4">Detail medicine: {data.name} </h1>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label for="exampleFormControlInput1">
                  Name: <span style={{ color: "red" }}>*</span>
                </label>
                <p>{data.name}</p>
              </div>

              <div className="form-group">
                <label for="exampleFormControlInput1">
                  Origin:<span style={{ color: "red" }}>*</span>
                </label>
                <p>{data.origin}</p>
              </div>
              <div className="form-group">
                <label for="exampleFormControlInput1">
                  Mdc package size:<span style={{ color: "red" }}>*</span>
                </label>
                {this.state.mdc.map((value, index) => {
                  return (
                    <p key={index}>
                      {value.packageSize?.name} ( SL : {value.quantity} )
                    </p>
                  );
                })}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label for="exampleFormControlInput1">
                  Image: <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <img src={data.image} width="150" height="150" />
              </div>
              <div className="form-group">
                <label for="exampleFormControlInput1">
                  Name group: <span style={{ color: "red" }}>*</span>
                </label>
                <p>{data.groupMedicines?.name}</p>
              </div>
            </div>
            <button
              type="button"
              style={{ width: 100, marginLeft: 20, marginBottom: 10 }}
              class="btn btn-success"
              onClick={(e) => this.onChangeConvert(e)}
            >
              Convert
            </button>

            {this.state.check ? (
              <div className="card-header">
                <form onSubmit={(e) => this.onSubmit(e)}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label for="exampleFormControlInput1">
                          Choose package from:
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder=" Choose package from"
                          value={this.state.idPackage1}
                          onChange={(e) =>
                            this.setState({ idPackage1: e.target.value })
                          }
                        >
                          <option value="" default selected>
                            Choose package from
                          </option>
                          {this.state.data1.map((value, index) => {
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
                          Choose package to:
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder=" Choose package to"
                          value={this.state.idPackage2}
                          onChange={(e) =>
                            this.setState({ idPackage2: e.target.value })
                          }
                        >
                          <option value="" default selected>
                            Choose package to
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
                    </div>

                    <div class="modal-footer">
                      <button
                        style={{ width: "90px" }}
                        type="button"
                        class="btn btn-danger"
                        onClick={(e) => this.onChangeConvert(e)}
                      >
                        Cancel
                      </button>

                      <button
                        style={{ width: "90px" }}
                        type="submit"
                        class="btn btn-success"
                        //   onClick={() => this.onSubmit()}
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : null}

            <div className="col-md-12">
              <label for="exampleFormControlInput1">
                Desciption: <span style={{ color: "red" }}>*</span>
              </label>
              <div dangerouslySetInnerHTML={{ __html: data.description }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default detail;
