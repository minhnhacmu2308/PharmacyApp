import React, { Component } from "react";
import { getAllInvoicesBuy } from "../../services/invoicesBuy/invoicesbuy.service.js";
import {
  getAllInvoices,
  getInvoicesSellMonth,
} from "../../services/invoicesSell/invoicessell.service.js";
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
    const listSell = await getAllInvoices();
    const listBuy = await getAllInvoicesBuy();
    const listMedicine = await getAllMedicine();
    const listEmployee = await getEmployee();
    const monthOne = await getInvoicesSellMonth(0, 2021);
    const monthTow = await getInvoicesSellMonth(1, 2021);
    const monthThree = await getInvoicesSellMonth(2, 2021);
    const monthFour = await getInvoicesSellMonth(3, 2021);
    const monthFive = await getInvoicesSellMonth(4, 2021);
    const monthSix = await getInvoicesSellMonth(5, 2021);
    const monthSeven = await getInvoicesSellMonth(6, 2021);
    const monthEight = await getInvoicesSellMonth(7, 2021);
    const monthNine = await getInvoicesSellMonth(8, 2021);
    const monthTen = await getInvoicesSellMonth(9, 2021);
    const monthEleven = await getInvoicesSellMonth(10, 2021);
    const monthTwelve = await getInvoicesSellMonth(11, 2021);
    console.log(monthOne);
    console.log(listEmployee);
    this.setState({
      token: token,
      numberSell: listSell.length,
      numberBuy: listBuy.length,
      numberMedicine: listMedicine.length,
      numberEmplyee: listEmployee.data.length,
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
        <h4 style={{ marginLeft: 20 }}>Statistical sell by month: </h4>
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
                label: "# of Sell",
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
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
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
