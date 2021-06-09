import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@material-ui/icons/Delete';
import { PicklistRow } from '../PicklistRow.js';
import { connect } from "react-redux";
import Button from 'react-bootstrap/Button'



export class PicklistRaw extends Component {
    showRanks = () => {
        let chart = [];
        for (var i = 0; i <= 24; i++) {
            chart.push(
                <tr style={spacer}>
                    <td>{i}</td>
                    <td>Picklist format</td>
                    <td><DeleteIcon></DeleteIcon></td>
                </tr>
            );
        }
        return chart;
    }
    render() {
        let searchedTeamNum = this.props.search.teamSearched; // team in search bar
        return (
            <Container>

                <Row className="border-bottom">
                    <Col>
                        <h2 style={header}>Picklist</h2>
                    </Col>
                    <Col style={rightAlign}>
                        <Button style={updateButt}>UPDATE RANKINGS</Button>
                    </Col>
                </Row>
                <Table striped style={spacer}>\
                    <tbody>
                        {this.props.dataReducer.teams.map((team, index) => {
                            return <PicklistRow team={team} index={index}></PicklistRow>
                        })}
                        {/* {this.showRanks()} */}
                    </tbody>
                </Table>
            </Container>
        );
    }
}
const header = {
    marginBottom: "2%",
    marginTop: "2%",
};
const spacer = {

};
const updateButt = {
    marginTop: "2.5%",
};
const rightAlign = {
    textAlign: "right",
};
const mapStateToProps = (state) => {
    return {
        dataReducer: state.dataReducer,
        search: state.search,
    };
};
export const Picklist = connect(mapStateToProps)(PicklistRaw);

