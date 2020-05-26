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
                  <td>Common Pos</td>
                  <td>Init</td>
                  <td>Bottom Auto</td>
                  <td>Outer Auto</td>
                  <td>Inner Auto</td>
                  <td>Attempt Init A</td>
                  <td>Attempt Near Trench A</td>
                  <td>Bottom Teleop</td>
                  <td>Outer Teleop</td>
                  <td>Inner Teleop</td>
                  <td>Missed Teleop</td>
                  <td>Cycles Teleop</td>
                  <td>% CPR</td>
                  <td>% CPP</td>
                  <td>T-Zone Attempt</td>
                  <td>Init Attempt</td>
                  <td>N Trench Attempt</td>
                  <td>Far Trench Attempt</td>
                  <td>Defense</td>
                  <td>% Climb</td>
                  <td>% Level</td>
                  <td>Common Climb Location</td>
                  <td>% Parked</td>
                  <td>Climb Time Left</td>
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
