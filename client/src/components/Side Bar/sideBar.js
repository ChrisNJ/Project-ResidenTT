import * as React from "react";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   Container
// } from "@material-ui/core";
// import { Home } from "@material-ui/icons";
// import { makeStyles } from "@material-ui/core/styles";
// const useStyles = makeStyles({
//   navbarDisplayFlex: {
//     display: `flex`,
//     justifyContent: `center`
//   },
//   navDisplayFlex: {
//     display: `flex`,
//     justifyContent: `space-between`
//   },
//   linkText: {
//     textDecoration: `none`,
//     textTransform: `uppercase`,
//     color: `white`
//   }
// });

const navLinks = [
  { title: `Home`, path: `/` },
  { title: `Map`, path: `/map` },
  { title: `Statistics`, path: `/stats` },
  { title: `News Feed`, path: `/feed` },
];

const Sidebar = () => {
  // const classes = useStyles();

  return (
    // <AppBar position="relative">
    //   <Toolbar>

    //     <Container maxWidth="md" className={classes.navbarDisplayFlex}>
    //       <List
    //         component="nav"
    //         aria-labelledby="main navigation"
    //         className={classes.navDisplayFlex}

    //       >
    //         {navLinks.map(({ title, path }) => (
    //           <a href={path} key={title} className={classes.linkText}>
    //             <ListItem button>
    //               <ListItemText primary={title} />
    //             </ListItem>
    //           </a>

    //         ))}
    //       </List>
    //     </Container>

    //   </Toolbar>
    // </AppBar>
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-primary"
      style={{ height: "100px !important" }}
    >
      <a class="navbar-brand" href="#">
        {/* <img
          src="https://res.cloudinary.com/dtqlgbedo/image/upload/v1614766622/info3604project/logo_ekkdfw.png"
          width="30"
          height="30"
          alt=""
        /> */}
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
