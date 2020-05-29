import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AutoChart } from "./AutoChart.js";
import EndgameChart from "./EndgameChart.js";
import TeleopChart from "./TeleopChart.js";
import CommentBox from "./CommentBox.js";

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
          <Col>
            <h4>Auto</h4>
            <p>Consistency Rating: </p>
            <p>Trends: (upwards or downwards)</p>
            <p>Specialty: (like bottom port, top port, etc)</p>
            <p>Max Ball Auto: </p>
            <p>Other Things: </p>
          </Col>
          <Col>
            <AutoChart team={searchedTeam} />
          </Col>
        </Row>
        <Row style={chart}>
          <Col>
            <h4>Teleop</h4>
            <p>Consistency Rating: </p>
            <p>Scoring Trends: (upwards or downwards)</p>
            <p>Specialty: (like bottom port, shooting, defense, etc)</p>
            <p>Can Do Defense?: </p>
            <p>Accuracy: </p>
            <p>Other: </p>
          </Col>
          <Col>
            <TeleopChart team={searchedTeam} />
          </Col>
        </Row>
        <Row style={chart}>
          <Col>
            <h4>Endgame</h4>
            <p>Can Climb?: </p>
            <p>Consistent Climb?: </p>
            <p>Consistent Level?: </p>
            <p>Can Climb In Multiple Positions?: </p>
            <p>Other: </p>
          </Col>
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
