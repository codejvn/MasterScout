import React, { Component } from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

export class PlusMinus extends Component {
    state = {
        id: this.props.id,
        // entryName: this.props.entryName,
        value: 0
    }
    changeHandle = (value) => {
        this.setState({ value: value }, () => {
            this.props.send(this.state);
        });
    }
    render() {
        return (
            <div style={centerStyle}>
                <h6 style={enlarge} >{this.props.title}</h6>
                <ButtonGroup className="mb-2 thin">
                    <Button variant="info" size="lg" style={buttonStyle}  >+</Button>
                    <p style={valueStyle} >{this.state.value}</p>
                    <Button variant="info" size="lg" style={buttonStyle} >-</Button>
                </ButtonGroup>
            </div>
        )
    }
    increment = () => {
        console.log("adding");
        this.setState({ value: this.state.value + 1 }, () => {
            this.props.send(this.state);
        });
    }
    decrement = () => {
        this.setState({ value: this.state.value - 1 }, () => {
            this.props.send(this.state);
        });
    }
}
// weird styling issues need to be fixed soon
const centerStyle = {
    textAlign: 'center',
    fontSize: "150%",
    width: '100%',
    display: "inline-center",
    marginLeft: '2%',
    marginRight: '2%',
}
const valueStyle = {
    marginBottom: "0px",
    backgroundColor: "white",
    textAlign: 'center',
    borderRadius: '6px',
    paddingTop: "5px",
    paddingBottom: "5px",
    color: 'black',
    width: "5vh"
}
const enlarge = {
    fontSize: "100%",
};
const buttonStyle = {
    width: '7vw',
    marginTop: "0px"
}
export default PlusMinus;