import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import AutoChart from "./AutoChart.js";
import EndgameChart from "./EndgameChart.js";
import TeleopChart from "./TeleopChart.js";


import Accordion from "react-bootstrap/Accordion";

export class TeamBreakdownRaw extends Component {
    render() {
        let searchedTeam = this.props.search.teamSearched; // this is the boy
        return (
            <Container style={containerWidth}>
                <h1>Team {searchedTeam}</h1>
                {/* AUTONOMOUS */}
                <Accordion style={spacer} defaultActiveKey="1">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            AUTONOMOUS
            </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <div><AutoChart team={searchedTeam} /></div>
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
                            <div><TeleopChart team={searchedTeam} /></div>
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
                            <div><EndgameChart team={searchedTeam} /></div>
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
    padding: "0.8vh",
};
const containerWidth = {
    width: "100%",
};
const mapStateToProps = (state) => {
    return {
        search: state.search,
        teams: state.dataReducer
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
