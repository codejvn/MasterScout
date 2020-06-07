import React, { Component } from "react";
// actions
import { setTeam } from "../Actions/TBAactions/setTeam";
import { setEvent } from "../Actions/TBAactions/setEvent";
import { setEvents } from "../Actions/TBAactions/UpdateEvent";
import { setSchedule } from "../Actions/TBAactions/setSchedule";
import { setTeams } from "../Actions/TBAactions/setTeams";
import { connect } from "react-redux";

import Button from "react-bootstrap/Button";
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

export class DupDataPopupRaw extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {
            dropDownOpen: false,
            modalDisplay: false,
            buttonActive: false,
            replaceData: false,
            keepOldData: false,
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
    render() {
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
                                <h6>Data for this match already exists. Select what you want to do with this data.</h6>
                            </Col>
                        </Row>
                        <Row style={spacer}></Row>
                        <Row>
                            <Col style={teamColumn}>
                                <Dropdown
                                    isOpen={this.state.dropDownOpen}
                                    toggle={this.toggleDropdown}>
                                    <DropdownToggle caret>Dropdown</DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>Replace Data</DropdownItem>
                                        <DropdownItem>Keep Old Data</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        style={startButton}>
                        Enter
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
export const DupDataPopup = connect(
    mapStateToProps,
    mapDispatchToProps
)(DupDataPopupRaw);
