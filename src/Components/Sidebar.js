import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
export class Sidebar extends Component {
  render() {
    return (
      <Col style={rightBorder}>
        <div>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="1">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="2">Manage Data</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="3">View Matches</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="4" disabled>
                Compare Teams
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="5" disabled>
                Team Draft
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="6">Export to Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="7" disabled>
                Ranking Lookup
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="8" disabled>
                Pit Scouting
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="9" disabled>
                Settings
              </Nav.Link>
            </Nav.Item>
            <Nav.Item></Nav.Item>
          </Nav>
        </div>
      </Col>
    );
  }
}

const rightBorder = {
  position: "sticky",
  borderRight: "1px",
  borderRightStyle: "solid",
  borderColor: "rgb(225,225,225)",
  backgroundColor: "rgb(250,250,250)",
  height: "300vw",
  width: "15.5%",
  textAlign: "center",
};
export default Sidebar;
