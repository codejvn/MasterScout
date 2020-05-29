import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import { connect } from "react-redux";

export class RankRow extends Component {
    render() {
        let team = this.props.team;
        return (
            <Container>
                <tr style={{textAlign:"center", width:"100%", marginTop: "50%"}}>
                    <td style={teamRanking}>Team Rank</td>
                    <td style={center}>Team: {this.props.dataReducer.teams[0].teamNumber}</td>
                    <td style={center}>Inner: {this.props.dataReducer.teams[0].aggregated[0][4] + this.props.dataReducer.teams[0].aggregated[1][2]}</td>
                    <td style={center}>Outer: {this.props.dataReducer.teams[0].aggregated[0][3] + this.props.dataReducer.teams[0].aggregated[1][1]}</td>
                    <td style={center}>Bottom: {this.props.dataReducer.teams[0].aggregated[0][2] + this.props.dataReducer.teams[0].aggregated[1][0]}</td>
                    <td style={center}>Missed: {this.props.dataReducer.teams[0].aggregated[1][3]}</td>
                </tr>
            </Container>
        )
    }
}

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

const mapStateToProps = (state) => {
    return {
        dataReducer: state.dataReducer,
    };
};

export default RankRow = connect(mapStateToProps)(RankRow);
