import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row'
import { MultipleChoice } from '../MultipleChoice.js';
import { Boolean } from '../Boolean.js';
import Col from 'react-bootstrap/Col';
import PlusMinus from "../PlusMinus.js";

export class PitScouting extends Component {
    state = {
        team: 0,
        name: "",
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
                entryName: "buddyWithUs",
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
                entryName: "autoStartRight",
                id: 29,
                value: false
            },
            {
                entryName: "howManyBallsAuto",
                id: 30,
                value: 0
            },
            {
                entryName: "comments",
                id: 31,
                value: ""
            },
            //need to add a picture aspect somehow 
        ]
    }
    render() {
        return (
            <Container>
                <h1 style={spacer}>Pit Scouting Nemesis 2590</h1>
                <form style={spacer}>
                    {/* <Row style={center}>
                        <h6 style={enlarge}>Team Number</h6>
                    </Row> */}
                    {/* <Row style={center}>
                        <input placeholder="Team Number" type="text" value={this.state.team}
                            onChange={e => this.setState({ team: e.target.value })} />
                    </Row> */}
                    <Row>
                        <MultipleChoice title="Drivetrain" options={["West Coast", "Swerve", "Tank", "Mechanum"]} id={1} entryName={"Drivetrain"} />
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Pick up From Ground?" id={2} entryName={"powerCellGround"} />
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Pick up From Feeder Station?" id={3} entryName={"powerCellFeeder"} />
                    </Row>
                    <Row style={spacer}>
                        <MultipleChoice title="Shooter" options={["Flywheel", "Linear", "Catapult"]} id={4} entryName={"Shooter"} />
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Score Bottom Port?" id={5} entryName={"bottomPort"} />
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Score Inner Port?" id={6} entryName={"innerPort"} />
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Score Outer Port?" id={7} entryName={"outerPort"} />
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Control Panel Rotation?" id={8} entryName={"CPRotate"} />
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Control Panel Position?" id={9} entryName={"CPPosition"} />
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Low Robot?" id={10} entryName={"lowRobot"} />
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Shoot from Init Line?" id={11} entryName={"shootFromInit"} />
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Shoot from Trench Zone?" id={12} entryName={"shootFrmTzone"} />
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Shoot from Near Trench?" id={13} entryName={"shootFromNearTrench"} />
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Shoot from Far Trench?" id={14} entryName={"shootFromFarTrench"} />
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Shoot from Anywhere?" id={15} entryName={"shootFromAnywhere"} />
                    </Row>
                    <Row style={spacer}>
                        <PlusMinus value = {1} title="How many cells can be stored?" id={16} entryName={"howManyBallsHold"}/>
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Can this robot level?" id={17} entryName={"canLevel"} />
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Climb Left Position?" id={18} entryName={"climbLeft"} />
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Climb Right Position?" id={19} entryName={"climbRight"} />
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Climb Middle Position?" id={20} entryName={"climbMiddle"} />
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Can this robot buddy-climb?" id={21} entryName={"buddyClimb"} />
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Would this robot buddy climb with us?" id={22} entryName={"buddyWithUs"} />
                    </Row>
                    <Row style={gameModeHeaders}>
                        <h3 style={gameModeHeaders}> AUTONOMOUS</h3>
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Drive over init line in auto?" id={23} entryName={"driverOverInitAuto"} />
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Score Bottom in Autonomous?" id={24} entryName={"bottomAuto"} />
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Score Inner Port in Autonomous?" id={25} entryName={"innerAuto"} />
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Score Outer Port in Autonomous?" id={26} entryName={"outerAuto"} />
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Start Middle in Autonomous?" id={27} entryName={"autoStartMiddle"} />
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Start Left in Autonomous?" id={28} entryName={"autoStartLeft"} />
                    </Row>
                    <Row style={spacer}>
                        <Boolean title="Start Right in Autonomous?" id={29} entryName={"autoStartRight"} />
                    </Row>
                    <Row style={spacer}>
                        <PlusMinus value = {0} title="How many power cells in autonomous?" id={30} entryName={"howManyBallsAuto"}/>
                    </Row>
                    {/* insert another row for comments */}
                    {/* <Row>
                        <Checkbox title="Bottom port"/>
                    </Row> */}

                </form>
            </Container >
        )
    }
}

const spacer = {
    paddingTop: "3vh",
    textAlign: "center"
};
const enlarge = {
    fontSize: "230%",
    textAlign: "center",
};
const center = {
    textAlign: "center",
    contentAlign: "center",
    width: "100%",
}
const gameModeHeaders = {
    paddingTop: "3vh",
    fontSize: "150%",
    textAlign: "center",
    contentAlign: "center",
    width: "100%",
    fontWeight: "bold",
    color: "black"
}