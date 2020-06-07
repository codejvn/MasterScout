import React, { Component } from "react";
import { connect } from "react-redux";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from 'react-bootstrap/Button';

export class RankRow extends Component {
  render() {
    let team = this.props.team;
    return (
      <tr style={{ textAlign: "center", width: "100%" }}>
        <td style={center}><Button onClick={this.deleteRow} style={deleteButton}><DeleteIcon /></Button></td>
        <td style={teamRanking}>{this.props.row + 1}</td>
        <td style={center}>{team.teamNumber}</td>
        <td style={center}>{team.aggregated[0][4] + team.aggregated[1][2]}</td>
        <td style={center}>{team.aggregated[0][3] + team.aggregated[1][1]}</td>
        <td style={center}>{team.aggregated[0][2] + team.aggregated[1][0]}</td>
        <td style={center}>{parseInt(100 - (team.aggregated[1][3] / (team.aggregated[1][7] + team.aggregated[1][8] + team.aggregated[1][9] + team.aggregated[1][10])) * 100)}%</td>
        <td style={center}>{team.aggregated[1][11]}</td>
        <td style={center}>{team.aggregated[2][1] * 100}%</td>
        <td style={center}>{team.aggregated[2][4]}</td>
      </tr>
    );
  }
}

const deleteButton = {
  backgroundColor: "rgab(100,100,100,0)",
  padding: "0%",
};
const center = {
  textAlign: "center",
};
const teamRanking = {
  fontWeight: "bold",
  backgroundColor: "rgba(100,100,100,0.1 )",
};
const noTop = {
  top: "0px",
  marginTop: "0px",
  bottom: "0px",
  marginBottom: "0px",
};

const mapStateToProps = (state) => {
  return {
    dataReducer: state.dataReducer,
  };
};

export default RankRow = connect(mapStateToProps)(RankRow);
