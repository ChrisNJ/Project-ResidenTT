import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

const MapIcon = ({ text }) => <div>{text}</div>;

const Map = () => {
  const [crimeData, setCrimeData] = useState([]);
  const [location, setLocation] = useState({
    trinidad: {
      lat: 10.69,
      lng: -61.22,
    },
    zoom: 9,
  });
  //Get crime data stored in the database

  async function getCrimeData() {
    try {
      const res = await fetch("/crimereports/", {
        method: "GET",
      });
      console.log(res);
      const parseData = await res.json();
      console.log(parseData);
      setCrimeData(parseData);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getCrimeData();
  }, []);

  return (
    <div>
      <h2>Map</h2>
      <div
        className="container"
        style={{
          height: "60vh",
          width: "60%",
          border: "2px solid white",
        }}
      >
        <GoogleMapReact
          boostrapURLKeys={{ key: "AIzaSyBGBI_GQQx1qtwoa3KGa4ScLUCBcm1f9Xg" }}
          defaultCenter={location.trinidad}
          defaultZoom={location.zoom}
        >
          <MapIcon lat={10.78} lng={-61.51} text="My Marker" />
        </GoogleMapReact>
        {/* crimeData[0].longitude */}
        {/* {crimeData.map((crime) => {
          return (
            <div key={crime.id}>
              {crime.date +
                " , " +
                crime.time +
                " ," +
                crime.station +
                ", " +
                crime.division}
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default Map;
