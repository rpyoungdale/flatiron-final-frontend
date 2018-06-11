import React from "react";
import BudgetCategory from "./BudgetCategory";
import NewTransactionForm from "./NewTransactionForm";
import { Segment, Grid } from "semantic-ui-react";

class HomePage extends React.Component {
  constructor() {
    super();

    this.state = {
      transactions: [],
      dropdownCategories: []
    };
  }

  componentDidMount() {
    let dropdown = [];

    this.props.currentUser.first_name
      ? this.props.currentUser.budget.categories.forEach(cat =>
          dropdown.push({ key: cat.id, value: cat.name, text: cat.name })
        )
      : null;

    this.props.currentUser.first_name
      ? this.setState({
          transactions: this.props.currentUser.budget.transactions,
          dropdownCategories: dropdown
        })
      : null;
  }

  render() {
    // console.log("home page", this.props.currentUser);
    const { currentUser } = this.props;
    return (
      <Grid divided>
        <Grid.Column width={1} />
        <Grid.Column width={9}>
          <Segment>
            {currentUser.first_name ? (
              <div>
                <h1>Welcome, {currentUser.first_name}!</h1>
                <h2>${currentUser.budget.balance}</h2>
                <ul>
                  {currentUser.budget.categories.map(category => {
                    let totalSpent = 0;
                    let matchingTrans = this.state.transactions.filter(
                      transaction => {
                        return transaction.category_id === category.id;
                      }
                    );
                    matchingTrans.forEach(
                      trans => (totalSpent += parseFloat(trans.amount))
                    );
                    return (
                      <div key={category.id}>
                        <h1>
                          {category.name} - {category.limit}
                        </h1>
                        <BudgetCategory
                          totalSpent={totalSpent}
                          limit={category.limit}
                        />
                      </div>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </Segment>
        </Grid.Column>
        <NewTransactionForm
          persistTransaction={this.persistTransaction}
          dropdownCategories={this.state.dropdownCategories}
          currentUser={this.props.currentUser}
        />
        <Grid.Column width={1} />
      </Grid>
    );
  }
}

export default HomePage;
