import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const NavBar = () => {
  return (
    <div>
      <Navbar fixed='sticky' bg='primary' variant='dark'>
        <Nav>
          <Nav.Link>All Trips</Nav.Link>
          <Nav.Link>Calculator</Nav.Link>
          <Nav.Link>Visa Information</Nav.Link>
          <NavDropdown title='Countries'>
            <NavDropdown.Item href='#'>Germany</NavDropdown.Item>
            <NavDropdown.Item href='#'>France</NavDropdown.Item>
            <NavDropdown.Item href='#'>Etc</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link>Log Out</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
