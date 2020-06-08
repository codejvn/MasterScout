import React, { Component } from "react";

import Table from "react-bootstrap/Table";
export class AnalyzedTable extends Component {
  getStyle = (data, gameStage, index, highlight) => {
    // loop through teams and if this is the largest then custom background
    if (highlight) {
      let highest = true;
      for (const team of this.props.teams) {
        if (team.aggregated[gameStage][index] > data) {
          highest = false;
        }
      }
      if (highest) {
        return {
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          color: "black",
        };
      } else {
        return {};
      }
    } else {
      return {};
    }
  };
  render() {
    console.log("rending analyzed");
    let stripes;
    try {
      stripes = this.props.stripes;
    } catch (err) {
      stripes = true;
    }
    let validTeam = true;
    if (this.props.teams[0] == undefined) {
      validTeam = false;
    }
    if (validTeam) {
      if (this.props.teams.length > 1) {
        for (const team of this.props.teams) {
          if (team.autoData.length > 0) {
            console.log("AGGREGATING TEAM");
            team.aggregate();
          }
        }
      }
      return (
        <Table style={center} responsive striped={stripes}>
          <thead>
            <tr>
              <td>Team</td>
              <td>Common Pos</td>
              <td>Init</td>
              <td>Bottom Auto</td>
              <td>Outer Auto</td>
              <td>Inner Auto</td>
              <td>Attempt Init A</td>
              <td>Attempt Near Trench A</td>
              <td>Bottom Teleop</td>
              <td>Outer Teleop</td>
              <td>Inner Teleop</td>
              <td>Missed Teleop</td>
              <td>Cycles Teleop</td>
              <td>% CPR</td>
              <td>% CPP</td>
              <td>T-Zone Attempt</td>
              <td>Init Attempt</td>
              <td>N Trench Attempt</td>
              <td>Far Trench Attempt</td>
              <td>Defense</td>
              <td>% Climb</td>
              <td>% Level</td>
              <td>Common Climb Location</td>
              <td>% Parked</td>
              <td>Climb Time Left</td>
            </tr>
          </thead>
          <tbody>
            {/* loop through teams, within teams loop through aggregate */}

            {this.props.teams.map((team) => {
              let highlight;
              // hard coded for now
              try {
                highlight = this.props.highlight;
              } catch (err) {
                highlight = false;
              }
              return (
                <tr>
                  <td>{team.teamNumber}</td>
                  {/**maps all auto datas */}
                  {team.aggregated[0].map((data, index) => {
                    return (
                      <td style={this.getStyle(data, 0, index, highlight)}>
                        {data}
                      </td>
                    );
                  })}
                  {/**maps all teleop datas */}
                  {team.aggregated[1].map((data, index) => {
                    return (
                      <td style={this.getStyle(data, 1, index, highlight)}>
                        {data}
                      </td>
                    );
                  })}
                  {/**maps all endgame datas */}
                  {team.aggregated[2].map((data, index) => {
                    return (
                      <td style={this.getStyle(data, 2, index, highlight)}>
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {/* {this.props.dataReducer.teams.map((team) => {
                  return <tr>{team.aggregated}</tr>;
                })} */}
          </tbody>
        </Table>
      );
    } else {
      return <p>no team</p>;
    }
  }
}
const center = {
  textAlign: "center",
};
export default AnalyzedTable;
