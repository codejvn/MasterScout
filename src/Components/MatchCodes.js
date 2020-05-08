import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
var QRCode = require("qrcode.react"); // lol
export class MatchCodes extends Component {
  render() {
    return (
      <Container>
        <Row>
          {this.props.data.map((codeData) => (
            <Col>
              <QRCode value={codeData} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default MatchCodes;
