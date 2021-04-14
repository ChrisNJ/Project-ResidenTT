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


  const [isLoading, setLoading] = useState(true);

  //Function passed to child components to set authentication
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }; 

  // const getCrimeData = async (range = 1) => {
  //   try {
  //     let res;
  //     setLoading(true);
  //     if (range >= 1) {
  //       const body = { range };

  //       res = await fetch("/crimereports/", {
  //         method: "POST",
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //         body: JSON.stringify(body),
  //       });
  //     }

  //     const parseData = await res.json();
  //     let newData = parseData.map((element) => {
  //       return {
  //         createdAt: element.createdAt,
  //         date: element.date,
  //         division: element.divison,
  //         id: element.id,
  //         address: element.location,
  //         offences: element.offences,
  //         station: element.station,
  //         time: element.time,
  //         updatedAt: element.updatedAt,
  //         location: {
  //           lat: element.latitude,
  //           lng: element.longitude,
  //         },
  //       };
  //     });
  //     setCrimeData(newData);
  //     setLoading(false);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };      

  
  // const points = crimeData.map(crime => ({ 
  //   type: "Feature",
  //   properties: { cluster: false, crimeId: crime.id,category: crime.offences},
  //   geometry: {
  //     type: "Point",
  //     coordinates: [
  //       parseFloat(crime.location.lng),
  //       parseFloat(crime.location.lat), 
  //     ]
  //   } 
  // }));  

  // const { clusters } = useSupercluster({
  //   points, 
  //   bounds:[-61.83980640485659, 10.121933582359432, -60.96090015485659, 11.206971508949579],
  //   zoom:9,
  //   options: { radius: 75, maxZoom: 20 } 
  // });     

     

  // const nearCrime = useCallback(() => { 
  //   getCrimeData(6) 
  //   console.log(clusters);
  //   if(currentPosition){ 
  //     for(var x in clusters){
  //       console.log(clusters[x].geometry.coordinates);  
  //       //console.log(currentPosition);
  //       var c_lng = clusters[x].geometry.coordinates[0]; 
  //       var c_lat = clusters[x].geometry.coordinates[1]  
  //       //console.log(c_lng,c_lat);
  //       // if((currentPosition.lat == c_lat) && (currentPosition.lng == c_lng)){  
  //       //   console.log("Near Crime");
  //       // }   
  //       //console.log(Math.abs(currentPosition.lat - c_lat))
  //       if((currentPosition.lat == c_lat) && (currentPosition.lng == c_lng)){
  //         console.log("Near Crime");
  //         var options = {
  //           body: 'You Near Crime Buddy'
  //         };
  //         new Notification('Crime Alert', options);
  //       }
  //     }
    
  //   }
  // }, [clusters, currentPosition]);

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
