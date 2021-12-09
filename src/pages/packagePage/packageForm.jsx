import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { add, update } from "../../services/packageMdc/package.service";

class packageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      id: "",
      token: "",
    };
  }
  notify = (text) => toast.success(text);
  notifyErr = (text) => toast.error(text);
  componentWillReceiveProps = async (nextProps) => {
    console.log(nextProps.editing._id);
    if (nextProps && nextProps.editing._id != undefined) {
      const token = await localStorage.getItem("token");
      this.setState({ token: token });
      this.setState({
        name: nextProps.editing.name,
        id: nextProps.editing._id,
      });
    }
  };
  onClear = () => {
    this.setState({
      name: "",
      id: "",
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    var { name } = this.state;
    if (name === "") {
      this.notifyErr("You need fill out information");
    } else {
      const result = await add(this.state);
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
    var { name } = this.state;
    if (name === "") {
      this.notifyErr("You need fill out information");
    } else {
      const data = {
        secret_key: this.state.token,
        idPackage: this.state.id,
        name: this.state.name,
      };
      const result = await update(data);
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
              <div className="col-md-12">
                <div className="form-group">
                  <label for="exampleFormControlInput1">
                    Name:<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={(e) => this.setState({ name: e.target.value })}
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
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default packageForm;
