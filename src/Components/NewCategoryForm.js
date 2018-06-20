import React from "react";
import {
  Segment,
  Grid,
  Form,
  Input,
  Dropdown,
  Button,
  Message
} from "semantic-ui-react";

const baseUrl = "http://localhost:3000";

class NewCategoryForm extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      limit: "",
      categoryAdded: false
    };
  }

  persistCategory = () => {
    fetch(`${baseUrl}/categories`, {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        limit: this.state.limit,
        budget_id: this.props.chosenBudget.id
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(json =>
        this.props.changeBudget(this.props.chosenMonth, this.props.chosenYear)
      );
    this.setState({
      name: "",
      limit: "",
      categoryAdded: true
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  hideCategoryMessage = () => {
    this.setState({
      categoryAdded: false
    });
  };

  render() {
    console.log("category", this.props);
    return (
      <Segment>
        {this.state.categoryAdded ? (
          <Message
            positive
            onDismiss={this.hideCategoryMessage}
            header="Category Added"
          />
        ) : null}
        <Form onSubmit={this.persistCategory}>
          <Form.Field>
            <label>Category Name</label>
            <Input
              fluid
              placeholder="Name"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </Form.Field>
          <Form.Field>
            <label>Limit</label>
            <Input
              fluid
              placeholder="Spending Limit"
              name="limit"
              onChange={this.handleChange}
              value={this.state.limit}
            />
          </Form.Field>
          <Button>Add</Button>
        </Form>
      </Segment>
    );
  }
}

export default NewCategoryForm;
