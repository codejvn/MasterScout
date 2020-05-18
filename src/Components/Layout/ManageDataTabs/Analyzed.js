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
            <Table>
              <thead>
                <tr>
                  <td>#</td>
                  <td>Most Common Starting Position</td>
                  <td>% Crossed Init Line</td>
                  <td>Average Bottom Scored Auto</td>
                  <td>Average Outer Scored Auto</td>
                  <td>Average Inner Scored Auto</td>
                  <td>Average Shots Attempted Init Line Auto</td>
                  <td>Average Shots Attempted Near Trench Auto</td>
                </tr>
              </thead>
              <tbody>
                {/* loop through teams, within teams loop through aggregate */}
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
