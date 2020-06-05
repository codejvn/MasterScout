import React, { Component } from "react";
import LineGraph from '../../LineGraph';
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AutoChart } from "./AutoChart.js";
import EndgameChart from "./EndgameChart.js";
import TeleopChart from "./TeleopChart.js";
import CommentBox from "./CommentBox.js";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export class TeamBreakdownRaw extends Component {

  getAutoProp = (key) => {
    if (key === 2) {
      return "BOTTOM";
    }
    else if (key === 3) {
      return "OUTER"
    }
    return "INNER"
  }

  getTeleopProp = (key) => {
    if (key === 0) {
      return "BOTTOM"
    }
    else if (key === 1) {
      return "OUTER"
    }
    else if (key === 2) {
      return "INNER"
    }
    else if (key === 3) {
      return "MISSED"
    }
    return "CYCLES"
  }

  doAutoCharts = (team) => {
    let charts = [];
    let relevantIndices = [2, 3, 4]
    try {
      let dataSets = [];
      for (let i = 0; i < relevantIndices.length; i++) {
        dataSets.push({
          data: team.organizedDataSets[0][relevantIndices[i]],
          teamNumber: this.getAutoProp(relevantIndices[i]),
        });
      }
      charts.push(
        <Container>
          <Col>
            <LineGraph
              style={lineWidth}
              title="AUTONOMOUS"
              dataSets={dataSets}
            />
          </Col>
        </Container>
      );
      return charts;
    } catch (err) {
      return [];
    }
  };

  doTeleopCharts = (team) => {
    let charts = [];
    let relevantIndices = [0, 1, 2, 3, 4]
    try {
      let sectionCharts = [[<Col></Col>, <Col></Col>, <Col></Col>]];
      let dataSets = [];
      for (let i = 0; i < relevantIndices.length; i++) {
        dataSets.push({
          data: team.organizedDataSets[1][relevantIndices[i]],
          teamNumber: this.getTeleopProp(relevantIndices[i]),
        });
      }
      charts.push(
        <Container>
          <Col>
            <LineGraph
              style={lineWidth}
              title="TELEOPERATED"
              dataSets={dataSets}
            />
          </Col>
        </Container>
      );
      return charts;
    } catch (err) {
      return [];
    }
  };

  getEndgameProp = (key) => {
    if (key === 0) {
      return "CLIMBED?"
    }
    else if (key === 1) {
      return "LEVEL?"
    }
    else {
      return "TIME LEFT"
    }
  }

  doEndgameCharts = (team) => {
    let charts = [];
    let relevantIndices = [0, 1, 4]
    try {
      let sectionCharts = [[<Col></Col>, <Col></Col>, <Col></Col>]];
      let dataSets = [];
      for (let i = 0; i < relevantIndices.length; i++) {
        dataSets.push({
          data: team.organizedDataSets[2][relevantIndices[i]],
          teamNumber: this.getEndgameProp(relevantIndices[i]),
        });
      }
      charts.push(
        <Container>
          <Col>
            <LineGraph
              style={lineWidth}
              title="ENDGAME"
              dataSets={dataSets}
            />
          </Col>
        </Container>
      );
      return charts;
    } catch (err) {
      return []
    }
  };


  getAccuracy = (team) => {
    var accuracy = 0;
    try {
      accuracy = parseInt(
        100 -
        (team.aggregated[1][3] /
          (team.aggregated[1][7] +
            team.aggregated[1][8] +
            team.aggregated[1][9] +
            team.aggregated[1][10])) *
        100
      );
      return accuracy;
    } catch (err) {
      return "NA";
    }
  };
  getDefenseLevel = (team) => {
    var defense = 0;
    try {
      defense = team.aggregated[1][11];
      return defense;
    } catch (err) {
      return "NA";
    }
  };
  estimatedPoints = (team) => {
    try {
      //auto points
      var autoInner = team.aggregated[0][4] * 6
      var autoOuter = team.aggregated[0][3] * 4
      var autoBottom = team.aggregated[0][2] * 2
      var crossPoints = team.aggregated[0][1] * 5

      //teleop points (not endgame)
      var teleInner = team.aggregated[1][2] * 3
      var teleOuter = team.aggregated[1][1] * 2
      var teleBottom = team.aggregated[1][0] * 1
      var cpRotation = team.aggregated[1][5] * 10
      var cpPosition = team.aggregated[1][5] * 10

      //endgame points
      var climbPoints = team.aggregated[2][0] * 25
      var levelPoints = team.aggregated[2][1] * 15

      return (
        autoInner + autoOuter + autoBottom + crossPoints +
        teleInner + teleOuter + teleBottom + cpRotation + cpPosition + climbPoints + levelPoints
      );

    } catch (err) {
      return 0;
    }
  };
  autoPoints = (team) => {
    var points = 0;
    try {
      //auto points
      var autoInner = team.aggregated[0][4] * 6
      var autoOuter = team.aggregated[0][3] * 4
      var autoBottom = team.aggregated[0][2] * 2
      var crossPoints = team.aggregated[0][1] * 5

      return (
        autoInner + autoOuter + autoBottom + crossPoints
      );

    } catch (err) {
      return 0;
    }
  };
  teleopPoints = (team) => {
    var points = 0;
    try {
      //teleop points
      var teleInner = team.aggregated[1][2] * 3
      var teleOuter = team.aggregated[1][1] * 2
      var teleBottom = team.aggregated[1][0] * 1
      var cpRotation = team.aggregated[1][5] * 10
      var cpPosition = team.aggregated[1][5] * 10

      return (
        teleInner + teleOuter + teleBottom + cpRotation + cpPosition
      );

    } catch (err) {
      return 0;
    }
  }
  endgamePoints = (team) => {
    var points = 0;
    try {
      //endgame points
      var climbPoints = team.aggregated[2][0] * 25
      var levelPoints = team.aggregated[2][1] * 15

      return (
        climbPoints + levelPoints
      );

    } catch (err) {
      return 0;
    }
  };
  //getters for breakdown autonomous
  innerAuto = (team) => {
    try {
      return team.aggregated[0][4] * 6;
    } catch (err) {
      return 0;
    }
  }
  outerAuto = (team) => {
    try {
      return team.aggregated[0][3] * 4;
    } catch (err) {
      return 0;
    }
  }
  bottomAuto = (team) => {
    try {
      return team.aggregated[0][2] * 2;
    } catch (err) {
      return 0;
    }
  }
  crossedInit = (team) => {
    try {
      return team.aggregated[0][1] * 4;
    } catch (err) {
      return 0;
    }
  }
  //getters for breakdown teleop
  outerTeleop = (team) => {
    try {
      return team.aggregated[1][1] * 2;
    } catch (err) {
      return 0;
    }
  }
  innerTeleop = (team) => {
    try {
      return team.aggregated[1][2] * 3;
    } catch (err) {
      return 0;
    }
  }
  bottomTeleop = (team) => {
    try {
      return team.aggregated[1][0] * 4;
    } catch (err) {
      return 0;
    }
  }
  cpPosition = (team) => {
    try {
      return team.aggregated[1][6] * 10;
    } catch (err) {
      return 0;
    }
  }
  cpRotation = (team) => {
    try {
      return team.aggregated[1][5] * 4;
    } catch (err) {
      return 0;
    }
  }
  //endgame points
  climbPoints = (team) => {
    try {
      return team.aggregated[2][0] * 25;
    } catch (err) {
      return 0;
    }
  }
  levelPoints = (team) => {
    try {
      return team.aggregated[2][1] * 15;
    } catch (err) {
      return 0;
    }
  }
  //IMPORTANT INFO FOR EACH GAME MODE
  canClimb = (team) => {
    try {
      if (team.aggregated[2][0] > 0) {
        return 'YES';
      }
      return 'NO';
    } catch (err) {
      return 'NA'
    }
  }
  //doesnt work atm
  mostCommonClimbLocation = (team) => {
    try {
      return team.aggregated[2][2]
    } catch (err) {
      return 'NA'
    }
  }
  specialty = (team) => {
    try {
      //if avg defense is greater than 3.5 (probably plays consistent and good defense)
      if (team.aggregated[1][11] > 3.5) {
        return 'DEFENSE'
      }
      //if total in upper (inner + outer) is greater than bottom --> high goal
      else if (team.aggregated[1][1] + team.aggregated[1][2] >= team.aggregated[1][0]) {
        return 'SHOOTING'
      }
      return 'BOTTOM'
    } catch (err) {
      return 'NA'
    }
  }

  render() {
    let searchedTeamNum = this.props.search.teamSearched; // this is the boy
    let searchedTeam = this.props.teams.teams.find(
      // finds the team if the teamnumber is equal to the searched teamnum
      (team) => team.teamNumber == searchedTeamNum
    );

    return (
      <Container style={containerWidth}>
        <Row>
          <h1 style={{ textAlign: "center", width: "100%" }}>
            Team {searchedTeamNum} / Estimated Points: {this.estimatedPoints(searchedTeam)}
          </h1>
        </Row>
        <Row style={chart}>
          <Col>
            <h4>Autonomous</h4>
            <p style={extCatMargin}>Specialty:</p>
            <p>Max Ball Auto: </p>
          </Col>
          <Col>
            <Tabs defaultActiveKey="bar" id="uncontrolled-tab">
              <Tab eventKey="bar" title="Bar">
                <AutoChart team={searchedTeam} />
              </Tab>
              <Tab eventKey="line" title="Line">
                {this.doAutoCharts(searchedTeam)};
              </Tab>
            </Tabs>
          </Col>
        </Row>
        <Row style={chart}>
          <Col>
            <h4>Teleoperated</h4>
            <p style={extCatMargin}>Specialty: {this.specialty(searchedTeam)}</p>
            <p>Avg Defense Level: {this.getDefenseLevel(searchedTeam)} </p>
            <p>Accuracy: {this.getAccuracy(searchedTeam)} %</p>
          </Col>
          <Col>
            <Tabs defaultActiveKey="bar" id="uncontrolled-tab">
              <Tab eventKey="bar" title="Bar">
                <TeleopChart team={searchedTeam} />
              </Tab>
              <Tab eventKey="line" title="Line">
                {this.doTeleopCharts(searchedTeam)};
              </Tab>
            </Tabs>
          </Col>
        </Row>
        <Row style={chart}>
          <Col>
            <h4>Endgame</h4>
            <p style={extCatMargin}>Can Climb: {this.canClimb(searchedTeam)} </p>
            <p>Most Common Climb Location: </p>
            <p>Can Climb In Multiple Positions?: </p>
          </Col>
          <Col>
            <Tabs defaultActiveKey="bar" id="uncontrolled-tab">
              <Tab eventKey="bar" title="Bar">
                <EndgameChart team={searchedTeam} />
              </Tab>
              <Tab eventKey="line" title="Line">
                {this.doEndgameCharts(searchedTeam)};
              </Tab>
            </Tabs>
          </Col>
        </Row>
        <Row>
          <CommentBox team={searchedTeam} />
        </Row>
        <Row style={pointBreakdown}>
          <h2>Point Breakdown for Team {searchedTeamNum} : {this.estimatedPoints(searchedTeam)} points</h2>
        </Row>
        <Row style={pointBreakdown}>
          <Row style={rowWidth}>
            <Col style={breakdownCol}>
              <h4 style={breakdown}>AUTONOMOUS : {this.autoPoints(searchedTeam)}</h4>
              <p style={breakdownInBreakdown}>AVG CROSS INIT LINE: {this.crossedInit(searchedTeam)} pts</p>
              <p style={breakdownInBreakdown}>AVG INNER PORT: {this.innerAuto(searchedTeam)} pts</p>
              <p style={breakdownInBreakdown}>AVG OUTER PORT: {this.outerAuto(searchedTeam)} pts</p>
              <p style={breakdownInBreakdown}>AVG BOTTOM PORT: {this.bottomAuto(searchedTeam)} pts</p>
            </Col>
            <Col style={breakdownCol}>
              <h4 style={breakdown}>TELEOPERATED : {this.teleopPoints(searchedTeam)}</h4>
              <p style={breakdownInBreakdown}>AVG INNER PORT: {this.innerTeleop(searchedTeam)} pts</p>
              <p style={breakdownInBreakdown}>AVG OUTER PORT: {this.outerTeleop(searchedTeam)} pts</p>
              <p style={breakdownInBreakdown}>AVG BOTTOM PORT: {this.bottomTeleop(searchedTeam)} pts</p>
              <p style={breakdownInBreakdown}>AVG CP ROTATION: {this.cpRotation(searchedTeam)} pts</p>
              <p style={breakdownInBreakdown}>AVG CP POSITION: {this.cpPosition(searchedTeam)} pts</p>
            </Col>
            <Col style={breakdownCol}>
              <h4 style={breakdown}>ENDGAME : {this.endgamePoints(searchedTeam)}</h4>
              <p style={breakdownInBreakdown}>AVG CLIMB SUCCESS: {this.climbPoints(searchedTeam)} pts</p>
              <p style={breakdownInBreakdown}>AVG LEVEL: {this.levelPoints(searchedTeam)} pts</p>
            </Col>
          </Row>
        </Row>
      </Container>
    );
  }
}
const chart = {
  height: "40%",
};
const breakdownInBreakdown = {
  textAlign: "left",
}
const breakdownCol = {
  backgroundColor: 'rgba(100,100,100,0.1)',
  paddingTop: "2vh",
}
const rowWidth = {
  width: "100%",
}
const containerWidth = {
  width: "100%",
};
const breakdown = {
  textAlign: "left",
  marginBottom: "2vh",
}
const pointBreakdown = {
  marginTop: "3vh",
  textAlign: "center",
}
const mapStateToProps = (state) => {
  return {
    search: state.search,
    teams: state.dataReducer,
  };
};
const lineWidth = {
  width: "26%",
};
const extCatMargin = {
  marginTop: "12%",
}
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
