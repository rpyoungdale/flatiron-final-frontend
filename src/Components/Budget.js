import React from "react";
import BudgetCategory from "./BudgetCategory";
import NewTransactionForm from "./NewTransactionForm";
import { Segment, Grid } from "semantic-ui-react";

class Budget extends React.Component {
  constructor() {
    super();

    this.state = {
      transactions: [],
      dropdownCategories: [],
      progressInfo: []
    };
  }

  componentDidMount() {
    let dropdown = [];
    let progressInfo = [];

    this.props.currentUser.budget
      ? this.props.currentUser.budget.categories.forEach(cat =>
          dropdown.push({ key: cat.id, value: cat.name, text: cat.name })
        )
      : null;

    this.props.currentUser.budget
      ? this.setState({
          transactions: this.props.currentUser.budget.transactions,
          dropdownCategories: dropdown,
          categories: this.props.currentUser.budget.categories
        })
      : null;

    this.props.currentUser.budget
      ? this.props.currentUser.budget.categories.forEach(category => {
          let totalSpent = 0;
          let matchingTrans = this.props.currentUser.budget.transactions.filter(
            transaction => {
              return transaction.category_id === category.id;
            }
          );
          // debugger;
          matchingTrans.forEach(
            trans => (totalSpent += parseFloat(trans.amount))
          );
          console.log(this.state.progressInfo);
          progressInfo.push({
            categoryName: category.name,
            limit: category.limit,
            totalSpent: totalSpent
          });
        })
      : null;

    this.setState({
      progressInfo: progressInfo
    });
  }

  render() {
    const { currentUser } = this.props;
    return (
      <Grid divided>
        <Grid.Column width={1} />
        <Grid.Column width={9}>
          <Segment>
            {this.state.progressInfo.length ? (
              <div>
                <h1>Welcome, {currentUser.first_name}!</h1>
                <h2>${currentUser.budget.balance}</h2>
                {this.state.progressInfo.map(spendingInfo => {
                  return (
                    <div key={spendingInfo.categoryName}>
                      <h1>{spendingInfo.categoryName}</h1>
                      <BudgetCategory spendingInfo={spendingInfo} />
                    </div>
                  );
                })}
              </div>
            ) : null}
          </Segment>
        </Grid.Column>
        <NewTransactionForm
          addedTrans={this.props.addedTrans}
          dropdownCategories={this.state.dropdownCategories}
          currentUser={this.props.currentUser}
        />
        <Grid.Column width={1} />
      </Grid>
    );
  }
}

export default Budget;
