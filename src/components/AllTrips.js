import React, { Component } from "react";

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
      <div>
        <h1>All Trips</h1>
      </div>
    );
  }
}

export default AllTrips;
