import * as React from "react";

const navLinks = [
  { title: `Home`, path: `/` },
  { title: `Map`, path: `/map` },
  { title: `Statistics`, path: `/stats` },
  { title: `News Feed`, path: `/feed` },
];

const Sidebar = (props) => {
  // const { history } = props;

  // const navLinks = [
  //   { title: `Home`, onClick: () => history.push("/") },
  //   { title: `Map`, onClick: () => history.push("/map") },
  //   { title: `Statistics`, onClick: () => history.push("/stats") },
  //   { title: `News Feed`, onClick: () => history.push("/feed") },
  // ];

  return (
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-primary"
      style={{ height: "100px !important" }}
    >
      <a class="navbar-brand" href="/">
        <img
          src="https://res.cloudinary.com/dtqlgbedo/image/upload/v1614766666/info3604project/favicon_inm9xs.png"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt=""
        />{" "}
        ResidenTT
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          {navLinks.map(({ title, path }) => (
            <li class="nav-item">
              <a class="nav-link" href={path}>
                {title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
export default Sidebar;
