import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getAllMedicine } from "../../services/medicine/medicine.service";
import { getAllMdc } from "../../services/mdcPackagingSize/mdcPackagingSize.service";
import {
  add,
  update,
  addDetailPrescription,
} from "../../services/prescription/prescription.service";

class prescriptionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symptom: "",
      dosageMethod: "",
      numberSold: 0,
      disease: "",
      id: "",
      token: "",
      listMedicine: [],
      idMedicine: [],
      quantity: "",
    };
  }
  componentDidMount = async () => {
    const listMedicine = await getAllMdc();
    console.log("dsds", listMedicine);
    this.setState({
      listMedicine: listMedicine,
    });
  };
  notify = (text) => toast.success(text);
  notifyErr = (text) => toast.error(text);
  componentWillReceiveProps = async (nextProps) => {
    console.log(nextProps.editing._id);
    if (nextProps && nextProps.editing._id != undefined) {
      const token = await localStorage.getItem("token");
      console.log(nextProps.editing);
      this.setState({ token: token });
      this.setState({
        symptom: nextProps.editing.symptom,
        disease: nextProps.editing.disease,
        dosageMethod: nextProps.editing.dosageMethod,
        idMedicine: nextProps.editing.medicines,
        id: nextProps.editing._id,
      });
    }
  };
  onClear = () => {
    this.setState({
      symptom: "",
      dosageMethod: "",
      disease: "",
      idMedicine: [],
      id: "",
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    var { dosageMethod, symptom, disease, idMedicine } = this.state;
    if (dosageMethod === "" || symptom === "" || disease === "") {
      this.notifyErr("You need fill out information");
    } else {
      const data = {
        disease: this.state.disease,
        symptom: this.state.symptom,
        numberSold: this.state.numberSold,
        dosageMethod: this.state.dosageMethod,
        status: 1,
        medicines: this.state.idMedicine,
      };
      console.log(data);
      const result = await add(data);
      console.log(result);
      if (result.success == true) {
        this.props.onSubmit(result);
        this.onClear();
      } else if (result.success == false) {
        this.notifyErr("Name is existed");
      } else if (result.errors !== null) {
        this.notifyErr("Invalid");
      }
    }
  };
  onUpdate = async (e) => {
    e.preventDefault();
    var { dosageMethod, symptom, disease, idMedicine } = this.state;
    if (
      dosageMethod === "" ||
      symptom === "" ||
      disease === "" ||
      idMedicine === ""
    ) {
      this.notifyErr("You need fill out information");
    } else {
      const data = {
        idPre: this.state.id,
        idPackageSize: this.state.idMedicine,
        quantity: this.state.quantity,
      };
      const result = await addDetailPrescription(data);
      console.log("Dsds", result);
      if (result.status === true) {
        this.notify("Add medicine package size successfully");
        this.props.onAdd(result);
      }
      // this.props.onSubmit(result);
    }
  };
  handleChange = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    console.log(value);
    this.setState({ idMedicine: value });
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
              {this.state.id === "" ? (
                <div className="col-md-12">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Disease:<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Disease"
                      value={this.state.disease}
                      onChange={(e) =>
                        this.setState({ disease: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Symptom:<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Symptom"
                      value={this.state.symptom}
                      onChange={(e) =>
                        this.setState({ symptom: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      DosageMethod:<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Symptom"
                      value={this.state.dosageMethod}
                      onChange={(e) =>
                        this.setState({ dosageMethod: e.target.value })
                      }
                    />
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
              ) : (
                <div className="col-md-12">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Disease:<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Disease"
                      readonly="readonly"
                      value={this.state.disease}
                      onChange={(e) =>
                        this.setState({ disease: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Symptom:<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Symptom"
                      readonly="readonly"
                      value={this.state.symptom}
                      onChange={(e) =>
                        this.setState({ symptom: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      DosageMethod:<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Symptom"
                      readonly="readonly"
                      value={this.state.dosageMethod}
                      onChange={(e) =>
                        this.setState({ symptom: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Choose medicine:
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Customer"
                      value={this.state.idMedicine}
                      onChange={(e) =>
                        this.setState({ idMedicine: e.target.value })
                      }
                    >
                      <option value="" default selected>
                        Choose medicine
                      </option>
                      {this.state.listMedicine?.map((value, index) => {
                        return (
                          <option key={index} value={value._id}>
                            {value.medicine?.name} - {value.packageSize?.name}
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
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Quantity"
                      value={this.state.quantity}
                      onChange={(e) =>
                        this.setState({ quantity: e.target.value })
                      }
                    />
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
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default prescriptionForm;
