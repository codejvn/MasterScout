import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
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
            <Jumbotron
              className="container-full-bg"
              fluid
              style={jumbotronStyle}
            >
              <div style={bigSpacer}></div>
              <div style={center}>
                <h1 className="display-3" style={center}>
                  Nemesis Scouting
                </h1>
                <div style={smallSpacer}></div>
                <p>
                  <Button
                    variant="primary"
                    onClick={this.goToDashboard}
                    style={center}
                  >
                    Start Scouting
                  </Button>
                </p>
              </div>
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
const bigSpacer = {
  padding: "8%",
};
const smallSpacer = {
  padding: "1%",
};
const jumbotronStyle = {
  textAlign: "center",
  height: "100vh",
  color: "white",
  backgroundColor: "black",
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.8)),url(https://source.unsplash.com/collection/8536824/1600x900)",
};
const center = {
  margin: "auto",
};
export default App;
