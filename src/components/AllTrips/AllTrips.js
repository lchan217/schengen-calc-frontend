import React, { Component } from "react";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./AllTrips.css";
import TripItem from "./TripItem";

class AllTrips extends Component {
  constructor() {
    super();
    this.state = {
      past: [],
      future: [],
      originalFuture: [],
      originalPast: [],
      beginning: "",
      end: "",
      errors: "",
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
          this.setState({
            past: response.past,
            future: response.future,
            originalPast: response.past,
            originalFuture: response.future,
          })
        );
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.beginning > this.state.end) {
      this.setState({ errors: "Date of exit must be after date of entry" });
    } else if (this.state.beginning && this.state.end) {
      let filteredPastTrips = this.state.past.filter((trip) => {
        return trip.exit > this.state.beginning && trip.exit < this.state.end;
      });
      let filteredFutureTrips = this.state.future.filter((trip) => {
        return trip.exit >= this.state.beginning && trip.exit <= this.state.end;
      });
      this.setState({
        past: filteredPastTrips,
        future: filteredFutureTrips,
      });
    } else {
      this.setState({
        errors: "Please fill out both dates",
      });
    }
  };

  handleClear = (event) => {
    event.preventDefault();
    this.setState({
      past: this.state.originalPast,
      future: this.state.originalFuture,
      errors: "",
    });
    document.querySelector("input#beginning.form-control").value = "";
    document.querySelector("input#end.form-control").value = "";
  };

  render() {
    const { handleChange, handleSubmit, handleClear } = this;
    return (
      <div className='all-trips-container'>
        <Container>
          <Form classname='filter-dates-form' onSubmit={handleSubmit}>
            <Row>
              <Col xs={3}></Col>
              <b>Filter: </b>

              <Col xs={3}>
                <Form.Group controlId='beginning'>
                  <Form.Control
                    name='beginning'
                    onChange={handleChange}
                    type='date'
                  />
                  <Form.Text className='text-muted'>
                    Based on date of exit.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Form.Group controlId='end'>
                  <Form.Control
                    name='end'
                    onChange={handleChange}
                    type='date'
                  />
                  <Form.Text className='text-muted'>
                    Based on date of exit.
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col>
                <Button variant='primary' size='sm' type='submit'>
                  Search
                </Button>{" "}
              </Col>
              <Col>
                <Button
                  onClick={handleClear}
                  variant='primary'
                  size='sm'
                  type='submit'
                >
                  Clear
                </Button>{" "}
              </Col>
            </Row>
          </Form>
          {this.state.errors ? (
            <Row>
              <Col xs={4}></Col>
              <Col xs={5}>
                <Alert variant='danger'>{this.state.errors}</Alert>
              </Col>
            </Row>
          ) : null}
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
