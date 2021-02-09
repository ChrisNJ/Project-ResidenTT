import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Map from "./pages/Map";

import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import SideBar from "./components/Side Bar/sideBar";
import AppBar from "./components/App Bar/appBar";
import Chat from "./components/Chat/Chat";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* <AppBar/>  */}
          <SideBar />
          <Chat />
          <Switch>
            <Route
              exact
              path="/about"
              render={(props) => <About {...props} />}
            />
            <Route exact path="/map" render={(props) => <Map {...props} />} />
            <Route exact path="/" render={(props) => <Home {...props} />} />
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
