import React, { Component } from "react";
import { getAllInvoicesBuy } from "../../services/invoicesBuy/invoicesbuy.service.js";
import {
  getAllInvoices,
  getInvoicesBuyMonth,
} from "../../services/invoicesBuy/invoicesbuy.service.js";
import { getAllMedicine } from "../../services/medicine/medicine.service";
import { getEmployee } from "../../services/employee/employee.service";
import { Bar } from "react-chartjs-2";

class statiscalSellPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      numberBuy: "",
      numberSell: "",
      numberMedicine: "",
      numberEmplyee: "",
      one: "",
      tow: "",
      three: "",
      four: "",
      five: "",
      six: "",
      seven: "",
      eight: "",
      nine: "",
      ten: "",
      eleven: "",
      twelve: "",
    };
  }
  componentDidMount = async () => {
    const token = await localStorage.getItem("token");
    const monthOne = await getInvoicesBuyMonth(0, 2021);
    const monthTow = await getInvoicesBuyMonth(1, 2021);
    const monthThree = await getInvoicesBuyMonth(2, 2021);
    const monthFour = await getInvoicesBuyMonth(3, 2021);
    const monthFive = await getInvoicesBuyMonth(4, 2021);
    const monthSix = await getInvoicesBuyMonth(5, 2021);
    const monthSeven = await getInvoicesBuyMonth(6, 2021);
    const monthEight = await getInvoicesBuyMonth(7, 2021);
    const monthNine = await getInvoicesBuyMonth(8, 2021);
    const monthTen = await getInvoicesBuyMonth(9, 2021);
    const monthEleven = await getInvoicesBuyMonth(10, 2021);
    const monthTwelve = await getInvoicesBuyMonth(11, 2021);
    this.setState({
      token: token,
      one: monthOne.length,
      tow: monthTow.length,
      three: monthThree.length,
      four: monthFour.length,
      five: monthFive.length,
      six: monthSix.length,
      seven: monthSeven.length,
      eight: monthEight.length,
      nine: monthNine.length,
      ten: monthTen.length,
      eleven: monthEleven.length,
      twelve: monthTwelve.length,
    });
  };
  render() {
    return (
      <div>
        <h4 style={{ marginLeft: 20 }}>Statistical buy by month: </h4>
        <Bar
          width={400}
          height={150}
          data={{
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            datasets: [
              {
                label: "# of Buy",
                data: [
                  this.state.one,
                  this.state.two,
                  this.state.three,
                  this.state.four,
                  this.state.five,
                  this.state.six,
                  this.state.seven,
                  this.state.eight,
                  this.state.nine,
                  this.state.ten,
                  this.state.eleven,
                  this.state.twelve,
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    );
  }
}

export default statiscalSellPage;
