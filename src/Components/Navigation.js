import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export class Navigation extends Component {
  render() {
    return (
      <Navbar
        bg="dark"
        variant="dark"
        className="shadow justify-content-between"
        style={positioning}
      >
        <Container fluid style={positioning}>
          <Row>
            <Col>
              <Navbar.Brand style={brandWidth}>NEMƎSIS</Navbar.Brand>
            </Col>
            <Col sm={13}>
              <Form inline style={rightFloat}>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  style={searchWidth}
                />
                <Button variant="outline-light" style={btnWidth}>
                  Search
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Navbar>
    );
  }
}
const positioning = {
  position: "sticky",
  left: "0",
  top: "0",
  zIndex: "100",
};
const searchWidth = {
  width: "70vw",
};
const rightFloat = {
  float: "right",
};
const brandWidth = {
  width: "13.5vw",
};
const btnWidth = {
  width: "10vw",
};
export default Navigation;
