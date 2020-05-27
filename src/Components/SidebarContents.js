import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import { ViewMatchesConn } from "./Layout/ViewMatches";
import { ManageData } from "./Layout/ManageData";
import { HomeCom } from "./Layout/Home";
import { Settings } from "./Layout/Settings";
import { Compare } from "./Layout/Compare.js";
import { Export } from "./Layout/Export.js";
import { PitScouting } from "./Layout/PitScouting.js";

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
          <Tab.Pane eventKey="4">
            <Compare />
          </Tab.Pane>
          <Tab.Pane eventKey="5">
            <Export />
          </Tab.Pane>
          <Tab.Pane eventKey="6">
            <PitScouting />
          </Tab.Pane>
          <Tab.Pane eventKey="7">Rankings</Tab.Pane>
          <Tab.Pane eventKey="8">
            <Settings />
          </Tab.Pane>
        </Tab.Content>
      </Col>
    );
  }
}

export default SidebarContents;
