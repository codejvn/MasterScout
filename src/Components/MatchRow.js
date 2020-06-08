import React, { Component } from "react";
let match;
export class MatchRow extends Component {
  currentStyle = () => {
    if (this.props.currentMatch == match.match_number) {
      return {
        backgroundColor: "rgb(220,220,255)",
      };
    } else {
      return {};
    }
  };
  render() {
    match = this.props.match;
    return (
      <tr style={this.currentStyle()}>
        <th style={center}>{match.match_number}</th>
        <td style={center}>{match.alliances.blue.team_keys[0].slice(3)}</td>
        <td style={center}>{match.alliances.blue.team_keys[1].slice(3)}</td>
        <td style={center}>{match.alliances.blue.team_keys[2].slice(3)}</td>
        <td style={center}>{match.alliances.red.team_keys[0].slice(3)}</td>
        <td style={center}>{match.alliances.red.team_keys[1].slice(3)}</td>
        <td style={center}>{match.alliances.red.team_keys[2].slice(3)}</td>
      </tr>
    );
  }
}
const center = {
  textAlign: "center",
}

export default MatchRow;
