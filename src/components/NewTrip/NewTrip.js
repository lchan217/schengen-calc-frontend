import React, { Component } from "react";
import { Form, Container, Button, Alert } from "react-bootstrap";
import "./NewTrip.css";

class NewTrip extends Component {
  constructor() {
    super();
    this.state = {
      destination: "",
      entry: "",
      exit: "",
      errors: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const body = {
      location: this.state.destination,
      entry: this.state.entry,
      exit: this.state.exit,
    };

    let token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:3001/api/v1/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.error) {
            this.setState({ errors: response.error });
          } else {
            console.log(response);
            this.props.history.push("/all-trips");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  showErrors = () => {
    if (this.state.errors) {
      return this.state.errors.map((error) => {
        return <Alert variant='danger'>{error}</Alert>;
      });
    }
  };

  render() {
    const { handleChange, handleSubmit, showErrors } = this;
    return (
      <Container className='new-trip-container'>
        <Form className='p-4' onSubmit={handleSubmit}>
          <Form.Group controlId='destination'>
            <Form.Label>Destination</Form.Label>
            <Form.Control
              onChange={handleChange}
              type='text'
              name='destination'
              placeholder='Enter destination'
            />
          </Form.Group>
          <Form.Group controlId='entry'>
            <Form.Label>Entry</Form.Label>
            <Form.Control
              onChange={handleChange}
              type='date'
              name='entry'
              placeholder='Enter date of entry'
            />
          </Form.Group>
          <Form.Group controlId='exit'>
            <Form.Label>Exit</Form.Label>
            <Form.Control
              onChange={handleChange}
              type='date'
              name='exit'
              placeholder='Enter date of exit'
            />
          </Form.Group>
          <Form.Text className='text-muted'>
            All fields must be filled out
          </Form.Text>
          <br />
          <Button type='submit'>Submit</Button>
        </Form>
        {showErrors()}
      </Container>
    );
  }
}

export default NewTrip;
