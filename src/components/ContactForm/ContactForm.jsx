import { Component } from 'react';
import { Button, Form, Input, Label } from './ContactForm.styled';

const INITIAL_STATE = { name: '', number: '' };

export class ContactForm extends Component {
  state = { ...INITIAL_STATE };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const isAlreadyAdded = this.props.onSubmit(this.state);
    if (!isAlreadyAdded) this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;

    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={this.handleChange}
            required
          />

          <Label htmlFor="number">Number</Label>
          <Input
            type="tel"
            id="number"
            name="number"
            value={number}
            onChange={this.handleChange}
            required
          />

          <Button type="submit">Add contact</Button>
        </Form>
      </>
    );
  }
}
