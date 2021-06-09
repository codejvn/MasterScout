import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { searchTeam } from "../Actions/searchTeam";
import { connect } from "react-redux";

export class NavigationRaw extends Component {
  searchHandle = (e) => {
    this.props.searchTeam(this._input.value);
    this._input.value = "";
    e.preventDefault();
  };
  render() {
    return (
      <Navbar
        bg="dark"
        variant="dark"
        className="shadow justify-content-between"
        style={positioning}
      >
        <Container fluid style={positioning}>
          <Row style={width}>
            <Col>
              <Navbar.Brand style={brandWidth}>NEMƎSIS</Navbar.Brand>
            </Col>
            <Col sm={13}>
              <Form inline onSubmit={this.searchHandle}>
                <input
                  type="text"
                  className="mr-sm-2"
                  ref={(el) => {
                    this._input = el;
                  }}
                  placeholder="Search"
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
const width = {
  width: "100%",
}
const positioning = {
  position: "sticky",
  left: "0",
  top: "0",
  zIndex: "100",
};
const searchWidth = {
  width: "65vw",
  padding: ".65%",
};
const brandWidth = {
  width: "13.5vw",
};
const btnWidth = {
  width: "10vw",
};
const mapStateToProps = (state) => {
  return {
  };
};
const mapDispatchToProps = (dispatch) => {
  // propName: (parameters) => dispatch(action)
  return {
    searchTeam: (teamNum) => dispatch(searchTeam(teamNum)),
  };
};

export const Navigation = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationRaw);
