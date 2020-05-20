import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { RawDataTable } from "./RawDataTable";
export class AnalyzedRaw extends Component {
  render() {
    return (
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
        <Container>
          <Row className="border-bottom">
            <h2>Analyzed</h2>
          </Row>
          <Row>
            <Table style={center} responsive striped>
              <thead>
                <tr>
                  <td>#</td>
                  <td>Most Common Starting Position</td>
                  <td>% Crossed Init Line</td>
                  <td>Average Bottom Scored Auto</td>
                  <td>Average Outer Scored Auto</td>
                  <td>Average Inner Scored Auto</td>
                  <td>Avg Attempted Init Line Auto</td>
                  <td>Avg Attempted Near Trench Auto</td>
                  <td>Avg Bottom Teleop</td>
                  <td>Avg Outer Teleop</td>
                  <td>Avg Inner Teleop</td>
                  <td>Avg Missed Teleop</td>
                  <td>Avg Cycles Teleop</td>
                  <td>% CP Rotation</td>
                  <td>% CP Position</td>
                  <td>T-Zone Attempted</td>
                  <td>Init Line Attempted</td>
                  <td>Near Trench Attempted</td>
                  <td>Far Trench Attempted</td>
                  <td>Average Defense Rating</td>
                  <td>% Climbed</td>
                  <td>% Leveled</td>
                  <td>Most Common Climb Location</td>
                  <td>% Parked</td>
                  <td>Average Time Left</td>
                </tr>
              </thead>
              <tbody>
                {/* loop through teams, within teams loop through aggregate */}
                {this.props.dataReducer.teams.map((team) => {
                  // hard coded for now
                  return (
                    <tr>
                      <td>{team.teamNumber}</td>
                      {team.aggregated[0].map((data) => {
                        return <td>{data}</td>;
                      })}
                      {team.aggregated[1].map((data) => {
                        return <td>{data}</td>;
                      })}
                      {team.aggregated[2].map((data) => {
                        return <td>{data}</td>;
                      })}
                    </tr>
                  );
                })}
                {/* {this.props.dataReducer.teams.map((team) => {
                  return <tr>{team.aggregated}</tr>;
                })} */}
              </tbody>
            </Table>
          </Row>
        </Container>
      </div>
    );
  }
}
const center = {
  textAlign: "center",
};
const mapStateToProps = (state) => {
  return {
    dataReducer: state.dataReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  // propName: (parameters) => dispatch(action)
  return {
    // modifyData: (data) => dispatch(modifyData(modifyData)),
    // Upload Data
  };
};

export const Analyzed = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnalyzedRaw);
