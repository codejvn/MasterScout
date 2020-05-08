import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

export class DataPreview extends Component {
  render() {
    return (
      <Row style={topMargin}>
        <Card style={formWidth}>
          <Card.Title>{this.props.data.teamNum}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {this.props.data.scout}
          </Card.Subtitle>
          <Accordion defaultActiveKey="-1">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Auto
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  {
                    //JSON.stringify(this.props.data.data.auto)
                    this.props.data.data.auto.map((data) => {
                      return (
                        <div>
                          {autoHeaders[data.id]}
                          {JSON.stringify(data.value)}
                          {/* Since sometimes its a boolean */}
                        </div>
                      );
                    })
                  }
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                Teleop
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  {this.props.data.data.teleop.map((data) => {
                    return (
                      <div>
                        {teleopHeaders[data.id]}
                        {JSON.stringify(data.value)}
                        {/* Since sometimes its a boolean */}
                      </div>
                    );
                  })}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="2">
                Endgame & Comments
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  {this.props.data.data.endgame.map((data) => {
                    return (
                      <div>
                        {endgameHeaders[data.id - 12]}
                        {JSON.stringify(data.value)}
                        {/* Since sometimes its a boolean */}
                      </div>
                    );
                  })}
                  Comments:
                  {JSON.stringify(this.props.data.comment)}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Card>
      </Row>
    );
  }
}
const autoHeaders = [
  "Starting Position: ",
  "Crossed Initiation Line: ",
  "Bottom Scored: ",
  "Outer Scored: ",
  "Inner Scored: ",
  "Shots Attempted From Init. Line: ",
  "Shots Attempted From Near Trench: ",
];
const teleopHeaders = [
  "Bottom Scored: ",
  "Outer Scored: ",
  "Inner Scored: ",
  "Missed: ",
  "Cycles: ",
  "CP Rotation: ",
  "CP Position: ",
  "Shots Attempted At Target Zone: ",
  "Shots Attempted From Init. Line: ",
  "Shots Attempted From Near Trench: ",
  "Shots Attempted From Far Trench: ",
  "Defense Rating: ",
];
const endgameHeaders = [
  "Climbed: ",
  "Leveled: ",
  "Climb Location: ",
  "Parked: ",
  "Time Left: ",
];
const formWidth = {
  width: "100%",
  textAlign: "center",
};
const topMargin = {
  paddingTop: "20px",
};
export default DataPreview;
