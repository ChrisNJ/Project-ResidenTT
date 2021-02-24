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
      //console.log(this.state.scrappedLink[0]); 
      //this.getArticles();
    });
  }

  // getArticles(){  
  //   var list = [];
  //   var re = new RegExp("^https://newsday.co.tt/..../../..///", "i");
  //   for (var i=0;i<this.state.scrappedLink.length;i++){  
  //     //console.log(this.state.scrappedLink[i]); 
  //     var tmp = this.state.scrappedLink[i];
  //     if (tmp.match("^https://newsday.co.tt/..../../../")){  
  //       list.push(tmp);
  //     }
  //   }  
  //   //console.log(list); 
  //   this.setState({
  //     stories : list
  //   })
  //   console.log(this.state.stories);
  // }  


  render() { 
    return ( 
      <h1>This is the Feed</h1>
      );
  }
}
 
export default Feed;