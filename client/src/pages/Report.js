import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Report = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState(startDate);

  /*start of location code*/
  const geolocationOptions = {
    timeout: 1000 * 60 * 1 
  };

  const useCurrentLocation = (options = {}) => {
    const [error, setError] = useState();
    const [location, setLocation] = useState()

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
      if (!navigator.geolocation) {
        setError('Geolocation is not supported.');
        return;
      }
    }, [options]);

    const handleSuccess = position => {
    const { latitude, longitude } = position.coords;

    setLocation({
      latitude,
      longitude
    });
   };

    const handleError = error => {
    setError(error.message);
    };

    return { location, error };
  };

  const { location, error } = useCurrentLocation(geolocationOptions);
  /*end of location code*/
  return (
    
      <div class="overflow-auto container"  style={{
        backgroundColor: 'gray' 
      }}>
      <span className="block-example border">
          <form id="Crime_Report">
            <label for="Crime_Report"><h1 style={{alignItems:'center'}}>Crime Report Form</h1></label>
              
              <div class="form-group">
                <label style={{color:'black'}} for="Offence_Type">Crime Offence</label>
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
                <label style={{color:'black'}} for="Report_Description">Report Description</label>
                <textarea style={{height: '125px'}} class="form-control" id="Report_Description"></textarea>
              </div>

              <div class="form-group">
              <label style={{color:'black'}}>Report Date </label>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                <TimePicker onChange={onChange} value={value}/>
              </div>

              <div class="form-group">
                <label style={{color:'black'}} for="Report_Image">Report Image</label>
                <input type="file" class="form-control-file" id="Report_Image"/>
              </div>

              <div class="form-row">
              <div class="col">
              <div class="form-group">
                <label style={{color:'black'}} for="Division">Division</label>
                <select class="form-control" id="Division">
                  <option selected>Choose a division...</option>
                  <option>CENTRAL</option>
                  <option>EASTERN</option>
                  <option>MORUGA</option>
                  <option>NORTH EASTERN</option>
                  <option>NORTHERN</option>
                  <option>PORT OF SPAIN</option>
                  <option>SOUTH WESTERN</option>
                  <option>SOUTHERN</option>
                  <option>TOBAGO</option>
                  <option>WESTERN</option>
                </select>
                </div>
      
              </div>
              </div>

              <div>
                
                {location ? (
                  <code style={{color:'black'}}>
                    Latitude: {location.latitude.toFixed(2)}, Longitude: {location.longitude.toFixed(2)}
                  </code>
                ) : (
                  <p>Loading your location...</p>
                )}
                {error && <p>Location Error: {error}</p>}
              </div>
              <p></p>
              <div class="container">
                <div class="row justify-content-center">
                   <div class="col-xs-4 col-xs-offset-3"></div>
                      <button type="submit" style = {{width: '20em',height: '3em'}} class="col-md-2 btn btn-primary">Submit</button>
                    </div>
                  </div>
               
           </form>
           </span>  
       </div>
  );
};

export default Report;
