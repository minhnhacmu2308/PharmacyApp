import React, { Component } from "react";
import {
  getInvoicesBuy,
  confirmBuy,
} from "../../services/invoicesBuy/invoicesbuy.service.js";
import ReactLoading from "react-loading";
import { Route, withRouter, Redirect, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      id: "",
    };
  }
  componentDidMount = async () => {
    console.log(this.props.match.params.id);
    const result = await getInvoicesBuy(this.props.match.params.id);
    console.log(result);
    this.setState({ data: result, id: this.props.match.params.id });
  };
  notify = (text) => toast.success(text);
  notifyErr = (text) => toast.error(text);
  onConfirm = async (e) => {
    e.preventDefault();
    const data = {
      idInvoicesBuy: this.props.match.params.id,
    };
    const result = await confirmBuy(data);
    this.notify("Confirm  successfully");
    const result1 = await getInvoicesBuy(this.state.id);
    console.log(result);
    this.setState({ data: result1 });
  };
  render() {
    var { data } = this.state;
    return (
      <div className="" style={{ padding: 20 }}>
        <ToastContainer />
        <h1 className="mt-4">Detail Invoices Buy</h1>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label for="exampleFormControlInput1">
                Name Employee: <span style={{ color: "red" }}>*</span>
              </label>
              <p>{data.employee?.name}</p>
            </div>

            <div className="form-group">
              <label for="exampleFormControlInput1">
                Date payment:<span style={{ color: "red" }}>*</span>
              </label>
              <p>{new Date(data.datePayment).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label for="exampleFormControlInput1">
                Total payment: <span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <p>{data.totalPayment} VN??</p>
            </div>
            <div className="form-group">
              <label for="exampleFormControlInput1">
                Discount: <span style={{ color: "red" }}>*</span>
              </label>
              <p>{data.discount} %</p>
            </div>
          </div>
          {data.detail?.length > 0 ? (
            <div className="col-md-12">
              <div className="card mb-4">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th class="text-center">STT</th>
                      <th class="text-center" width="100px">
                        Package Size
                      </th>
                      <th class="text-center" style={{ width: 100 }}>
                        Medicine Name
                      </th>
                      {/* <th class="text-center">IdCard</th> */}
                      <th class="text-center">Quantity</th>
                      <th width="400px" class="text-center">
                        Price
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
                            height={"70%"}
                            width={"70%"}
                          />
                        </div>
                      </tr>
                    ) : (
                      data.detail?.map((value, index) => {
                        return (
                          <tr key={index}>
                            <td width="50">{index + 1}</td>
                            <td width="200" style={{ width: 50 }}>
                              {value.packageSize?.name}
                            </td>
                            <td style={{ width: 50 }}>
                              {value.medicine?.name}
                            </td>

                            <td width="50">{value.quantity}</td>
                            <td width="50">{value.price} VN??</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
        {data.status == 0 ? (
          <button
            type="button"
            style={{ width: 100 }}
            class="btn btn-success"
            onClick={(e) => this.onConfirm(e)}
          >
            Completed
          </button>
        ) : null}
      </div>
    );
  }
}

export default detail;
