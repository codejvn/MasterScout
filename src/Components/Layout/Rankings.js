import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import { RankRow } from "../RankRow.js";
import { connect } from "react-redux";
import Table from 'react-bootstrap/Table';



export class Rankings extends Component {
    render() {
        return (
            <Container>
                <h3 style={mainHead}>Team Rankings</h3>
                
                <Table hover style={noTop} striped>
                    <tbody>
                        {this.props.dataReducer.teams.map((team) => {
                            return <RankRow team={team} />;
                        })}
                        {console.log(this.props.dataReducer.teams)}
                    </tbody>
                </Table>

            </Container>
        )
    }
}
const center = {
    textAlign: "center",
    width: "16%",

}
const noTop = {
    top: "0px",
    marginTop: "0px",
    bottom: "0px",
    marginBottom: "0px",
    width: "100%"
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


export default Rankings = connect(mapStateToProps)(Rankings);