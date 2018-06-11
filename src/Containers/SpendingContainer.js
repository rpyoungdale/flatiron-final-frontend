import React from "react";
import ReactChartkick, { LineChart, PieChart } from "react-chartkick";
import Chart from "chart.js";

ReactChartkick.addAdapter(Chart);

class SpendingContainer extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <PieChart
        download={true}
        data={[["Blueberry", 40], ["Strawberry", 60]]}
      />
    );
  }
}

export default SpendingContainer;
