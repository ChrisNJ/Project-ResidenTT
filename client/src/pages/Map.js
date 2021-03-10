import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api";
require("dotenv").config();

const containerStyle = {
  width: "100%",
  height: "60vh",
};

const Map = () => {
  const [loading, setLoading] = useState(false);
  const [crimeData, setCrimeData] = useState([]);
  const [center, setCenter] = useState({
    lat: 10.66493623435229,
    lng: -61.40035327985661,
  });
  const zoom = 9;
  const [selected, setSelected] = useState({});
  const [currentPosition, setCurrentPosition] = useState({});

  const getCrimeData = async (range = 1) => {
    try {
      let res;
      setLoading(true);
      if (range >= 1) {
        const body = { range };

        res = await fetch("/crimereports/", {
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
      setCrimeData(newData);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getCrimeData();
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const onSelect = (item) => {
    setSelected(item);
    setCenter(item.location);
  };

  const success = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };

  const options = {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  };

  return (
    <div>
      <br />
      <h1 style={{ textAlign: "center" }}>Trinidad and Tobago Crime Map</h1>
      <br />
      <div className="container">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_mapKey}>
          {loading ? (
            <div className="container text-center">
              <div
                className="spinner-grow text-info"
                role="status"
                style={{
                  width: "4rem",
                  height: "4rem",
                }}
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={zoom}
            >
              {currentPosition.lat && (
                <Marker
                  icon={
                    "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                  }
                  position={currentPosition}
                  onClick={() => onSelect(currentPosition)}
                />
              )}

              <MarkerClusterer options={options}>
                {(clusterer) =>
                  crimeData.map((item) => (
                    <Marker
                      icon={
                        "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                      }
                      key={item.id}
                      position={item.location}
                      clusterer={clusterer}
                      onClick={() => onSelect(item)}
                    />
                  ))
                }
              </MarkerClusterer>
              {selected.location && (
                <InfoWindow
                  position={selected.location}
                  clickable={true}
                  onCloseClick={() => setSelected({})}
                >
                  <div>
                    <p style={{ color: "black" }}>
                      <b>Offence:</b> {selected.offences}
                    </p>
                    <p style={{ color: "black" }}>
                      <b>Date:</b> {selected.date}
                    </p>
                    <p style={{ color: "black" }}>
                      <b>Time:</b> {selected.time}
                    </p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          )}
        </LoadScript>

        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => getCrimeData(1)}
          >
            3 Months
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => getCrimeData(2)}
          >
            6 Months
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => getCrimeData(3)}
          >
            1 Year
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => getCrimeData(4)}
          >
            2 Years
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => getCrimeData(5)}
          >
            3 Years
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => getCrimeData(6)}
          >
            4 Years
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => getCrimeData(7)}
          >
            5 Years
          </button>
        </div>
      </div>
    </div>
  );
};

export default Map;
