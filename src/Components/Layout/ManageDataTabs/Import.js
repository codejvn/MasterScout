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
export class ImportRaw extends Component {
  state = {
    showSuccess: false,
    showFail: false,
    editable: true,
  };
  importHandle = () => {
    this.props.clearData();
    this.setShow(true);
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
          {this.state.showSuccess && (
            <div>
              <Row>
                <div style={spacerSmall}></div>
              </Row>
              <Alert
                variant="success"
                onClose={() => this.setShow(false)}
                dismissible
                style={noBotMargin}
              >
                Success! The data was successfully imported.
              </Alert>
            </div>
          )}
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
            <Button block onClick={this.importHandle}>
              Import
            </Button>
          </Row>
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
    // modifyData: (data) => dispatch(modifyData(modifyData)),
    // Upload Data
  };
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
