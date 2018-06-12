import React from "react";
import BudgetCategory from "../Components/BudgetCategory";
import Transaction from "../Components/Transaction";
import NewTransactionForm from "../Components/NewTransactionForm";
import { Segment, Grid, Button, Header, Popup } from "semantic-ui-react";
import CSVReader from "react-csv-reader";

class BudgetContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      dropdownCategories: [],
      transView: false,
      showingTransactions: []
    };
  }

  componentDidMount() {
    let dropdown = [];

    this.props.currentUser.budget
      ? this.props.currentUser.budget.categories.forEach(cat =>
          dropdown.push({ key: cat.id, value: cat.name, text: cat.name })
        )
      : null;

    this.props.currentUser.budget
      ? this.setState({
          dropdownCategories: dropdown
        })
      : null;
  }

  toggleTransactions = e => {
    let showingTransactions = [];
    this.state.transactions.forEach(trans => {
      if (trans.category_id == e.target.id) {
        showingTransactions.push(trans);
      }
    });
    this.setState({
      transView: !this.state.transView,
      showingTransactions: showingTransactions
    });
  };

  render() {
    console.log("spendingInfo", this.props);
    const { currentUser, categorySpendingBreakdown } = this.props;
    return (
      <Grid divided>
        <Grid.Column width={1} />
        <Grid.Column width={9}>
          <Segment>
            {currentUser.first_name ? (
              <div>
                <h1>Welcome, {currentUser.first_name}!</h1>
                <h2>Current Balance: ${currentUser.budget.balance}</h2>
                {categorySpendingBreakdown.map(category => {
                  return <BudgetCategory category={category} />;
                })}
              </div>
            ) : null}
          </Segment>
        </Grid.Column>
        <NewTransactionForm
          // addedTrans={this.props.addedTrans}
          dropdownCategories={this.state.dropdownCategories}
          currentUser={this.props.currentUser}
        />
        <Grid.Column width={1} />
      </Grid>
    );
  }
}

// {this.state.progressInfo.map(spendingInfo => {
//   return (
//     <div key={spendingInfo.categoryName}>
//       <BudgetCategory
//         toggleTransactions={this.toggleTransactions}
//         spendingInfo={spendingInfo}
//       />
//       {this.state.transView
//         ? this.state.showingTransactions.map(trans => {
//             // debugger;
//             return <Transaction />;
//           })
//         : null}
//     </div>
//   );
// })}

// handleForce = (data) => {
//   console.log(data);
// }
//
// <div className="container">
//   <CSVReader
//     cssClass="react-csv-input"
//     label="Select CSV with secret Death Star statistics"
//     onFileLoaded={this.handleForce}
//   />
//   <p>and then open the console</p>
// </div>

export default BudgetContainer;
