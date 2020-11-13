import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { AnalyzedTable } from "./AnalyzedTable";
import { aggregateAll } from "../../../Actions/DataActions/aggregateAll";
export class AnalyzedRaw extends Component {
  runAggregate = () => {
    this.props.aggregateAll();
  };
  render() {
    return (
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
        <Container>
          <Row className="border-bottom">
            <h2>Analyzed</h2>
          </Row>
          <Row>
            <Button onClick={this.runAggregate}>Manual Update</Button>
          </Row>
          <Row>
            <AnalyzedTable teams={this.props.dataReducer.teams} />
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
    aggregateAll: () => dispatch(aggregateAll()),
    // modifyData: (data) => dispatch(modifyData(modifyData)),
    // Upload Data
  };
};

export const Analyzed = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnalyzedRaw);
