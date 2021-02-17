import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Map from "./pages/Map";
import React from "react";

import ReactDOM from "react-dom";
import Modal from "react-modal";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Particles from "react-particles-js";
import SideBar from "./components/Side Bar/sideBar";
import Chat from "./components/Chat/Chat";
import SimpleModal from "./components/Chat/Modal";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="particle-container">
          <Particles
            params={{
              particles: {
                number: {
                  value: 80,
                },
                size: {
                  value: 3,
                },
              },
              interactivity: {
                events: {
                  onhover: {
                    enable: true,
                    mode: "repulse",
                  },
                },
              },
            }}
          />
        </div>
        <SideBar />
        <SimpleModal />
        <Switch>
          <Route exact path="/about" render={(props) => <About {...props} />} />
          <Route exact path="/map" render={(props) => <Map {...props} />} />
          <Route exact path="/" render={(props) => <Home {...props} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
