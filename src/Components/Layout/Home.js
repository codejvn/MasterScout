import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { MatchNum } from "../MatchNum";
import MatchRow from "../MatchRow";
import { RawDataTable } from "./ManageDataTabs/RawDataTable";
import AnalyzedTable from "./ManageDataTabs/AnalyzedTable";
import { GetStartedPopup } from "../GetStartedPopup";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from "react-bootstrap/Button";

let tba;
let matches;
let data;

export class Home extends Component {
  componentDidMount() {
    // this.props.setTeam(2590);
    // this.props.setEvents(2590);
    // this.props.setSchedule(tba.event.key);
  }
  getBlueTeams = () => {
    return tba.schedule[matches.currentMatch - 1].alliances.blue.team_keys.map(
      (teamNum) => {
        let teamElement = this.props.dataReducer.teams.find(
          (team) => team.teamNumber == teamNum.slice(3)
        );
        return teamElement;
      }
    );
  };
  getRedTeams = () => {
    return tba.schedule[matches.currentMatch - 1].alliances.red.team_keys.map(
      (teamNum) => {
        let teamElement = this.props.dataReducer.teams.find(
          (team) => team.teamNumber == teamNum.slice(3)
        );
        return teamElement;
      }
    );
  };
  getTeams = () => {
    let teams = [];
    teams.push(...this.getBlueTeams());
    teams.push(...this.getRedTeams());
    console.log("THESE ARE THE TEAMS");
    console.log(teams);
    return teams;
  };

  setTeama = async () => {
    const res =  await axios.post('https://jsonbox.io/box_27ac3dacb977a1e82148/data', {text: "hello"});
    console.log(res);
  }

  render() {
    tba = this.props.thebluealliance;
    matches = this.props.matches;
    data = this.props.dataReducer;
    return (
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
        <Button onClick={() => {this.setTeama()}}>test db</Button>
        <Container>
          <Row className="border-bottom">
            <Col>
              <h2 style={homeHeader}>Home</h2>
            </Col>
          </Row>
          <Row style={spacer}></Row>
          <Row>
            <MatchNum matchNum={matches.currentMatch} />
          </Row>
          <Row>
            {tba.schedule.length > 10 && (
              <Table
                striped
                borderless
                hover
                variant="light"
                style={{ marginTop: "2%" }}
              >
                <thead>
                  <tr>
                    <th style={match}>Match #</th>
                    <th style={blueAlliance}>Team 1</th>
                    <th style={blueAlliance}>Team 2</th>
                    <th style={blueAlliance}>Team 3</th>
                    <th style={redAlliance}>Team 4</th>
                    <th style={redAlliance}>Team 5</th>
                    <th style={redAlliance}>Team 6</th>
                  </tr>
                </thead>
                <MatchRow
                  match={tba.schedule[matches.currentMatch - 1]}
                  currentMatch="no highlight"
                />
              </Table>
            )}
          </Row>
          <Row>
            {tba.schedule.length > 10 && (
              <Table>
                {tba.schedule[
                  matches.currentMatch - 1
                ].alliances.blue.team_keys.map((teamNum) => {
                  let teamElement = this.props.dataReducer.teams.find(
                    (team) => team.teamNumber == teamNum.slice(3)
                  );
                  return <RawDataTable team={teamElement} />;
                })}
              </Table>
            )}
          </Row>
          <Row>
            {tba.schedule.length > 10 && (
              <Table>
                {tba.schedule[
                  matches.currentMatch - 1
                ].alliances.red.team_keys.map((teamNum) => {
                  let teamElement = this.props.dataReducer.teams.find(
                    (team) => team.teamNumber == teamNum.slice(3)
                  );
                  return <RawDataTable team={teamElement} />;
                })}
              </Table>
            )}
          </Row>
          <Row>
            {tba.schedule.length > 10 && (
              <AnalyzedTable teams={this.getTeams()} />
            )}
          </Row>
          <Row></Row>
        </Container>
        <GetStartedPopup />
      </div>
    );
  }
}
const spacer = {
  padding: "1vh",
};
const homeHeader = {
  marginBottom: "2%",
};
const match = {
  backgroundColor: "rgb(200,200,200)",
  textAlign: "center",
};
const blueAlliance = {
  backgroundColor: "rgba(54, 162, 235, 0.7)",
  textAlign: "center",
};
const center = {
  textAlign: "center",
};
const redAlliance = {
  backgroundColor: "rgba(255, 99, 132, 0.7)",
  textAlign: "center",
};
const mapStateToProps = (state) => {
  return {
    thebluealliance: state.thebluealliance,
    dataReducer: state.dataReducer,
    matches: state.matches,
  };
};
const mapDispatchToProps = (dispatch) => {
  // propName: (parameters) => dispatch(action)
  return {};
};
export const HomeCom = connect(mapStateToProps, mapDispatchToProps)(Home);
