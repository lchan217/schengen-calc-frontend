import React, { Component } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3001/api/v1/login", {
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
          this.setState({ errors: response.error });
        } else {
          localStorage.setItem("token", response.jwt);
          this.props.history.push("/all-trips");
        }
      })
      .catch((error) => console.log("api errors:", error));
  };

  showErrors = () => {
    if (this.state.errors) {
      return <Alert variant='danger'>{this.state.errors}</Alert>;
    }
  };

  render() {
    const { handleChange, handleSubmit, showErrors } = this;
    return (
      <Container className='p-5'>
        <h1>Sign In</h1>
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
          <br />
          <br />
          <Link to='/signup'>Create New Account</Link>
          <br />
          Log In With Authentication
        </Form>
        <br />
        {showErrors()}
      </Container>
    );
  }
}

export default LogIn;
