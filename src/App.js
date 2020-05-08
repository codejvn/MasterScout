import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import { Provider } from "react-redux";
import store from "./store";
import { Navigation } from "./Components/Navigation";
import { Sidebar } from "./Components/Sidebar";
import { SidebarContents } from "./Components/SidebarContents";
export class App extends Component {
  state = {
    activePage: 1,
  };
  render() {
    if (this.state.activePage == 0) {
      // this is temp lol
      return (
        <Provider store={store}>
          <div style={jumbotronStyle}>
            <Jumbotron className="container-full-bg" fluid>
              <h1 className="display-3">Nemesis Scouting</h1>
              <p>lol</p>
              <p>
                <Button variant="primary" onClick={this.goToDashboard}>
                  Get Started
                </Button>
              </p>
            </Jumbotron>
          </div>
        </Provider>
      );
    } else {
      return (
        <Provider store={store}>
          <div>
            <Navigation />
            <Tab.Container
              defaultActiveKey="2"
              className="justify-content-between"
            >
              <Row>
                <Sidebar />
                <SidebarContents />
              </Row>
            </Tab.Container>
          </div>
        </Provider>
      );
    }
  }
  goToDashboard = () => {
    this.setState({
      activePage: 1,
    });
  };
}
const fixedPos = {
  position: "fixed",
  textAlign: "center",
};
const fullWidth = {
  width: "100%",
};
const center = {
  textAlign: "center",
};
const rightBorder = {
  position: "sticky",
  borderRight: "1px",
  borderRightStyle: "solid",
  borderColor: "rgb(225,225,225)",
  backgroundColor: "rgb(250,250,250)",
  height: "300vw",
  width: "15.5%",
  textAlign: "center",
};
const jumbotronStyle = {
  textAlign: "center",
  height: "100%",
};
export default App;
