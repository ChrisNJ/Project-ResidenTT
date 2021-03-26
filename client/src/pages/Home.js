import React from "react";
import SimpleModal from "../components/Chat/Modal";
const Home = () => {
  return (
    <div>
      <div
        className="d-flex flex-column min-vh-100 justify-content-center align-items-center text-center"
        style={{ position: "relative" }}
      >
        <h1>Welcome to ResidenTT</h1>
        <h3>a crime prediction app</h3>
        <a href="/map" className="btn btn-outline-primary" role="button">
          Crime Map
        </a>
      </div>
      <SimpleModal />
    </div>
  );
};

export default Home;
