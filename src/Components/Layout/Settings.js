import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { setAutoDownload } from "../../Actions/SettingsActions/setAutoDownload";
export class SettingsRaw extends Component {
  toggleAutoDownload = (e) => {
    this.props.setAutoDownload(!this.props.settings.autoDownload);
  };
  downloadComp = (e) => {};
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
          <Button onClick={this.downloadComp}>Download Competition Data</Button>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    settings: state.settings,
    dataReducer: state.dataReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  // propName: (parameters) => dispatch(action)
  return {
    setAutoDownload: (toggle) => dispatch(setAutoDownload(toggle)),
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
