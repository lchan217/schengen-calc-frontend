import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import "./AllTrips.css";

class AllTrips extends Component {
  constructor() {
    super();
    this.state = {
      trips: [],
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
        .then((response) => this.setState({ trips: response }));
    }
  }
  render() {
    return (
      <div className='all-trips-container'>
        <h1 className='text-center'>All Trips</h1>
        <ListGroup>
          {this.state.trips.map((trip) => {
            return (
              <ListGroup.Item className='w-50'>
                {trip.location} - {trip.entry} - {trip.exit}{" "}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

export default AllTrips;
