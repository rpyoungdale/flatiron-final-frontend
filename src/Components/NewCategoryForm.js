import React from "react";
import {
  Segment,
  Grid,
  Form,
  Input,
  Dropdown,
  Button
} from "semantic-ui-react";

const baseUrl = "http://localhost:3000";

class NewCategoryForm extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      limit: ""
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
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    console.log("category", this.props);
    return (
      <Segment>
        <Form onSubmit={this.persistCategory}>
          <Form.Field>
            <label>Category Name</label>
            <Input
              fluid
              placeholder="Name"
              name="name"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Limit</label>
            <Input
              fluid
              placeholder="Spending Limit"
              name="limit"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button>Add</Button>
        </Form>
      </Segment>
    );
  }
}

export default NewCategoryForm;
