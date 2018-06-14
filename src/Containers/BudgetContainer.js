import React from "react";
import BudgetCategory from "../Components/BudgetCategory";
import Transaction from "../Components/Transaction";
import NewTransactionForm from "../Components/NewTransactionForm";
import NewCategoryForm from "../Components/NewCategoryForm";
import {
  Segment,
  Grid,
  Button,
  Header,
  Popup,
  Dropdown,
  Form
} from "semantic-ui-react";
import CSVReader from "react-csv-reader";

const baseUrl = "http://localhost:3000";

class BudgetContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      dropdownCategories: [],
      transView: false,
      showingTransactions: [],
      months: [
        { key: 1, value: "January", text: "January" },
        { key: 2, value: "February", text: "February" },
        { key: 3, value: "March", text: "March" },
        { key: 4, value: "April", text: "April" },
        { key: 5, value: "May", text: "May" },
        { key: 6, value: "June", text: "June" },
        { key: 7, value: "July", text: "July" },
        { key: 8, value: "August", text: "August" },
        { key: 9, value: "September", text: "September" },
        { key: 10, value: "October", text: "October" },
        { key: 11, value: "November", text: "November" },
        { key: 12, value: "December", text: "December" }
      ],
      years: [
        { key: 2018, value: "2018", text: "2018" },
        { key: 2017, value: "2017", text: "2017" },
        { key: 2016, value: "2016", text: "2016" },
        { key: 2015, value: "2015", text: "2015" },
        { key: 2014, value: "2014", text: "2014" },
        { key: 2013, value: "2013", text: "2013" },
        { key: 2012, value: "2012", text: "2012" },
        { key: 2011, value: "2011", text: "2011" },
        { key: 2010, value: "2010", text: "2010" }
      ],
      chosenMonth: "",
      chosenYear: ""
    };
  }

  componentDidMount() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();

    let dropdown = [];

    this.props.currentUser.budget
      ? this.props.chosenBudget.categories.forEach(cat =>
          dropdown.push({ key: cat.id, value: cat.name, text: cat.name })
        )
      : null;
    // debugger;
    this.props.currentUser.budget
      ? this.setState({
          dropdownCategories: dropdown,
          chosenYear: `${year}`,
          chosenMonth: this.state.months[month].value
        })
      : null;
  }

  updateMonth = e => {
    this.setState({
      chosenMonth: e.target.innerText
    });
  };

  updateYear = e => {
    this.setState({
      chosenYear: e.target.innerText
    });
  };

  changeBudget = () => {
    fetch(`${baseUrl}/budgets`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(json => {
        let chosenBudget = json.filter(budget => {
          return (
            budget.user_id === this.props.currentUser.id &&
            budget.month === this.state.chosenMonth &&
            budget.year === this.state.chosenYear
          );
        });
        this.props.changeChosenBudget(chosenBudget[0]);
      });
  };

  render() {
    console.log("monthYear", this.state);
    const { currentUser, categorySpendingBreakdown, chosenBudget } = this.props;
    return (
      <Grid>
        <Grid.Column width={1} />
        <Grid.Column width={9} style={{ paddingTop: 100 }}>
          <Segment>
            {currentUser.first_name ? (
              <div>
                <Form onSubmit={this.changeBudget}>
                  <Dropdown
                    placeholder="Select Month"
                    scrolling
                    options={this.state.months}
                    onChange={this.updateMonth}
                    value={this.state.chosenMonth}
                    style={{ paddingRight: 10 }}
                  />
                  <Dropdown
                    placeholder="Select Year"
                    scrolling
                    options={this.state.years}
                    onChange={this.updateYear}
                    value={this.state.chosenYear}
                  />
                  <Button>Go</Button>
                </Form>
                <h1>
                  Budget: {chosenBudget.month}, {chosenBudget.year}
                </h1>
                <h2>Current Balance: ${chosenBudget.balance}</h2>
                {categorySpendingBreakdown.map(category => {
                  return (
                    <BudgetCategory
                      key={category.category}
                      category={category}
                    />
                  );
                })}
              </div>
            ) : null}
          </Segment>
        </Grid.Column>
        <Grid.Column width={5} style={{ paddingTop: 100 }}>
          <NewTransactionForm
            // addedTrans={this.props.addedTrans}
            chosenBudget={this.props.chosenBudget}
            dropdownCategories={this.state.dropdownCategories}
            currentUser={this.props.currentUser}
          />
          <NewCategoryForm currentUser={this.props.currentUser} />
        </Grid.Column>
        <Grid.Column width={1} />
      </Grid>
    );
  }
}

// toggleTransactions = e => {
//   let showingTransactions = [];
//   this.state.transactions.forEach(trans => {
//     if (trans.category_id == e.target.id) {
//       showingTransactions.push(trans);
//     }
//   });
//   this.setState({
//     transView: !this.state.transView,
//     showingTransactions: showingTransactions
//   });
// };

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

export default BudgetContainer;
