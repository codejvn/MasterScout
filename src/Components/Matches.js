import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import MatchRow from "./MatchRow";
export class Matches extends Component {
  render() {
    return (
      <div style={fw}>
        <Table striped borderless hover variant="light">
          <thead>
            <tr>
              <th>Match #</th>
              <th className="danger">Team 1</th>
              <th>Team 2</th>
              <th>Team 3</th>
              <th>Team 4</th>
              <th>Team 5</th>
              <th>Team 6</th>
            </tr>
          </thead>
          <tbody>
            {this.props.matches.map((match) => (
              <MatchRow match={match} currentMatch={this.props.currentMatch} />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
const fw = {
  width: "90%",
};
export default Matches;
