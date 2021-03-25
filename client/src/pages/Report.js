import React, { useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';

import "react-datepicker/dist/react-datepicker.css";

const Report = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState(startDate);
  return (
      <div>
          <form>
              
              <div class="form-group">
                <label for="Report_Title">Report Title</label>
                <textarea class="form-control" id="Report_Title"></textarea>
              </div>

              <div class="form-group">
                <label for="Report_Description">Report Description</label>
                <textarea class="form-control" id="Report_Description"></textarea>
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

              
              <button type="submit" class="btn btn-primary">Submit</button>
           </form>
          
       </div>
  );
};

export default Report;
