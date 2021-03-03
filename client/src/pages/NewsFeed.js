import { React,Component } from "react"; 
import axios from 'axios'; 

//import { makeStyles } from '@material-ui/core/styles'; 
import { withStyles } from "@material-ui/core/styles"; 

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = theme =>({
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
        stories: []
     };
  } 

  componentDidMount = () => {
    axios.get("/scrape").then(response =>{  
      this.setState({
        scrappedLink : response.data
      })
      console.log(this.state.scrappedLink); 
      //this.getArticles();
    });
  }


  render() {      
    const {classes} = this.props; 
    var data = this.state.scrappedLink; 
    console.log(data)
    return data.map (el => ( 
      <div style={{ display:'flex', justifyContent:'center' }}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image = {el[0].img}
                title= {el[0].title} 
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {el[0].title}
                </Typography>
                {/* <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                </Typography> */}
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button> 
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
      </div>
    )); 
  }
}
 
export default withStyles(useStyles)(Feed);