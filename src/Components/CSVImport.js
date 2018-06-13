import React from "react";
import CSVReader from "react-csv-reader";
import { Segment } from "semantic-ui-react";

const baseUrl = "http://localhost:3000";

class CSVImport extends React.Component {
  uploadBudget = data => {
    fetch(`${baseUrl}/budgets`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        user_id: this.props.currentUser.id,
        balance: parseFloat(data[0][1]),
        month: data[1][1],
        year: data[2][1]
      })
    })
      .then(res => res.json())
      .then(json => this.uploadCategories(json, data));
  };

  uploadCategories = (json, data) => {
    let newData = data.slice(4);
    let names = [];
    let limits = [];
    for (let i = 0; i < newData.length; i += 3) {
      names.push(newData[i][1]);
    }
    for (let i = 1; i < newData.length; i += 3) {
      limits.push(newData[i][1]);
    }
    // debugger;
    let counter = 0;
    while (counter < names.length) {
      fetch(`${baseUrl}/categories`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          name: names[counter],
          limit: parseFloat(limits[counter]),
          budget_id: json.id
        })
      })
        .then(res => res.json())
        .then(json => console.log("New CAT", json));
      counter += 1;
    }
  };

  render() {
    return (
      <div style={{ paddingTop: 200 }}>
        <Segment className="container">
          <CSVReader
            cssClass="react-csv-input"
            label="Select CSV"
            onFileLoaded={this.uploadBudget}
          />
        </Segment>
      </div>
    );
  }
}

export default CSVImport;
