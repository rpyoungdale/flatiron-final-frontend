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
        budget_id: this.props.currentUser.id
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(json => console.log(json));
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <Segment>
        <Form onSubmit={this.persistCategory}>
          <h1>Add New Category</h1>
          <Form.Field inline>
            <label>Category Name</label>
            <Input
              placeholder="Name"
              name="name"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field inline>
            <label>Limit</label>
            <Input
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
