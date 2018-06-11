import React from "react";
import { Progress, Segment } from "semantic-ui-react";

const BudgetCategory = props => {
  if (props.spendingInfo.totalSpent / props.spendingInfo.limit > 1) {
    return (
      <Segment>
        <Progress
          progress="value"
          value="You are over your limit!"
          total={props.spendingInfo.limit}
        />
      </Segment>
    );
  } else if (props.spendingInfo.totalSpent / props.spendingInfo.limit > 0.8) {
    return (
      <Segment>
        <Progress
          error
          progress="value"
          value={props.spendingInfo.totalSpent}
          total={props.spendingInfo.limit}
        />
      </Segment>
    );
  } else if (props.spendingInfo.totalSpent / props.spendingInfo.limit > 0.5) {
    return (
      <Segment>
        <Progress
          warning
          progress="value"
          value={props.spendingInfo.totalSpent}
          total={props.spendingInfo.limit}
        />
      </Segment>
    );
  } else {
    return (
      <Segment>
        <Progress
          success
          progress="value"
          value={props.spendingInfo.totalSpent}
          total={props.spendingInfo.limit}
        />
      </Segment>
    );
  }
};

export default BudgetCategory;
