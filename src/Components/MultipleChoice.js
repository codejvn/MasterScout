import React, { Component } from 'react'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

export class MultipleChoice extends Component {
    state = {
        id: this.props.id,
        // entryName: this.props.entryName,
        value: this.props.options[0]
    }
    render() {
        let rend;
        switch(this.props.options.length){
            case 2:
                rend = (
                    <div style = {overallStyle} >
                    <h6 style={headers}>{this.props.title}</h6>
                        <ToggleButtonGroup type = 'radio' name = {this.props.title} className = "thin">
                            <ToggleButton type = 'radio'  value = {this.props.options[0]} variant="info" size = "lg" style = {buttonStyle}>{this.props.options[0]}</ToggleButton>
                            <ToggleButton type = 'radio'  value = {this.props.options[1]} variant="info" size = "lg" style = {buttonStyle}>{this.props.options[1]}</ToggleButton>
                        </ToggleButtonGroup>
                    </div>  
                )
                break;
                
            case 3:
                rend = (
                    <div style = {overallStyle} >
                    <h6 style={headers}>{this.props.title}</h6>
                        <ToggleButtonGroup type = 'radio' name = {this.props.title} className = "thin">
                            <ToggleButton type = 'radio'  value = {this.props.options[0]} variant="info" size = "lg" style = {buttonStyle}>{this.props.options[0]}</ToggleButton>
                            <ToggleButton type = 'radio'  value = {this.props.options[1]} variant="info" size = "lg" style = {buttonStyle}>{this.props.options[1]}</ToggleButton>
                            <ToggleButton type = 'radio'  value = {this.props.options[2]} variant="info" size = "lg" style = {buttonStyle}>{this.props.options[2]}</ToggleButton>
                        </ToggleButtonGroup>
                    </div>  
                )
                break;
            case 4:
                rend = (
                    <div style = {overallStyle}>
                    <h6 style={headers}>{this.props.title}</h6>
                        <ToggleButtonGroup type = 'radio' name = {this.props.title} className = "thin">
                            <ToggleButton type = 'radio'  value = {this.props.options[0]} variant="info" size = "lg" style = {buttonStyle}>{this.props.options[0]}</ToggleButton>
                            <ToggleButton type = 'radio'  value = {this.props.options[1]} variant="info" size = "lg" style = {buttonStyle}>{this.props.options[1]}</ToggleButton>
                            <ToggleButton type = 'radio'  value = {this.props.options[2]} variant="info" size = "lg" style = {buttonStyle}>{this.props.options[2]}</ToggleButton>
                            <ToggleButton type = 'radio'  value = {this.props.options[3]} variant="info" size = "lg" style = {buttonStyle}>{this.props.options[3]}</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                )
                break;
            case 5:
                rend = (
                    <div style = {overallStyle}>
                    <h6 style={headers}>{this.props.title}</h6>
                        <ToggleButtonGroup type = 'radio' name = {this.props.title} className = "thin">
                            <ToggleButton type = 'radio'  value = {this.props.options[0]} variant="info" size = "lg" style = {buttonStyle}>{this.props.options[0]}</ToggleButton>
                            <ToggleButton type = 'radio'  value = {this.props.options[1]} variant="info" size = "lg" style = {buttonStyle}>{this.props.options[1]}</ToggleButton>
                            <ToggleButton type = 'radio'  value = {this.props.options[2]} variant="info" size = "lg" style = {buttonStyle}>{this.props.options[2]}</ToggleButton>
                            <ToggleButton type = 'radio'  value = {this.props.options[3]} variant="info" size = "lg" style = {buttonStyle}>{this.props.options[3]}</ToggleButton>
                            <ToggleButton type = 'radio'  value = {this.props.options[4]} variant="info" size = "lg" style = {buttonStyle}>{this.props.options[4]}</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                )
                break;
        }
        return rend
    }
    // changeHandle = (value) =>{
    //     this.setState({value:value}, () => {
    //         this.props.send(this.state);
    //     });
    // }
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
    paddingBottom: "8.5%",
}
export default MultipleChoice;