import React, { Component } from "react";
import { Route, withRouter, Redirect, Link } from "react-router-dom";
import {
  getAll,
  deletePrescription,
} from "../../services/prescription/prescription.service";

import PackageForm from "./prescriptionForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      listMedicine: [],
      symptom: "",
      dosageMethod: "",
      numberSold: 0,
      disease: "",
    };
  }
  componentDidMount = async () => {
    const token = await localStorage.getItem("token");
    const result = await getAll();
    console.log("a", result);

    if (result != null) {
      this.setState({
        datatable: result,
        isLoading: false,
      });
    }
    this.setState({ token: token });
  };
  notify = (text) => toast.success(text);
  notifyErr = (text) => toast.error(text);
  onSubmit = async (data) => {
    var datatable = this.state.datatable;
    console.log(data);
    if (data.success == true) {
      this.notify("Add prescription successfully");
      this.setState({ datatable: [...datatable, data.data] });
    }
    if (data.status == true) {
      this.notify("Update prescription successfully");
      var index = await this.findIndex(data.data._id);
      console.log(index);
      datatable[index] = data.data;
      this.setState({ datatable: datatable });
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

  onDelete = async (id) => {
    const data = {
      secret_key: this.state.token,
      idPre: id,
    };
    const result = await deletePrescription(data);
    console.log(result);

    if (result.status) {
      this.setState({
        datatable: this.state.datatable.filter((p) => p._id !== id),
      });
      this.notify("Delete Prescription successfully");
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
  handleClose = () => {
    this.setState({ show: !this.state.show });
  };
  render() {
    var { datatable, disease, symptom, dosageMethod } = this.state;
    if (disease) {
      datatable = datatable.filter((x) => {
        return x.disease.toLowerCase().indexOf(disease) !== -1;
      });
    }
    if (symptom) {
      datatable = datatable.filter((x) => {
        return x.symptom.toLowerCase().indexOf(symptom) !== -1;
      });
    }
    if (dosageMethod) {
      datatable = datatable.filter((x) => {
        return x.dosageMethod.toLowerCase().indexOf(dosageMethod) !== -1;
      });
    }
    return (
      <div>
        <main>
          <div className="container-fluid px-4">
            <h1 className="mt-4">Management Prescription</h1>
            <ToastContainer />
            <div className="card mb-4">
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th class="text-center">STT</th>
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

                    <th width="250px" class="text-center">
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
                    datatable.map((value, index) => {
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
                          <td class="text-center">
                            <button
                              type="button"
                              style={{ width: 100 }}
                              class="btn btn-success"
                              onClick={() => this.onUpdate(value._id)}
                            >
                              Add
                            </button>

                            <button
                              onClick={() => this.onLock(value._id)}
                              type="button"
                              class="btn btn-danger"
                              style={{ width: 100, marginLeft: 10 }}
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
              {
                <PackageForm
                  editing={this.state.editing}
                  onSubmit={this.onSubmit}
                  onAdd={this.onAdd}
                />
              }
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default withRouter(index);
