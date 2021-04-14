import { React, Component } from "react";
import axios from "axios";

//import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = (theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

class Feed extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      scrappedLink: [],
      stories: [],
      loading: false,
    };
  }

  componentDidMount = () => {
    this.state.loading = true;
    axios.get("/scrape").then((response) => {
      this.setState({
        scrappedLink: response.data,
      });
      console.log(this.state.scrappedLink);
      //this.getArticles();
    });
    this.state.loading = false;
  };

  render() {
    const { classes } = this.props;
    var data = this.state.scrappedLink;
    return (
      <div>
        <h1 className="mb-2 mt-2 text-center">News Feed</h1>
        {this.state.loading === true ? (
          <div className="container text-center">
            <div className="spinner-grow text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <h6>Scraping takes time :( ...</h6>
          </div>
        ) : (
          <div>
            {data.map(function (cards) {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "10px",
                  }}
                >
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={cards[3]}
                        title={cards[1]}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {cards[1]}
                        </Typography>
                        {/* <Typography variant="body2" color="textSecondary" component="p">
                          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                          across all continents except Antarctica
                        </Typography> */}
                      </CardContent>
                    </CardActionArea>
                    <CardActions style={{ justifyContent: "center" }}>
                      <Button
                        size="small"
                        color="primary"
                        target="_blank"
                        href={cards[4]}
                      >
                        Read More
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(useStyles)(Feed);
