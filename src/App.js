import React, { Component } from "react";
import BudgetContainer from "./Containers/BudgetContainer";
import Navbar from "./Components/Navbar";
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
      merchantSpendingBreakdown: []
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
    let categorySpending = [];
    let merchants = [];
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
      merchantSpendingBreakdown: merchantSpending
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

  // addedTrans = () => {
  //   debugger;
  //   this.setState({
  //     addedTrans: (this.state.addedTrans += 1)
  //   });
  // };

  render() {
    console.log(this.state);
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
                <Route
                  exact
                  path="/budget"
                  render={() => (
                    <BudgetContainer
                      currentUser={this.state.currentUser}
                      categorySpendingBreakdown={
                        this.state.categorySpendingBreakdown
                      }
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

// <Route exact path="/login" render={() => <LoginContainer />} />
// <Route exact path="/login" render={() => <LoginContainer />} />

export default App;
