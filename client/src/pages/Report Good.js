import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "react-datepicker/dist/react-datepicker.css";
// import "bootstrap/dist/css/bootstrap.min.css";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const style = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 85,
  left: "auto",
  position: "fixed",
};

const Report = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState(startDate);

  /*start of location code*/
  // const geolocationOptions = {
  //   timeout: 1000 * 60 * 1,
  // };

  // const useCurrentLocation = (options = {}) => {
  //   const [error, setError] = useState();
  //   const [location, setLocation] = useState();

  //   useEffect(() => {
  //     navigator.geolocation.getCurrentPosition(
  //       handleSuccess,
  //       handleError,
  //       options
  //     );
  //     if (!navigator.geolocation) {
  //       setError("Geolocation is not supported.");
  //       return;
  //     }
  //   }, [options]);

  //   const handleSuccess = (position) => {
  //     const { latitude, longitude } = position.coords;

  //     setLocation({
  //       latitude,
  //       longitude,
  //     });
  //   };

  //   const handleError = (error) => {
  //     setError(error.message);
  //   };

  //   return { location, error };
  // };

  // const { location, error } = useCurrentLocation(geolocationOptions);

  const containerStyle = {
    width: "100%",
    height: "30vh",
  };

  const [center, setCenter] = useState({
    lat: 10.40493623435229,
    lng: -61.3935327985661,
  });
  const zoom = 9;

  const [selected, setSelected] = useState({});
  const [currentPosition, setCurrentPosition] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    }
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

  const changeMarkerPositon = (e) => {
    const newPosition = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setCurrentPosition(newPosition);
  };

  return (
    <div>
      <Fab
        color="secondary"
        aria-label="report"
        data-toggle="modal"
        data-target="#reportModal"
        // style={style}
      >
        <AddIcon />
      </Fab>

      <div
        className="modal fade"
        id="reportModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="reportModalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="reportModalTitle"
                style={{ color: "lightgray" }}
              >
                Report Crimes
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div>
                <form id="Crime_Report">
                  <div class="form-group">
                    <label style={{ color: "lightgray" }} for="Offence_Type">
                      Crime Offence
                    </label>
                    <select class="form-control" id="Offence_Type">
                      <option selected>Choose an offence...</option>
                      <option>Wounding/Shooting</option>
                      <option>Robbery</option>
                      <option>Poss of Narcotics for Trafficking</option>
                      <option>Fraud Offences</option>
                      <option>General Larceny</option>
                      <option>Larceny Motor Vehicle</option>
                      <option>Larceny Dwelling House</option>
                      <option>Breaking Offences</option>
                      <option>Other Serious Crimes</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label
                      style={{ color: "lightgray" }}
                      for="Report_Description"
                    >
                      Report Description
                    </label>
                    <textarea
                      style={{ height: "125px" }}
                      class="form-control"
                      id="Report_Description"
                    ></textarea>
                  </div>

                  <div class="form-group" style={{ color: "lightgray" }}>
                    <label>Report Date </label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                    <TimePicker onChange={onChange} value={value} />
                  </div>

                  <div class="form-group">
                    <label style={{ color: "lightgray" }} for="Report_Image">
                      Report Image
                    </label>
                    <input
                      type="file"
                      class="form-control-file"
                      id="Report_Image"
                    />
                  </div>

                  <div class="form-row">
                    <div class="col">
                      <div class="form-group">
                        <label style={{ color: "lightgray" }} for="Division">
                          Division
                        </label>
                        <select class="form-control" id="Division">
                          <option selected>Choose an division...</option>
                          <option>Wounding/Shooting</option>
                          <option>Robbery</option>
                          <option>Poss of Narcotics for Trafficking</option>
                          <option>Fraud Offences</option>
                          <option>General Larceny</option>
                          <option>Larceny Motor Vehicle</option>
                          <option>Larceny Dwelling House</option>
                          <option>Breaking Offences</option>
                          <option>Other Serious Crimes</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label style={{ color: "lightgray" }}>
                      {" "}
                      Select location of crime:{" "}
                    </label>
                    <LoadScript googleMapsApiKey={process.env.REACT_APP_mapKey}>
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={zoom}
                        onClick={(e) => changeMarkerPositon(e)}
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
                      </GoogleMap>
                    </LoadScript>
                  </div>
                  <div>
                    {currentPosition ? (
                      <code style={{ color: "lightgray" }}>
                        Latitude:{" "}
                        {Number.parseFloat(currentPosition.lat).toFixed(2)},
                        Longitude:{" "}
                        {Number.parseFloat(currentPosition.lng).toFixed(2)}
                      </code>
                    ) : (
                      <p>Loading your location...</p>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                // type="button"
                type="submit"
                form="Crime_Report"
                className="btn btn-primary"
                data-dismiss="modal"
                // onClick={() => onSubmit()}
              >
                Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
