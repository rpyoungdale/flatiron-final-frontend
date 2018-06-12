import React from "react";
import Chart from "chart.js";
import { Button, Form, Segment, Grid, Menu } from "semantic-ui-react";

class SpendingContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      colors: ["#EDC7B7", "#EEE2DC", "#BAB2B5", "#123C69", "#AC3B61"],
      labels: [],
      data: [],
      ctx: ""
    };
  }

  componentDidMount() {
    console.log("doughnut", this.props);
    var ctx = document.getElementById("myChart").getContext("2d");
    let labels = this.props.categorySpendingBreakdown.map(cat => {
      return `${cat.category}: $${cat.totalSpent}`;
    });
    // let data = this.props.currentUser.budget.transactions.

    this.setState({
      labels: labels,
      ctx: ctx
    });
  }

  render() {
    // debugger;

    var chart = new Chart(this.state.ctx, {
      // The type of chart we want to create
      type: "doughnut",

      // The data for our dataset
      data: {
        labels: this.state.labels,
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: this.state.colors,
            borderColor: "rgb(255, 255, 255)",
            data: [7, 10, 5, 2, 20]
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
        <Grid.Column width={4}>
          <Menu fluid vertical>
            <Menu.Header>Products</Menu.Header>

            <Menu.Menu>
              <Menu.Item name="enterprise" onClick={this.handleItemClick} />
              <Menu.Item name="consumer" onClick={this.handleItemClick} />
            </Menu.Menu>
          </Menu>
        </Grid.Column>
        <Grid.Column width={10}>
          <canvas id="myChart" />
        </Grid.Column>
        <Grid.Column width={1} />
      </Grid>
    );
  }
}

export default SpendingContainer;
