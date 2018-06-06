import React from "react";

class HomePage extends React.Component {
  render() {
    const { currentUser } = this.props;
    // console.log(currentUser);
    return (
      <div>
        <h1>Welcome, {currentUser.first_name}!</h1>
      </div>
    );
  }
}

export default HomePage;
