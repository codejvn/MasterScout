import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AutoChart } from "./AutoChart.js";
import EndgameChart from "./EndgameChart.js";
import TeleopChart from "./TeleopChart.js";
import CommentBox from "./CommentBox.js";
import Accordion from "react-bootstrap/Accordion";

export class TeamBreakdownRaw extends Component {
  render() {
    let searchedTeamNum = this.props.search.teamSearched; // this is the boy
    let searchedTeam = this.props.teams.teams.find(
      // finds the team if the teamnumber is equal to the searched teamnum
      (team) => team.teamNumber == searchedTeamNum
    );
    console.log(searchedTeam);
    return (
      <Container style={containerWidth}>
        <Row>
          <h1>{searchedTeamNum}</h1>
        </Row>
        <Row style={chart}>
          <Col>Some Auto Stuff</Col>
          <Col>
            <AutoChart team={searchedTeam} />
          </Col>
        </Row>
        <Row style={chart}>
          <Col>Some Teleop Stuff</Col>
          <Col>
            <TeleopChart team={searchedTeam} />
          </Col>
        </Row>
        <Row style={chart}>
          <Col>Some Endgame Stuff</Col>
          <Col>
            <EndgameChart team={searchedTeam} />
          </Col>
        </Row>
        <Row>
          <CommentBox team={searchedTeam} />
        </Row>
      </Container>
    );
  }
}
const chart = {
  height: "40%",
};
const spacer = {
  padding: "0.8vh",
};
const containerWidth = {
  width: "100%",
};
const mapStateToProps = (state) => {
  return {
    search: state.search,
    teams: state.dataReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  // propName: (parameters) => dispatch(action)
  return {
    // put actions here
  };
};

export const TeamBreakdown = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamBreakdownRaw);
