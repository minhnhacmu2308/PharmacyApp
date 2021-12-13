import React, { Component } from "react";
import {
  getAllMedicine,
  deleteMedicine,
  getMedicine,
} from "../../services/medicine/medicine.service";

class detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount = async () => {
    console.log(this.props.match.params.id);
    const result = await getMedicine(this.props.match.params.id);
    console.log(result);
    this.setState({ data: result });
  };
  render() {
    var { data } = this.state;

    return (
      <div>
        <div className="" style={{ padding: 20 }}>
          <h1 className="mt-4">Detail medicine: {data.name} </h1>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label for="exampleFormControlInput1">
                  Name: <span style={{ color: "red" }}>*</span>
                </label>
                <p>{data.name}</p>
              </div>

              <div className="form-group">
                <label for="exampleFormControlInput1">
                  Origin:<span style={{ color: "red" }}>*</span>
                </label>
                <p>{data.origin}</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label for="exampleFormControlInput1">
                  Image: <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <img src={data.image} width="150" height="150" />
              </div>
              <div className="form-group">
                <label for="exampleFormControlInput1">
                  Name group: <span style={{ color: "red" }}>*</span>
                </label>
                <p>{data.groupMedicines?.name}</p>
              </div>
            </div>

            <div className="col-md-12">
              <label for="exampleFormControlInput1">
                Desciption: <span style={{ color: "red" }}>*</span>
              </label>
              <div dangerouslySetInnerHTML={{ __html: data.description }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default detail;
