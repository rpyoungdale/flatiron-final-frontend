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
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Menu vertical fluid>
            <Menu.Item>
              <Menu.Header>Trends</Menu.Header>

              <Menu.Menu>
                <Menu.Item name="savings" onClick={this.handleSavingsClick} />
                <Menu.Item name="consumer" onClick={this.handleItemClick} />
              </Menu.Menu>
            </Menu.Item>
          </Menu>
        </Grid.Column>
        <SavingsChart
          currentUser={this.props.currentUser}
          updateYear={this.updateYear}
          chosenYear={this.state.chosenYear}
          uploaded={this.props.uploaded}
        />
        <Grid.Column width={1} />
      </Grid>
    );
  }
}

export default TrendsContainer;
