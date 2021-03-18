import "./App.css";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Stats from "./pages/Stats";
import Feed from "./pages/NewsFeed";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ReportCrime from "./pages/ReportCrime"

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Particles from "react-particles-js";
import NavBar from "./components/Nav Bar/Navbar";
import Chat from "./components/Chat/Chat";
import SimpleModal from "./components/Chat/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function App() {
  //variables used for setting authenticated and page loading
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //Function passed to child components to set authentication
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  //Send the token in local storage to verify the user
  async function isAuth() {
    try {
      const res = await fetch("/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await res.json();
      //If the auth (boolean) part of the response from the server is true then set authenticated
      parseRes.auth === true
        ? setIsAuthenticated(true)
        : setIsAuthenticated(false);

      console.log(isAuthenticated);
    } catch (err) {
      console.error(err.message);
    }
  }

  //Calls isAuth on load and when state variables change
  useEffect(() => {
    isAuth();
  }, []);

  return (
    <Router>
      <div className="App">
        <div style={{ position: "absolute" }}>
          <Particles
            height="100vh"
            width="100vw"
            params={{
              particles: {
                number: {
                  value: 100,
                },
                size: {
                  value: 3,
                },
                color: {
                  value: "#ffffff",
                },
                line_linked: {
                  enable: true,
                  distance: 250,
                  color: "#3a9bde",
                  opacity: 0.4,
                  width: 1,
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
        {/* Lets the navbar know whether a user is authenticated on every page */}
        <NavBar userAuth={isAuthenticated} setAuth={setAuth} />

        <SimpleModal />
        <Switch>
          <Route exact path="/map" render={(props) => <Map {...props} />} />
          <Route exact path="/stats" render={(props) => <Stats {...props} />} />
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route exact path="/feed" render={(props) => <Feed {...props} />} />
          <Route exact path="/reportcrime" render={(props) => <ReportCrime {...props} />} />
          <Route
            exact
            path="/register"
            render={(props) =>
              !isAuthenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Redirect from="*" to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
