import React, { Component } from "react";
import { Route, withRouter, Redirect, Link } from "react-router-dom";
import {
  getAllMedicine,
  deleteMedicine,
  getMedicine,
} from "../../services/medicine/medicine.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MedicineForm from "./medicineform";
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
    };
  }

  componentDidMount = async () => {
    const token = await localStorage.getItem("token");
    const result = await getAllMedicine();
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
      this.notify("Update medicine  successfully");
      var index = await this.findIndex(data.data._id);
      console.log(index);
      datatable[index] = data.data;
      this.setState({ datatable: datatable });
    }
  };
  onEdit = async (data) => {
    var datatable = this.state.datatable;
    this.notify("Update medicine employee successfully");
    var index = await this.findIndex(data._id);
    console.log(index);
    datatable[index] = data;
    this.setState({ datatable: datatable });
  };
  onDelete = async (id) => {
    const data = {
      secret_key: this.state.token,
      idMedicine: id,
    };
    const result = await deleteMedicine(data);
    console.log(result);

    if (result.status) {
      this.setState({
        datatable: this.state.datatable.filter((p) => p._id !== id),
      });
      this.notify("Delete medicine successfully");
    }
  };
  onDetail = async (id) => {
    const result = await getMedicine(id);
    console.log(result);
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
    return (
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Management Medicine</h1>
          <ToastContainer />
          <div className="card mb-4">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th class="text-right">STT</th>
                  <th class="text-right" width="100px">
                    Name
                  </th>
                  <th class="text-right" style={{ width: 100 }}>
                    Image
                  </th>
                  {/* <th class="text-center">IdCard</th> */}
                  <th class="text-right">origin</th>
                  <th width="400px" class="text-right">
                    GroupMedicines Name
                  </th>
                  <th width="400px" class="text-right">
                    Detail
                  </th>
                  <th width="500px" class="text-center">
                    Status Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <td></td>
                  <td>
                    <input type="text" class="form-control" />
                  </td>
                  <td>
                    <select class="form-control">
                      <option value="-1">Tất Cả</option>
                      <option value="0">Ẩn</option>
                      <option value="1">Kích Hoạt</option>
                    </select>
                  </td>
                  <td></td>
                </tr> */}
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
                  this.state.datatable.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ width: "50px" }} class="text-right">
                          {index + 1}
                        </td>
                        <td class="text-right" style={{ width: 500 }}>
                          {value.name}
                        </td>
                        <td class="text-right">
                          <img width="150" height="150" src={value.image} />
                        </td>

                        <td class="text-right">{value.origin}</td>
                        <td class="text-right">{value.groupMedicines.name}</td>
                        <td style={{ width: 40 }} class="text-right">
                          <Link to={`/detail-medicine/${value._id}`}>
                            Detail
                          </Link>
                        </td>
                        {/* <td>{value.idCard}</td> */}

                        <td class="text-right">
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
            <MedicineForm
              medicine={this.state.editing}
              onSubmit={this.onSubmit}
              onEdit={this.onEdit}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default index;
