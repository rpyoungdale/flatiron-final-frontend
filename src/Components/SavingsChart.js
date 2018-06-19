import React from "react";
import Chart from "chart.js";
// import { Line } from "chart.js";
import { Segment, Grid, Dropdown } from "semantic-ui-react";

class SavingsChart extends React.Component {
  constructor() {
    super();

    this.state = {
      ctx: "",
      month: "",
      year: "",
      data: [],
      years: [
        { key: 2018, value: "2018", text: "2018" },
        { key: 2017, value: "2017", text: "2017" },
        { key: 2016, value: "2016", text: "2016" },
        { key: 2015, value: "2015", text: "2015" },
        { key: 2014, value: "2014", text: "2014" },
        { key: 2013, value: "2013", text: "2013" },
        { key: 2012, value: "2012", text: "2012" },
        { key: 2011, value: "2011", text: "2011" },
        { key: 2010, value: "2010", text: "2010" }
      ]
    };
  }

  componentDidMount() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var ctx = document.getElementById("mySavingsChart").getContext("2d");

    let matchingYearBudgets = this.props.currentUser.budgets.filter(budget => {
      // debugger;
      return parseInt(budget.year) === year;
    });

    // debugger;

    let months = [];

    matchingYearBudgets.forEach(budget => {
      months.push(budget.month);
    });

    let allMonths = [
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
      "December"
    ];

    const numberWithCommas = x => {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    };

    let sortedBudgets = matchingYearBudgets.sort(function(a, b) {
      return allMonths.indexOf(a.month) > allMonths.indexOf(b.month);
    });

    let data = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ];

    sortedBudgets.map(budget => {
      let transactionsTotal = 0;
      budget.transactions.forEach(trans => {
        transactionsTotal += parseFloat(trans.amount);
      });
      data[allMonths.indexOf(budget.month)] = parseFloat(
        (parseFloat(budget.balance) - transactionsTotal).toFixed(2)
      );
    });

    // debugger;

    this.setState({
      ctx: ctx,
      month: `${month}`,
      year: year,
      data: data
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.chosenYear !== this.props.chosenYear ||
      prevProps.uploaded !== this.props.uploaded
    ) {
      var ctx = document.getElementById("mySavingsChart").getContext("2d");

      let matchingYearBudgets = this.props.currentUser.budgets.filter(
        budget => {
          return parseInt(budget.year) === parseInt(this.props.chosenYear);
        }
      );

      let months = [];

      matchingYearBudgets.forEach(budget => {
        months.push(budget.month);
      });

      let allMonths = [
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
        "December"
      ];

      const numberWithCommas = x => {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      };

      let sortedBudgets = matchingYearBudgets.sort(function(a, b) {
        return allMonths.indexOf(a.month) > allMonths.indexOf(b.month);
      });

      let data = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ];

      // debugger;

      sortedBudgets.map(budget => {
        let transactionsTotal = 0;
        budget.transactions.forEach(trans => {
          transactionsTotal += parseFloat(trans.amount);
        });
        data[allMonths.indexOf(budget.month)] = parseFloat(
          (parseFloat(budget.balance) - transactionsTotal).toFixed(2)
        );
      });

      // debugger;
      this.setState({
        ctx: ctx,
        year: this.props.chosenYear,
        data: data
      });
    }
  }

  render() {
    console.log("lineChartProps", this.props);

    new Chart(this.state.ctx, {
      type: "line",
      data: {
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
          "December"
        ],
        datasets: [
          {
            label: `${this.state.year} Savings`,
            data: this.state.data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1,
            tension: 0.3
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
    return (
      // <Line />
      <Grid.Column width={12}>
        <Segment>
          <h2>Savings over time</h2>
        </Segment>
        <Segment>
          <Dropdown
            button
            floating
            labeled
            placeholder="Select Year"
            scrolling
            options={this.state.years}
            onChange={this.props.updateYear}
            value={this.state.chosenYear}
          />
          <canvas id="mySavingsChart" />
        </Segment>
      </Grid.Column>
    );
  }
}

export default SavingsChart;
