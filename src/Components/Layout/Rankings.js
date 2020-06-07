import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { RankRow } from "../RankRow.js";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

export class RankingsRaw extends Component {
  state = {
    sortMethod: "Inner",
  };
  selectSortBy = (event) => {
    this.setState({
      sortMethod: event.target.getAttribute("sort"),
    });
  };
  getSortedTeams = (sortby) => {
    let sorted = this.props.dataReducer.teams;
    switch (sortby) {
      case "Inner":
        sorted.sort(
          (a, b) =>
            b.aggregated[0][4] +
            b.aggregated[1][2] -
            (a.aggregated[0][4] + a.aggregated[1][2])
        );
        break;
      case "Outer":
        sorted.sort(
          (a, b) =>
            b.aggregated[0][3] +
            b.aggregated[1][1] -
            (a.aggregated[0][3] + a.aggregated[1][1])
        );
        break;
      case "Bottom":
        sorted.sort(
          (a, b) =>
            b.aggregated[0][2] +
            b.aggregated[1][0] -
            (a.aggregated[0][2] + a.aggregated[1][0])
        );
        break;
      case "Accuracy":
        sorted.sort(
          (a, b) =>
            parseInt(
              100 -
                (b.aggregated[1][3] /
                  (b.aggregated[1][7] +
                    b.aggregated[1][8] +
                    b.aggregated[1][9] +
                    b.aggregated[1][10])) *
                  100
            ) -
            parseInt(
              100 -
                (a.aggregated[1][3] /
                  (a.aggregated[1][7] +
                    a.aggregated[1][8] +
                    a.aggregated[1][9] +
                    a.aggregated[1][10])) *
                  100
            )
        );
        break;
      case "Defense":
        sorted.sort((a, b) => b.aggregated[1][11] - a.aggregated[1][11]);
        break;
      case "Climb":
        sorted.sort((a, b) => b.aggregated[2][1] - a.aggregated[2][1]);
        break;
      case "Climb Time":
        sorted.sort((a, b) => b.aggregated[2][4] - a.aggregated[2][4]);
        break;
    }
    return sorted;
  };
  render() {
    return (
      <Container>
        <h3 style={mainHead}>Analyzed Team Rankings</h3>

        <Table hover responsive style={noTop} striped>
          <thead style={{ textAlign: "center" }}>
            <tr>
            <td>
                <Button
                  variant="outline-dark"
                  style={fullWidth}
                >
                  Delete
                </Button>
              </td>
              <td>
                <Button variant="outline-dark" style={fullWidth}>
                  Rank
                </Button>
              </td>
              <td>
                <Button variant="outline-dark" style={fullWidth}>
                  Team
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-dark"
                  style={fullWidthDynamic}
                  onClick={this.selectSortBy}
                  sort={"Inner"}
                >
                  Inner
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-dark"
                  style={fullWidthDynamic}
                  onClick={this.selectSortBy}
                  sort={"Outer"}
                >
                  Outer
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-dark"
                  style={fullWidthDynamic}
                  onClick={this.selectSortBy}
                  sort={"Bottom"}
                >
                  Bottom
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-dark"
                  style={fullWidthDynamic}
                  onClick={this.selectSortBy}
                  sort={"Accuracy"}
                >
                  Accuracy
                </Button>
              </td>

              <td>
                <Button
                  variant="outline-dark"
                  style={fullWidthDynamic}
                  onClick={this.selectSortBy}
                  sort={"Defense"}
                >
                  Def
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-dark"
                  style={fullWidthDynamic}
                  onClick={this.selectSortBy}
                  sort={"Climb"}
                >
                  C%
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-dark"
                  style={climbTimeWidth}
                  onClick={this.selectSortBy}
                  sort={"ClimbTime"}
                >
                  C Time
                </Button>
              </td>
            </tr>
          </thead>
          <tbody>
            {this.getSortedTeams(this.state.sortMethod).map((team, index) => {
              return <RankRow team={team} row={index} />;
            })}
          </tbody>
        </Table>
      </Container>
    );
  }
}
const fullWidth = {
  width: "100%",
};
const climbTimeWidth = {
  width:"130%",
  backgroundColor: "rgba(75, 192, 192, 0.2)"
};
const fullWidthDynamic = {
  width: "100%",
  backgroundColor: "rgba(75, 192, 192, 0.2)",
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
