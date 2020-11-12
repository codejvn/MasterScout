import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { setAutoDownload } from "../../Actions/SettingsActions/setAutoDownload";
import { setImportFile } from "../../Actions/SettingsActions/setImportFile";
import { setCompData } from "../../Actions/DataActions/setCompData";
import { setTBA } from "../../Actions/TBAactions/setTBA";
import { setTeams } from "../../Actions/TBAactions/setTeams";
import axios from 'axios';

//ONCE DATABASE IS DONE, GET RID OF LOCAL DOWNLOAD AND CHANGE TO DOWNLOAD FROM DB - METHOD EXISTS 
//DELETE? COULD BE RISKY 

export class SettingsRaw extends Component {
  constructor(props){
    super(props);
    this.state = ({
      data: []
    });
  }

  toggleAutoDownload = (e) => {
    this.props.setAutoDownload(!this.props.settings.autoDownload);
  };

  downloadComp = (e) => {
    console.log("lol");
    this.download(
      "CTDataSet.json",
      JSON.stringify({ teams: this.props.dataReducer.teams })
    );
  };

  getTeams = async () => {
    const response = await axios.get('https://jsonbox.io/box_27ac3dacb977a1e82148/data')
    this.setState({
      data: response
    })
    console.log(this.state.data)
  }

  downloadDB = (e) => {
    console.log('downloading db data');
    this.download(
      "DBtest.json",
      JSON.stringify(this.state.data)
    )
  }

  download = (filename, text) => {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };
  fileSelectHandle = (e) => {
    console.log(e.target.files[0]);
    this.props.setImportFile(e.target.files[0]);
  };
  setTeams = (e) => {
    console.log("ABOUT TO IMPORT");
    let file = this.props.settings.attachedFile;
    const fs = require("fs");
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      let result = reader.result;
      let parsed = JSON.parse(result);
      console.log(parsed);
      // let update = new Promise((res, rej) => {
      this.props.setTBA(parsed.tba);
      console.log("SETTING TEAMS");
      this.props.setTeams(this.props.tba.event.key);
      console.log("SETTING DATA");
      setTimeout(() => {
        this.props.setCompData(parsed.teams);
      }, 5000);
      //resolve("yay");
      // }).then((res, rej) => {

      //setTimeout(this.props.setMatchData(parsed.teams), 2000);

      //});
    });
    //should add alert but doesn't something off with this function
    // return <Alert variant="success">You successfully imported data!</Alert>;   this broke it lol, could add this later
    reader.readAsText(file);
  };
  render() {
    return (
      <div style={spacer}>
        <Container>
          <Row className="border-bottom">
            <Col>
              <h2 style={settingsHeader}>Settings</h2>
            </Col>
          </Row>
          <Row style={spacer}>
            <Form>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Disable Auto Download"
                  onChange={this.toggleAutoDownload}
                />
              </Form.Group>
            </Form>
          </Row>
          <hr></hr>
          <Row>
            <div style={spacer}>
              <Button onClick={this.downloadComp} variant="info">
                Download Competition Data
              </Button>
            </div>
          </Row>
          <hr></hr>
          <Row>
            <p style={spacer}>Import Competition Data: </p>
            <input
              type="file"
              name="file"
              onChange={this.fileSelectHandle}
              style={spacer}
            />
            <div style={spacer}>
              <Button style={buttonSize} onClick={this.setTeams} variant="info">
                {" "}
                Import{" "}
              </Button>
            </div>
          </Row>
          <hr></hr>
          <Row>
            <Button onClick={() => {
              this.getTeams();
              this.downloadDB();
            }}>
              DOWNLOAD DB ATUFF
            </Button>
          </Row>
        </Container>
      </div>
    );
  }
}
const buttonSize = {
  height: "90%",
};
const mapStateToProps = (state) => {
  return {
    settings: state.settings,
    dataReducer: state.dataReducer,
    tba: state.thebluealliance,
  };
};

const mapDispatchToProps = (dispatch) => {
  // propName: (parameters) => dispatch(action)
  return {
    setAutoDownload: (toggle) => dispatch(setAutoDownload(toggle)),
    setImportFile: (file) => dispatch(setImportFile(file)),
    setCompData: (data) => dispatch(setCompData(data)),
    setTBA: (data) => dispatch(setTBA(data)),
    setTeams: (nums) => dispatch(setTeams(nums)),
    // Upload Data
  };
};

const spacer = {
  padding: "2vh",
};

const settingsHeader = {
  marginBottom: "2%",
};

export const Settings = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsRaw);
