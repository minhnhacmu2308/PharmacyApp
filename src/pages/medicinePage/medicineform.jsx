import React, { Component } from "react";
import CKEditor from "react-ckeditor-component";
import { getAll } from "../../services/groupMdc/groupMdc.service";
import { add, update } from "../../services/medicine/medicine.service";
import { ToastContainer, toast } from "react-toastify";

class medicineform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      origin: "",
      imageShow: "",
      description: "",
      idGroup: "",
      id: "",
      token: "",
      listGroup: [],
    };
  }
  componentDidMount = async () => {
    const listGroup = await getAll();
    this.setState({
      listGroup: listGroup,
    });
  };
  componentWillReceiveProps = async (nextProps) => {
    console.log(nextProps.medicine._id);
    if (nextProps && nextProps.medicine._id != undefined) {
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
  notify = (text) => toast.success(text);
  notifyErr = (text) => toast.error(text);
  onSubmit = async (e) => {
    e.preventDefault();
    var { name, origin, description, idGroup } = this.state;
    if (name === "" || origin === "" || idGroup === "" || description === "") {
      this.notifyErr("You need fill out information");
    } else {
      const formData = new FormData();
      formData.append("image", this.state.image);
      formData.append("origin", this.state.origin);
      formData.append("description", this.state.description);
      formData.append("name", this.state.name);
      formData.append("idGroup", this.state.idGroup);
      console.log(formData);
      const result = await add(formData);
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
  onUpdate = async (e) => {
    e.preventDefault();
    var { name, origin, description, idGroup } = this.state;
    if (name == "" || origin == "" || idGroup == "" || description == "") {
      this.notifyErr("You need fill out information");
    } else {
      const formData = new FormData();
      formData.append("image", this.state.image);
      formData.append("idMedicine", this.state.id);
      formData.append("origin", this.state.origin);
      formData.append("secret_key", this.state.token);
      formData.append("description", this.state.description);
      formData.append("name", this.state.name);
      formData.append("idGroup", this.state.idGroup);
      const result = await update(formData);
      console.log(result);
      if (result.status == true) {
        this.onClear();
        this.props.onEdit(result);
      } else if (result.success == false) {
        this.notifyErr(result.messages);
      } else if (result.errors !== null) {
        this.notifyErr("Invalid");
      }
    }
  };
  updateContent = (newContent) => {
    this.setState({
      description: newContent,
    });
  };
  onClear = () => {
    this.setState({
      description: "",
      name: "",
      id: "",
      origin: "",
      idGroup: "",
      imageShow: "",
    });
  };
  onChange = (evt) => {
    var newContent = evt.editor.getData();
    this.setState({
      description: newContent,
    });
  };
  onBlur(evt) {
    console.log("onBlur event called with event info: ", evt);
  }

  afterPaste(evt) {
    console.log("afterPaste event called with event info: ", evt);
  }
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
                <div className="form-group">
                  <label for="exampleFormControlInput1">
                    Name: <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name"
                    value={this.state.name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label for="exampleFormControlInput1">
                    Origin:<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="origin"
                    value={this.state.origin}
                    onChange={(e) => this.setState({ origin: e.target.value })}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label for="exampleFormControlInput1">
                    Image: <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="password"
                    name="file"
                    onChange={(e) =>
                      this.setState({ image: e.target.files[0] })
                    }
                  />
                  {this.state.imageShow != "" ? (
                    <img
                      style={{ marginTop: 10 }}
                      src={this.state.imageShow}
                      width="100"
                      height="100"
                    />
                  ) : null}
                </div>

                <div className="form-group">
                  <label for="exampleFormControlInput1">
                    Name group: <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="id card"
                    value={this.state.idGroup}
                    onChange={(e) => this.setState({ idGroup: e.target.value })}
                  >
                    <option value="" default selected>
                      Choose group
                    </option>
                    {this.state.listGroup.map((value, index) => {
                      return <option value={value._id}>{value.name}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <label for="exampleFormControlInput1">
                  Desciption: <span style={{ color: "red" }}>*</span>
                </label>
                <CKEditor
                  activeClass="editor"
                  content={this.state.description}
                  events={{
                    blur: this.onBlur,
                    afterPaste: this.afterPaste,
                    change: this.onChange,
                  }}
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
          </form>
        </div>
      </div>
    );
  }
}

export default medicineform;
