import React, { Component } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import "./NewUser.css";

class NewUser extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3001/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
        },
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          this.setState({ error: response.error });
        } else {
          this.props.history.push("/all-trips");
        }
      })
      .catch((error) => console.log("api errors:", error));
  };

  showErrors = () => {
    if (this.state.error) {
      return this.state.error.map((error) => {
        return <Alert variant='danger'>{error}</Alert>;
      });
    }
  };

  render() {
    const { handleChange, handleSubmit } = this;
    return (
      <Container className='p-5'>
        <h1>Sign Up!</h1>
        <Form className='w-50' onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={handleChange}
              type='email'
              name='email'
              placeholder='Email'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              type='password'
              name='password'
              placeholder='Password'
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
        <br />
        {this.showErrors()}
      </Container>
    );
  }
}

export default NewUser;
