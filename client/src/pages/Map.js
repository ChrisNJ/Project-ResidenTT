import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  Circle,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "60vh",
};

const center = {
  lat: 10.66493623435229,
  lng: -61.40035327985661,
};

const Map = () => {
  const [crimeData, setCrimeData] = useState([]);
  const [selected, setSelected] = useState({});
  const [currentPosition, setCurrentPosition] = useState({});

  async function getCrimeData() {
    try {
      const res = await fetch("/crimereports/", {
        method: "GET",
      });

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
  }

  useEffect(() => {
    getCrimeData();
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const onSelect = (item) => {
    setSelected(item);
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
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={9}>
          {currentPosition.lat && (
            <Circle
              options={{
                strokeColor: "white",
                strokeOpacity: 1,
                strokeWeight: 4,
                fillColor: "#4287f5",
                fillOpacity: 1,
                radius: 2000,
              }}
              center={currentPosition}
            />
          )}
          {crimeData.map((item) => {
            return (
              <Circle
                key={item.id}
                options={{
                  strokeColor: "white",
                  strokeOpacity: 1,
                  strokeWeight: 4,
                  fillColor: "#e31414",
                  fillOpacity: 1,
                  radius: 2000,
                }}
                center={item.location}
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
              <p style={{ color: "black" }}>{selected.offences}</p>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
