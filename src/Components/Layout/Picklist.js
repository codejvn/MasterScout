import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@material-ui/icons/Delete';

export class Picklist extends Component {
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
        return (
            <Container>
                <Row className="border-bottom">
                    <Col>
                        <h2 style={header}>Picklist</h2>
                    </Col>
                </Row>
                <Table striped style={spacer}>
                    <tbody>
                        {this.showRanks()}
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
