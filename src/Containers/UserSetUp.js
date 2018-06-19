import React from "react";
import { Form, Segment, Grid, Dropdown, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const baseUrl = "http://localhost:3000";

class UserSetUp extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      inputs: ["input-0"],
      budgetForm: true,
      budgetLimit: "",
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      month: "",
      year: "",
      newBudgetId: 0,
      newBudget: ""
    };
  }

  componentDidMount() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();

    this.setState({
      month: `${this.state.months[month]}`,
      year: `${year}`
    });
    // fetch(`${baseUrl}/categories`)
    //   .then(res => res.json())
    //   .then(json => {
    //     let dropdownParsed = [];
    //     json.map(category => {
    //       return dropdownParsed.push({
    //         key: category.id,
    //         value: category.name,
    //         text: category.name
    //       });
    //     });
    //     this.setState({
    //       categories: dropdownParsed
    //     });
    //   });
  }

  handleBudgetAmount = e => {
    this.setState({
      budgetLimit: e.target.value
    });
  };

  persistBudget = id => {
    fetch(`${baseUrl}/budgets`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        user_id: id,
        balance: parseFloat(this.state.budgetLimit),
        month: this.state.month,
        year: this.state.year
      })
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          newBudgetId: json.id,
          newBudget: json
        });
      });

    this.setState({
      budgetForm: false
    });
  };

  persistCategories = (newBudgetId, setNewBudget, newBudget) => {
    // debugger;
    let newCategories = document.querySelectorAll(".fields");
    [].forEach.call(newCategories, function(newCat) {
      // debugger;
      fetch(`${baseUrl}/categories`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          name: newCat.childNodes[0].children[0].childNodes[0].value,
          limit: parseFloat(
            newCat.childNodes[1].children[0].childNodes[0].value
          ),
          budget_id: newBudgetId
        })
      })
        .then(res => res.json())
        .then(json => setNewBudget(newBudget));
    });
    this.props.toggleFirstTimeUser();
  };

  appendInput = () => {
    var newInput = `input-${this.state.inputs.length}`;
    this.setState({ inputs: this.state.inputs.concat([newInput]) });
  };

  render() {
    console.log("Set Up", this.state);
    return (
      <Grid>
        <Grid.Column width={4} />
        <Grid.Column width={8}>
          {this.state.budgetForm ? (
            <div style={{ paddingTop: 100 }}>
              <Segment>
                <Form
                  onSubmit={() => this.persistBudget(this.props.currentUser.id)}
                >
                  <Form.Input
                    placeholder="Enter Monthly Spending Limit"
                    width={16}
                    onChange={this.handleBudgetAmount}
                  />
                  <Button>Next</Button>
                </Form>
              </Segment>
            </div>
          ) : (
            <div style={{ paddingTop: 100 }}>
              <Segment>
                <Form
                  onSubmit={() =>
                    this.persistCategories(
                      this.state.newBudgetId,
                      this.props.setNewBudget,
                      this.state.newBudget
                    )
                  }
                >
                  {this.state.inputs.map(input => (
                    <Form.Group key={input}>
                      <Form.Input
                        placeholder="Category Name"
                        width={10}
                        name="category"
                      />
                      <Form.Input
                        placeholder="Amount"
                        width={6}
                        name="amount"
                      />
                    </Form.Group>
                  ))}
                  <Button>Finish!</Button>
                </Form>
                <br />
                <br />
                <Button onClick={this.appendInput}>New Category</Button>
              </Segment>
            </div>
          )}
        </Grid.Column>
        <Grid.Column width={4} />
      </Grid>
    );
  }
}

// <Dropdown
//   placeholder="Categories"
//   fluid
//   search
//   selection
//   options={this.state.categories}
//   width={8}
// />

export default UserSetUp;
