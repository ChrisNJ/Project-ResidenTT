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
      <div style={{
        backgroundColor: 'white'
      }}>
          <form>
              
              <div class="form-group">
                <label for="Offense_Type">Crime Offense</label>
                <select class="form-control" id="Offense_Type">
                  <option>1</option>
                </select>
              </div>

              <div class="form-group">
                <label for="Report_Description">Report Description</label>
                <textarea style={{height: '250px'}} class="form-control" id="Report_Description"></textarea>
              </div>

              <div class="form-group">
              <label>Report Date</label>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                <TimePicker onChange={onChange} value={value}/>
              </div>

              <div class="form-group">
                <label for="Report_Image">Report Image</label>
                <input type="file" class="form-control-file" id="Report_Image"/>
              </div>
              
              <div>
                {location ? (
                  <code>
                    Latitude: {location.latitude}, Longitude: {location.longitude}
                  </code>
                ) : (
                  <p>Loading...</p>
                )}
                {error && <p>Location Error: {error}</p>}
              </div>

              <button type="submit" class="btn btn-primary">Submit</button>
           </form>
          
       </div>
  );
};

export default Report;
