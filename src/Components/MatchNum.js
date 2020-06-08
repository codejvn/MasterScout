import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { setMatch } from "../Actions/TBAactions/setMatch";
import { setMatchData } from "../Actions/TBAactions/setMatchData";

export class MatchNumRaw extends Component {
  constrain = (num, min, max) => {
    num = num > max ? max : num;
    num = num < min ? min : num;
    return num;
  };
  increment = () => {
    let newMatchNum = this.props.matches.currentMatch + 1;
    newMatchNum = this.constrain(
      newMatchNum,
      1,
      this.props.tba.schedule.length
    );
    this.props.setMatch(newMatchNum);
    this.props.setMatchData(this.props.tba.schedule[newMatchNum - 1]);
  };
  decrement = () => {
    let newMatchNum = this.props.matches.currentMatch - 1;
    newMatchNum = this.constrain(
      newMatchNum,
      1,
      this.props.tba.schedule.length
    );
    this.props.setMatch(newMatchNum);
    this.props.setMatchData(this.props.tba.schedule[newMatchNum - 1]);
  };
  render() {
    return (
      <div style={center}>
        <Container>
          <Row style={spacer}>
            <Col></Col>
            <Col>
              <Button style={ButtonColors} onClick={this.decrement}>
                Back
              </Button>
            </Col>
            <Col sm={0}>
              <h2>{this.props.matchNum}</h2>
            </Col>
            <Col>
              <Button style={ButtonColors} onClick={this.increment}>
                Next
              </Button>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const center = {
  width: "90%",
  textAlign: "center",
};
const mapStateToProps = (state) => {
  return {
    matches: state.matches,
    tba: state.thebluealliance,
  };
};
const spacer = {
  marginTop: "1vh",
};
const ButtonColors = {
  backgroundColor: "lightGray",
  color: "black",
};
const mapDispatchToProps = (dispatch) => {
  // propName: (parameters) => dispatch(action)
  return {
    setMatch: (num) => dispatch(setMatch(num)),
    setMatchData: (match) => dispatch(setMatchData(match)),
  };
};
export const MatchNum = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchNumRaw);
