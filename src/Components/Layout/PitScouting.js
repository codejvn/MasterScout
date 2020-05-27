import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'


export class PitScouting extends Component {
    state = {
        data: [
            {
                entryName: "TeamNumber",
                id: 0,
                value: 0
            },
            {
                entryName: "Drivetrain",
                id: 1,
                value: ""
            },
            {
                entryName: "powerCellsGround",
                id: 2,
                value: false
            },
            {
                entryName: "powerCellsFeeder",
                id: 3,
                value: false
            },
            {
                entryName: "shooter",
                id: 4,
                value: ""
            },
            {
                entryName: "bottomPort",
                id: 5,
                value: false
            },
            {
                entryName: "innerPort",
                id: 6,
                value: false
            },
            {
                entryName: "outerPort",
                id: 7,
                value: false
            },
            {
                entryName: "CPRotate",
                id: 8,
                value: false
            },
            {
                entryName: "CP Position",
                id: 9,
                value: ""
            },
            {
                entryName: "lowRobot",
                id: 10,
                value: false
            },
            {
                entryName: "shootFromInit",
                id: 11,
                value: false
            },
            {
                entryName: "shootFromTzone",
                id: 12,
                value: false
            },
            {
                entryName: "shootFromNearTrench",
                id: 13,
                value: false
            },
            {
                entryName: "shootFromFarTrench",
                id: 14,
                value: false
            },
            {
                entryName: "shootFromAnywhere",
                id: 15,
                value: false
            },
            {
                entryName: "howManyBallsHold",
                id: 16,
                value: 0
            },
            {
                entryName: "canLevel",
                id: 17,
                value: false
            },
            {
                entryName: "climbLeft",
                id: 18,
                value: false
            },
            {
                entryName: "climbRight",
                id: 19,
                value: false
            },
            {
                entryName: "climbMiddle",
                id: 20,
                value: false
            },
            {
                entryName: "buddyClimb",
                id: 21,
                value: false
            },
            {
                entryName: "buddWithUs",
                id: 22,
                value: false
            },
            {
                entryName: "driveOverInitAuto",
                id: 23,
                value: false
            },
            {
                entryName: "bottomAuto",
                id: 24,
                value: false
            },
            {
                entryName: "innerAuto",
                id: 25,
                value: false
            },
            {
                entryName: "outerAuto",
                id: 26,
                value: false
            },
            {
                entryName: "autoStartMiddle",
                id: 27,
                value: false
            },
            {
                entryName: "autoStartLeft",
                id: 28,
                value: false
            },
            {
                entryName: "shootFromTzone",
                id: 12,
                value: false
            },

        ]
    }
    render() {
        return (
            <Container>

            </Container>
        )
    }
}

const spacer = {
    padding: "2vh",
};