import React from "react";
const Home = () => {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translateX(-50%) translateY(-50%)",
          textAlign: "center",
        }}
      >
        <h1>Welcome to ResidenTT</h1>
        <h3>a crime prediction app</h3>
        <a href="/map" className="btn btn-outline-primary" role="button">
          Crime Map
        </a>
      </div>
    </div>
  );
};

export default Home;
