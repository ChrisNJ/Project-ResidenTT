import React from "react";
import SimpleModal from "../components/Chat/Modal";
const Home = () => {
  return (
    <div>
      <div
        class="d-flex flex-column  min-vh-100 justify-content-center align-items-center"
        style={{ position: "relative" }}
      >
        <h1 class="align-middle">Welcome to ResidenTT</h1>
        <h3 class="align-middle">a crime prediction app</h3>
        <a href="/map" class="btn btn-outline-primary" role="button">
          Crime Map
        </a>
      </div>
      <SimpleModal />
    </div>
  );
};

export default Home;
