import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { editTeam } from "../../../Actions/EditActions/editTeam";
import { setModal } from "../../../Actions/EditActions/setModal";
// import { setModal } from "../../../Actions/EditActions/setModal";
// import edit modal
import { connect } from "react-redux";

export class RawDataTableRaw extends Component {
  getTeamNum = (team) => {};
  showModal = (e) => {
    this.props.setModal(true);
    console.log(this.props.team.teamNumber);
    this.props.editTeam(this.props.team.teamNumber);
  };
  render() {
    let validTeam = true;
    let team;
    try {
      console.log(this.props.team);
      team = this.props.team;
    } catch (err) {
      validTeam = false;
    }
    if (team == undefined) {
      validTeam = false;
    }
    if (validTeam) {
      return (
        <div style={middle}>
          <Accordion defaultActiveKey="1">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                {team.teamNumber}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <div>
                  <Table hover borderless style={noTop} striped>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Start Location</th>
                        <th>Crossed Init Line</th>
                        <th>Bottom Scored</th>
                        <th>Outer Scored</th>
                        <th>Inner Scored</th>
                        <th>Init Line Attempted</th>
                        <th>Near Trench Attempted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {team.autoData.map((match) => (
                        <tr>
                          <td>
                            {team.matchNums[team.autoData.indexOf(match)]}
                          </td>
                          {console.log(match)}
                          {match.map((matchData) => (
                            <td>{JSON.stringify(matchData.value)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Table hover borderless style={noTop} striped>
                    <thead>
                      <th>#</th>
                      <th>Bottom Scored</th>
                      <th>Outer Scored</th>
                      <th>Inner Scored</th>
                      <th>Missed</th>
                      <th>T-Zone Shot</th>
                      <th>Init Line Shot</th>
                      <th>Near Trench Shot</th>
                      <th>Far Trench Shot</th>
                      <th># Cycles</th>
                      <th>Defense Rating</th>
                      <th>CP Rotation</th>
                      <th>CP Position</th>
                    </thead>
                    <tbody>
                      {team.teleopData.map((match) => (
                        <tr>
                          <td>
                            {team.matchNums[team.teleopData.indexOf(match)]}
                          </td>
                          {match.map((matchData) => (
                            <td>{JSON.stringify(matchData.value)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Table hover borderless style={noTop} striped>
                    <thead>
                      <th>#</th>
                      <th>Climbed?</th>
                      <th>Parked?</th>
                      <th>Leveled?</th>
                      <th>Time Left</th>
                      <th>Climb Location</th>
                    </thead>
                    <tbody>
                      {team.endgameData.map((match) => (
                        <tr>
                          <td>
                            {team.matchNums[team.endgameData.indexOf(match)]}
                          </td>
                          {match.map((matchData) => (
                            <td>{JSON.stringify(matchData.value)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Button onClick={this.showModal}>Edit</Button>
                </div>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      );
    } else {
      return <p>error</p>;
    }
  }
}
const autoHead = {
  backgroundColor: "#34febb",
  color: "white",
};
const teleopHead = {
  backgroundColor: "#32ae85",
  color: "white",
};
const endgameHead = {
  backgroundColor: "#42675a",
  color: "white",
};
const middle = {
  textAlign: "center",
};
const noTop = {
  top: "0px",
  marginTop: "0px",
  bottom: "0px",
  marginBottom: "0px",
};
const mapStateToProps = (state) => {
  return {
    edit: state.edit,
    data: state.dataReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  // propName: (parameters) => dispatch(action)
  return {
    setModal: (data) => dispatch(setModal(data)),
    editTeam: (data) => dispatch(editTeam(data)),
    // Upload Data
  };
};
export const RawDataTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawDataTableRaw);
