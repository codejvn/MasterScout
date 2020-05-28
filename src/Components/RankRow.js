import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { connect } from "react-redux";
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
// import Raw from './Layout/ManageDataTabs/Raw';

export class RankRow extends Component {
    render() {
        let team = this.props.team;
        // console.log(team.Team.teleopDataProps);
        return (
            <Container>
                <h3 style={mainHead}>Team Rankings</h3>
                <Table hover borderless style={noTop} striped>
                    <thead>
                        <tr>
                            <th style={center}>Team Ranking</th>
                            <th style={center}>Team</th>
                            <th style={center}>Inner</th>
                            <th style={center}>Outer</th>
                            <th style={center}>Bottom</th>
                            <th style={center}>Missed</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={center}>
                            <td style={teamRanking}>team ranking</td>
                            <td>variable team num</td>
                            <td>avg inner cells</td>
                            <td>avg outer cells</td>
                            <td>avg bottom cells</td>
                            <td>avg missed cells</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        )
    }
}
const mainHead = {
    textAlign: "center",
    marginTop: "1%",
};
const center = {
    textAlign: "center",
};
const teamRanking = {
    fontWeight: "bold",
    backgroundColor: "rgba(100,100,100,0.3 )"
};
const noTop = {
    top: "0px",
    marginTop: "0px",
    bottom: "0px",
    marginBottom: "0px",
};

export default RankRow;
