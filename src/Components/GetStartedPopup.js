import React, { Component } from "react";
// actions
import { setTeam } from "../Actions/setTeam";
import { setEvent } from "../Actions/setEvent";
import { setEvents } from "../Actions/UpdateEvent";
import { setSchedule } from "../Actions/setSchedule";
import { setTeams } from "../Actions/setTeams";
import { connect } from "react-redux";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
} from "reactstrap";

let tba;
let matches;

export class GetStartedPopupRaw extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      dropDownOpen: false,
      modalDisplay: true,
    };
  }

  toggleDropdown = () => {
    this.setState({ ...this.state, dropDownOpen: !this.state.dropDownOpen });
  };
  closeModal = () => {
    this.setState({
      ...this.state,
      modalDisplay: false,
    });
  };
  teamSubmitHandle = (e) => {
    e.preventDefault();
    this.props.setTeam(this._input.value);
    this.props.setEvents(this._input.value);
    return false;
  };
  createCompetition = (e) => {
    console.log(tba.event.key);
    this.props.setTeams(tba.event.key);
    this.props.setSchedule(tba.event.key);
    this.closeModal();
  };
  eventSelectHandle = (e) => {
    this.props.setEvent(tba.events[0]); // HARD CODED FOR NOW
  };
  render() {
    tba = this.props.thebluealliance;
    matches = this.props.matches;
    return (
      <Modal
        show={this.state.modalDisplay}
        onHide={this.closeModal}
        style={modalStyle}
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>Getting Started</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col style={teamColumn}>
                <Label>Team Number: {tba.currentTeam}</Label>
              </Col>
            </Row>
            <Row>
              <Col style={teamColumn}>
                <Form onSubmit={this.teamSubmitHandle} style={center}>
                  <FormControl
                    type="text"
                    placeholder="My Team Number"
                    className="mr-sm-2"
                    ref={(el) => {
                      this._input = el;
                    }}
                  />
                </Form>
              </Col>
            </Row>
            <Row style={spacer}></Row>
            <Row>
              <Col style={teamColumn}>
                <Label>Event: {tba.event.name}</Label>
                <Dropdown
                  isOpen={this.state.dropDownOpen}
                  toggle={this.toggleDropdown}
                >
                  <DropdownToggle caret>Dropdown</DropdownToggle>
                  <DropdownMenu>
                    {tba.events.map((event) => (
                      <DropdownItem onClick={this.eventSelectHandle}>
                        {event.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </Col>
            </Row>

            <Row style={spacer}></Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={this.createCompetition}
            style={startButton}
          >
            Start
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
const spacer = {
  padding: "1vh",
};
const teamColumn = {
  width: "70%",
  textAlign: "center",
  fontWeight: "500",
  margin: "auto",
};
const modalStyle = {
  textAlign: "center",
  width: "100%",
};
const startButton = {
  width: "90%",
  margin: "auto",
  textAlign: "center",
};
const center = {
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
  return {
    setTeam: (num) => dispatch(setTeam(num)),
    setEvents: (teamNum) => dispatch(setEvents(teamNum)),
    setEvent: (event) => dispatch(setEvent(event)),
    setSchedule: (eventCode) => dispatch(setSchedule(eventCode)),
    setTeams: (eventCode) => dispatch(setTeams(eventCode)),
  };
};
export const GetStartedPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(GetStartedPopupRaw);
