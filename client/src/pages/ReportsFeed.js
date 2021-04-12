import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import Reacts from "./Reacts";

const ReportsFeed = () => {
  //The variables and functions used to set data about reports, activeCard on hover, verified user information and sorting
  const [reports, setReports] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [verified, setVerified] = useState([]);
  const [activeSort, setActiveSort] = useState("");

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
      console.log("Testing", parseData);
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
      setReports(
        [...reports].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
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
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        )
      );
      setActiveSort("old");
    } catch (err) {
      console.error(err.message);
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

  return (
    <div className="container-fluid">
      <h1 className="mt-5 text-center">Crime Reports by Users</h1>
      <div className="row">
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
              {/* <button
                className={
                  activeSort === "popular"
                    ? "dropdown-item active"
                    : "dropdown-item"
                }
                onClick={() => togglePopular()}
              >
                Most Popular
              </button> */}
            </div>
          </div>
        </div>
        {/* <div className="col-md-2 offset-md-7">
          <button
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
          </button>
        </div> */}
      </div>
      <div className="container mt-5">
        {reports.map(function (report) {
          return (
            <div
              key={report.id}
              className={
                report.id === activeCard
                  ? "card text-white bg-secondary mb-4 h-90"
                  : "card bg-light mb-3"
              }
              onMouseOver={() => hoverCard(report.id)}
              onMouseLeave={() => hoverCard(null)}
            >
              <div className="row no-gutters">
                <div className="col-sm-2">
                  <img
                    className="card-img-top"
                    src={report.media[0].mediaUrl}
                    style={{ width: "100%" }}
                    alt="..."
                  />
                </div>
                <div className="col-sm-10">
                  <div className="card-body">
                    <h4 className="card-title">{report.offences}</h4>
                    <h6 className="card-text">{report.crimeInfo}</h6>
                    <h6 className="card-text">{report.location}</h6>
                  </div>
                  {/* {verified.auth ? ( //If the user is logged in then display like, disclick and delete buttons
                    <Reacts post={post} />
                  ) : (
                    <div></div>
                  )} */}
                  <div className="col text-right">
                    <div className="card-text">
                      Made by: {report.user.userName}
                    </div>
                    <div className="mt-0 card-text">
                      <small>Last updated at: {report.updatedAt}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReportsFeed;
