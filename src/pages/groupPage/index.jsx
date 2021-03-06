import React, { Component } from "react";
import { Route, withRouter, Redirect, Link } from "react-router-dom";
import { getAll, deleteGroup } from "../../services/groupMdc/groupMdc.service";
import PackageForm from "./groupForm";
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
      this.notify("Add group mdc successfully");
      this.setState({ datatable: [...datatable, data.data] });
    }
    if (data.status == true) {
      this.notify("Update group successfully");
      var index = await this.findIndex(data.data._id);
      console.log(index);
      datatable[index] = data.data;
      this.setState({ datatable: datatable });
    }
  };
  onDelete = async (id) => {
    const data = {
      secret_key: this.state.token,
      idGroup: id,
    };
    const result = await deleteGroup(data);
    console.log(result);

    if (result.status) {
      this.setState({
        datatable: this.state.datatable.filter((p) => p._id !== id),
      });
      this.notify("Delete group successfully");
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
    return (
      <div>
        <main>
          <div className="container-fluid px-4">
            <h1 className="mt-4">Management Group Mdc</h1>
            <ToastContainer />
            <div className="card mb-4">
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th width="50px" class="text-right">
                      STT
                    </th>
                    <th class="text-right" width="100px">
                      Name
                    </th>
                    <th class="text-right" width="100px">
                      Description
                    </th>
                    <th width="10px" class="text-right">
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
                      <option value="-1">T???t C???</option>
                      <option value="0">???n</option>
                      <option value="1">K??ch Ho???t</option>
                    </select>
                  </td>
                  <td></td>
                </tr> */}
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
                    this.state.datatable.map((value, index) => {
                      return (
                        <tr key={index}>
                          <td
                            class="text-right"
                            width="10px"
                            style={{ width: 50 }}
                          >
                            {index + 1}
                          </td>
                          <td class="text-right" style={{ width: 50 }}>
                            {value.name}
                          </td>
                          <td class="text-right" style={{ width: 150 }}>
                            {value.description}
                          </td>

                          <td class="text-right">
                            <button
                              type="button"
                              style={{ width: 100 }}
                              class="btn btn-warning"
                              onClick={() => this.onUpdate(value._id)}
                            >
                              Edit
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
              <PackageForm
                editing={this.state.editing}
                onSubmit={this.onSubmit}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default withRouter(index);
