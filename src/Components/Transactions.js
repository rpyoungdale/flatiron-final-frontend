import React from "react";
import { Segment, Button, Grid } from "semantic-ui-react";
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
            <Grid>
              <Grid.Row>
                <Grid.Column width={6}>
                  <h3>
                    {trans.merchant} ${parseFloat(trans.amount).toFixed(2)}
                  </h3>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Button
                    size="tiny"
                    onClick={() => this.killTransaction(trans)}
                  >
                    Delete
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          );
        })}
      </div>
    );
  }
}

export default Transactions;
