import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import { ViewMatchesConn } from "./Layout/ViewMatches";
import { ManageData } from "./Layout/ManageData";
import { HomeCom } from "./Layout/Home";
export class SidebarContents extends Component {
  render() {
    return (
      <Col sm={10}>
        <Tab.Content>
          <Tab.Pane eventKey="1">
            <HomeCom />
          </Tab.Pane>
          <Tab.Pane eventKey="2">
            <ManageData />
          </Tab.Pane>
          <Tab.Pane eventKey="3">
            <ViewMatchesConn />
          </Tab.Pane>
          <Tab.Pane eventKey="4">Compare Teams</Tab.Pane>
          <Tab.Pane eventKey="5">Team Draft</Tab.Pane>
          <Tab.Pane eventKey="6">Match Plan</Tab.Pane>
          <Tab.Pane eventKey="7">Ranking Lookup</Tab.Pane>
          <Tab.Pane eventKey="8">Pit Scouting</Tab.Pane>
          <Tab.Pane eventKey="9">Settings</Tab.Pane>
        </Tab.Content>
      </Col>
    );
  }
}

export default SidebarContents;
