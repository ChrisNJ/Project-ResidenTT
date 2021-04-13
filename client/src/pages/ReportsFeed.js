import React, { useEffect, useState } from "react";
import Tools from "../components/Report Footer/Tools";
import { toast } from "react-toastify";
import $ from "jquery";
// import Reacts from "./Reacts";

const ReportsFeed = () => {
  //The variables and functions used to set data about reports, activeCard on hover, verified user information and sorting
  const [userReports, setUserReports] = useState([]);
  const [reports, setReports] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [verified, setVerified] = useState([]);
  const [activeSort, setActiveSort] = useState("");
  const [toggled, setToggled] = useState(true);

  //Get data on all reports stored in the database
  async function getReports(range = 3) {
    try {
      const body = { range };
      const res = await fetch("/userreports/", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseData = await res.json();

      setUserReports(
        parseData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
      setReports(
        parseData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
      setActiveSort("new");
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getReports();
  }, []);

  //Verifies a user a exists and set their username and id.
  const verifyUser = async () => {
    try {
      const res = await fetch("/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();
      setVerified(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  const hoverCard = (cardId) => {
    setActiveCard(cardId);
  };

  //Sort by newest report
  const toggleNewest = () => {
    try {
      console.log(reports.updatedAt);
      setReports(
        [...reports].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        )
      );
      setActiveSort("new");
    } catch (err) {
      console.error(err.message);
    }
  };

  //Sort by oldest report
  const toggleOldest = () => {
    try {
      setReports(
        [...reports].sort(
          (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
        )
      );
      setActiveSort("old");
    } catch (err) {
      console.error(err.message);
    }
  };

  const checkFile = (url) => {
    if (url) {
      if (url.match(/.(mp4|3g2|3gp|flv|mkv|mpeg|ogv|avi|mov|wmv)$/i)) {
        return true;
      } else {
        return false;
      }
    }
  };

  //Sort by most popular report
  //   const togglePopular = () => {
  //     try {
  //       setReports([...reports].sort((a, b) => b.likes - a.likes));
  //       setActiveSort("popular");
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   };

  const YourPosts = () => {
    try {
      console.log(toggled);
      if (toggled) {
        setReports(
          [...userReports].filter((report) => report.user.id == verified.userID)
        );
      } else {
        setReports(userReports);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="mt-5 text-center">Crime Reports by Users</h1>
      <div className="row mb-4">
        <div className="col-md-2 offset-md-1">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sort
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button
                className={
                  activeSort === "new"
                    ? "dropdown-item active"
                    : "dropdown-item"
                }
                onClick={() => toggleNewest()}
              >
                Newest
              </button>
              <button
                className={
                  activeSort === "old"
                    ? "dropdown-item active"
                    : "dropdown-item"
                }
                onClick={() => toggleOldest()}
              >
                Oldest
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-2 offset-md-7">
          {/* <button
            className="btn btn-primary"
            onClick={() => {
              verified.auth
                ? (window.location.href = "/createposts")
                : toast.error("You need to be logged in", {
                    position: "top-right",
                    autoClose: 1750,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
            }}
          >
            Create Post
          </button> */}
          <div class="custom-control custom-switch custom-switch-md">
            {verified.auth ? (
              <input
                type="checkbox"
                class="custom-control-input"
                id="customSwitch1"
                onClick={() => {
                  setToggled(!toggled);
                  YourPosts();
                }}
              />
            ) : (
              <input
                type="checkbox"
                class="custom-control-input"
                disabled
                id="customSwitch1"
              />
            )}
            <label class="custom-control-label text-white" for="customSwitch1">
              Your Reports
            </label>
          </div>
        </div>
      </div>

      {reports.map(function (report) {
        return (
          <div className="d-flex justify-content-center">
            <div
              key={report.id}
              className={
                report.id === activeCard
                  ? "card bg-light  mb-3"
                  : "card bg-dark  mb-3"
              }
              style={{ width: "40rem" }}
              onMouseOver={() => hoverCard(report.id)}
              onMouseLeave={() => hoverCard(null)}
            >
              {/* <div className="row no-gutters"> */}
              <div class="card-header">
                <div className="row">
                  <div className="col-3 col-sm-2 my-auto ">
                    <img
                      src={report.user.profileImage}
                      style={{ width: "100%" }}
                      alt="..."
                    />
                  </div>
                  <div className="col-9 col-sm-10 my-auto ">
                    {/* <div className="row"> */}
                    <h6> Reported by: {report.user.userName} </h6>
                    <small> on {report.updatedAt} </small>
                    {/* </div> */}
                  </div>
                </div>
              </div>
              <div class="card-body">
                <h5 class="card-title">{report.crimeInfo}</h5>
                <p class="card-text h6">Offence: {report.offences}</p>
                <p class="card-text h6">Location: {report.location}</p>
                <p class="card-text h6">
                  Date: {report.date} {report.time}
                </p>
              </div>

              {report.media[0] ? (
                checkFile(report.media[0].mediaUrl) ? (
                  <div class="card-body">
                    <div class="embed-responsive embed-responsive-16by9">
                      <video
                        width="100%"
                        height="80%"
                        controls
                        src={report.media[0].mediaUrl}
                      >
                        Cannot load on your browser.
                      </video>
                    </div>
                  </div>
                ) : (
                  <div class="card-body">
                    <div class="embed-responsive embed-responsive-16by9">
                      <img
                        className="card-img-bottom embed-responsive-item"
                        src={report.media[0].mediaUrl}
                        alt="..."
                      />
                    </div>
                  </div>
                )
              ) : (
                <div></div>
              )}

              {report.user.id == verified.userID ? ( //If the user is logged in then display comments, update and delete buttons
                <Tools report={report} />
              ) : (
                <div></div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReportsFeed;
