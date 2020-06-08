import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";
import { setModal } from "../../../Actions/EditActions/setModal";
import { selectEditData } from "../../../Actions/EditActions/selectDataToEdit";
import { editData } from "../../../Actions/EditActions/editData";
import { aggreProps } from "../../../Reducers/Team";
export class EditModalRaw extends Component {
  hide = (e) => {
    this.props.setModal(false, false);
  };
  save = (e) => {
    this.props.setModal(false, true);
  };
  getTeam = (num) => {
    if (num > 0) {
      return this.props.data.teams.find((team) => team.teamNumber == num);
    } else {
      return null;
    }
  };
  selectMatch = (e) => {
    let matchNum = e.currentTarget.getAttribute("matchNum");
    console.log(matchNum);
    let matchData = this.getTeam(this.props.edit.team).getMatchData(matchNum);
    this.props.selectEditData(matchData);
  };
  editNum = (e) => {
    let section = e.currentTarget.getAttribute("section");
    let id = e.currentTarget.getAttribute("id");
    let value = e.currentTarget.value;

    value = value == "" ? "" : JSON.parse(value);
    section = JSON.parse(section);
    id = JSON.parse(id);

    this.props.editData({
      section: section,
      dataId: id,
      value: value,
    });
    console.log(section);
    console.log(id);
    console.log(value);
  };
  editString = (e) => {
    let section = e.currentTarget.getAttribute("section");
    let id = e.currentTarget.getAttribute("id");
    let value = e.currentTarget.value;
    this.props.editData({
      section: JSON.parse(section),
      dataId: JSON.parse(id),
      value: value,
    });
    console.log(section);
    console.log(id);
    console.log(value);
  };
  parseData = (data, id, section) => {
    switch (typeof data) {
      case "number":
        return (
          <input
            type="text"
            className="form-control"
            value={data}
            id={id}
            section={section}
            onChange={this.editNum}
          />
        );
      case "boolean":
        return data ? "true" : "false";
      case "string":
        return (
          <input
            type="text"
            className="form-control"
            value={data}
            id={id}
            section={section}
            onChange={this.editString}
          />
        );
    }
  };
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
              this.props.edit.editedData == null &&
              this.getTeam(this.props.edit.team).matchNums.map((matchNum) => (
                <Button matchNum={matchNum} onClick={this.selectMatch}>
                  {matchNum}
                </Button>
              ))}
            {this.props.edit.editedData != null && (
              <div>
                <h5>Auto</h5>
                {this.props.edit.editedData.data.auto.map((dataObj) => (
                  <div>
                    {aggreProps[0][dataObj.id].name}:
                    {this.parseData(dataObj.value, dataObj.id, 0)}
                  </div>
                ))}
                <h5>Teleop</h5>{" "}
                {this.props.edit.editedData.data.teleop.map((dataObj) => (
                  <div>
                    {aggreProps[1][dataObj.id].name}:
                    {this.parseData(dataObj.value, dataObj.id, 1)}
                  </div>
                ))}
                <h5>Endgame</h5>{" "}
                {this.props.edit.editedData.data.endgame.map((dataObj) => (
                  <div>
                    {aggreProps[2][dataObj.id - 12].name}:
                    {this.parseData(dataObj.value, dataObj.id, 2)}
                  </div>
                ))}
              </div>
            )}
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
    setModal: (data, save) => dispatch(setModal(data, save)),
    selectEditData: (matchNum) => dispatch(selectEditData(matchNum)),
    editData: (data) => dispatch(editData(data)),
    // addData: (data) => dispatch(addData(data)),
    // Upload Data
  };
};
export const EditModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditModalRaw);
