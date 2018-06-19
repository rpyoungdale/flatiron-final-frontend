import React from "react";
import SavingsChart from "../Components/SavingsChart";
import { Segment, Grid, Menu } from "semantic-ui-react";

class TrendsContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      chosenYear: "",
      savingsChart: true
    };
  }

  handleSavingsClick = () => {
    this.setState({
      savingsChart: true
    });
  };

  updateYear = e => {
    this.setState({
      chosenYear: e.target.innerText
    });
  };

  render() {
    console.log("trends", this.state);
    return (
      <Grid style={{ paddingTop: 100 }}>
        <Grid.Column width={2} />

        <SavingsChart
          currentUser={this.props.currentUser}
          updateYear={this.updateYear}
          chosenYear={this.state.chosenYear}
          uploaded={this.props.uploaded}
        />
        <Grid.Column width={2} />
      </Grid>
    );
  }
}
// <Menu vertical fluid>
// <Menu.Item>
//   <Menu.Header>Trends</Menu.Header>
//
//   <Menu.Menu>
//     <Menu.Item name="savings" onClick={this.handleSavingsClick} />
//   </Menu.Menu>
// </Menu.Item>
// </Menu>

export default TrendsContainer;
