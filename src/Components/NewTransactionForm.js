import React from "react";
import {
  Segment,
  Grid,
  Form,
  Input,
  Dropdown,
  Button,
  Modal
} from "semantic-ui-react";

const baseUrl = "http://localhost:3000";

class NewTransactionForm extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      merchant: "",
      amount: 0
    };
  }

  componentDidMount() {
    this.props.currentUser.first_name
      ? this.setState({
          categories: this.props.chosenBudget.categories
        })
      : null;
  }

  componentDidUpdate(prevProps) {
    // debugger;
    if (this.props.chosenBudget.id !== prevProps.chosenBudget.id) {
      this.setState({
        categories: this.props.chosenBudget.categories
      });
    }
  }

  persistTransaction = e => {
    let category = this.state.categories.find(categ => {
      return categ.name === document.getElementById("dropdown").innerText;
    });
    // debugger;
    fetch(`${baseUrl}/transactions`, {
      method: "POST",
      body: JSON.stringify({
        merchant: this.state.merchant,
        amount: this.state.amount,
        category_id: category.id
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(json => this.props.addedTrans());
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    // console.log("newTrans", this.props);
    return (
      <Segment>
        <Form onSubmit={this.persistTransaction}>
          <Form.Field>
            <label>Merchant</label>
            <Input
              fluid
              placeholder="Merchant"
              name="merchant"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Amount</label>
            <Input
              fluid
              placeholder="Amount"
              name="amount"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Category</label>
            <Dropdown
              id="dropdown"
              placeholder="Select Category"
              fluid
              search
              selection
              options={this.props.dropdownCategories}
            />
          </Form.Field>

          <Button>Add</Button>
        </Form>
      </Segment>
    );
  }
}

export default NewTransactionForm;
