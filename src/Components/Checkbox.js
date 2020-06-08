//this currently doesn't work not showing the actual check box
import React, { Component } from 'react';
import FormCheck from 'react-bootstrap/FormCheck';
import { FormGroup } from 'reactstrap';

export class Checkbox extends Component {
    state = {
        id: this.props.id,
        value: this.props.value
    }
    render() {
        return (
            <div style={this.overallStyle}>
                <h6 style={headers}>{this.props.title}</h6>
                <FormGroup name="hi" type="checkbox" >
                    <FormCheck type='checkbox' value={true} variant="info" size="lg" style={buttonStyle}>{this.props.title}</FormCheck>
                </FormGroup>
            </div>
        )
    }

}
const headers = {
    fontSize: "150%",
}
const overallStyle = {
    textAlign: 'center',
    display: 'inline-center',
    width: "100%"
}
const buttonStyle = {
    width: "15vw",
    height: "5vh",
    textAlign: "center",
}
export default Checkbox;