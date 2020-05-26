import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
} from "reactstrap";
// actions
import { setTeam } from "../../Actions/setTeam";
import { setEvent } from "../../Actions/setEvent";
import { setEvents } from "../../Actions/UpdateEvent";
import { setSchedule } from "../../Actions/setSchedule";
import { setTeams } from "../../Actions/setTeams";

let tba;
export class Home extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      dropDownOpen: false,
    };
  }

  toggleDropdown = () => {
    this.setState({ dropDownOpen: !this.state.dropDownOpen });
  };
  teamSubmitHandle = (e) => {
    e.preventDefault();
    console.log("Submitting " + this._input.value);
    this.props.setTeam(this._input.value);
    this.props.setEvents(this._input.value);
    return false;
  };
  createCompetition = (e) => {
    console.log(tba.event.key);
    this.props.setTeams(tba.event.key);
    this.props.setSchedule(tba.event.key);
  };
  eventSelectHandle = (e) => {
    this.props.setEvent(tba.events[0]); // HARD CODED FOR NOW
  };
  componentDidMount() {
    // this.props.setTeam(2590);
    // this.props.setEvents(2590);
    // this.props.setSchedule(tba.event.key);
  }
  render() {
    tba = this.props.thebluealliance;
    return (
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
        <Container>
          <Row className="border-bottom">
            <Col>
              <h2 style={homeHeader}>Home</h2>
            </Col>
          </Row>
          <Row>
            <Col style={teamColumn}>
              <Label>Current Team: {tba.currentTeam}</Label>
              <Form inline onSubmit={this.teamSubmitHandle}>
                <FormControl
                  type="text"
                  placeholder="My Team Number"
                  className="mr-sm-2"
                  ref={(el) => {
                    this._input = el;
                  }}
                />
                <Button variant="outline-dark" type="submit">
                  Set
                </Button>
              </Form>
            </Col>
            <Col style={eventColumn}>
              <Label>Current Event: {tba.event.name}</Label>
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
        </Container>
      </div>
    );
  }
}

const teamColumn = {
  width: "70%",
  fontWeight: "bold",
};
const eventColumn = {
  width: "30%",
  fontWeight: "bold",
};
const homeDescription = {
  marginTop: "2%",
};
const homeHeader = {
  marginBottom: "2%",
};
const mapStateToProps = (state) => {
  return {
    thebluealliance: state.thebluealliance,
    dataReducer: state.dataReducer,
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
export const HomeCom = connect(mapStateToProps, mapDispatchToProps)(Home);
