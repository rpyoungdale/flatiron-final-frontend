import React from "react";
import { Segment, Button } from "semantic-ui-react";
const baseUrl = "http://localhost:3000";

class Transactions extends React.Component {
  killTransaction = trans => {
    fetch(`${baseUrl}/transactions/${trans.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(() => this.props.deleteTrans());
  };
  render() {
    return (
      <div>
        {this.props.transactions.map(trans => {
          // debugger;
          return (
            <div>
              <h3>
                {trans.merchant} ${trans.amount}
              </h3>
              <Button onClick={() => this.killTransaction(trans)}>
                Delete
              </Button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Transactions;
