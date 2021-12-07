import React, { Component } from "react";
import { Route, withRouter, Redirect, Link } from "react-router-dom";

class index extends Component {
  render() {
    return (
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Management Employee</h1>

          <div className="card mb-4">
            <div className="card-header">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">Email address:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlInput1">User name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="user name"
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlInput1">Full name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="full name"
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlInput1">Address:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="address"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="password"
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlInput1">ID Card:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="id card"
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlInput1">Phone number:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="phone number"
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary">
                    Save
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <table id="datatablesSimple">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
                <tbody>
                  <tr>
                    <td>Tiger Nixon</td>
                    <td>System Architect</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Update
                      </button>
                      <button type="button" className="btn btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default withRouter(index);
