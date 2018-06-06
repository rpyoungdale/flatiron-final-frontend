import React from "react";
import { Form, Segment, Grid, Dropdown, Button } from "semantic-ui-react";

const baseUrl = "http://localhost:3000";

class UserSetUp extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      inputs: ["input-0"]
    };
  }

  componentDidMount() {
    fetch(`${baseUrl}/categories`)
      .then(res => res.json())
      .then(json => {
        let dropdownParsed = [];
        json.map(category => {
          dropdownParsed.push({
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

  handleSubmit = e => {
    debugger;
  };

  appendInput = () => {
    var newInput = `input-${this.state.inputs.length}`;
    this.setState({ inputs: this.state.inputs.concat([newInput]) });
  };

  render() {
    return (
      <Grid>
        <Grid.Column width={4} />
        <Grid.Column width={8}>
          <Segment>
            <Form onSubmit={this.handleSubmit}>
              {this.state.inputs.map(input => (
                <Form.Group>
                  <Dropdown
                    onChange={this.chosenCategories}
                    placeholder="Categories"
                    fluid
                    search
                    selection
                    options={this.state.categories}
                    width={8}
                  />
                  <Form.Input placeholder="Amount" width={8} />
                </Form.Group>
              ))}
              <Button onClick={this.appendInput}>New Category</Button>
              <Button>Submit</Button>
            </Form>
          </Segment>
        </Grid.Column>
        <Grid.Column width={4} />
      </Grid>
    );
  }
}

export default UserSetUp;
