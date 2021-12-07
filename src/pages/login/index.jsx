import React, { Component } from "react";
import { postLogin } from "../../services/authentication/authentication.service";
import { Route, withRouter, Redirect } from "react-router-dom";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      notice: "",
    };
  }
  componentDidMount = async () => {};
  onSubmit = async () => {
    const data = {
      userName: this.state.userName,
      password: this.state.password,
    };
    const result = await postLogin(data);
    if (result.success) {
      localStorage.setItem("token", result.data.secret_key);
      this.props.history.push("/");
    } else {
      console.log(result);
      this.setState({
        notice: result.errors.message,
      });
      if (result.errors.message != null) {
        this.setState({
          notice: result.errors.message,
        });
      } else if (result.errors.password.message != null) {
        this.setState({
          notice: result.errors.password.message,
        });
      } else {
        this.setState({
          notice: result.errors.userName.message,
        });
      }
    }
  };
  render() {
    var loginUser = localStorage.getItem("token");
    if (loginUser !== null) {
      return <Redirect to="/" />;
    }
    return (
      <body className="bg-primary">
        <div id="layoutAuthentication">
          <div id="layoutAuthentication_content">
            <main>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-5">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                      <div className="card-header">
                        <h3 className="text-center font-weight-light my-4">
                          Login
                        </h3>
                      </div>
                      <div className="card-body">
                        <form>
                          <div className="form-floating mb-3">
                            <input
                              className="form-control"
                              id="inputEmail"
                              type="text"
                              placeholder="user name"
                              value={this.state.userName}
                              onChange={(event) =>
                                this.setState({ userName: event.target.value })
                              }
                            />
                            <label for="inputEmail">User name</label>
                          </div>
                          <div className="form-floating mb-3">
                            <input
                              className="form-control"
                              id="inputPassword"
                              type="password"
                              placeholder="Password"
                              value={this.state.password}
                              onChange={(event) =>
                                this.setState({ password: event.target.value })
                              }
                            />
                            <label for="inputPassword">Password</label>
                          </div>
                          <p style={{ color: "red" }}>{this.state.notice}</p>
                          <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                            <a className="small" href="password.html">
                              Forgot Password?
                            </a>
                            <p
                              onClick={() => this.onSubmit()}
                              className="btn btn-primary"
                              href="index.html"
                            >
                              Login
                            </p>
                          </div>
                        </form>
                      </div>
                      <div className="card-footer text-center py-3">
                        <div className="small">
                          <a href="register.html">Need an account? Sign up!</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
          <div id="layoutAuthentication_footer">
            <footer className="py-4 bg-light mt-auto">
              <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                  <div className="text-muted">
                    Copyright &copy; Your Website 2021
                  </div>
                  <div>
                    <a href="#">Privacy Policy</a>
                    &middot;
                    <a href="#">Terms &amp; Conditions</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </body>
    );
  }
}

export default withRouter(login);
