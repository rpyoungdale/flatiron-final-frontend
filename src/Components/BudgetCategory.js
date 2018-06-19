import React from "react";
import Transactions from "./Transactions";
import {
  Progress,
  Segment,
  Modal,
  Button,
  Header,
  Grid
} from "semantic-ui-react";

const numberWithCommas = x => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

const BudgetCategory = props => {
  // debugger;
  if (props.category.totalSpent / props.category.limit > 1) {
    return (
      <Segment style={{ backgroundColor: "#DCDCDC" }}>
        <Grid>
          <Grid.Column width={3} />
          <Grid.Column width={10}>
            <h3 style={{ textAlign: "center" }}>{props.category.category}</h3>
          </Grid.Column>
          <Grid.Column width={3}>
            <Modal
              trigger={<Button basic>Transactions</Button>}
              basic
              size="small"
              closeIcon
            >
              <Header
                icon="dollar"
                content={props.category.category + " " + "Transactions"}
              />
              <Modal.Content>
                <Transactions
                  deleteTrans={props.deleteTrans}
                  transactions={props.category.transactions}
                />
              </Modal.Content>
            </Modal>
          </Grid.Column>
        </Grid>
        <h4 style={{ textAlign: "left" }}>
          ${Math.abs(
            numberWithCommas(
              parseFloat(
                props.category.limit - props.category.totalSpent
              ).toFixed(2)
            )
          )}{" "}
          Over Budget
        </h4>

        <Progress
          inverted
          color="red"
          progress="percent"
          percent={parseInt(
            props.category.totalSpent / props.category.limit * 100
          )}
        />
      </Segment>
    );
  } else if (props.category.totalSpent / props.category.limit > 0.75) {
    return (
      <Segment style={{ backgroundColor: "#DCDCDC" }}>
        <Grid>
          <Grid.Column width={3} />
          <Grid.Column width={10}>
            <h3 style={{ textAlign: "center" }}>{props.category.category}</h3>
          </Grid.Column>
          <Grid.Column width={3}>
            <Modal
              trigger={<Button basic>Transactions</Button>}
              basic
              size="small"
              closeIcon
            >
              <Header
                icon="dollar"
                content={props.category.category + " " + "Transactions"}
              />
              <Modal.Content>
                <Transactions
                  deleteTrans={props.deleteTrans}
                  transactions={props.category.transactions}
                />
              </Modal.Content>
            </Modal>
          </Grid.Column>
        </Grid>
        <h4 style={{ textAlign: "left" }}>
          ${numberWithCommas(
            parseFloat(
              props.category.limit - props.category.totalSpent
            ).toFixed(2)
          )}{" "}
          Remaining
        </h4>

        <Progress
          inverted
          color="red"
          progress="percent"
          percent={parseInt(
            props.category.totalSpent / props.category.limit * 100
          )}
        />
      </Segment>
    );
  } else if (props.category.totalSpent / props.category.limit > 0.5) {
    return (
      <Segment style={{ backgroundColor: "#DCDCDC" }}>
        <Grid>
          <Grid.Column width={3} />
          <Grid.Column width={10}>
            <h3 style={{ textAlign: "center" }}>{props.category.category}</h3>
          </Grid.Column>
          <Grid.Column width={3}>
            <Modal
              trigger={<Button basic>Transactions</Button>}
              basic
              size="small"
              closeIcon
            >
              <Header
                icon="dollar"
                content={props.category.category + " " + "Transactions"}
              />
              <Modal.Content>
                <Transactions
                  deleteTrans={props.deleteTrans}
                  transactions={props.category.transactions}
                />
              </Modal.Content>
            </Modal>
          </Grid.Column>
        </Grid>
        <h4 style={{ textAlign: "left" }}>
          ${numberWithCommas(
            parseFloat(
              props.category.limit - props.category.totalSpent
            ).toFixed(2)
          )}{" "}
          Remaining
        </h4>

        <Progress
          inverted
          color="yellow"
          progress="percent"
          percent={parseInt(
            props.category.totalSpent / props.category.limit * 100
          )}
        />
      </Segment>
    );
  } else {
    return (
      <Segment style={{ backgroundColor: "#DCDCDC" }}>
        <Grid>
          <Grid.Column width={3} />
          <Grid.Column width={10}>
            <h3 style={{ textAlign: "center" }}>{props.category.category}</h3>
          </Grid.Column>
          <Grid.Column width={3}>
            <Modal
              trigger={<Button basic>Transactions</Button>}
              basic
              size="small"
              closeIcon
            >
              <Header
                icon="dollar"
                content={props.category.category + " " + "Transactions"}
              />
              <Modal.Content>
                <Transactions
                  deleteTrans={props.deleteTrans}
                  transactions={props.category.transactions}
                />
              </Modal.Content>
            </Modal>
          </Grid.Column>
        </Grid>
        <h4 style={{ textAlign: "left" }}>
          ${numberWithCommas(
            parseFloat(
              props.category.limit - props.category.totalSpent
            ).toFixed(2)
          )}{" "}
          Remaining
        </h4>

        <Progress
          inverted
          color="green"
          progress="percent"
          percent={parseInt(
            props.category.totalSpent / props.category.limit * 100
          )}
        />
      </Segment>
    );
  }
};

// if (props.category.totalSpent / props.category.limit > 1) {
//   return (
//     <Segment>
//       <h1>
//         {props.category.category} ${numberWithCommas(
//           parseFloat(
//             props.category.limit - props.category.totalSpent
//           ).toFixed(2)
//         )}{" "}
//         Remaining
//       </h1>
//
//       <Progress
//         progress="percent"
//         value="You are over your limit!"
//         total={props.category.limit}
//       />
//     </Segment>
//   );
// } else

export default BudgetCategory;
