import React from "react";
import { Progress, Segment } from "semantic-ui-react";

const BudgetCategory = props => {
  // debugger;
  console.log("budget props", props);
  if (props.totalSpent / props.limit > 0.8) {
    return (
      <Segment>
        <Progress error progress="value" total={props.limit} />
      </Segment>
    );
  } else if (props.totalSpent / props.limit > 0.5) {
    return (
      <Segment>
        <Progress
          warning
          progress="value"
          value={props.totalSpent}
          total={props.limit}
        />
      </Segment>
    );
  } else {
    return (
      <Segment>
        <Progress
          success
          progress="value"
          value={props.totalSpent}
          total={props.limit}
        />
      </Segment>
    );
  }
};

export default BudgetCategory;
