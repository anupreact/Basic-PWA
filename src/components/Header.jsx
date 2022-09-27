import React from 'react'
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark">
    <Container>
      <Navbar.Brand>Navbar</Navbar.Brand>
      <Nav className="me-auto">
          <Link to="/">
            Home
          </Link>
          <Link to="/users">
            Users
          </Link>
          <Link to="/about">
            About
          </Link>
       
      </Nav>
    </Container>
  </Navbar>
  )
}

export default Header