import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";
import Col from "react-bootstrap/Col";
import { AnalyzedTable } from "./AnalyzedTable";
export class AnalyzedRaw extends Component {
  render() {
    return (
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
        <Container>
          <Row className="border-bottom">
            <h2>Analyzed</h2>
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
    // modifyData: (data) => dispatch(modifyData(modifyData)),
    // Upload Data
  };
};

export const Analyzed = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnalyzedRaw);
