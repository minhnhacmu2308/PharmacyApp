import React, { Component } from "react";
import CKEditor from "react-ckeditor-component";
import { getAll } from "../../services/groupMdc/groupMdc.service";
import { add } from "../../services/medicine/medicine.service";
import { ToastContainer, toast } from "react-toastify";

class medicineform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      origin: "",
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
  onUpdate = async () => {
    var { name, origin, description, idGroup } = this.state;
    if (name == "" || origin == "" || idGroup == "" || description == "") {
      this.notifyErr("You need fill out information");
    } else {
      const data = {
        name: this.state.name,
        description: this.state.description,
        idGroup: this.state.idGroup,
        origin: this.state.origin,
      };
    }
  };
  updateContent = (newContent) => {
    this.setState({
      description: newContent,
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
                {this.state.id === "" ? (
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
                ) : null}
                {this.state.id === "" ? (
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
                      onChange={(e) =>
                        this.setState({ origin: e.target.value })
                      }
                    />
                  </div>
                ) : null}
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
