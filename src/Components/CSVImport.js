import React from "react";
import CSVReader from "react-csv-reader";
import { Segment } from "semantic-ui-react";
import { CSVLink, CSVDownload } from "react-csv";

const baseUrl = "http://localhost:3000";

class CSVImport extends React.Component {
  state = {
    uploaded: false
  };

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
      .then(budgetJson => this.uploadCategories(budgetJson, data));
  };

  uploadCategories = (budgetJson, data) => {
    let newData = data.slice(4);
    let names = []; //['Groceries', 'Bars', 'Entertainment', 'Rent']
    let limits = []; //['200', '50', '70', '800']
    let spent = [];
    for (let i = 0; i < newData.length; i += 4) {
      names.push(newData[i][1]);
    }
    // debugger;
    for (let i = 1; i < newData.length; i += 4) {
      limits.push(newData[i][1]);
    }
    for (let i = 2; i < newData.length; i += 4) {
      spent.push(newData[i][1]);
    }

    // debugger;
    let counter = 0;
    let secondCounter = 2;
    // debugger;
    while (counter < names.length) {
      console.log("counter", counter);
      console.log("top of loop", secondCounter);
      // debugger;
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
          budget_id: budgetJson.id,
          amount: parseFloat(spent[counter])
        })
      })
        .then(res => res.json())
        .then((counter += 1));
    }
    this.setState({
      uploaded: true
    });
  };

  uploadTransaction = (categoryJson, newData, secondCounter) => {
    debugger;
  };

  render() {
    const prettyLink = {
      backgroundColor: "#8dc63f",
      fontSize: 14,
      fontWeight: 500,
      height: 52,
      padding: "0 48px",
      borderRadius: 5,
      color: "#fff"
    };
    const data = [
      ["Balance", ""],
      ["Month", ""],
      ["Year", ""],
      ["Category 1", ""],
      ["Name", ""],
      ["Spending Limit", ""],
      ["Amount Spent", ""],
      ["Category 2", ""],
      ["Name", ""],
      ["Spending Limit", ""],
      ["Amount Spent", ""],
      ["Category 3", ""],
      ["Name", ""],
      ["Spending Limit", ""],
      ["Amount Spent", ""],
      ["Category 4", ""],
      ["Name", ""],
      ["Spending Limit", ""],
      ["Amount Spent", ""],
      ["Category 5", ""],
      ["Name", ""],
      ["Spending Limit", ""],
      ["Amount Spent", ""]
    ];
    return (
      <div style={{ paddingTop: 200 }}>
        <Segment className="container">
          <CSVReader
            cssClass="react-csv-input"
            label="Select CSV"
            onFileLoaded={this.uploadBudget}
          />
          {this.state.uploaded ? <h2>Imported Successfully!</h2> : null}
        </Segment>
        <Segment>
          Download{" "}
          <CSVLink data={data} style={prettyLink}>
            CSV ⬇
          </CSVLink>{" "}
          to download CSV Template
        </Segment>
      </div>
    );
  }
}

export default CSVImport;

// .then(categoryJson => {
//   let totalSpent = parseFloat(newData[secondCounter][1]);
//   debugger;
//   fetch(`${baseUrl}/transactions`, {
//     method: "POST",
//     body: JSON.stringify({
//       merchant: null,
//       amount: totalSpent,
//       category_id: categoryJson.id
//     }),
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("token")}`
//     }
//   })
//     .then(res => res.json())
//     .then(json => {
//       debugger;
//       console.log("new transaction", json);
//     });

// counter += 1;
// secondCounter += 4;

// console.log("before upload", secondCounter);
// this.uploadTransaction(categoryJson, newData, secondCounter);
// console.log("After upload", secondCounter);
// })

// .then((secondCounter += 4));

// debugger;