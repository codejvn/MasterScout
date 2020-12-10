import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import dScript from './drawingScript';
import Canvas from './Canvas';
import gameField from './gameField2020.png'
import Button from 'react-bootstrap/Button';

export class MatchPlanning extends Component {

    render() {
        return (
            <Container style={pushLeft}>
                <Canvas id="canvas">
                </Canvas>

                <Button id="red" style={redButton}></Button>
                <Button id="blue" style={blueButton}></Button>
                <Button id="green" style={greenButton}></Button>
                <Button id="purple" style={purpleButton}></Button>
                <Button id="yellow" style={yellowButton}></Button>

                

                <img className="invisible" id="image" src={gameField} alt="Game Field" />
                <script src={dScript}></script>
            </Container>
        );
    }
}
const pushLeft = {
    marginLeft: "0",
    marginTop: "2%",
    textAlign: "center",
}
const redButton = {
    backgroundColor: "red",
    borderRadius: "100%",
    padding: "2vh",
    marginLeft: "3vh",
    marginTop: "2vh",
}
const yellowButton = {
    backgroundColor: "yellow",
    borderRadius: "100%",
    padding: "2vh",
    marginLeft: "3vh",
    marginTop: "2vh",
}
const blueButton = {
    backgroundColor: "blue",
    borderRadius: "100%",
    padding: "2vh",
    marginLeft: "3vh",
    marginTop: "2vh",
}
const purpleButton = {
    backgroundColor: "magenta",
    borderRadius: "100%",
    padding: "2vh",
    marginLeft: "3vh",
    marginTop: "2vh",
}
const greenButton = {
    backgroundColor: "limegreen",
    borderRadius: "100%",
    padding: "2vh",
    marginLeft: "3vh",
    marginTop: "2vh",
}

export default MatchPlanning;