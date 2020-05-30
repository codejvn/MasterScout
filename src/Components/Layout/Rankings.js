import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { RankRow } from "../RankRow.js";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

export class RankingsRaw extends Component {
  getSortedTeams = (sortby) => {
    let sorted = this.props.dataReducer.teams;
    switch (sortby) {
      case "INNER":
        sorted.sort(
          (a, b) =>
            b.aggregated[0][4] +
            b.aggregated[1][2] -
            (a.aggregated[0][4] + a.aggregated[1][2])
        );
        break;
      case "OUTER":
        sorted.sort(
          (a, b) =>
            b.aggregated[0][3] +
            b.aggregated[1][1] -
            (a.aggregated[0][3] + a.aggregated[1][1])
        );
        break;
      case "BOTTOM":
        sorted.sort(
          (a, b) =>
            b.aggregated[0][2] +
            b.aggregated[1][0] -
            (a.aggregated[0][2] + a.aggregated[1][0])
        );
        break;
      case "MISSED":
        sorted.sort((a, b) => b.aggregated[1][3] - a.aggregated[1][3]);
        break;
    }
    console.log("SORTED");
    console.log(sorted);
    return sorted;
  };
  render() {
    return (
      <Container>
        <h3 style={mainHead}>Team Rankings</h3>

        <Table hover style={noTop} striped>
          <tbody>
            {this.getSortedTeams("INNER").map((team) => {
              return <RankRow team={team} />;
            })}
            {console.log(this.props.dataReducer.teams)}
          </tbody>
        </Table>
      </Container>
    );
  }
}
const center = {
  textAlign: "center",
  width: "16%",
};
const noTop = {
  top: "0px",
  marginTop: "0px",
  bottom: "0px",
  marginBottom: "0px",
  width: "100%",
};
const mainHead = {
  textAlign: "center",
  marginTop: "1%",
};
const mapStateToProps = (state) => {
  return {
    dataReducer: state.dataReducer,
  };
};

export const Rankings = connect(mapStateToProps)(RankingsRaw);
