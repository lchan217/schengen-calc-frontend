import React, { Component } from "react";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import "./AllTrips.css";

class AllTrips extends Component {
  constructor() {
    super();
    this.state = {
      past: [],
      future: [],
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
          <Row>
            <Col>
              <h1 className='text-center'>Past Trips</h1>
              {this.state.past.map((trip) => {
                return (
                  <Row>
                    <ListGroup className='w-100 p-1'>
                      <ListGroup.Item variant='secondary'>
                        <h5>{trip.location}</h5>
                        <div>
                          <b>Date of Entry:</b> {trip.entry}
                          <br />
                          <b>Date of Exit:</b> {trip.exit}
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  </Row>
                );
              })}
            </Col>
            <Col>
              <h1 className='text-center'>Future Trips</h1>
              {this.state.future.map((trip) => {
                return (
                  <Row>
                    <ListGroup className='w-100 p-1'>
                      <ListGroup.Item>
                        <h5>{trip.location}</h5>
                        <div>
                          <b>Date of Entry:</b> {trip.entry}
                          <br />
                          <b>Date of Exit:</b> {trip.exit}
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  </Row>
                );
              })}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AllTrips;
