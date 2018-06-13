import React from "react";
import Chart from "chart.js";
import { Button, Form, Segment, Grid, Menu } from "semantic-ui-react";

class SpendingContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      colors: [
        "#EDC7B7",
        "#EEE2DC",
        "#BAB2B5",
        "#123C69",
        "#AC3B61",
        "#25274D",
        "#464866",
        "#AAABB8",
        "#2E9CCA",
        "#29648A",
        "#17252A",
        "#2B7A78",
        "#3AAFA9",
        "#DEF2F1"
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
      return `${cat.category}: $${cat.totalSpent}`;
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
      <Grid divided>
        <Grid.Column width={1} />
        <Grid.Column width={4} style={{ paddingTop: 100 }}>
          <Menu fluid vertical>
            <Menu.Header>
              <h1>Sort By</h1>
            </Menu.Header>

            <Menu.Menu>
              <h2>
                <Menu.Item name="Category" onClick={this.categoryView} />
                <Menu.Item name="Merchant" onClick={this.merchantView} />
              </h2>
            </Menu.Menu>
          </Menu>
        </Grid.Column>
        <Grid.Column width={10} style={{ paddingTop: 100 }}>
          <h1>Spending Breakdown</h1>
          <canvas id="myChart" />
        </Grid.Column>
        <Grid.Column width={1} />
      </Grid>
    );
  }
}

export default SpendingContainer;
