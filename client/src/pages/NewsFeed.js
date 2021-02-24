import { React,Component } from "react"; 
import axios from 'axios'; 

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
    return ( 
      <h1>This is the Feed</h1>
      );
  }
}
 
export default Feed;