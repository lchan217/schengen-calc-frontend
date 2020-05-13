import React, { Component, useState } from "react";
import {
  Form,
  FormControl,
  Container,
  Button,
  Alert,
  Dropdown,
} from "react-bootstrap";
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

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <Button
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
        &#x25bc;
      </Button>
    ));

    const CustomMenu = React.forwardRef(
      ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
        const [value, setValue] = useState("");

        return (
          <div
            ref={ref}
            style={style}
            className={className}
            aria-labelledby={labeledBy}
          >
            <FormControl
              autoFocus
              className='mx-3 my-2 w-auto'
              placeholder='Type to filter...'
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            <ul className='list-unstyled'>
              {React.Children.toArray(children).filter(
                (child) =>
                  !value || child.props.children.toLowerCase().startsWith(value)
              )}
            </ul>
          </div>
        );
      }
    );

    const countries = [
      "Austria",
      "Belgium",
      "Czech Republic",
      "Denmark",
      "Estonia",
      "Finland",
      "France",
      "Germany",
      "Greece",
      "Hungary",
      "Iceland",
      "Italy",
      "Latvia",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Malta",
      "Netherlands",
      "Norway",
      "Poland",
      "Portugal",
      "Slovakia",
      "Slovenia",
      "Spain",
      "Sweden",
      "Switzerland",
    ];

    return (
      <Container className='new-trip-container'>
        <Form className='p-4' onSubmit={handleSubmit}>
          <Form.Group controlId='entry'>
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle}>Destination</Dropdown.Toggle>

              <Dropdown.Menu as={CustomMenu}>
                {countries.map((country, i) => {
                  return (
                    <Dropdown.Item
                      onClick={handleChange}
                      type='text'
                      name='destination'
                      value={country}
                      eventKey={i}
                    >
                      {country}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
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
