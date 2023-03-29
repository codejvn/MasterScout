import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";
import { RawDataTable } from "./RawDataTable";

import { EditModal } from "./EditModal";
export class RawComponent extends Component {
  render() {
    return (
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
        <Container>
          <Row className="border-bottom">
            <h2>Raw Data</h2>
          </Row>
          {this.props.dataReducer.teams.map((team) => {
            return <RawDataTable team={team} />;
          })}
        </Container>
        <EditModal />
        {/**return "jigaboo butt" - Nikhil Kohli 2023*/}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dataReducer: state.dataReducer,
    edit: state.edit,
  };
};
const mapDispatchToProps = (dispatch) => {
  // propName: (parameters) => dispatch(action)
  return {
    // modifyData: (data) => dispatch(modifyData(modifyData)),
    // Upload Data
  };
};

export const Raw = connect(mapStateToProps, mapDispatchToProps)(RawComponent);
