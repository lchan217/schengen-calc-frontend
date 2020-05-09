import React, { Component } from "react";
import { ListGroup, Row } from "react-bootstrap";
import "./TripItem.css";

class TripItem extends Component {
  constructor() {
    super();
    this.state = {
      flags: [],
    };
  }

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all?fields=name;flag")
      .then((response) => response.json())
      .then((response) => this.setState({ flags: response }));
  }

  getIcon = (trip) => {
    return this.state.flags.find((flag) => {
      if (flag.name === trip.location) {
        trip.image = flag.flag;
      }
    });
  };

  render() {
    return (
      <div>
        {this.props.trips.map((trip) => {
          this.getIcon(trip);
          let color = "";
          trip.passed ? (color = "secondary") : (color = "");
          return (
            <Row>
              <ListGroup className='w-100 p-1'>
                <ListGroup.Item variant={color}>
                  <h5>
                    {trip.location}{" "}
                    <img
                      className='flag-icon'
                      src={trip.image}
                      alt='flag icon'
                    />
                  </h5>

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
      </div>
    );
  }
}

export default TripItem;
