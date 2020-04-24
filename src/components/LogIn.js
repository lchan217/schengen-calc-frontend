import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <div>
        <Form className='w-50 p-5'>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type='email'
              name='email'
              placeholder='Email'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type='password'
              name='password'
              placeholder='Password'
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
          <br />
          Click here to create new
          <br />
          Authentication
        </Form>
      </div>
    );
  }
}

export default LogIn;
