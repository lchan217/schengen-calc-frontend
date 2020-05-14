import React, { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./AllTrips.css";
import TripItem from "./TripItem";

class AllTrips extends Component {
  constructor() {
    super();
    this.state = {
      past: [],
      future: [],
      entry: "",
      exit: "",
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      return fetch("http://localhost:3001/api/v1/trips", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((response) =>
          this.setState({ past: response.past, future: response.future })
        );
    }
  }
  render() {
    return (
      <div className='all-trips-container'>
        <Container>
          <Form classname='filter-dates-form'>
            <Row>
              <Col xs={3}></Col>
              <b>Filter: </b>
              <Col xs={3}>
                <Form.Group controlId='entry'>
                  <Form.Label>Date of Entry</Form.Label>
                  <Form.Control type='date' />
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Form.Group controlId='exit'>
                  <Form.Label>Date of Exit</Form.Label>
                  <Form.Control type='date' />
                </Form.Group>
              </Col>
              <Col>
                <Button
                  className='search-button'
                  variant='primary'
                  size='sm'
                  type='submit'
                >
                  Search
                </Button>{" "}
              </Col>
            </Row>
          </Form>
          <Button as={Link} to='/new-trip' className='float-right'>
            +
          </Button>
          <br />
          <Row>
            <Col>
              <h1 className='text-center'>Past Trips</h1>
              <TripItem trips={this.state.past} />
            </Col>
            <Col>
              <h1 className='text-center'>Future Trips</h1>
              <TripItem trips={this.state.future} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AllTrips;
