import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { DataPreview } from "./DataPreview";
import { connect } from "react-redux";
import { InputBar } from "./InputBar";
import { clearData } from "../../../Actions/clearData";
import { appendMatchData } from "../../../Actions/appendMatchData";
export class ImportRaw extends Component {
  componentWillMount() {
    this.props.appendMatchData([
      {
        data: {
          auto: [
            { id: 0, value: "C" },
            { id: 1, value: true },
            { id: 2, value: 3 },
            { id: 3, value: 1 },
            { id: 4, value: 2 },
            { id: 5, value: 5 },
            { id: 6, value: 0 },
          ],
          teleop: [
            { id: 0, value: 3 },
            { id: 1, value: 1 },
            { id: 2, value: 2 },
            { id: 3, value: 3 },
            { id: 4, value: 2 },
            { id: 5, value: false },
            { id: 6, value: false },
            { id: 7, value: 3 },
            { id: 8, value: 2 },
            { id: 9, value: 2 },
            { id: 10, value: 4 },
            { id: 11, value: 4 },
          ],
          endgame: [
            { id: 12, value: true },
            { id: 13, value: true },
            { id: 14, value: "C" },
            { id: 15, value: false },
            { entryName: "timeleft", id: 16, value: "12" },
          ],
        },
        comment: "this is a really cool robot!!",
        matchNum: "6",
        teamNum: "2590",
        scout: "Abhik",
      },
    ]);
  }
  state = {
    showSuccess: false,
    showFail: false,
    editable: true,
  };
  importHandle = () => {
    this.props.clearData();
    this.setShow(true);
    this.props.appendMatchData(this.props.importer.data);
  };
  setShow = (success) => {
    this.setState({
      ...this.state,
      showSuccess: success,
      showFail: !success,
    });
  };
  toggleEdit = () => {
    this.setState({
      ...this.state,
      editable: !this.state.editable,
    });
  };
  render() {
    return (
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
        <Container>
          <Row className="border-bottom">
            <h2>Import Data</h2>
          </Row>
          <Row>
            <div style={spacer}></div>
          </Row>
          <Row>
            <InputBar style={formWidth} />
          </Row>
          {this.props.importer.data.map((data) => {
            return <DataPreview data={data} editable={false}></DataPreview>;
          })}
          <Row>
            <Button style={importStyle} block onClick={this.importHandle}>
              Import
            </Button>
          </Row>
          <Row>
            <div style={spacer}></div>
          </Row>
          {this.state.showSuccess && (
            <Alert
              variant="success"
              onClose={() => this.setShow(false)}
              dismissible 
              style = {alertStyle}
            >
              Success! The data was successfully imported.
            </Alert>
          )}
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    importer: state.importer,
  };
};

const mapDispatchToProps = (dispatch) => {
  // propName: (parameters) => dispatch(action)
  return {
    clearData: (data) => dispatch(clearData()),
    appendMatchData: (data) => dispatch(appendMatchData(data)),
    // modifyData: (data) => dispatch(modifyData(modifyData)),
    // Upload Data
  };
};

const importStyle = {
  marginTop: "5%",
  width: "25%",
};
const alertStyle = {
  marginTop: "1%",
  width: "100%",
};
const formWidth = {
  width: "100%",
};
const spacer = {
  padding: "2vh",
};
const noBotMargin = {
  marginBottom: "0px",
};
const spacerSmall = {
  padding: "1vh",
};
export const Import = connect(mapStateToProps, mapDispatchToProps)(ImportRaw);
