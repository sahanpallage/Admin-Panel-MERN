import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import useAuth from "../../../auth/Auth";

export const Navigationbar = () => {
  const { logout } = useAuth();
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="">
      <Container>
        <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
        <Nav className="justify-between">
          <Nav.Link onClick={() => logout()}>Log out</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
