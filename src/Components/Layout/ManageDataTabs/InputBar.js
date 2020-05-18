import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import { connect } from "react-redux";
import { addData } from "../../../Actions/addData";
export class InputBarRaw extends Component {
  componentWillMount() {}
  submitHandle = (e) => {
    console.log("SUBMITTING");
    e.preventDefault();
    let data = this._input.value;
    console.log(data);
    this.props.addData(data);
    this._input.value = "";
    window.scrollTo(0, 0);
  };
  render() {
    return (
      <Col>
        <Form inline onSubmit={this.submitHandle}>
          <FormGroup as={Row} style={formWidth}>
            <FormControl
              type="text"
              className="mr-sm-2"
              ref={(el) => {
                this._input = el;
              }}
              style={inputWidth}
            />
            <Form.Label column sm={100}>
              {this.props.importer.data.length} / 6
            </Form.Label>
          </FormGroup>
        </Form>
      </Col>
    );
  }
}

const inputWidth = {
  width: "95%",
};
const formWidth = {
  width: "100%",
};
const mapStateToProps = (state) => {
  return {
    importer: state.importer,
  };
};
const mapDispatchToProps = (dispatch) => {
  // propName: (parameters) => dispatch(action)
  return {
    addData: (data) => dispatch(addData(data)),
    // modifyData: (data) => dispatch(modifyData(modifyData)),
    // Upload Data
  };
};
export const InputBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputBarRaw);
