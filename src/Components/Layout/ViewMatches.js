import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Matches from "../Matches";
import MatchCodes from "../MatchCodes";
import { MatchNum } from "../MatchNum";
import { connect } from "react-redux";

let tba;
let matches;

export class ViewMatches extends Component {
  state = {};
  render() {
    matches = this.props.matches;
    tba = this.props.thebluealliance;
    return (
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <Container>
          <Row className="border-bottom">
            <h2 className="h2">Matches</h2>
          </Row>
          <Row style={spacer}></Row>
          <Row>
            <h4 style={center}>Current Match</h4>
          </Row>
          <Row>
            <MatchNum matchNum={matches.currentMatch} />
          </Row>
          <Row>
            <MatchCodes data={matches.matchCodes} />
          </Row>
          <Row>
            <Matches
              matches={tba.schedule}
              style={center}
              currentMatch={matches.currentMatch}
            ></Matches>
          </Row>
        </Container>
      </div>
    );
  }
}
const center = {
  width: "90%",
  textAlign: "center",
};
const mapStateToProps = (state) => {
  return {
    thebluealliance: state.thebluealliance,
    matches: state.matches,
  };
};
const mapDispatchToProps = (dispatch) => {
  // propName: (parameters) => dispatch(action)
  return {};
};
const spacer = {
  padding: "1vh",
};
export const ViewMatchesConn = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewMatches);
