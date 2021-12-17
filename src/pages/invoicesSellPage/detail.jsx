import React, { Component } from "react";
import { getInvoicesSell } from "../../services/invoicesSell/invoicessell.service.js";
import ReactLoading from "react-loading";
import { Route, withRouter, Redirect, Link } from "react-router-dom";

class detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount = async () => {
    console.log(this.props.match.params.id);
    const result = await getInvoicesSell(this.props.match.params.id);
    console.log(result);
    this.setState({ data: result });
  };
  render() {
    var { data } = this.state;
    return (
      <div className="" style={{ padding: 20 }}>
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
              <p>{data.datePayment}</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label for="exampleFormControlInput1">
                Total payment: <span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <p>{data.totalPayment}</p>
            </div>
            <div className="form-group">
              <label for="exampleFormControlInput1">
                Voucher Code: <span style={{ color: "red" }}>*</span>
              </label>
              <p>{data.voucherCode}</p>
            </div>
          </div>
          {data.detail?.length > 0 ? (
            <div className="col-md-12">
              <h3>List Medicine and Package Size</h3>
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
                            <td width="50">{value.price}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
          {data.list_recommend?.length > 0 ? (
            <div className="col-md-12">
              <h3>List Prescription</h3>
              <div className="card mb-4">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th class="text-center">STT</th>
                      <th class="text-center" width="100px">
                        Disease
                      </th>
                      <th class="text-center" style={{ width: 100 }}>
                        Smptom
                      </th>
                      <th class="text-center" style={{ width: 100 }}>
                        DosageMethod
                      </th>
                      <th class="text-center" style={{ width: 100 }}>
                        numberSold
                      </th>
                      <th class="text-center">List medicine</th>
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
                      data.list_recommend?.map((value, index) => {
                        return (
                          <tr key={index}>
                            <td width="50">{index + 1}</td>
                            <td width="200" style={{ width: 50 }}>
                              {value.disease}
                            </td>
                            <td style={{ width: 50 }}>{value.symptom}</td>
                            <td width="50">{value.dosageMethod}</td>
                            <td width="50">{value.numberSold}</td>
                            <td width="50">
                              {value.medicines.map((value1, index1) => {
                                return <p> - {value1.name}</p>;
                              })}
                            </td>
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
      </div>
    );
  }
}

export default detail;
