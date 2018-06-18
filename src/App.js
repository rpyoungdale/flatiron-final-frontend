import React, { Component } from "react";
import BudgetContainer from "./Containers/BudgetContainer";
import Navbar from "./Components/Navbar";
import CSVImport from "./Components/CSVImport";
import TrendsContainer from "./Containers/TrendsContainer";
import LoginContainer from "./Containers/LoginContainer";
import SpendingContainer from "./Containers/SpendingContainer";
import UserSetUp from "./Containers/UserSetUp";
import "./App.css";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

const baseUrl = "http://localhost:3000";

//In each component, only have one layer of conditionals
//This component should only have a logged in and logged out view, and then if renders sub components with further ternaries

//Draw out component hierarchy
//Decide which components need certain props and what needs to be passed down
//Everything needs to have a single source of truth

//Shape the current user
//Do all of the filtering at the top level
//Rather than everything inside current user, pull necessary stuff out of it so you don't have to pass the whole user down to everything

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      firstTimeUser: false,
      currentUser: {},
      categorySpendingBreakdown: [],
      merchantSpendingBreakdown: [],
      chosenBudget: {},
      addedTrans: false,
      addedCategory: false,
      uploaded: false
    };
  }

  componentDidMount() {
    // debugger;
    if (localStorage.getItem("token")) {
      // debugger;
      fetch(`${baseUrl}/user`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then(res => res.json())
        .then(json => this.reshapeState(json));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // debugger;
    if (this.state.addedTrans || this.state.uploaded !== prevState.uploaded) {
      // debugger;
      if (localStorage.getItem("token")) {
        // debugger;
        fetch(`${baseUrl}/user`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
          .then(res => res.json())
          .then(json => this.reshapeState(json));
        this.setState({
          addedTrans: false
        });
      }
    } else if (this.state.addedCategory) {
      if (localStorage.getItem("token")) {
        // debugger;
        fetch(`${baseUrl}/user`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
          .then(res => res.json())
          .then(json => this.reshapeState(json));
        this.setState({
          addedCategory: false
        });
      }
    }
  }

  setUser = firstTime => {
    fetch(`${baseUrl}/user`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(json => {
        if (firstTime === true) {
          this.setState({
            currentUser: json,
            firstTimeUser: true,
            loggedIn: true
          });
        } else {
          this.reshapeState(json);
        }
      });
  };

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  reshapeState = json => {
    // debugger;
    let categorySpending = [];
    let merchants = [];
    json.budget = json.budgets[0];
    json.budget.categories.forEach(category => {
      let totalSpent = 0;
      let matchingTrans = json.budget.transactions.filter(transaction => {
        return transaction.category_id === category.id;
      });
      matchingTrans.forEach(trans => (totalSpent += parseFloat(trans.amount)));
      categorySpending.push({
        category: category.name,
        limit: category.limit,
        totalSpent: totalSpent,
        transactions: matchingTrans
      });
    });

    json.budget.transactions.forEach(trans => {
      merchants.push(trans.merchant);
    });

    let filteredMerchants = merchants.filter(this.onlyUnique);
    let merchantSpending = [];
    filteredMerchants.forEach(merchant => {
      let totalSpent = 0;
      let matchingTrans = json.budget.transactions.filter(transaction => {
        return merchant === transaction.merchant;
      });
      matchingTrans.forEach(trans => (totalSpent += parseFloat(trans.amount)));
      merchantSpending.push({
        merchant: merchant,
        totalSpent: totalSpent
      });
    });

    this.setState({
      currentUser: json,
      loggedIn: true,
      categorySpendingBreakdown: categorySpending,
      merchantSpendingBreakdown: merchantSpending,
      chosenBudget: json.budgets[0]
    });
  };

  handleLogOut = () => {
    localStorage.removeItem("token");
    this.setState({
      loggedIn: false,
      currentUser: {}
    });
  };

  toggleFirstTimeUser = () => {
    //if set to true, will walk them through setup
    this.setState({
      firstTimeUser: false
    });
  };

  changeChosenBudget = budget => {
    // debugger;
    let categorySpending = [];
    let merchants = [];
    // debugger;
    budget.categories.forEach(category => {
      let totalSpent = 0;
      let matchingTrans = budget.transactions.filter(transaction => {
        return transaction.category_id === category.id;
      });
      matchingTrans.forEach(trans => (totalSpent += parseFloat(trans.amount)));
      categorySpending.push({
        category: category.name,
        limit: category.limit,
        totalSpent: totalSpent,
        transactions: matchingTrans
      });
    });

    budget.transactions.forEach(trans => {
      merchants.push(trans.merchant);
    });

    let filteredMerchants = merchants.filter(this.onlyUnique);
    let merchantSpending = [];
    filteredMerchants.forEach(merchant => {
      let totalSpent = 0;
      let matchingTrans = budget.transactions.filter(transaction => {
        return merchant === transaction.merchant;
      });
      matchingTrans.forEach(trans => (totalSpent += parseFloat(trans.amount)));
      merchantSpending.push({
        merchant: merchant,
        totalSpent: totalSpent
      });
    });

    this.setState({
      categorySpendingBreakdown: categorySpending,
      merchantSpendingBreakdown: merchantSpending,
      chosenBudget: budget
    });
  };

  addedTrans = () => {
    // debugger;
    this.setState({
      addedTrans: true
    });
  };

  addedCategory = () => {
    // debugger;
    this.setState({
      addedCategory: true
    });
  };

  changeUploaded = () => {
    this.setState({
      uploaded: !this.state.uploaded
    });
  };

  render() {
    console.log("app", this.state);
    // debugger
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar
            loggedIn={this.state.loggedIn}
            handleLogOut={this.handleLogOut}
          />
          {this.state.loggedIn && localStorage.getItem("token") ? (
            this.state.firstTimeUser ? (
              <Route
                exact
                path="/setup"
                render={() => (
                  <UserSetUp
                    toggleFirstTimeUser={this.toggleFirstTimeUser}
                    currentUser={this.state.currentUser}
                  />
                )}
              />
            ) : (
              <div>
                <Redirect to="/budget" />
                <Route
                  exact
                  path="/budget"
                  render={() => (
                    <BudgetContainer
                      addedTrans={this.addedTrans}
                      addedCategory={this.addedCategory}
                      currentUser={this.state.currentUser}
                      chosenBudget={this.state.chosenBudget}
                      categorySpendingBreakdown={
                        this.state.categorySpendingBreakdown
                      }
                      changeChosenBudget={this.changeChosenBudget}
                    />
                  )}
                />
                <Route
                  exact
                  path="/spending"
                  render={() => (
                    <SpendingContainer
                      currentUser={this.state.currentUser}
                      categorySpendingBreakdown={
                        this.state.categorySpendingBreakdown
                      }
                      merchantSpendingBreakdown={
                        this.state.merchantSpendingBreakdown
                      }
                    />
                  )}
                />
                <Route
                  exact
                  path="/import"
                  render={() => (
                    <CSVImport
                      uploaded={this.changeUploaded}
                      currentUser={this.state.currentUser}
                    />
                  )}
                />
                <Route
                  exact
                  path="/trends"
                  render={() => (
                    <TrendsContainer
                      uploaded={this.state.uploaded}
                      currentUser={this.state.currentUser}
                    />
                  )}
                />
              </div>
            )
          ) : (
            <Route
              exact
              path="/login"
              render={() => (
                <LoginContainer
                  props={this.props}
                  handleLogIn={this.handleLogIn}
                  setUser={this.setUser}
                />
              )}
            />
          )}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
