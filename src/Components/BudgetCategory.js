import React from "react";
import { Progress, Segment } from "semantic-ui-react";

const BudgetCategory = props => {
  if (props.category.totalSpent / props.category.limit > 1) {
    return (
      <Segment>
        <h1>
          {props.category.category}: ${props.category.limit} Limit
        </h1>

        <Progress
          progress="value"
          value="You are over your limit!"
          total={props.category.limit}
        />
      </Segment>
    );
  } else if (props.category.totalSpent / props.category.limit > 0.8) {
    return (
      <Segment>
        <h1>
          {props.category.category}: ${props.category.limit} Limit
        </h1>

        <Progress
          error
          progress="value"
          value={props.category.totalSpent}
          total={props.category.limit}
        />
      </Segment>
    );
  } else if (props.category.totalSpent / props.category.limit > 0.5) {
    return (
      <Segment>
        <h1>
          {props.category.category}: ${props.category.limit} Limit
        </h1>

        <Progress
          warning
          progress="value"
          value={props.category.totalSpent}
          total={props.category.limit}
        />
      </Segment>
    );
  } else {
    return (
      <Segment>
        <h1>
          {props.category.category}: ${props.category.limit} Limit
        </h1>

        <Progress
          success
          progress="value"
          value={props.category.totalSpent}
          total={props.category.limit}
        />
      </Segment>
    );
  }
};

export default BudgetCategory;
