import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';

import "react-datepicker/dist/react-datepicker.css";

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
    
      <div class="overflow-auto container" style={{
        backgroundColor: 'gray',
        justifyContent:'center', alignItems:'center'
      }}>
      <span className="block-example border">
          <form class="col-md-16" id="Crime_Report">
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
                <textarea style={{height: '250px'}} class="form-control" id="Report_Description"></textarea>
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
              
              <div>
                
                {location ? (
                  <code style={{color:'black'}}>
                    Latitude: {location.latitude}, Longitude: {location.longitude}
                  </code>
                ) : (
                  <p>Loading your location...</p>
                )}
                {error && <p>Location Error: {error}</p>}
              </div>
              <p></p>
              <button type="submit" class="btn btn-primary">Submit</button>
             
           </form>
           </span>  
       </div>
  );
};

export default Report;
