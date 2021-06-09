import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import dScript from './drawingScript';
import Canvas from './Canvas';
import gameField from './gameField2020.png'
import Button from 'react-bootstrap/Button';

//fix image styling
//make toolbar draggable and more sexy 

export class MatchPlanning extends Component {

    render() {
        return (
            <Container style={pushLeft}>
                <Canvas id="canvas">
                </Canvas>

                <Container style={toolbarWrap}>
                    <div style={toolbar}>
                        <Button id="red" style={redButton}></Button>
                        <Button id="blue" style={blueButton}></Button>
                        <Button id="green" style={greenButton}></Button>
                        <Button id="purple" style={purpleButton}></Button>
                        <Button id="yellow" style={yellowButton}></Button>
                        <Button variant="dark" id="laptop" style={toggles}>Laptop</Button>
                        <Button variant="dark" id="touch" style={toggles}>Touch-Screen Device</Button>
                    </div>
                </Container>


                <img className="invisible" style={minimize} id="image" src={gameField} alt="Game Field" />
                <script src={dScript}></script>
            </Container>
        );
    }
}
const minimize = {
    width: "1px",
}
const toolbar = {
    backgroundColor: "lightgray",
    padding: '2vh',
    width: "80%",
    border: "2px solid gray",
    align: "center",
}
const toolbarWrap = {
    textAlign: "center",
}
const toggles = {
    marginLeft: "3vh",
    marginTop: "2vh",
    marginBottom: "2vh",
}
const pushLeft = {
    marginLeft: "0",
    marginTop: "2%",
    textAlign: "center",
}
const redButton = {
    backgroundColor: "red",
    borderRadius: "100%",
    padding: "1.5vh",
    marginLeft: "3vh",
}
const yellowButton = {
    backgroundColor: "yellow",
    borderRadius: "100%",
    padding: "1.5vh",
    marginLeft: "3vh",
}
const blueButton = {
    backgroundColor: "blue",
    borderRadius: "100%",
    padding: "1.5vh",
    marginLeft: "3vh",
}
const purpleButton = {
    backgroundColor: "magenta",
    borderRadius: "100%",
    padding: "1.5vh",
    marginLeft: "3vh",
}
const greenButton = {
    backgroundColor: "limegreen",
    borderRadius: "100%",
    padding: "1.5vh",
    marginLeft: "3vh",
}

export default MatchPlanning;