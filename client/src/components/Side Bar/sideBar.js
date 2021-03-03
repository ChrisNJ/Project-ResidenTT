import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Container
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,  
    justifyContent: `center`
  },
  navDisplayFlex: {
    display: `flex`,  
    justifyContent: `space-between`
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`
  }
}); 

const navLinks = [ 
  { title: `Home`, path: `/` },
   { title: `News Feed`, path: `/feed` },
   { title: `about us`, path: `/about` },
  { title: `Map`, path: `/map` },
  { title: `Statistics`, path: `/stats` }
 
];

const Sidebar = () => {
  const classes = useStyles();

  return (
    <AppBar position="relative">
      <Toolbar>
        <Container maxWidth="md" className={classes.navbarDisplayFlex}>
          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.navDisplayFlex} 

          >
            {navLinks.map(({ title, path }) => (
              <a href={path} key={title} className={classes.linkText}>
                <ListItem button>
                  <ListItemText primary={title} />
                </ListItem>
              </a>
            ))}
          </List>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
export default Sidebar;
