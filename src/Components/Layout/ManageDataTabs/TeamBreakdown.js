import React, { Component } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import AutoChart from "./AutoChart.js";
import TeleopChart from "./TeleopChart.js";
import EndgameChart from "./EndgameChart.js";

export class TeamBreakdownRaw extends Component {
    render() {
        let searchedTeam = this.props.search.teamSearched; // this is the boy
        return (
            <Container style={containerWidth}>
                {/* AUTONOMOUS */}
                <Accordion style={spacer} defaultActiveKey="1">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            AUTONOMOUS
            </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <div><AutoChart /></div>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

                {/* TELEOP */}
                <Accordion style={spacer} defaultActiveKey="1">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            TELEOPERATED
            </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <div><TeleopChart /></div>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

                {/* ENDGAME */}
                <Accordion style={spacer} defaultActiveKey="1">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            ENDGAME
            </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <div><EndgameChart /></div>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </Container>
        );
    }
}
const chart = {
    width: "400",
    height: "200",
    backgroundColor: "red",
};
const spacer = {
    padding: "0.5vh",
};
const containerWidth = {
    width: "100%",
};
const mapStateToProps = (state) => {
    return {
        search: state.search,
    };
};
const mapDispatchToProps = (dispatch) => {
    // propName: (parameters) => dispatch(action)
    return {
        // put actions here
    };
};
export const TeamBreakdown = connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamBreakdownRaw);
