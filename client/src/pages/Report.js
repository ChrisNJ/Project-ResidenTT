import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

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
  const [startTime, setStartTime] = useState(
    new Date().toLocaleTimeString("it-IT")
  );
  const [loading, setLoading] = useState(false);
  const [crimeImage, setImage] = useState(
    "https://icons-for-free.com/iconfiles/png/512/box+document+outline+share+top+upload+icon-1320195323221671611.png"
  );
  const [contentType, setContentType] = useState(undefined);
  const containerStyle = {
    width: "100%",
    height: "30vh",
  };

  const [center, setCenter] = useState({
    lat: 10.40493623435229,
    lng: -61.3935327985661,
  });
  const zoom = 9;

  const [currentPosition, setCurrentPosition] = useState({});

  const [inputs, setInputs] = useState({
    offences: "",
    crimeInfo: "",
    location: "",
  });

  //Destructure inputs for easy access
  const { offences, crimeInfo, location } = inputs;

  //When the values entered by the user changes set those values to the inputs state variable
  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    }
  }, []);

  const onSelect = (item) => {
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

  //Send uploaded image to Cloudinary
  const fileSelectedHandler = async (e) => {
    let content;
    const files = e.target.files;
    const fd = new FormData();

    fd.append("file", files[0]);

    if (files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
      content = "image";
      setContentType(content);
    } else if (
      files[0].name.match(/.(mp4|3g2|3gp|flv|mkv|mpeg|ogv|avi|mov|wmv)$/i)
    ) {
      content = "raw";
      setContentType(content);
    } else {
      toast.error("Please upload an image or video");
    }

    //Cloudinary upload preset
    if (content) {
      console.log("type", contentType);
      console.log("typereally", content);
      fd.append("upload_preset", "info3604project");

      setLoading(true);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dtqlgbedo/${content}/upload`,
        {
          method: "POST",
          body: fd,
        }
      );

      const file = await res.json();

      console.log(file.secure_url);
      //Change to file uploaded image
      setImage(file.secure_url);
      setLoading(false);
    }
  };

  //On submit send the report to the backend for storage
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        offences,
        crimeInfo,
        date: startDate,
        time: startTime,
        location,
        longitude: currentPosition.lng,
        latitude: currentPosition.lat,
        mediaUrl: crimeImage,
      };

      const res = await fetch("/userreports/create", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await res.json();

      //If a token was received from the backend server set the token to localStorage and authorize the user
      if (parseRes === "Report added successfully!") {
        toast.success(parseRes, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          // onClose: () => (window.location.href = "/posts"),
        });
      } else {
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
      toast.error("Error creating post");
    }
  };

  return (
    <div>
      <Fab
        color="secondary"
        aria-label="report"
        data-toggle="modal"
        data-target="#reportModal"
        style={style}
      >
        <AddIcon />
      </Fab>

      <div
        class="modal fade"
        id="reportModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="reportModalTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5
                className="modal-title"
                id="reportModalTitle"
                style={{ color: "lightgray" }}
              >
                Report Crimes
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form id="Crime_Report" onSubmit={onSubmit}>
                <div id="accordion">
                  <div class="card">
                    <div class="card-header" id="headingOne">
                      <h5 class="mb-0">
                        <button
                          type="button"
                          class="btn btn-link collapsed"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Step 1 of 3: General Information
                        </button>
                      </h5>
                    </div>

                    <div
                      id="collapseOne"
                      class="collapse"
                      aria-labelledby="headingOne"
                      data-parent="#accordion"
                    >
                      <div class="card-body">
                        <div class="form-group">
                          <label
                            style={{ color: "lightgray" }}
                            for="Offence_Type"
                          >
                            Crime Offence
                          </label>
                          <select
                            class="form-control"
                            id="Offence_Type"
                            required
                            name="offences"
                            value={offences}
                            onChange={(e) => onChange(e)}
                          >
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
                            name="crimeInfo"
                            value={crimeInfo}
                            onChange={(e) => onChange(e)}
                          ></textarea>
                        </div>

                        <div class="form-group" style={{ color: "lightgray" }}>
                          <label>Report Date </label>
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                          />
                          <TimePicker
                            onChange={(e) => setStartTime(e)}
                            value={startTime}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" id="headingTwo">
                      <h5 class="mb-0">
                        <button
                          type="button"
                          class="btn btn-link collapsed"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Step 2 of 3: Location
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseTwo"
                      class="collapse"
                      aria-labelledby="headingTwo"
                      data-parent="#accordion"
                    >
                      <div class="card-body">
                        <div class="form-row">
                          <div class="col">
                            <div class="form-group">
                              <label
                                style={{ color: "lightgray" }}
                                for="Division"
                              >
                                Division
                              </label>
                              <select
                                class="form-control"
                                id="Division"
                                required
                                name="location"
                                value={location}
                                onChange={(e) => onChange(e)}
                              >
                                <option selected>Choose an division...</option>
                                <option>Wounding/Shooting</option>
                                <option>Robbery</option>
                                <option>
                                  Poss of Narcotics for Trafficking
                                </option>
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
                          <LoadScript
                            googleMapsApiKey={process.env.REACT_APP_mapKey}
                          >
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
                              {Number.parseFloat(currentPosition.lat).toFixed(
                                2
                              )}
                              , Longitude:{" "}
                              {Number.parseFloat(currentPosition.lng).toFixed(
                                2
                              )}
                            </code>
                          ) : (
                            <p>Loading your location...</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" id="headingThree">
                      <h5 class="mb-0">
                        <button
                          type="button"
                          class="btn btn-link collapsed"
                          data-toggle="collapse"
                          data-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          Step 3 of 3: Upload Images/Video (Optional)
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseThree"
                      class="collapse"
                      aria-labelledby="headingThree"
                      data-parent="#accordion"
                    >
                      <div class="card-body">
                        <div className="col-md2 text-center">
                          {loading ? (
                            <h5>Loading...</h5>
                          ) : contentType == "raw" ? (
                            <video
                              width="100%"
                              height="80%"
                              controls
                              src={crimeImage}
                            >
                              Cannot load on your browser.
                            </video>
                          ) : (
                            <img
                              id="image"
                              src={crimeImage}
                              width="171"
                              height="180"
                              alt="loading img"
                            />
                          )}
                        </div>
                        <div class="form-group">
                          <label
                            style={{ color: "lightgray" }}
                            for="Report_Image"
                          >
                            Report Image/Video
                          </label>
                          <input
                            type="file"
                            class="form-control-file"
                            id="Report_Image"
                            onChange={(e) => fileSelectedHandler(e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                // type="button"
                type="submit"
                form="Crime_Report"
                class="btn btn-primary"
                // data-dismiss="modal"
                disabled={loading}
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
