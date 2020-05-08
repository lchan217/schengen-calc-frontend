import React from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogOut from "../LogOut";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div>
      <Navbar fixed='sticky' bg='primary' variant='dark'>
        <Nav>
          <Nav.Link as={Link} to='/all-trips' className='text-white'>
            All Trips
          </Nav.Link>
          <Nav.Link as={Link} to='/calculator' className='text-white'>
            Calculator
          </Nav.Link>
          <Nav.Link as={Link} to='/visa-info' className='text-white'>
            Visa Information
          </Nav.Link>
          <Dropdown navbar='true'>
            <Dropdown.Toggle>Countries</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Germany</Dropdown.Item>
              <Dropdown.Item>France</Dropdown.Item>
              <Dropdown.Item>Etc</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Nav.Link className='text-white right'>
            <LogOut />
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
