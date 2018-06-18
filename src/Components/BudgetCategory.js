import React from "react";
import { Progress, Segment } from "semantic-ui-react";

const numberWithCommas = x => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

const BudgetCategory = props => {
  if (props.category.totalSpent / props.category.limit > 0.75) {
    return (
      <Segment>
        <h1>
          {props.category.category}: ${numberWithCommas(
            parseFloat(
              props.category.limit - props.category.totalSpent
            ).toFixed(2)
          )}{" "}
          Over Budget
        </h1>

        <Progress
          error
          progress="percent"
          percent={parseInt(
            props.category.totalSpent / props.category.limit * 100
          )}
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
          progress="percent"
          percent={parseInt(
            props.category.totalSpent / props.category.limit * 100
          )}
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
          progress="percent"
          percent={parseInt(
            props.category.totalSpent / props.category.limit * 100
          )}
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
//         {props.category.category}: ${numberWithCommas(
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
