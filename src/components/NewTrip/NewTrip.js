import React, { Component } from "react";
import { Form, Container, Button } from "react-bootstrap";
import "./NewTrip.css";

class NewTrip extends Component {
  constructor() {
    super();
    this.state = {
      destination: "",
      entry: "",
      exit: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { handleChange } = this;
    return (
      <Container className='new-trip-container'>
        <Form className='p-4'>
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
      </Container>
    );
  }
}

export default NewTrip;
