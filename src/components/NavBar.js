import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/NavBar.css";

const NavBar = () => {
  return (
    <div>
      <Navbar fixed='sticky' bg='primary' variant='dark'>
        <Nav>
          <Nav.Link as={Link} to='/all-trips'>
            All Trips
          </Nav.Link>
          <Nav.Link as={Link} to='/calculator'>
            Calculator
          </Nav.Link>
          <Nav.Link as={Link} to='/visa-info'>
            Visa Information
          </Nav.Link>
          <NavDropdown title='Countries'>
            <NavDropdown.Item href='#'>Germany</NavDropdown.Item>
            <NavDropdown.Item href='#'>France</NavDropdown.Item>
            <NavDropdown.Item href='#'>Etc</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link>Log Out</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
