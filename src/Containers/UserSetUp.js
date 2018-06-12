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
      budgetLimit: ""
    };
  }

  componentDidMount() {
    fetch(`${baseUrl}/categories`)
      .then(res => res.json())
      .then(json => {
        let dropdownParsed = [];
        json.map(category => {
          return dropdownParsed.push({
            key: category.id,
            value: category.name,
            text: category.name
          });
        });
        this.setState({
          categories: dropdownParsed
        });
      });
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
        balance: parseFloat(this.state.budgetLimit)
      })
    })
      .then(res => res.json())
      .then(json => console.log("New Budget", json));

    this.setState({
      budgetForm: false
    });
  };

  persistCategories = id => {
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
          budget_id: id
        })
      })
        .then(res => res.json())
        .then(json => console.log("New CAT", json));
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
          <Segment>
            {this.state.budgetForm ? (
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
            ) : (
              <div>
                <Form
                  onSubmit={() =>
                    this.persistCategories(this.props.currentUser.id)
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
                <Button onClick={this.appendInput}>New Category</Button>
              </div>
            )}
          </Segment>
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
