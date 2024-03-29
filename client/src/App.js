import "./App.css";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Stats from "./pages/Stats";
import Feed from "./pages/NewsFeed";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ReportsFeed from "./pages/ReportsFeed";

import React, { useState, useEffect ,useRef, useCallback} from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Particles from "react-particles-js";
import NavBar from "./components/Nav Bar/Navbar";
import ReportModal from "./components/Report/Report";
import SimpleModal from "./components/Chat/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

import useSupercluster from "use-supercluster";  
import {supercluster} from 'supercluster';  

toast.configure();

var deferredPrompt;
var enableNotificationsButtons = document.querySelectorAll(
  ".enable-notifications"
);

if (!window.Promise) {
  window.Promise = Promise;
} 



if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(function () {
      console.log("Service worker registered!");
    })
    .catch(function (err) {
      console.log(err);
    });
}

window.addEventListener("beforeinstallprompt", function (event) {
  console.log("beforeinstallprompt fired");
  event.preventDefault();
  deferredPrompt = event;
  return false;
});

function displayConfirmNotification() {
  var options = {
    body: "You successfully subscribed to our Notification service!",
  };
  new Notification("Successfully subscribed!", options);
}

function askForNotificationPermission() {
  Notification.requestPermission(function (result) {
    console.log("User Choice", result);
    if (result !== "granted") {
      console.log("No notification permission granted!");
    } else {
      displayConfirmNotification();
    }
  });
}
askForNotificationPermission();

// if ('Notification' in window) {
//   for (var i = 0; i < enableNotificationsButtons.length; i++) {
//     enableNotificationsButtons[i].style.display = 'inline-block';
//     enableNotificationsButtons[i].addEventListener('click', askForNotificationPermission);
//   }
// }

function App() { 
  //variables used for setting authenticated and page loading
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [crimeData, setCrimeData] = useState([]);   
  const [currentPosition, setCurrentPosition] = useState({});  
  const firstCLuster = useRef() 
  
  const [clusters, setCluster] = useState({}); 

  const [isLoading, setLoading] = useState(true);

  //Function passed to child components to set authentication
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }; 
 
  const nearCrime = useCallback(() => {  
    //console.log(clusters);
    if(currentPosition){ 
      for(var x in clusters){ 
        //console.log(x); 
        //console.log(currentPosition);
        var c_lng = clusters[x].longitude; 
        var c_lat = clusters[x].latitude;  
        //console.log(c_lng,c_lat);
        // if((currentPosition.lat == c_lat) && (currentPosition.lng == c_lng)){  
        //   console.log("Near Crime");
        // }   
        //console.log(Math.abs(currentPosition.lat - c_lat)) 
        if(Math.abs(currentPosition.lat - c_lat) < 0.005){ 
          if(!clusters[x].alerted){
            console.log("Near Crime");
            var options = {
              body: 'Crime Reported in Your Area'
            };
            new Notification('Crime Alert', options); 
          } 
          clusters[x].alerted = true
        }
      }
    
    }
  }, [currentPosition]);  

  nearCrime()


  async function loadCluster(){ 
    try { 
      let res
      res = await fetch("/clusters/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });

    const parseData = await res.json();   
    
    setCluster(parseData) 
    //console.log(parseData);

    //const parseData = await res.json();
      
    } catch (err) {
      console.error(err.message);
    }
  }

  //loadCluster()

  //Send the token in local storage to verify the user
  async function isAuth() {
    try {
      const res = await fetch("/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await res.json();

      //If the auth (boolean) part of the response from the server is true then set authenticated
      parseRes.auth === true
        ? setIsAuthenticated(true)
        : setIsAuthenticated(false);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  // useCallback(() => {
  //   getCrimeData(6) 
  // },[])

  //Calls isAuth on load and when state variables change
  useEffect(() => { 
    isAuth(); 
    navigator.geolocation.watchPosition((position)=>{ 
      const pos  = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
        //console.log(position); 
        setCurrentPosition(pos);  
        //console.log(pos);
        //nearCrime()
    },()=>null)     
    loadCluster()     
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 



  

  //Get the window size to enable the reduction of particles for mobile
  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
  }

  const size = useWindowSize().width;

  let num_p;
  if (size > 755) {
    num_p = 100;
  } else {
    num_p = 20;
  }

  if (isLoading) {
    return (
      <div
        className="container text-center"
        style={{
          backgroundColor: "#181515",
          minHeight: "100vh",
          minWidth: "100%",
          display: "flex",
          flexDirection: "column",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <Router>
      <div className="App">
        <div style={{ position: "absolute" }}>
          <Particles
            height="100vh"
            width="100vw"
            params={{
              particles: {
                number: {
                  value: num_p,
                },
                size: {
                  value: 3,
                },
                color: {
                  value: "#ffffff",
                },
                line_linked: {
                  enable: true,
                  distance: 250,
                  color: "#3a9bde",
                  opacity: 0.4,
                  width: 1,
                },
              },
              interactivity: {
                events: {
                  onhover: {
                    enable: true,
                    mode: "repulse",
                  },
                },
              },
            }}
          />
        </div>
        {/* Lets the navbar know whether a user is authenticated on every page */}
        <NavBar userAuth={isAuthenticated} setAuth={setAuth} />
        <div>
          <ReportModal userAuth={isAuthenticated} />
          <SimpleModal />
        </div>
        <Switch>
          <Route exact path="/map" render={(props) => <Map {...props} />} />
          <Route exact path="/stats" render={(props) => <Stats {...props} />} />
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route exact path="/feed" render={(props) => <Feed {...props} />} />
          <Route
            exact
            path="/reportsfeed"
            render={(props) => <ReportsFeed />}
          />
          <Route
            exact
            path="/register"
            render={(props) =>
              !isAuthenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/profile"
            render={(props) =>
              isAuthenticated ? (
                <Profile {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          <Redirect from="*" to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
