import React from "react";
import { Progress, Segment } from "semantic-ui-react";

const numberWithCommas = x => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

const BudgetCategory = props => {
  if (props.category.totalSpent / props.category.limit > 1) {
    return (
      <Segment>
        <h1>
          {props.category.category}: ${numberWithCommas(
            parseFloat(
              props.category.limit - props.category.totalSpent
            ).toFixed(2)
          )}{" "}
          Remaining
        </h1>

        <Progress
          progress="value"
          value="You are over your limit!"
          total={props.category.limit}
        />
      </Segment>
    );
  } else if (props.category.totalSpent / props.category.limit > 0.75) {
    return (
      <Segment>
        <h1>
          {props.category.category}: ${numberWithCommas(
            parseFloat(
              props.category.limit - props.category.totalSpent
            ).toFixed(2)
          )}{" "}
          Remaining
        </h1>

        <Progress
          error
          progress="value"
          value={numberWithCommas(
            parseFloat(props.category.totalSpent).toFixed(2)
          )}
          total={props.category.limit}
        />
      </Segment>
    );
  } else if (props.category.totalSpent / props.category.limit > 0.5) {
    return (
      <Segment>
        <h1>
          {props.category.category}: ${numberWithCommas(
            parseFloat(
              props.category.limit - props.category.totalSpent
            ).toFixed(2)
          )}{" "}
          Remaining
        </h1>

        <Progress
          warning
          progress="value"
          value={numberWithCommas(
            parseFloat(props.category.totalSpent).toFixed(2)
          )}
          total={props.category.limit}
        />
      </Segment>
    );
  } else {
    return (
      <Segment>
        <h1>
          {props.category.category}: ${numberWithCommas(
            parseFloat(
              props.category.limit - props.category.totalSpent
            ).toFixed(2)
          )}{" "}
          Remaining
        </h1>

        <Progress
          success
          progress="value"
          value={numberWithCommas(
            parseFloat(props.category.totalSpent).toFixed(2)
          )}
          total={props.category.limit}
        />
      </Segment>
    );
  }
};

export default BudgetCategory;
