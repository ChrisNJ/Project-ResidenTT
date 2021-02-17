import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "60vh",
};

const Map = () => {
  const [crimeData, setCrimeData] = useState([]);
  const [center, setCenter] = useState({
    lat: 10.66493623435229,
    lng: -61.40035327985661,
  });
  const [selected, setSelected] = useState({});
  const [zoom, setZoom] = useState(9);
  const [currentPosition, setCurrentPosition] = useState({});

  const getCrimeData = async (range = 1) => {
    try {
      let res;
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

    if (zoom < 12) {
      setZoom(12);
    }
    setCenter(item.location);
  };

  const success = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };

  return (
    <div className="container">
      <LoadScript googleMapsApiKey="AIzaSyC3pOnLyggdgCYC7Mv8CWSaeGNUUox2Qrg">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
        >
          {currentPosition.lat && (
            <Marker
              icon={"https://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
              position={currentPosition}
            />
          )}
          {crimeData.map((item) => {
            return (
              <Marker
                key={item.id}
                icon={"https://maps.google.com/mapfiles/ms/icons/red-dot.png"}
                position={item.location}
                onClick={() => onSelect(item)}
              />
            );
          })}
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
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
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
  );
};

export default Map;
