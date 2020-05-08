import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Import } from "./ManageDataTabs/Import";
export class ManageData extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="Import" id="uncontrolled-tab-example">
        <Tab eventKey="Import" title="Import">
          <Import />
        </Tab>
        <Tab eventKey="Raw" title="Raw">
          <p>Raw</p>
        </Tab>
        <Tab eventKey="Analyzed" title="Analyzed">
          <p>Analyzed</p>
        </Tab>
        <Tab eventKey="Team Breakdown" title="Team Breakdown">
          <p>Team Breakdown</p>
        </Tab>
      </Tabs>
    );
  }
}

export default ManageData;
