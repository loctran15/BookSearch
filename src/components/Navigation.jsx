import React from "react";
import { Nav, Container, Navbar } from "react-bootstrap";
import "../styles/Navigation.css";
export default function Navigation() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand href="/" className="nav-brand">
            <img
              src="/logo.png"
              alt="BookSearch logo"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            BookSearch
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/search">Search</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
