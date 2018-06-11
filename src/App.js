import React, { Component } from "react";
import Budget from "./Components/Budget";
import Navbar from "./Components/Navbar";
import LoginContainer from "./Containers/LoginContainer";
import UserSetUp from "./Containers/UserSetUp";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

const baseUrl = "http://localhost:3000";

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      firstTimeUser: false,
      currentUser: {}
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      fetch(`${baseUrl}/user`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then(res => res.json())
        .then(json => {
          // debugger;
          this.setState({
            currentUser: json,
            loggedIn: true
          });
        });
    }
  }

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
      firstTimeUser: !this.state.newUser
    });
  };

  // addedTrans = () => {
  //   debugger;
  //   this.setState({
  //     addedTrans: (this.state.addedTrans += 1)
  //   });
  // };

  // toggleSpending = () => {
  //   this.setState({
  //     spendingPage: true
  //   });
  // };

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
            firstTimeUser: true
          });
        } else {
          this.setState({
            currentUser: json,
            loggedIn: true
          });
        }
      });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar
            loggedIn={this.state.loggedIn}
            handleLogOut={this.handleLogOut}
          />

          {this.state.loggedIn && localStorage.getItem("token") ? (
            this.state.firstTimeUser ? (
              <Route exact path="/setup" render={() => <UserSetUp />} />
            ) : (
              <Route
                exact
                path="/budget"
                render={() => (
                  <Budget
                    addedTrans={this.addedTrans}
                    currentUser={this.state.currentUser}
                  />
                )}
              />
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
