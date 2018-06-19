import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Navbar = props => {
  return (
    <Menu size="huge" borderless fixed="top">
      <Menu.Item name="appName">
        <h3>SpearMint</h3>
      </Menu.Item>
      {props.loggedIn ? (
        <Menu.Menu position="right">
          <Menu.Item name="budget">
            <Link to="/budget" style={{ color: "#000000" }}>
              Budget
            </Link>
          </Menu.Item>
          <Menu.Item name="spending">
            <Link to="/spending" style={{ color: "#000000" }}>
              Spending
            </Link>
          </Menu.Item>
          <Menu.Item name="savings">
            <Link to="/savings" style={{ color: "#000000" }}>
              Savings
            </Link>
          </Menu.Item>
          <Menu.Item name="budgetImport">
            <Link to="/import" style={{ color: "#000000" }}>
              Import
            </Link>
          </Menu.Item>
          <Menu.Item name="login">
            <Link
              to="/login"
              style={{ color: "#000000" }}
              onClick={props.handleLogOut}
            >
              Logout
            </Link>
          </Menu.Item>
        </Menu.Menu>
      ) : null}
    </Menu>
  );
};

export default Navbar;
