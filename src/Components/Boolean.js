
import React, { Component } from 'react'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
export class Boolean extends Component {
    state = {
        id: this.props.id,
        // entryName: this.props.entryName,
        value: "none"
    }
    render() {
        return (
            <div style = {overallStyle}>
            <h6 style={enlarge}>{this.props.title}</h6>
                <ToggleButtonGroup type = 'radio' name = "hi">
                    <ToggleButton type = 'radio' value = {true} variant="info" size = "lg" style = {buttonStyle}>Yes</ToggleButton>
                    <ToggleButton type = 'radio' value = {false} variant="info" size = "lg" style = {buttonStyle}>No</ToggleButton>
                </ToggleButtonGroup>
            </div>
        )
    }
    changeHandle = (value) =>{
        this.setState({value:value}, () => {
            this.props.send(this.state);
        });
    }
}
const enlarge = {
    fontSize: "150%",
};
const overallStyle = {
    textAlign: 'center',
    width: "100%",
    display: 'inline-center'
}
const buttonStyle = {
    width: "7vw",
    height: "5vh",
    textAlign: "center",
    paddingBottom: "30%"
}
export default Boolean;
