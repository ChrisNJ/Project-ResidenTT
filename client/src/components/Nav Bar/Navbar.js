import { useState } from "react";
import { Route, withRouter, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import React from "react";
import $ from "jquery";

import { makeStyles } from "@material-ui/core/styles";

const Navbar = ({ userAuth, setAuth }, props) => {
  let history = useHistory();

  const [name, setName] = useState("");
  const [profileImage, setImage] = useState("");

  //Get User Information
  const getUser = async () => {
    try {
      const res = await fetch("/profile/", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();

      setName(parseData.userName);
      setImage(parseData.profileImage);
    } catch (err) {
      console.error(err.message);
    }
  };

  $(function () {
    window.$(document).click(function (event) {
      window.$(".navbar-collapse").collapse("hide");
    });
  });

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary"
      style={{ height: "100px !important" }}
    >
      <a className="navbar-brand" href="/">
        <img
          src="https://res.cloudinary.com/dtqlgbedo/image/upload/v1614766666/info3604project/favicon_inm9xs.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />{" "}
        ResidenTT
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={() => history.push("/")}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => history.push("/map")}
            >
              Map
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => history.push("/stats")}
            >
              Statistics
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => history.push("/feed")}
            >
              News Feed
            </a>
          </li>
          <li className="enable-notifications nav-item">
            <a
              className="nav-link"
              href="#"
              //onClick={}
            >
              Enable Notifications
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => history.push("/reportsfeed")}
            >
              User Reports
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {!userAuth ? (
            <li className="nav-item">
              <a
                className="btn btn-outline-info "
                href="#"
                onClick={() => history.push("/login")}
              >
                Log In
              </a>
            </li>
          ) : (
            (getUser(),
            (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src={profileImage}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt=""
                  />{" "}
                  {name}
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a
                    className="btn dropdown-item"
                    href="#"
                    onClick={() => history.push("/profile")}
                  >
                    Profile
                  </a>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </nav>
  );
};
export default withRouter(Navbar);
