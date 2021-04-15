import React, { useEffect, useState, useRef, componentDidMount } from "react";

import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import Supercluster from "supercluster";
import "./Map.css";

const Marker = ({ children }) => children;

// load and prepare data
// get map bounds
// get clusters

// return map
const Map = () => {
  const mapRef = useRef();
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(11);
  const [loading, setLoading] = useState(false);
  const [crimeData, setCrimeData] = useState([]);
  const [userReports, setUserReports] = useState([]);
  const [selected, setSelected] = useState({});
  const [currentPosition, setCurrentPosition] = useState({});
  const [activeData, setActiveData] = useState("");

  const alerted = false;

  const points = crimeData.map((crime) => ({
    type: "Feature",
    properties: {
      cluster: false,
      crimeId: crime.id,
      category: crime.offences,
      name: false,
    },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(crime.location.lng),
        parseFloat(crime.location.lat),
      ],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    alerted,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  const getCrimeData = async (range = 3) => {
    try {
      let res;
      let res2;
      setLoading(true);
      if (range) {
        const body = { range };

        //Get Official Crime Reports
        res = await fetch("/crimereports/", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        });

        //Get User Reports
        res2 = await fetch("/userreports/", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        });
      }

      const parseData = await res.json();
      let newData = parseData.map((element) => {
        return {
          createdAt: element.createdAt,
          date: element.date,
          division: element.divison,
          id: element.id,
          address: element.location,
          offences: element.offences,
          station: element.station,
          time: element.time,
          updatedAt: element.updatedAt,
          location: {
            lat: element.latitude,
            lng: element.longitude,
          },
        };
      });

      const parseData2 = await res2.json();
      let newData2 = parseData2.map((element) => {
        return {
          id: element.id,
          division: element.location,
          offences: element.offences,
          date: element.date,
          time: element.time,
          createdAt: element.createdAt,
          updatedAt: element.updatedAt,
          location: {
            lat: element.latitude,
            lng: element.longitude,
          },
        };
      });
      console.log(newData2);

      setCrimeData(newData);
      setUserReports(newData2);
      setActiveData(range);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };


  useEffect(() => {
    getCrimeData();
    navigator.geolocation.watchPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        //console.log(position);
        setCurrentPosition(pos);
        //nearCrime()
      },
      () => null
    );
  }, []);

  return (
    <div>
      <h1 className="mb-2 mt-2 text-center">Crime Map</h1>
      <div className="container-lg mb-3">
        <div class="dropdown">
          <button
            class="btn btn-secondary btn-md dropdown-toggle mb-4"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Sort by time
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button
              className={
                activeData === 3 ? "dropdown-item active" : "dropdown-item"
              }
              type="button"
              onClick={() => getCrimeData(3)}
            >
              3 Months
            </button>
            <button
              className={
                activeData === 6 ? "dropdown-item active" : "dropdown-item"
              }
              type="button"
              onClick={() => {
                getCrimeData(6);
              }}
            >
              6 Months
            </button>
            <button
              className={
                activeData === 12 ? "dropdown-item active" : "dropdown-item"
              }
              type="button"
              onClick={() => {
                getCrimeData(12);
              }}
            >
              1 Year
            </button>
            <button
              className={
                activeData === 24 ? "dropdown-item active" : "dropdown-item"
              }
              type="button"
              onClick={() => getCrimeData(24)}
            >
              2 Years
            </button>
            <button
              className={
                activeData === 36 ? "dropdown-item active" : "dropdown-item"
              }
              type="button"
              onClick={() => getCrimeData(36)}
            >
              3 Years
            </button>
            <button
              className={
                activeData === 48 ? "dropdown-item active" : "dropdown-item"
              }
              type="button"
              onClick={() => getCrimeData(48)}
            >
              4 Years
            </button>
            <button
              className={
                activeData === 60 ? "dropdown-item active" : "dropdown-item"
              }
              type="button"
              onClick={() => getCrimeData(60)}
            >
              {" "}
              5 Years
            </button>
          </div>
        </div>
        <div style={{ height: "60vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyC3pOnLyggdgCYC7Mv8CWSaeGNUUox2Qrg",
            }}
            defaultCenter={{ lat: 10.66493623435229, lng: -61.40035327985661 }}
            defaultZoom={9}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map }) => {
              mapRef.current = map;
            }}
            onChange={({ zoom, bounds }) => {
              setZoom(zoom);
              setBounds([
                bounds.nw.lng,
                bounds.se.lat,
                bounds.se.lng,
                bounds.nw.lat,
              ]);
            }}
          >
            {currentPosition.lat && (
              <Marker
                lat={currentPosition.lat}
                lng={currentPosition.lng}
                //onClick={() => onSelect(currentPosition)}
              >
                <button className="crime-marker">
                  <img
                    src="https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    alt="User"
                  />
                </button>
              </Marker>
            )} 

            {userReports.map((reports) => { 

                return ( 
                  <Marker
                      lat={reports.location.lat}
                      lng={reports.location.lng} 
                  > 
                     <button className="crime-marker">
                        <img
                          src="https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                          alt="crime"
                        />
                      </button>
                  </Marker>
                );
            })}

            {clusters.map((cluster) => {
              const [longitude, latitude] = cluster.geometry.coordinates;
              cluster.alerted = false;
              const {
                cluster: isCluster,
                point_count: pointCount,
              } = cluster.properties;

              if (isCluster) {
                return (
                  <Marker
                    key={`cluster-${cluster.id}`}
                    lat={latitude}
                    lng={longitude}
                  >
                    <div
                      className="cluster-marker"
                      style={{
                        width: `${10 + (pointCount / points.length) * 40}px`,
                        height: `${10 + (pointCount / points.length) * 40}px`,
                      }}
                      onClick={() => {
                        const expansionZoom = Math.min(
                          supercluster.getClusterExpansionZoom(cluster.id),
                          20
                        );
                        mapRef.current.setZoom(expansionZoom);
                        mapRef.current.panTo({ lat: latitude, lng: longitude });
                      }}
                    >
                      {pointCount}
                    </div>
                  </Marker>
                );
              } 


              return (
                <Marker
                  key={`crime-${cluster.properties.crimeId}`}
                  lat={latitude}
                  lng={longitude}
                >
                  <button className="crime-marker">
                    <img
                      src="https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                      alt="crime"
                    />
                  </button>
                </Marker> 
              );
            })}
          </GoogleMapReact>
        </div>
      </div>
    </div>
  );
}; //end Map()

export default Map;
