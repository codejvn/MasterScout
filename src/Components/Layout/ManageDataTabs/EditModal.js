import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";
import { setModal } from "../../../Actions/EditActions/setModal";
export class EditModalRaw extends Component {
  hide = (e) => {
    this.props.setModal(false);
  };
  getTeam = (num) => {
    if (num > 0) {
      return this.props.data.teams.find((team) => team.teamNumber == num);
    } else {
      return null;
    }
  };
  listMatches = () => {};
  render() {
    return (
      <div>
        {" "}
        <Modal show={this.props.edit.showModal} onHide={this.hide}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Match</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>{this.props.edit.team}</h5>
            {this.props.edit.team > 0 &&
              this.getTeam(this.props.edit.team).matchNums.map((matchNum) => (
                <Button>{matchNum}</Button>
              ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hide}>
              Close
            </Button>
            <Button variant="primary" onClick={this.hide}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
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
    // addData: (data) => dispatch(addData(data)),
    // Upload Data
  };
};
export const EditModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditModalRaw);
