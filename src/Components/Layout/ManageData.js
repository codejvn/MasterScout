import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Import } from "./ManageDataTabs/Import";
import { Raw } from "./ManageDataTabs/Raw";
import { Analyzed } from "./ManageDataTabs/Analyzed";
import { TeamBreakdown } from "./ManageDataTabs/TeamBreakdown";

export class ManageData extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="Team Breakdown" id="uncontrolled-tab-example">
        <Tab eventKey="Import" title="Import">
          <Import />
        </Tab>
        <Tab eventKey="Raw" title="Raw">
          <Raw />
        </Tab>
        <Tab eventKey="Analyzed" title="Analyzed">
          <Analyzed />
        </Tab>
        <Tab eventKey="Team Breakdown" title="Team Breakdown">
          <TeamBreakdown />
        </Tab>
      </Tabs>
    );
  }
}

export default ManageData;
