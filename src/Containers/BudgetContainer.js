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
      chosenYear: "",
      grandTotalSpent: 0,
      addedTrans: 0
    };
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  componentDidMount() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();

    let dropdown = [];
    let filterDrop = [];
    let grandTotal = 0;

    this.props.currentUser.budget
      ? this.props.currentUser.budgets.forEach(budget => {
          budget.categories.forEach(cat => {
            // debugger;
            if (filterDrop.includes(cat.name)) {
              null;
            } else {
              dropdown.push({ key: cat.id, value: cat.name, text: cat.name });
              filterDrop.push(cat.name);
            }
          });
        })
      : null;
    // debugger;
    this.props.currentUser.budget
      ? this.setState({
          dropdownCategories: dropdown,
          chosenYear: `${year}`,
          chosenMonth: this.state.months[month].value
        })
      : null;

    this.props.currentUser.budget
      ? this.props.categorySpendingBreakdown.forEach(cat => {
          grandTotal += cat.totalSpent;
        })
      : null;

    this.props.currentUser.budget
      ? this.setState({
          grandTotalSpent: grandTotal
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

  numberWithCommas = x => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  render() {
    console.log("monthYear", this.props);
    let spendingTotal = 0;
    const {
      currentUser,
      categorySpendingBreakdown,
      chosenBudget,
      addedTrans,
      addedCategory
    } = this.props;
    chosenBudget.transactions.forEach(trans => {
      spendingTotal += parseFloat(trans.amount);
    });
    return (
      <Grid>
        <Grid.Column width={1} />
        <Grid.Column width={9} style={{ paddingTop: 100 }}>
          <Segment>
            {currentUser.first_name ? (
              <div>
                <Form onSubmit={this.changeBudget}>
                  <Dropdown
                    button
                    className="icon"
                    floating
                    labeled
                    icon="calendar"
                    placeholder="Select Month"
                    scrolling
                    options={this.state.months}
                    onChange={this.updateMonth}
                    value={this.state.chosenMonth}
                    style={{ paddingRight: 10 }}
                  />
                  <Dropdown
                    button
                    className="icon"
                    floating
                    labeled
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
                <h2>
                  Starting Balance: ${this.numberWithCommas(
                    parseFloat(chosenBudget.balance).toFixed(2)
                  )}
                </h2>
                <h2>
                  Left to Spend: ${this.numberWithCommas(
                    (
                      parseFloat(chosenBudget.balance) -
                      parseFloat(spendingTotal)
                    ).toFixed(2)
                  )}
                </h2>
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
            addedTrans={addedTrans}
            chosenBudget={chosenBudget}
            dropdownCategories={this.state.dropdownCategories}
            currentUser={currentUser}
          />
          <NewCategoryForm
            addedCategory={addedCategory}
            chosenBudget={chosenBudget}
            currentUser={this.props.currentUser}
          />
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
