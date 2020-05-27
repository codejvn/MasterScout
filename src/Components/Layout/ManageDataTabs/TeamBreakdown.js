import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import {Bar} from "react-chartjs-2";

export class TeamBreakdown extends Component {
    render() {
        return (
            <Container style={containerWidth}>
                {/* AUTONOMOUS */}
                <Accordion style={spacer} defaultActiveKey="1">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            AUTONOMOUS
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <div>
                                <canvas style={chart}></canvas>
                            </div>
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
                            <div>
                                <canvas style={chart}></canvas>
                            </div>
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
                            <div>
                                <canvas style={chart}></canvas>
                            </div>
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

export default TeamBreakdown;
