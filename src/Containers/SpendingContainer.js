import React from "react";
import Chart from "chart.js";
import { Button, Form, Segment, Grid, Menu } from "semantic-ui-react";

class SpendingContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      colors: [
        "#E74C3C",
        "#8E44AD",
        "#3498DB",
        "#27AE60",
        "#F1C40F",
        "#E67E22",
        "#FFFF00",
        "#008000",
        "#0000FF",
        "#FF00FF",
        "#48C9B0",
        "#AF7AC5",
        "#3AAFA9"
      ],
      categoryLabels: [],
      merchantLabels: [],
      data: [],
      ctx: "",
      categoryView: true
    };
  }

  componentDidMount() {
    console.log("doughnut", this.props);
    var ctx = document.getElementById("myChart").getContext("2d");
    let categoryLabels = this.props.categorySpendingBreakdown.map(cat => {
      return `${cat.category}: $${this.numberWithCommas(
        parseFloat(cat.totalSpent).toFixed(2)
      )}`;
    });
    let merchantLabels = this.props.merchantSpendingBreakdown.map(merchant => {
      return `${merchant.merchant}: $${merchant.totalSpent}`;
    });
    let categoryData = this.props.categorySpendingBreakdown.map(cat => {
      return cat.totalSpent;
    });
    let merchantData = this.props.merchantSpendingBreakdown.map(merchant => {
      return merchant.totalSpent;
    });

    this.setState({
      categoryLabels: categoryLabels,
      merchantLabels: merchantLabels,
      categoryData: categoryData,
      merchantData: merchantData,
      ctx: ctx
    });
  }

  categoryView = () => {
    this.setState({
      categoryView: true
    });
  };

  merchantView = () => {
    this.setState({
      categoryView: false
    });
  };

  numberWithCommas = x => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  render() {
    // debugger;
    this.state.categoryView
      ? new Chart(this.state.ctx, {
          type: "doughnut",
          data: {
            labels: this.state.categoryLabels,
            datasets: [
              {
                label: "My First dataset",
                backgroundColor: this.state.colors,
                borderColor: "rgb(255, 255, 255)",
                data: this.state.categoryData
              }
            ]
          },
          options: {
            legend: {
              position: "left",
              display: true
            },
            cutoutPercentage: 60,
            animation: {
              animateScale: true
            },
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var total = dataset.data.reduce(function(
                    previousValue,
                    currentValue,
                    currentIndex,
                    array
                  ) {
                    return previousValue + currentValue;
                  });
                  var currentValue = dataset.data[tooltipItem.index];
                  var percentage = Math.floor(currentValue / total * 100 + 0.5);
                  return percentage + "%";
                }
              }
            }
          }
        })
      : new Chart(this.state.ctx, {
          type: "doughnut",
          data: {
            labels: this.state.merchantLabels,
            datasets: [
              {
                label: "My First dataset",
                backgroundColor: this.state.colors,
                borderColor: "rgb(255, 255, 255)",
                data: this.state.merchantData
              }
            ]
          },
          options: {
            legend: {
              position: "left"
            },
            cutoutPercentage: 60,
            animation: {
              animateScale: true
            },
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var total = dataset.data.reduce(function(
                    previousValue,
                    currentValue,
                    currentIndex,
                    array
                  ) {
                    return previousValue + currentValue;
                  });
                  var currentValue = dataset.data[tooltipItem.index];
                  var percentage = Math.floor(currentValue / total * 100 + 0.5);
                  return percentage + "%";
                }
              }
            }
          }
        });
    return (
      <Grid>
        <Grid.Column width={1} />
        <Grid.Column width={3} style={{ paddingTop: 100 }}>
          <Menu fluid vertical>
            <Menu.Menu>
              <h1>
                <Menu.Item name="Category" onClick={this.categoryView} />
                <Menu.Item name="Merchant" onClick={this.merchantView} />
              </h1>

              <p>*Merchant not available for CSV import</p>
            </Menu.Menu>
          </Menu>
        </Grid.Column>
        <Grid.Column width={11} style={{ paddingTop: 100 }}>
          <Segment>
            <h2>Spending Breakdown</h2>
          </Segment>
          <Segment>
            <Segment>
              <canvas id="myChart" />
            </Segment>
          </Segment>
        </Grid.Column>
        <Grid.Column width={1} />
      </Grid>
    );
  }
}

export default SpendingContainer;
