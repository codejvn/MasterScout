import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { setAutoDownload } from "../../Actions/SettingsActions/setAutoDownload";
import { setImportFile } from "../../Actions/SettingsActions/setImportFile";
import { setMatchData } from "../../Actions/DataActions/setMatchData";
import { setTBA } from "../../Actions/TBAactions/setTBA";
import { resolve } from "dns";

export class SettingsRaw extends Component {
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
      this.props.setMatchData(parsed.teams);
      //resolve("yay");
      // }).then((res, rej) => {

      //setTimeout(this.props.setMatchData(parsed.teams), 2000);

      //});
    });
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
          <Row style={spacer}></Row>
          <Form>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Disable Auto Download"
                onChange={this.toggleAutoDownload}
              />
            </Form.Group>
          </Form>
          <Row>
            <Button onClick={this.downloadComp}>
              Download Competition Data
            </Button>
          </Row>
          <Row>
            <p style={spacer}>Import Competition Data: </p>
            <input
              type="file"
              name="file"
              onChange={this.fileSelectHandle}
              style={spacer}
            />
            <Button style={buttonSize} onClick={this.setTeams}>
              {" "}
              Import{" "}
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
    setMatchData: (data) => dispatch(setMatchData(data)),
    setTBA: (data) => dispatch(setTBA(data)),
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
