import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getAllMedicine } from "../../services/medicine/medicine.service";
import { add, update } from "../../services/prescription/prescription.service";

class prescriptionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symptom: "",
      dosageMethod: "",
      id: "",
      token: "",
      listMedicine: [],
    };
  }
//   componentDidMount = async () => {
//     const listMedicine = await getAllMedicine();
//     this.setState({
//         listMedicine: listMedicine,
//     });
//   };
  notify = (text) => toast.success(text);
  notifyErr = (text) => toast.error(text);
  componentWillReceiveProps = async (nextProps) => {
    console.log(nextProps.editing._id);
    if (nextProps && nextProps.editing._id != undefined) {
      const token = await localStorage.getItem("token");
      this.setState({ token: token });
      this.setState({
        description: nextProps.medicine.description,
        name: nextProps.medicine.name,
        origin: nextProps.medicine.origin,
        imageShow: nextProps.medicine.image,
        idGroup: nextProps.medicine.groupMedicines.idGroup,
        id: nextProps.medicine._id,
      });
    }
  };
  onClear = () => {
    this.setState({
      description: "",
      name: "",
      id: "",
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    var { name } = this.state;
    var { description } = this.state;
    if (name === "" || description === "") {
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
    var { description } = this.state;
    if (name === "" || description === "") {
      this.notifyErr("You need fill out information");
    } else {
      const data = {
        secret_key: this.state.token,
        idGroup: this.state.id,
        name: this.state.name,
        description: this.state.description,
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
                  Symptom:<span style={{ color: "red" }}>*</span>
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
                <div className="form-group">
                  <label for="exampleFormControlInput1">
                  Symptom:<span style={{ color: "red" }}>*</span>
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
                <div className="form-group">
                  <label for="exampleFormControlInput1">
                    Description:<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Description"
                    value={this.state.description}
                    onChange={(e) => this.setState({ description: e.target.value })}
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

export default prescriptionForm;
