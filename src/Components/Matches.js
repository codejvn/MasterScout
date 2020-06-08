import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import MatchRow from "./MatchRow";

export class Matches extends Component {
  render() {
    return (
      <div style={fw}>
        <Table striped borderless hover variant="light" style={{marginTop:"2%"}}>
          <thead>
            <tr>
              <th style={match}>Match #</th>
              <th style={blueAlliance}>Team 1</th>
              <th style={blueAlliance}>Team 2</th>
              <th style={blueAlliance}>Team 3</th>
              <th style={redAlliance}>Team 4</th>
              <th style={redAlliance}>Team 5</th>
              <th style={redAlliance}>Team 6</th>
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
const match = {
 backgroundColor: "rgb(200,200,200)",
 textAlign: "center",
};
const blueAlliance = {
  backgroundColor:'rgba(54, 162, 235, 0.7)',
  textAlign: "center",
}
const redAlliance = {
  backgroundColor: 'rgba(255, 99, 132, 0.7)',
  textAlign: "center",
};
const fw = {
  width: "100%",
};
export default Matches;
