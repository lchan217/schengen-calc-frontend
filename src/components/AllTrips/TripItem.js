import React, { Component } from "react";
import { ListGroup, Row } from "react-bootstrap";

class TripItem extends Component {
  render() {
    return (
      <div>
        {this.props.trips.map((trip) => {
          let color = "";
          trip.passed ? (color = "secondary") : (color = "");
          return (
            <Row>
              <ListGroup className='w-100 p-1'>
                <ListGroup.Item variant={color}>
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
      </div>
    );
  }
}

export default TripItem;
