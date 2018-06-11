import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Segment, Grid } from "semantic-ui-react";

const baseUrl = "http://localhost:3000";

class LoginContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      newUser: false
    };
  }

  login = (e, firstTime = false) => {
    // debugger;
    e.preventDefault();
    fetch(`${baseUrl}/login`, {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        // debugger;
        if (json.token) {
          localStorage.setItem("token", json.token);
          // this.props.handleLogIn();
          this.props.setUser(firstTime);
        }
      });
  };

  saveUser = e => {
    e.persist();
    fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        username: this.state.username,
        password: this.state.password
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        this.login(e, true);
      });
  };

  toggleNewUser = () => {
    this.setState({
      newUser: !this.state.newUser
    });
  };

  // handleEnter = event => {
  //   const x = event.which || event.keyCode;
  //   if (x === 13) {
  //     <Redirect to="/home" />;
  //   }
  // };
  // onKeyDown={this.handleEnter}

  render() {
    console.log(this.state);
    return (
      <Grid>
        <Grid.Column width={4} />
        <Grid.Column width={8}>
          <Segment>
            {this.state.newUser ? (
              <Form>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="First Name"
                    name="firstName"
                    value={this.state.first_name}
                    onChange={e =>
                      this.setState({ first_name: e.target.value })
                    }
                    placeholder="First Name"
                  />
                  <Form.Input
                    fluid
                    label="Last Name"
                    name="lastName"
                    value={this.state.last_name}
                    onChange={e => this.setState({ last_name: e.target.value })}
                    placeholder="Last Name"
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Username"
                    name="username"
                    value={this.state.username}
                    onChange={e => this.setState({ username: e.target.value })}
                    placeholder="Username"
                  />
                  <Form.Input
                    fluid
                    label="Password"
                    name="password"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                    placeholder="Password"
                  />
                </Form.Group>
                <Form.Checkbox label="I agree to the Terms and Conditions" />
                <Button type="submit" onClick={e => this.saveUser(e)}>
                  <Link to="/setup" style={{ color: "#000000" }}>
                    Submit
                  </Link>
                </Button>
              </Form>
            ) : (
              <Form>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Username"
                    name="username"
                    value={this.state.username}
                    onChange={e => this.setState({ username: e.target.value })}
                    placeholder="Username"
                  />
                  <Form.Input
                    fluid
                    label="Password"
                    name="password"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                    placeholder="Password"
                  />
                </Form.Group>
                <Form.Checkbox label="I agree to the Terms and Conditions" />
                <Button onClick={this.login} type="submit">
                  <Link to="/budget" style={{ color: "#000000" }}>
                    Login
                  </Link>
                </Button>
                <br />
                <br />
                <Button size="tiny" onClick={this.toggleNewUser}>
                  Create New Account
                </Button>
              </Form>
            )}
          </Segment>
        </Grid.Column>
        <Grid.Column width={4} />
      </Grid>
    );
  }
}
// <input
// name="firstName"
// value={this.state.username}
// onChange={e => this.setState({ username: e.target.value })}
// placeholder="First Name"
// />
// <input
// name="lastName"
// value={this.state.password}
// onChange={e => this.setState({ password: e.target.value })}
// placeholder="Last Name"
// />
// <input
// name="password"
// value={this.state.password}
// onChange={e => this.setState({ password: e.target.value })}
// placeholder="password"
// />
// <input
// name="password"
// value={this.state.password}
// onChange={e => this.setState({ password: e.target.value })}
// placeholder="password"
// />
//
// <button onClick={this.login}>
// <Link to="/home" style={{ color: "#000000" }}>
// Login
// </Link>
// </button>

// <input
// name="username"
// value={this.state.username}
// onChange={e => this.setState({ username: e.target.value })}
// placeholder="username"
// />
// <input
// name="password"
// value={this.state.password}
// onChange={e => this.setState({ password: e.target.value })}
// placeholder="password"
// />
//
// <button onClick={this.login}>
// <Link to="/home" style={{ color: "#000000" }}>
// Login
// </Link>
// </button>
export default LoginContainer;
